"""
Data seeder to populate the database with initial data
"""
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio
import os
from datetime import datetime
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Database connection
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'test_database')
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

# Import after loading env vars
from auth import get_password_hash

async def seed_admin_user():
    """Create admin user if not exists."""
    admin_exists = await db.users.find_one({"email": "admin@thecomfortjourney.com"})
    
    if not admin_exists:
        admin_user = {
            "name": "Admin User",
            "email": "admin@thecomfortjourney.com",
            "phone": "+919876543210",
            "password": get_password_hash("admin123"),
            "role": "admin",
            "is_verified": True,
            "profile": {},
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        
        await db.users.insert_one(admin_user)
        print("✅ Admin user created")
    else:
        print("ℹ️ Admin user already exists")

async def seed_vehicles():
    """Seed vehicles data."""
    vehicles_exist = await db.vehicles.count_documents({})
    
    if vehicles_exist == 0:
        vehicles_data = [
            {
                "name": "Thar Rwd",
                "category": "SUV",
                "image": "https://images.unsplash.com/photo-1563721911289-ada2924d66f1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwyfHxTVVYlMjBjYXJzfGVufDB8fHx8MTc1Mzg5NzU5MHww&ixlib=rb-4.1.0&q=85",
                "images": [],
                "transmission": "Manual",
                "fuel_type": "Diesel",
                "features": "Self-Drive & Without Fuel",
                "ac": True,
                "seating": "4 Persons",
                "location": "Indore (M.P)",
                "pricing": {
                    "half_day": 3000,
                    "full_day": 5000
                },
                "extra_km_rate": "₹7/KM",
                "discount": "10% OFF",
                "available": True,
                "specifications": {
                    "engine": "2.2L Diesel",
                    "mileage": "15 km/l",
                    "top_speed": "155 km/h",
                    "safety_rating": 4
                },
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "name": "XUV 700",
                "category": "SUV",
                "image": "https://images.unsplash.com/photo-1668692753102-a9603d87a1a7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxTVVYlMjBjYXJzfGVufDB8fHx8MTc1Mzg5NzU5MHww&ixlib=rb-4.1.0&q=85",
                "images": [],
                "transmission": "Manual",
                "fuel_type": "Diesel",
                "features": "Self drive & without fuel",
                "ac": True,
                "seating": "7 Person",
                "location": "Indore",
                "pricing": {
                    "daily": 6000
                },
                "extra_km_rate": "₹12/km",
                "discount": "10% OFF",
                "available": True,
                "specifications": {
                    "engine": "2.0L Diesel",
                    "mileage": "14 km/l",
                    "top_speed": "180 km/h",
                    "safety_rating": 5
                },
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "name": "Scorpio N",
                "category": "SUV",
                "image": "https://images.unsplash.com/photo-1529369623266-f5264b696110?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw0fHxjYXIlMjByZW50YWx8ZW58MHx8fHwxNzUzODk3NTgzfDA&ixlib=rb-4.1.0&q=85",
                "images": [],
                "transmission": "Manual",
                "fuel_type": "Diesel",
                "features": "Self-Drive & Without Fuel",
                "ac": True,
                "seating": "7 Person",
                "location": "Indore(MP)",
                "pricing": {
                    "daily": 6000
                },
                "extra_km_rate": "₹12/km",
                "discount": None,
                "available": True,
                "specifications": {
                    "engine": "2.2L Diesel",
                    "mileage": "12 km/l",
                    "top_speed": "170 km/h",
                    "safety_rating": 4
                },
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "name": "Mahindra Scorpio",
                "category": "SUV",
                "image": "https://images.unsplash.com/photo-1565043666747-69f6646db940?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxjYXIlMjByZW50YWx8ZW58MHx8fHwxNzUzODk3NTgzfDA&ixlib=rb-4.1.0&q=85",
                "images": [],
                "transmission": "Manual",
                "fuel_type": "Diesel",
                "features": "Self drive & without fuel",
                "ac": True,
                "seating": "7 Person",
                "location": "Indore",
                "pricing": {
                    "daily": 5500
                },
                "extra_km_rate": "₹10/km",
                "discount": "5%",
                "available": True,
                "specifications": {
                    "engine": "2.2L Diesel",
                    "mileage": "13 km/l",
                    "top_speed": "160 km/h",
                    "safety_rating": 4
                },
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "name": "Toyota Fortuner",
                "category": "Premium SUV",
                "image": "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg",
                "images": [],
                "transmission": "Automatic",
                "fuel_type": "Diesel",
                "features": "Self drive & without fuel",
                "ac": True,
                "seating": "7 Person",
                "location": "Indore",
                "pricing": {
                    "daily": 8000
                },
                "extra_km_rate": "₹15/km",
                "discount": None,
                "available": True,
                "specifications": {
                    "engine": "2.8L Diesel",
                    "mileage": "10 km/l",
                    "top_speed": "190 km/h",
                    "safety_rating": 5
                },
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "name": "Maruti Swift",
                "category": "Hatchback",
                "image": "https://images.pexels.com/photos/3369191/pexels-photo-3369191.jpeg",
                "images": [],
                "transmission": "Manual",
                "fuel_type": "Petrol",
                "features": "Self drive & without fuel",
                "ac": True,
                "seating": "4 Person",
                "location": "Indore",
                "pricing": {
                    "daily": 2500
                },
                "extra_km_rate": "₹8/km",
                "discount": "15% OFF",
                "available": True,
                "specifications": {
                    "engine": "1.2L Petrol",
                    "mileage": "22 km/l",
                    "top_speed": "165 km/h",
                    "safety_rating": 4
                },
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
        ]
        
        await db.vehicles.insert_many(vehicles_data)
        print("✅ Vehicles data seeded")
    else:
        print("ℹ️ Vehicles data already exists")

async def seed_blogs():
    """Seed blog data."""
    blogs_exist = await db.blogs.count_documents({})
    
    if blogs_exist == 0:
        blogs_data = [
            {
                "title": "Top 10 Road Trip Destinations Near Indore",
                "slug": "top-10-road-trip-destinations-near-indore",
                "content": """<p>Indore, the commercial capital of Madhya Pradesh, is surrounded by some of the most beautiful destinations perfect for road trips. Whether you're looking for hill stations, historical sites, or adventure spots, there's something for everyone within a few hours' drive from the city.</p>

<h2>1. Mandu (99 km from Indore)</h2>
<p>Known as the 'City of Joy', Mandu is famous for its Afghan architecture and romantic legends. The drive to Mandu takes you through scenic countryside and offers glimpses of rural Madhya Pradesh.</p>

<h2>2. Omkareshwar (77 km from Indore)</h2>
<p>One of the 12 Jyotirlinga temples, Omkareshwar is situated on an island in the Narmada River. The spiritual atmosphere and beautiful river views make it a perfect weekend getaway.</p>

<h2>3. Ujjain (55 km from Indore)</h2>
<p>One of the seven sacred cities of Hinduism, Ujjain is famous for the Mahakaleshwar temple and the Kumbh Mela. The short drive makes it ideal for a day trip.</p>

<h2>4. Maheshwar (91 km from Indore)</h2>
<p>Located on the banks of the Narmada River, Maheshwar is known for its ghats, temples, and handloom sarees. The town offers a peaceful retreat from city life.</p>

<h2>5. Dhar (60 km from Indore)</h2>
<p>Rich in history and culture, Dhar was once the capital of the Malwa region. Visit the fort, mosque, and experience the local culture and cuisine.</p>

<p>Planning a road trip? Rent a comfortable and reliable car from The Comfort Journey to make your journey memorable and hassle-free!</p>""",
                "excerpt": "Discover the most beautiful road trip destinations within driving distance from Indore. From spiritual sites to historical wonders, explore Madhya Pradesh like never before.",
                "featured_image": "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxyb2FkJTIwdHJpcHxlbnwwfHx8fDE3NTM4OTc1OTV8MA&ixlib=rb-4.1.0&q=85",
                "author": "Travel Team",
                "category": "Travel Guide",
                "tags": ["road trip", "indore", "madhya pradesh", "travel", "destinations"],
                "published": True,
                "views": 0,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "title": "Essential Car Rental Tips for First-Time Renters",
                "slug": "essential-car-rental-tips-first-time-renters",
                "content": """<p>Renting a car for the first time can seem overwhelming, but with the right knowledge and preparation, it can be a smooth and enjoyable experience. Here are some essential tips to help you navigate the car rental process like a pro.</p>

<h2>1. Choose the Right Vehicle</h2>
<p>Consider your needs carefully. Are you traveling alone or with family? Do you need extra luggage space? Are you planning city driving or highway trips? Choose a vehicle that matches your specific requirements.</p>

<h2>2. Understand the Pricing</h2>
<p>Car rental pricing can include various components:</p>
<ul>
<li>Base rental fee</li>
<li>Extra kilometer charges</li>
<li>Fuel costs</li>
<li>Insurance (if opted)</li>
<li>Taxes and additional fees</li>
</ul>

<h2>3. Check the Vehicle Condition</h2>
<p>Before driving off, inspect the car thoroughly:</p>
<ul>
<li>Check for existing damages and document them</li>
<li>Test all lights, indicators, and electrical systems</li>
<li>Ensure all documents are in order</li>
<li>Check fuel level and tire condition</li>
</ul>

<h2>4. Required Documents</h2>
<p>Make sure you have:</p>
<ul>
<li>Valid driving license</li>
<li>Government-issued ID proof</li>
<li>Address proof</li>
<li>Payment method (credit card/cash)</li>
</ul>

<h2>5. Drive Safely and Responsibly</h2>
<p>Remember, you're responsible for the vehicle during the rental period. Follow traffic rules, drive carefully, and report any issues immediately.</p>

<p>At The Comfort Journey, we ensure all our vehicles are well-maintained and ready for your adventure. Contact us for the best car rental experience in Indore!</p>""",
                "excerpt": "New to car rentals? Learn essential tips and tricks to make your first car rental experience smooth and hassle-free.",
                "featured_image": "https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwyfHxyb2FkJTIwdHJpcHxlbnwwfHx8fDE3NTM4OTc1OTV8MA&ixlib=rb-4.1.0&q=85",
                "author": "Customer Service Team",
                "category": "Car Rental Tips",
                "tags": ["car rental", "tips", "first time", "guide", "driving"],
                "published": True,
                "views": 0,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            },
            {
                "title": "Why Self-Drive Car Rentals are Perfect for Family Vacations",
                "slug": "self-drive-car-rentals-perfect-family-vacations",
                "content": """<p>Planning a family vacation? Consider the freedom and flexibility that comes with self-drive car rentals. Here's why more families are choosing to explore destinations at their own pace.</p>

<h2>Complete Freedom and Flexibility</h2>
<p>With a self-drive rental, you're not bound by tour schedules or public transport timings. Stop wherever you want, explore hidden gems, and create your own itinerary. Your family vacation becomes truly yours.</p>

<h2>Cost-Effective for Groups</h2>
<p>When traveling with family, the cost per person for car rentals is often much lower than booking multiple tickets for public transport or hiring private cabs for each journey.</p>

<h2>Comfort and Privacy</h2>
<p>Enjoy the comfort of your own space. Play your favorite music, make impromptu stops, and have personal conversations without worrying about other passengers.</p>

<h2>Safe and Hygienic</h2>
<p>In today's world, having your own vehicle ensures better hygiene standards and reduces contact with crowds, making it safer for your family.</p>

<h2>Luggage Convenience</h2>
<p>No need to worry about luggage restrictions or carrying heavy bags. Pack everything you need and have easy access throughout your journey.</p>

<h2>Educational Opportunities</h2>
<p>Road trips provide excellent learning opportunities for children. They get to see different landscapes, cultures, and local life up close.</p>

<h2>Making Memories</h2>
<p>Some of the best family memories are made during the journey, not just at the destination. Sing songs, play games, and bond over shared experiences on the road.</p>

<p>Ready to plan your next family adventure? Choose from our wide range of family-friendly vehicles at The Comfort Journey and create memories that will last a lifetime!</p>""",
                "excerpt": "Discover why self-drive car rentals are the perfect choice for family vacations, offering freedom, comfort, and unforgettable experiences.",
                "featured_image": "https://images.pexels.com/photos/3369191/pexels-photo-3369191.jpeg",
                "author": "Family Travel Expert",
                "category": "Family Travel",
                "tags": ["family vacation", "self drive", "road trip", "family travel", "car rental"],
                "published": True,
                "views": 0,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
        ]
        
        await db.blogs.insert_many(blogs_data)
        print("✅ Blog data seeded")
    else:
        print("ℹ️ Blog data already exists")

async def seed_faqs():
    """Seed FAQ data."""
    faqs_exist = await db.faqs.count_documents({})
    
    if faqs_exist == 0:
        faqs_data = [
            {
                "question": "What documents do I need to rent a car?",
                "answer": "You need a valid driving license, government-issued ID proof (Aadhar/Passport), address proof, and a payment method. All documents should be original and valid.",
                "category": "Documentation",
                "order": 1,
                "published": True,
                "created_at": datetime.utcnow()
            },
            {
                "question": "What is the minimum age requirement for car rental?",
                "answer": "The minimum age requirement is 21 years for most vehicles. For luxury and premium cars, the minimum age may be 25 years. You should also have a valid driving license for at least 1 year.",
                "category": "Age Requirements",
                "order": 2,
                "published": True,
                "created_at": datetime.utcnow()
            },
            {
                "question": "How is the rental pricing calculated?",
                "answer": "Rental pricing is based on the duration (hourly/daily), vehicle category, and distance covered. Additional charges may apply for extra kilometers beyond the included limit, fuel, tolls, and parking.",
                "category": "Pricing",
                "order": 3,
                "published": True,
                "created_at": datetime.utcnow()
            },
            {
                "question": "Is fuel included in the rental price?",
                "answer": "No, fuel is not included in the rental price. You will receive the vehicle with a certain fuel level and are expected to return it with the same level. Alternatively, you can opt for our fuel service at market rates.",
                "category": "Fuel Policy",
                "order": 4,
                "published": True,
                "created_at": datetime.utcnow()
            },
            {
                "question": "Can I extend my rental period?",
                "answer": "Yes, you can extend your rental period subject to vehicle availability. Please contact us at least 2 hours before your scheduled return time. Extension charges will apply as per our standard rates.",
                "category": "Rental Extensions",
                "order": 5,
                "published": True,
                "created_at": datetime.utcnow()
            },
            {
                "question": "What happens in case of an accident or breakdown?",
                "answer": "In case of an accident, immediately contact the police and our 24/7 helpline. For breakdowns, call our roadside assistance. We provide 24/7 support to ensure your safety and minimize inconvenience.",
                "category": "Emergency Support",
                "order": 6,
                "published": True,
                "created_at": datetime.utcnow()
            },
            {
                "question": "Can I cancel my booking?",
                "answer": "Yes, you can cancel your booking. Cancellation charges may apply based on the time of cancellation. Free cancellation is available if you cancel at least 24 hours before pickup time.",
                "category": "Cancellation Policy",
                "order": 7,
                "published": True,
                "created_at": datetime.utcnow()
            },
            {
                "question": "Do you provide delivery and pickup services?",
                "answer": "Yes, we offer doorstep delivery and pickup services within the city limits. Additional charges may apply based on the location. Airport and railway station pickups are also available.",
                "category": "Delivery Services",
                "order": 8,
                "published": True,
                "created_at": datetime.utcnow()
            }
        ]
        
        await db.faqs.insert_many(faqs_data)
        print("✅ FAQ data seeded")
    else:
        print("ℹ️ FAQ data already exists")

async def seed_testimonials():
    """Seed testimonials data."""
    testimonials_exist = await db.testimonials.count_documents({})
    
    if testimonials_exist == 0:
        testimonials_data = [
            {
                "name": "Rahul Sharma",
                "location": "Mumbai",
                "rating": 5,
                "comment": "Excellent service! The car was in perfect condition and the booking process was seamless. Will definitely recommend The Comfort Journey to my friends and family.",
                "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                "approved": True,
                "created_at": datetime.utcnow()
            },
            {
                "name": "Priya Patel",
                "location": "Delhi",
                "rating": 5,
                "comment": "Amazing experience with The Comfort Journey. The staff was professional, car was clean and well-maintained. Highly recommend for anyone looking for reliable car rentals.",
                "image": "https://images.unsplash.com/photo-1494790108755-2616b612b5b5?w=150&h=150&fit=crop&crop=face",
                "approved": True,
                "created_at": datetime.utcnow()
            },
            {
                "name": "Amit Kumar",
                "location": "Bangalore",
                "rating": 4,
                "comment": "Great cars and professional service. The pickup and drop was on time. Good value for money. Will definitely book again for my next trip to Indore.",
                "image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                "approved": True,
                "created_at": datetime.utcnow()
            },
            {
                "name": "Sneha Agarwal",
                "location": "Pune",
                "rating": 5,
                "comment": "Perfect for our family vacation! The XUV 700 was spacious and comfortable. Customer service was excellent and very responsive to our queries.",
                "image": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
                "approved": True,
                "created_at": datetime.utcnow()
            },
            {
                "name": "Vikash Singh",
                "location": "Indore",
                "rating": 5,
                "comment": "Local resident here and I use The Comfort Journey whenever I need a car for outstation trips. Always satisfied with their service and vehicle quality.",
                "image": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
                "approved": True,
                "created_at": datetime.utcnow()
            },
            {
                "name": "Meera Joshi",
                "location": "Jaipur",
                "rating": 4,
                "comment": "Good experience overall. The car rental process was smooth and transparent. Appreciate the 24/7 customer support. Minor improvement needed in pickup timing.",
                "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
                "approved": True,
                "created_at": datetime.utcnow()
            }
        ]
        
        await db.testimonials.insert_many(testimonials_data)
        print("✅ Testimonials data seeded")
    else:
        print("ℹ️ Testimonials data already exists")

async def main():
    """Run all seed functions."""
    print("🌱 Starting database seeding...")
    
    try:
        await seed_admin_user()
        await seed_vehicles()
        await seed_blogs()
        await seed_faqs()
        await seed_testimonials()
        
        print("✅ Database seeding completed successfully!")
        
    except Exception as e:
        print(f"❌ Error during seeding: {e}")
    
    finally:
        client.close()

if __name__ == "__main__":
    # Load environment variables
    from dotenv import load_dotenv
    load_dotenv()
    
    asyncio.run(main())