from fastapi import APIRouter, HTTPException, status, Depends, Query
from typing import List, Optional
from motor.motor_asyncio import AsyncIOMotorClient
from models import Booking, BookingCreate, MessageResponse, PaymentDetails
from auth import get_current_active_user, get_admin_user, User
from datetime import datetime, timedelta
import os
from bson import ObjectId
import httpx

router = APIRouter(prefix="/bookings", tags=["Bookings"])

# Database connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'test_database')
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

# WhatsApp configuration
WHATSAPP_NUMBER = "+916267679992"  # Same as reference website

async def send_whatsapp_admin_notification(booking_dict: dict, vehicle: dict, user: User):
    """Send WhatsApp notification to admin about new booking."""
    try:
        pickup_date = booking_dict['pickup_date'].strftime('%d/%m/%Y')
        return_date = booking_dict['return_date'].strftime('%d/%m/%Y')
        
        message = f"""🚗 *NEW BOOKING ALERT* 🚗

*Customer Details:*
👤 Name: {user.name}
📞 Phone: {user.phone}
📧 Email: {user.email}

*Vehicle Details:*
🚙 Vehicle: {vehicle['name']}
🏷️ Category: {vehicle['category']}
💰 Amount: ₹{booking_dict['total_amount']:.2f}

*Booking Details:*
📅 Pickup: {pickup_date}
📅 Return: {return_date}
📍 Location: {booking_dict.get('pickup_location', 'Not specified')}

*Special Requests:*
{booking_dict.get('special_requests', 'None')}

🔔 Please approve or reject this booking in the admin panel.

Booking ID: {str(booking_dict['_id'])}"""

        # For now, we'll log the message. In production, integrate with WhatsApp Business API
        print(f"WhatsApp notification (to {WHATSAPP_NUMBER}):", message)
        
        # Update booking to mark WhatsApp as sent
        await db.bookings.update_one(
            {"_id": booking_dict['_id']},
            {"$set": {"whatsapp_sent": True}}
        )
        
        return True
        
    except Exception as e:
        print(f"WhatsApp notification failed: {e}")
        return False

async def send_whatsapp_user_notification(booking_dict: dict, vehicle: dict, user: User, status: str):
    """Send WhatsApp notification to user about booking status."""
    try:
        status_messages = {
            "admin_approved": f"✅ *BOOKING APPROVED* ✅\n\nHi {user.name}! Your booking for {vehicle['name']} has been approved. Please proceed with payment to confirm your booking.",
            "confirmed": f"🎉 *BOOKING CONFIRMED* 🎉\n\nHi {user.name}! Your booking for {vehicle['name']} is confirmed. We'll contact you soon with pickup details.",
            "cancelled": f"❌ *BOOKING CANCELLED* ❌\n\nHi {user.name}, your booking for {vehicle['name']} has been cancelled. Contact us for more details.",
        }
        
        message = status_messages.get(status, f"Your booking status has been updated to: {status}")
        
        # For now, we'll log the message. In production, integrate with WhatsApp Business API
        print(f"WhatsApp notification (to {user.phone}):", message)
        
        return True
        
    except Exception as e:
        print(f"WhatsApp notification failed: {e}")
        return False

def calculate_booking_amount(vehicle_pricing: dict, pickup_date: datetime, return_date: datetime) -> float:
    """Calculate total booking amount."""
    days = max(1, (return_date - pickup_date).days)
    
    # Use daily pricing if available, otherwise use full_day pricing
    daily_rate = vehicle_pricing.get("daily") or vehicle_pricing.get("full_day") or 3000
    
    subtotal = daily_rate * days
    tax = subtotal * 0.18  # 18% GST
    total = subtotal + tax
    
    return round(total, 2)

@router.post("/", response_model=Booking)
async def create_booking(
    booking_data: BookingCreate,
    current_user: User = Depends(get_current_active_user)
):
    """Create a new booking."""
    
    # Validate vehicle exists and is available
    try:
        vehicle = await db.vehicles.find_one({"_id": ObjectId(booking_data.vehicle_id)})
        if not vehicle:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Vehicle not found"
            )
        
        if not vehicle.get("available", False):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Vehicle is not available"
            )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid vehicle ID"
        )
    
    # Check for date conflicts
    conflicting_bookings = await db.bookings.find({
        "vehicle_id": ObjectId(booking_data.vehicle_id),
        "booking_status": {"$in": ["confirmed", "pending", "admin_approved"]},
        "$or": [
            {
                "pickup_date": {"$lte": booking_data.return_date},
                "return_date": {"$gte": booking_data.pickup_date}
            }
        ]
    }).to_list(length=None)
    
    if conflicting_bookings:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Vehicle is not available for selected dates"
        )
    
    # Calculate total amount
    total_amount = calculate_booking_amount(
        vehicle["pricing"], 
        booking_data.pickup_date, 
        booking_data.return_date
    )
    
    # Create booking
    booking_dict = booking_data.dict()
    booking_dict.update({
        "user_id": ObjectId(current_user.id),
        "vehicle_id": ObjectId(booking_data.vehicle_id),
        "total_amount": total_amount,
        "booking_status": "pending_admin_approval",  # New workflow: admin approval first
        "admin_notes": "",
        "whatsapp_sent": False,
        "email_sent": False,
        "payment_details": {
            "payment_method": "pending",
            "payment_status": "pending",
            "amount": total_amount,
            "currency": "INR"
        },
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    })
    
    result = await db.bookings.insert_one(booking_dict)
    booking_dict["_id"] = result.inserted_id
    
    # TODO: Send WhatsApp notification to admin about new booking
    await send_whatsapp_admin_notification(booking_dict, vehicle, current_user)
    
    return Booking(**booking_dict)

@router.get("/", response_model=List[Booking])
async def get_user_bookings(
    current_user: User = Depends(get_current_active_user),
    status_filter: Optional[str] = None
):
    """Get current user's bookings."""
    filter_query = {"user_id": ObjectId(current_user.id)}
    
    if status_filter:
        filter_query["booking_status"] = status_filter
    
    bookings_docs = await db.bookings.find(filter_query).sort("created_at", -1).to_list(length=None)
    
    # Populate vehicle details
    bookings = []
    for booking_doc in bookings_docs:
        # Get vehicle details
        vehicle = await db.vehicles.find_one({"_id": booking_doc["vehicle_id"]})
        booking_doc["vehicle"] = vehicle
        bookings.append(Booking(**booking_doc))
    
    return bookings

@router.get("/{booking_id}", response_model=Booking)
async def get_booking(
    booking_id: str,
    current_user: User = Depends(get_current_active_user)
):
    """Get single booking by ID."""
    try:
        booking_doc = await db.bookings.find_one({
            "_id": ObjectId(booking_id),
            "user_id": ObjectId(current_user.id)
        })
        
        if not booking_doc:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Booking not found"
            )
        
        # Get vehicle details
        vehicle = await db.vehicles.find_one({"_id": booking_doc["vehicle_id"]})
        booking_doc["vehicle"] = vehicle
        
        return Booking(**booking_doc)
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid booking ID"
        )

@router.put("/{booking_id}/status", response_model=Booking)
async def update_booking_status(
    booking_id: str,
    status_data: dict,
    current_user: User = Depends(get_current_active_user)
):
    """Update booking status."""
    new_status = status_data.get("status")
    allowed_statuses = ["cancelled"]  # Users can only cancel bookings
    
    if new_status not in allowed_statuses:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid status"
        )
    
    try:
        # Check if booking exists and belongs to user
        booking = await db.bookings.find_one({
            "_id": ObjectId(booking_id),
            "user_id": ObjectId(current_user.id)
        })
        
        if not booking:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Booking not found"
            )
        
        # Check if booking can be cancelled
        if booking["booking_status"] in ["completed", "cancelled"]:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot cancel this booking"
            )
        
        # Update booking status
        await db.bookings.update_one(
            {"_id": ObjectId(booking_id)},
            {
                "$set": {
                    "booking_status": new_status,
                    "updated_at": datetime.utcnow()
                }
            }
        )
        
        # Return updated booking
        updated_booking = await db.bookings.find_one({"_id": ObjectId(booking_id)})
        return Booking(**updated_booking)
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid booking ID"
        )

@router.post("/{booking_id}/payment", response_model=MessageResponse)
async def process_payment(
    booking_id: str,
    payment_data: dict,
    current_user: User = Depends(get_current_active_user)
):
    """Process payment for booking."""
    try:
        # Check if booking exists and belongs to user
        booking = await db.bookings.find_one({
            "_id": ObjectId(booking_id),
            "user_id": ObjectId(current_user.id)
        })
        
        if not booking:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Booking not found"
            )
        
        if booking["booking_status"] != "pending":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Booking is not in pending status"
            )
        
        # Mock payment processing (in real app, integrate with Razorpay/Stripe)
        payment_method = payment_data.get("payment_method", "card")
        transaction_id = f"txn_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}"
        
        # Update booking with payment details
        payment_details = {
            "payment_method": payment_method,
            "transaction_id": transaction_id,
            "payment_status": "completed",
            "amount": booking["total_amount"],
            "currency": "INR"
        }
        
        await db.bookings.update_one(
            {"_id": ObjectId(booking_id)},
            {
                "$set": {
                    "booking_status": "confirmed",
                    "payment_details": payment_details,
                    "updated_at": datetime.utcnow()
                }
            }
        )
        
        return MessageResponse(message="Payment processed successfully")
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Payment processing failed"
        )

# Admin endpoints
@router.get("/admin/all")
async def get_all_bookings(
    current_user: User = Depends(get_admin_user),
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    status_filter: Optional[str] = None
):
    """Get all bookings (admin only)."""
    filter_query = {}
    
    if status_filter:
        filter_query["booking_status"] = status_filter
    
    # Get total count
    total = await db.bookings.count_documents(filter_query)
    
    # Calculate pagination
    skip = (page - 1) * per_page
    total_pages = (total + per_page - 1) // per_page
    
    # Get bookings with user and vehicle details
    pipeline = [
        {"$match": filter_query},
        {"$sort": {"created_at": -1}},
        {"$skip": skip},
        {"$limit": per_page},
        {
            "$lookup": {
                "from": "users",
                "localField": "user_id",
                "foreignField": "_id",
                "as": "user"
            }
        },
        {
            "$lookup": {
                "from": "vehicles",
                "localField": "vehicle_id",
                "foreignField": "_id",
                "as": "vehicle"
            }
        },
        {
            "$unwind": "$user"
        },
        {
            "$unwind": "$vehicle"
        }
    ]
    
    bookings_docs = await db.bookings.aggregate(pipeline).to_list(length=per_page)
    
    return {
        "data": bookings_docs,
        "total": total,
        "page": page,
        "per_page": per_page,
        "total_pages": total_pages
    }

@router.put("/admin/{booking_id}/status")
async def admin_update_booking_status(
    booking_id: str,
    status_data: dict,
    current_user: User = Depends(get_admin_user)
):
    """Update booking status (admin only)."""
    new_status = status_data.get("status")
    allowed_statuses = ["pending", "confirmed", "cancelled", "completed"]
    
    if new_status not in allowed_statuses:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid status"
        )
    
    try:
        result = await db.bookings.update_one(
            {"_id": ObjectId(booking_id)},
            {
                "$set": {
                    "booking_status": new_status,
                    "updated_at": datetime.utcnow()
                }
            }
        )
        
        if result.modified_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Booking not found"
            )
        
        return MessageResponse(message="Booking status updated successfully")
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid booking ID"
        )