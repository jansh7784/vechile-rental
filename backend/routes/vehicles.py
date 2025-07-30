from fastapi import APIRouter, HTTPException, status, Depends, Query
from typing import List, Optional
from motor.motor_asyncio import AsyncIOMotorClient
from models import Vehicle, VehicleCreate, MessageResponse, PaginatedResponse
from auth import get_current_active_user, get_admin_user, User
from datetime import datetime
import os
from bson import ObjectId

router = APIRouter(prefix="/vehicles", tags=["Vehicles"])

# Database connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

@router.get("/", response_model=PaginatedResponse)
async def get_vehicles(
    page: int = Query(1, ge=1),
    per_page: int = Query(10, ge=1, le=50),
    category: Optional[str] = None,
    transmission: Optional[str] = None,
    fuel_type: Optional[str] = None,
    location: Optional[str] = None,
    available: bool = True,
    search: Optional[str] = None,
    sort_by: str = Query("name", regex="^(name|price|category|created_at)$")
):
    """Get all vehicles with filtering and pagination."""
    
    # Build filter query
    filter_query = {}
    
    if available is not None:
        filter_query["available"] = available
    
    if category:
        filter_query["category"] = {"$regex": category, "$options": "i"}
    
    if transmission:
        filter_query["transmission"] = {"$regex": transmission, "$options": "i"}
    
    if fuel_type:
        filter_query["fuel_type"] = {"$regex": fuel_type, "$options": "i"}
    
    if location:
        filter_query["location"] = {"$regex": location, "$options": "i"}
    
    if search:
        filter_query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"category": {"$regex": search, "$options": "i"}},
            {"location": {"$regex": search, "$options": "i"}},
            {"features": {"$regex": search, "$options": "i"}}
        ]
    
    # Build sort query
    sort_direction = 1  # ascending
    if sort_by == "price":
        sort_field = "pricing.daily"
    else:
        sort_field = sort_by
    
    # Get total count
    total = await db.vehicles.count_documents(filter_query)
    
    # Calculate pagination
    skip = (page - 1) * per_page
    total_pages = (total + per_page - 1) // per_page
    
    # Get vehicles
    cursor = db.vehicles.find(filter_query).sort(sort_field, sort_direction).skip(skip).limit(per_page)
    vehicles_docs = await cursor.to_list(length=per_page)
    
    vehicles = [Vehicle(**doc) for doc in vehicles_docs]
    
    return PaginatedResponse(
        data=vehicles,
        total=total,
        page=page,
        per_page=per_page,
        total_pages=total_pages
    )

@router.get("/{vehicle_id}", response_model=Vehicle)
async def get_vehicle(vehicle_id: str):
    """Get single vehicle by ID."""
    try:
        vehicle_doc = await db.vehicles.find_one({"_id": ObjectId(vehicle_id)})
        if not vehicle_doc:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Vehicle not found"
            )
        return Vehicle(**vehicle_doc)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid vehicle ID"
        )

@router.post("/", response_model=Vehicle)
async def create_vehicle(
    vehicle_data: VehicleCreate,
    current_user: User = Depends(get_admin_user)
):
    """Create a new vehicle (admin only)."""
    vehicle_dict = vehicle_data.dict()
    vehicle_dict["created_at"] = datetime.utcnow()
    vehicle_dict["updated_at"] = datetime.utcnow()
    
    result = await db.vehicles.insert_one(vehicle_dict)
    vehicle_dict["_id"] = result.inserted_id
    
    return Vehicle(**vehicle_dict)

@router.put("/{vehicle_id}", response_model=Vehicle)
async def update_vehicle(
    vehicle_id: str,
    vehicle_data: dict,
    current_user: User = Depends(get_admin_user)
):
    """Update vehicle (admin only)."""
    try:
        # Check if vehicle exists
        existing_vehicle = await db.vehicles.find_one({"_id": ObjectId(vehicle_id)})
        if not existing_vehicle:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Vehicle not found"
            )
        
        # Update vehicle
        vehicle_data["updated_at"] = datetime.utcnow()
        await db.vehicles.update_one(
            {"_id": ObjectId(vehicle_id)},
            {"$set": vehicle_data}
        )
        
        # Return updated vehicle
        updated_vehicle = await db.vehicles.find_one({"_id": ObjectId(vehicle_id)})
        return Vehicle(**updated_vehicle)
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid vehicle ID"
        )

@router.delete("/{vehicle_id}", response_model=MessageResponse)
async def delete_vehicle(
    vehicle_id: str,
    current_user: User = Depends(get_admin_user)
):
    """Delete vehicle (admin only)."""
    try:
        result = await db.vehicles.delete_one({"_id": ObjectId(vehicle_id)})
        if result.deleted_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Vehicle not found"
            )
        
        return MessageResponse(message="Vehicle deleted successfully")
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid vehicle ID"
        )

@router.get("/categories/list")
async def get_vehicle_categories():
    """Get all unique vehicle categories."""
    categories = await db.vehicles.distinct("category", {"available": True})
    return {"categories": categories}

@router.get("/locations/list")
async def get_vehicle_locations():
    """Get all unique vehicle locations."""
    locations = await db.vehicles.distinct("location", {"available": True})
    return {"locations": locations}

@router.post("/{vehicle_id}/availability")
async def check_vehicle_availability(
    vehicle_id: str,
    availability_data: dict
):
    """Check vehicle availability for specific dates."""
    pickup_date = availability_data.get("pickup_date")
    return_date = availability_data.get("return_date")
    
    # Check if vehicle exists
    try:
        vehicle = await db.vehicles.find_one({"_id": ObjectId(vehicle_id)})
        if not vehicle:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Vehicle not found"
            )
        
        # Check for conflicting bookings
        conflicting_bookings = await db.bookings.find({
            "vehicle_id": ObjectId(vehicle_id),
            "booking_status": {"$in": ["confirmed", "pending"]},
            "$or": [
                {
                    "pickup_date": {"$lte": return_date},
                    "return_date": {"$gte": pickup_date}
                }
            ]
        }).to_list(length=None)
        
        is_available = len(conflicting_bookings) == 0 and vehicle.get("available", False)
        
        return {
            "available": is_available,
            "conflicting_bookings": len(conflicting_bookings),
            "message": "Vehicle is available" if is_available else "Vehicle is not available for selected dates"
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid vehicle ID"
        )