from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import HTTPAuthorizationCredentials
from motor.motor_asyncio import AsyncIOMotorClient
from models import UserCreate, UserLogin, User, Token, MessageResponse
from auth import (
    get_password_hash, 
    authenticate_user, 
    create_user_token,
    get_current_active_user,
    get_user_by_email
)
from datetime import datetime
import os
from bson import ObjectId

router = APIRouter(prefix="/auth", tags=["Authentication"])

# Database connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

@router.post("/register", response_model=Token)
async def register_user(user_data: UserCreate):
    """Register a new user."""
    # Check if user already exists
    existing_user = await get_user_by_email(user_data.email)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Check phone number uniqueness
    existing_phone = await db.users.find_one({"phone": user_data.phone})
    if existing_phone:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Phone number already registered"
        )
    
    # Create new user
    hashed_password = get_password_hash(user_data.password)
    user_dict = {
        "name": user_data.name,
        "email": user_data.email,
        "phone": user_data.phone,
        "password": hashed_password,
        "role": "user",
        "is_verified": False,
        "profile": {},
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    
    result = await db.users.insert_one(user_dict)
    user_dict["_id"] = result.inserted_id
    
    # Remove password from response
    del user_dict["password"]
    user = User(**user_dict)
    
    # Create access token
    access_token = create_user_token(user)
    
    return Token(access_token=access_token, user=user)

@router.post("/login", response_model=Token)
async def login_user(login_data: UserLogin):
    """Login user with email and password."""
    # Get user from database
    user_doc = await db.users.find_one({"email": login_data.email})
    if not user_doc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Verify password
    from auth import verify_password
    if not verify_password(login_data.password, user_doc["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Remove password from user data
    del user_doc["password"]
    user = User(**user_doc)
    
    # Create access token
    access_token = create_user_token(user)
    
    return Token(access_token=access_token, user=user)

@router.get("/me", response_model=User)
async def get_current_user_profile(current_user: User = Depends(get_current_active_user)):
    """Get current user profile."""
    return current_user

@router.put("/profile", response_model=User)
async def update_user_profile(
    profile_data: dict,
    current_user: User = Depends(get_current_active_user)
):
    """Update user profile."""
    # Update allowed fields
    allowed_fields = ["name", "phone", "profile"]
    update_data = {k: v for k, v in profile_data.items() if k in allowed_fields}
    update_data["updated_at"] = datetime.utcnow()
    
    await db.users.update_one(
        {"_id": ObjectId(current_user.id)},
        {"$set": update_data}
    )
    
    # Return updated user
    updated_user_doc = await db.users.find_one({"_id": ObjectId(current_user.id)})
    del updated_user_doc["password"]
    return User(**updated_user_doc)

@router.post("/logout", response_model=MessageResponse)
async def logout_user():
    """Logout user (client-side token removal)."""
    return MessageResponse(message="Successfully logged out")

@router.post("/change-password", response_model=MessageResponse)
async def change_password(
    password_data: dict,
    current_user: User = Depends(get_current_active_user)
):
    """Change user password."""
    current_password = password_data.get("current_password")
    new_password = password_data.get("new_password")
    
    if not current_password or not new_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password and new password are required"
        )
    
    # Get user with password
    user_doc = await db.users.find_one({"_id": ObjectId(current_user.id)})
    
    # Verify current password
    from auth import verify_password
    if not verify_password(current_password, user_doc["password"]):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Current password is incorrect"
        )
    
    # Hash new password and update
    hashed_password = get_password_hash(new_password)
    await db.users.update_one(
        {"_id": ObjectId(current_user.id)},
        {"$set": {"password": hashed_password, "updated_at": datetime.utcnow()}}
    )
    
    return MessageResponse(message="Password changed successfully")