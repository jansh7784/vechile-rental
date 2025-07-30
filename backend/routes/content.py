from fastapi import APIRouter, HTTPException, status, Depends, Query
from typing import List, Optional
from motor.motor_asyncio import AsyncIOMotorClient
from models import (
    Blog, BlogCreate, FAQ, FAQCreate, Contact, ContactMessage, 
    Testimonial, TestimonialCreate, MessageResponse
)
from auth import get_current_active_user, get_admin_user, User
from datetime import datetime
import os
from bson import ObjectId
import re

router = APIRouter(prefix="/content", tags=["Content Management"])

# Database connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'test_database')
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

def create_slug(title: str) -> str:
    """Create URL-friendly slug from title."""
    slug = re.sub(r'[^\w\s-]', '', title.lower())
    slug = re.sub(r'[-\s]+', '-', slug)
    return slug

# Blog endpoints
@router.get("/blogs", response_model=List[Blog])
async def get_blogs(
    page: int = Query(1, ge=1),
    per_page: int = Query(10, ge=1, le=50),
    category: Optional[str] = None,
    published_only: bool = True
):
    """Get all blog posts."""
    filter_query = {}
    
    if published_only:
        filter_query["published"] = True
    
    if category:
        filter_query["category"] = {"$regex": category, "$options": "i"}
    
    skip = (page - 1) * per_page
    
    blogs_docs = await db.blogs.find(filter_query).sort("created_at", -1).skip(skip).limit(per_page).to_list(length=per_page)
    blogs = [Blog(**doc) for doc in blogs_docs]
    
    return blogs

@router.get("/blogs/{blog_id}", response_model=Blog)
async def get_blog(blog_id: str):
    """Get single blog post."""
    try:
        blog_doc = await db.blogs.find_one({"_id": ObjectId(blog_id), "published": True})
        if not blog_doc:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Blog post not found"
            )
        
        # Increment view count
        await db.blogs.update_one(
            {"_id": ObjectId(blog_id)},
            {"$inc": {"views": 1}}
        )
        
        blog_doc["views"] = blog_doc.get("views", 0) + 1
        return Blog(**blog_doc)
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid blog ID"
        )

@router.get("/blogs/slug/{slug}", response_model=Blog)
async def get_blog_by_slug(slug: str):
    """Get blog post by slug."""
    blog_doc = await db.blogs.find_one({"slug": slug, "published": True})
    if not blog_doc:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Blog post not found"
        )
    
    # Increment view count
    await db.blogs.update_one(
        {"slug": slug},
        {"$inc": {"views": 1}}
    )
    
    blog_doc["views"] = blog_doc.get("views", 0) + 1
    return Blog(**blog_doc)

@router.post("/blogs", response_model=Blog)
async def create_blog(
    blog_data: BlogCreate,
    current_user: User = Depends(get_admin_user)
):
    """Create new blog post (admin only)."""
    blog_dict = blog_data.dict()
    blog_dict["slug"] = create_slug(blog_data.title)
    blog_dict["views"] = 0
    blog_dict["created_at"] = datetime.utcnow()
    blog_dict["updated_at"] = datetime.utcnow()
    
    # Ensure unique slug
    existing_slug = await db.blogs.find_one({"slug": blog_dict["slug"]})
    if existing_slug:
        blog_dict["slug"] = f"{blog_dict['slug']}-{int(datetime.utcnow().timestamp())}"
    
    result = await db.blogs.insert_one(blog_dict)
    blog_dict["_id"] = result.inserted_id
    
    return Blog(**blog_dict)

# FAQ endpoints
@router.get("/faqs", response_model=List[FAQ])
async def get_faqs(category: Optional[str] = None):
    """Get all FAQs."""
    filter_query = {"published": True}
    
    if category:
        filter_query["category"] = {"$regex": category, "$options": "i"}
    
    faqs_docs = await db.faqs.find(filter_query).sort("order", 1).to_list(length=None)
    faqs = [FAQ(**doc) for doc in faqs_docs]
    
    return faqs

@router.post("/faqs", response_model=FAQ)
async def create_faq(
    faq_data: FAQCreate,
    current_user: User = Depends(get_admin_user)
):
    """Create new FAQ (admin only)."""
    faq_dict = faq_data.dict()
    faq_dict["published"] = True
    faq_dict["created_at"] = datetime.utcnow()
    
    result = await db.faqs.insert_one(faq_dict)
    faq_dict["_id"] = result.inserted_id
    
    return FAQ(**faq_dict)

@router.get("/faq-categories")
async def get_faq_categories():
    """Get all FAQ categories."""
    categories = await db.faqs.distinct("category", {"published": True})
    return {"categories": categories}

# Contact endpoints
@router.post("/contact", response_model=MessageResponse)
async def submit_contact_message(contact_data: ContactMessage):
    """Submit contact form message."""
    contact_dict = contact_data.dict()
    contact_dict["status"] = "new"
    contact_dict["created_at"] = datetime.utcnow()
    
    await db.contacts.insert_one(contact_dict)
    
    # TODO: Send email notification to admin
    
    return MessageResponse(message="Thank you for your message. We'll get back to you soon!")

@router.get("/contact/messages")
async def get_contact_messages(
    current_user: User = Depends(get_admin_user),
    status_filter: Optional[str] = None
):
    """Get all contact messages (admin only)."""
    filter_query = {}
    
    if status_filter:
        filter_query["status"] = status_filter
    
    messages_docs = await db.contacts.find(filter_query).sort("created_at", -1).to_list(length=None)
    messages = [Contact(**doc) for doc in messages_docs]
    
    return messages

# Testimonial endpoints
@router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    """Get approved testimonials."""
    testimonials_docs = await db.testimonials.find({"approved": True}).sort("created_at", -1).to_list(length=None)
    testimonials = [Testimonial(**doc) for doc in testimonials_docs]
    
    return testimonials

@router.post("/testimonials", response_model=MessageResponse)
async def submit_testimonial(testimonial_data: TestimonialCreate):
    """Submit new testimonial."""
    testimonial_dict = testimonial_data.dict()
    testimonial_dict["approved"] = False  # Requires admin approval
    testimonial_dict["created_at"] = datetime.utcnow()
    
    await db.testimonials.insert_one(testimonial_dict)
    
    return MessageResponse(message="Thank you for your testimonial! It will be reviewed and published soon.")

@router.get("/admin/testimonials")
async def get_all_testimonials(current_user: User = Depends(get_admin_user)):
    """Get all testimonials including pending (admin only)."""
    testimonials_docs = await db.testimonials.find({}).sort("created_at", -1).to_list(length=None)
    testimonials = [Testimonial(**doc) for doc in testimonials_docs]
    
    return testimonials

@router.put("/admin/testimonials/{testimonial_id}/approve")
async def approve_testimonial(
    testimonial_id: str,
    current_user: User = Depends(get_admin_user)
):
    """Approve testimonial (admin only)."""
    try:
        result = await db.testimonials.update_one(
            {"_id": ObjectId(testimonial_id)},
            {"$set": {"approved": True}}
        )
        
        if result.modified_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Testimonial not found"
            )
        
        return MessageResponse(message="Testimonial approved successfully")
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid testimonial ID"
        )

# Analytics endpoints
@router.get("/admin/analytics")
async def get_content_analytics(current_user: User = Depends(get_admin_user)):
    """Get content analytics (admin only)."""
    
    # Blog stats
    total_blogs = await db.blogs.count_documents({})
    published_blogs = await db.blogs.count_documents({"published": True})
    total_blog_views = await db.blogs.aggregate([
        {"$group": {"_id": None, "total_views": {"$sum": "$views"}}}
    ]).to_list(length=1)
    
    # Contact stats
    total_contacts = await db.contacts.count_documents({})
    new_contacts = await db.contacts.count_documents({"status": "new"})
    
    # Testimonial stats
    total_testimonials = await db.testimonials.count_documents({})
    approved_testimonials = await db.testimonials.count_documents({"approved": True})
    pending_testimonials = await db.testimonials.count_documents({"approved": False})
    
    # FAQ stats
    total_faqs = await db.faqs.count_documents({})
    
    return {
        "blogs": {
            "total": total_blogs,
            "published": published_blogs,
            "total_views": total_blog_views[0]["total_views"] if total_blog_views else 0
        },
        "contacts": {
            "total": total_contacts,
            "new": new_contacts
        },
        "testimonials": {
            "total": total_testimonials,
            "approved": approved_testimonials,
            "pending": pending_testimonials
        },
        "faqs": {
            "total": total_faqs
        }
    }