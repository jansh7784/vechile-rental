from pydantic import BaseModel, Field, EmailStr, validator, ConfigDict
from typing import List, Optional, Dict, Any
from datetime import datetime
from bson import ObjectId
import uuid

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v, values=None):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __get_pydantic_json_schema__(cls, field_schema):
        field_schema.update(type="string")
        return field_schema

# User Models
class UserProfile(BaseModel):
    avatar: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None
    driving_license: Optional[str] = None

class UserCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., pattern=r"^\+?[1-9]\d{9,14}$")
    password: str = Field(..., min_length=6)

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(BaseModel):
    model_config = ConfigDict(populate_by_name=True, arbitrary_types_allowed=True, json_encoders={ObjectId: str})
    
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str
    email: EmailStr
    phone: str
    role: str = "user"
    is_verified: bool = False
    profile: UserProfile = UserProfile()
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: User

# Vehicle Models
class VehiclePricing(BaseModel):
    daily: Optional[int] = None
    half_day: Optional[int] = None
    full_day: Optional[int] = None

class VehicleSpecifications(BaseModel):
    engine: Optional[str] = None
    mileage: Optional[str] = None
    top_speed: Optional[str] = None
    safety_rating: Optional[int] = None

class VehicleCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    category: str
    image: str
    images: List[str] = []
    transmission: str
    fuel_type: str
    features: str
    ac: bool = True
    seating: str
    location: str
    pricing: VehiclePricing
    extra_km_rate: str
    discount: Optional[str] = None
    available: bool = True
    specifications: VehicleSpecifications = VehicleSpecifications()

class Vehicle(BaseModel):
    model_config = ConfigDict(populate_by_name=True, arbitrary_types_allowed=True, json_encoders={ObjectId: str})
    
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str
    category: str
    image: str
    images: List[str] = []
    transmission: str
    fuel_type: str
    features: str
    ac: bool
    seating: str
    location: str
    pricing: VehiclePricing
    extra_km_rate: str
    discount: Optional[str] = None
    available: bool = True
    specifications: VehicleSpecifications = VehicleSpecifications()
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Booking Models
class BookingCreate(BaseModel):
    vehicle_id: str
    pickup_date: datetime
    return_date: datetime
    pickup_time: str
    return_time: str
    pickup_location: str
    special_requests: Optional[str] = None

class PaymentDetails(BaseModel):
    payment_method: str
    transaction_id: Optional[str] = None
    payment_status: str = "pending"
    amount: float
    currency: str = "INR"

class Booking(BaseModel):
    model_config = ConfigDict(populate_by_name=True, arbitrary_types_allowed=True, json_encoders={ObjectId: str})
    
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    user_id: PyObjectId
    vehicle_id: PyObjectId
    pickup_date: datetime
    return_date: datetime
    pickup_time: str
    return_time: str
    pickup_location: str
    special_requests: Optional[str] = None
    total_amount: float
    booking_status: str = "pending"  # pending, confirmed, cancelled, completed
    payment_details: PaymentDetails
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Blog Models
class BlogCreate(BaseModel):
    title: str = Field(..., min_length=5, max_length=200)
    content: str = Field(..., min_length=100)
    excerpt: str = Field(..., max_length=300)
    featured_image: str
    author: str
    category: str
    tags: List[str] = []
    published: bool = False

class Blog(BaseModel):
    model_config = ConfigDict(populate_by_name=True, arbitrary_types_allowed=True, json_encoders={ObjectId: str})
    
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    title: str
    slug: str
    content: str
    excerpt: str
    featured_image: str
    author: str
    category: str
    tags: List[str] = []
    published: bool = False
    views: int = 0
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# FAQ Models
class FAQCreate(BaseModel):
    question: str = Field(..., min_length=10, max_length=500)
    answer: str = Field(..., min_length=10)
    category: str
    order: int = 0

class FAQ(BaseModel):
    model_config = ConfigDict(populate_by_name=True, arbitrary_types_allowed=True, json_encoders={ObjectId: str})
    
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    question: str
    answer: str
    category: str
    order: int = 0
    published: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Contact Models
class ContactMessage(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., pattern=r"^\+?[1-9]\d{9,14}$")
    subject: str = Field(..., min_length=5, max_length=200)
    message: str = Field(..., min_length=10, max_length=1000)

class Contact(BaseModel):
    model_config = ConfigDict(populate_by_name=True, arbitrary_types_allowed=True, json_encoders={ObjectId: str})
    
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str
    email: EmailStr
    phone: str
    subject: str
    message: str
    status: str = "new"  # new, read, replied
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Testimonial Models
class TestimonialCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    location: str
    rating: int = Field(..., ge=1, le=5)
    comment: str = Field(..., min_length=10, max_length=500)
    image: Optional[str] = None

class Testimonial(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str
    location: str
    rating: int
    comment: str
    image: Optional[str] = None
    approved: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

# Response Models
class MessageResponse(BaseModel):
    message: str
    success: bool = True

class PaginatedResponse(BaseModel):
    data: List[Any]
    total: int
    page: int
    per_page: int
    total_pages: int