# The Comfort Journey - Backend Integration Contracts

## API Contracts

### Authentication Endpoints
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
GET /api/auth/me
PUT /api/auth/profile
```

### Vehicle Management
```
GET /api/vehicles - Get all vehicles with filters
GET /api/vehicles/:id - Get single vehicle
POST /api/vehicles - Create vehicle (admin)
PUT /api/vehicles/:id - Update vehicle (admin)
DELETE /api/vehicles/:id - Delete vehicle (admin)
```

### Booking System
```
POST /api/bookings - Create new booking
GET /api/bookings - Get user bookings
GET /api/bookings/:id - Get single booking
PUT /api/bookings/:id - Update booking
DELETE /api/bookings/:id - Cancel booking
GET /api/admin/bookings - Get all bookings (admin)
```

### Content Management
```
GET /api/blogs - Get all blog posts
GET /api/blogs/:id - Get single blog post
POST /api/blogs - Create blog post (admin)
GET /api/faqs - Get all FAQs
POST /api/contact - Submit contact form
GET /api/testimonials - Get testimonials
```

### Payment Integration
```
POST /api/payments/create-intent - Create payment intent
POST /api/payments/confirm - Confirm payment
GET /api/payments/history - Get payment history
```

## Mock Data Mapping

### Current Frontend Mock Data → Backend Models

**vehicles (mockData.js) → Vehicle Model:**
- All vehicle data with images, specs, pricing
- Add availability calendar
- Add admin management fields

**mockUser → User Model:**
- User authentication data
- Profile information
- Booking history
- Payment methods

**mockBookings → Booking Model:**
- Booking details with vehicle reference
- Payment status and history
- Pick-up/drop-off locations and times

**testimonials → Testimonial Model:**
- Customer reviews and ratings
- Admin approval system

## Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  phone: String,
  password: String (hashed),
  role: String (user/admin),
  isVerified: Boolean,
  profile: {
    avatar: String,
    address: Object,
    drivingLicense: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Vehicles Collection
```javascript
{
  _id: ObjectId,
  name: String,
  category: String,
  image: String,
  images: [String],
  transmission: String,
  fuelType: String,
  features: String,
  ac: Boolean,
  seating: String,
  location: String,
  pricing: {
    daily: Number,
    halfDay: Number,
    fullDay: Number
  },
  extraKmRate: String,
  discount: String,
  available: Boolean,
  specifications: Object,
  createdAt: Date,
  updatedAt: Date
}
```

### Bookings Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId,
  vehicleId: ObjectId,
  pickupDate: Date,
  returnDate: Date,
  pickupTime: String,
  returnTime: String,
  pickupLocation: String,
  specialRequests: String,
  totalAmount: Number,
  paymentStatus: String,
  bookingStatus: String,
  paymentDetails: Object,
  createdAt: Date,
  updatedAt: Date
}
```

### Blogs Collection
```javascript
{
  _id: ObjectId,
  title: String,
  slug: String,
  content: String,
  excerpt: String,
  featuredImage: String,
  author: String,
  category: String,
  tags: [String],
  published: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### FAQs Collection
```javascript
{
  _id: ObjectId,
  question: String,
  answer: String,
  category: String,
  order: Number,
  published: Boolean
}
```

### Contact Messages Collection
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
  status: String,
  createdAt: Date
}
```

## Frontend-Backend Integration Plan

### Phase 1: Authentication System
1. Replace mock login with real JWT authentication
2. Implement registration with email verification
3. Add password reset functionality
4. Update AuthContext to use real API calls

### Phase 2: Vehicle Management
1. Replace mockData.js vehicles with API calls
2. Implement real-time availability checking
3. Add vehicle image upload for admin
4. Integrate search and filtering with backend

### Phase 3: Booking System
1. Replace mock booking flow with real API
2. Implement payment integration (Razorpay/Stripe)
3. Add booking confirmation emails
4. Create booking management dashboard

### Phase 4: Content Pages
1. Create dynamic blog system with admin CMS
2. Build contact form with email notifications
3. Implement FAQ management system
4. Add testimonial approval workflow

### Phase 5: Admin Dashboard
1. Create admin authentication
2. Build vehicle management interface
3. Add booking management system
4. Implement content management tools

## Security Implementation
- JWT token authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting on API endpoints
- CORS configuration
- File upload validation

## Payment Integration
- Razorpay for Indian market
- Stripe as backup option
- Secure payment flow
- Payment history tracking
- Refund management

## Email System
- Registration confirmation
- Booking confirmations
- Payment receipts
- Contact form notifications
- Password reset emails

## File Upload System
- Vehicle image management
- User avatar uploads
- Document uploads (driving license)
- Image optimization and resizing

This contract ensures seamless integration between the existing frontend and the new backend system while maintaining all current functionality and adding robust backend features.