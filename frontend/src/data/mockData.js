// Mock data for The Comfort Journey car rental clone

export const vehicles = [
  {
    id: 1,
    name: "Thar Rwd",
    image: "https://images.unsplash.com/photo-1563721911289-ada2924d66f1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwyfHxTVVYlMjBjYXJzfGVufDB8fHx8MTc1Mzg5NzU5MHww&ixlib=rb-4.1.0&q=85",
    transmission: "Manual",
    fuelType: "Diesel",
    features: "Self-Drive & Without Fuel",
    ac: true,
    seating: "4 Persons",
    location: "Indore (M.P)",
    pricing: {
      halfDay: 3000,
      fullDay: 5000
    },
    extraKmRate: "₹7/KM",
    discount: "10% OFF",
    category: "SUV",
    available: true
  },
  {
    id: 2,
    name: "XUV 700",
    image: "https://images.unsplash.com/photo-1668692753102-a9603d87a1a7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDF8MHwxfHNlYXJjaHwxfHxTVVYlMjBjYXJzfGVufDB8fHx8MTc1Mzg5NzU5MHww&ixlib=rb-4.1.0&q=85",
    transmission: "Manual",
    fuelType: "Diesel",
    features: "Self drive & without fuel",
    ac: true,
    seating: "7 Person",
    location: "Indore",
    pricing: {
      daily: 6000
    },
    extraKmRate: "₹12/km",
    discount: "10% OFF",
    category: "SUV",
    available: true
  },
  {
    id: 3,
    name: "Scorpio N",
    image: "https://images.unsplash.com/photo-1529369623266-f5264b696110?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHw0fHxjYXIlMjByZW50YWx8ZW58MHx8fHwxNzUzODk3NTgzfDA&ixlib=rb-4.1.0&q=85",
    transmission: "Manual",
    fuelType: "Diesel",
    features: "Self-Drive & Without Fuel",
    ac: true,
    seating: "7 Person",
    location: "Indore(MP)",
    pricing: {
      daily: 6000
    },
    extraKmRate: "₹12/km",
    discount: null,
    category: "SUV",
    available: true
  },
  {
    id: 4,
    name: "Mahindra Scorpio",
    image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxjYXIlMjByZW50YWx8ZW58MHx8fHwxNzUzODk3NTgzfDA&ixlib=rb-4.1.0&q=85",
    transmission: "Manual",
    fuelType: "Diesel",
    features: "Self drive & without fuel",
    ac: true,
    seating: "7 Person",
    location: "Indore",
    pricing: {
      daily: 5500
    },
    extraKmRate: "₹10/km",
    discount: "5%",
    category: "SUV",
    available: true
  },
  {
    id: 5,
    name: "Toyota Fortuner",
    image: "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg",
    transmission: "Automatic",
    fuelType: "Diesel",
    features: "Self drive & without fuel",
    ac: true,
    seating: "7 Person",
    location: "Indore",
    pricing: {
      daily: 8000
    },
    extraKmRate: "₹15/km",
    discount: null,
    category: "Premium SUV",
    available: true
  },
  {
    id: 6,
    name: "Maruti Swift",
    image: "https://images.pexels.com/photos/3369191/pexels-photo-3369191.jpeg",
    transmission: "Manual",
    fuelType: "Petrol",
    features: "Self drive & without fuel",
    ac: true,
    seating: "4 Person",
    location: "Indore",
    pricing: {
      daily: 2500
    },
    extraKmRate: "₹8/km",
    discount: "15% OFF",
    category: "Hatchback",
    available: true
  }
];

export const heroSlides = [
  {
    id: 1,
    title: "Explore Without Limits",
    subtitle: "Travel in comfort and style across the city and beyond.",
    image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwxfHxyb2FkJTIwdHJpcHxlbnwwfHx8fDE3NTM4OTc1OTV8MA&ixlib=rb-4.1.0&q=85",
    ctaText: "Book Now"
  },
  {
    id: 2,
    title: "Your Journey Starts Here",
    subtitle: "Experience premium car rental services with unmatched comfort.",
    image: "https://images.unsplash.com/photo-1468818438311-4bab781ab9b8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzZ8MHwxfHNlYXJjaHwyfHxyb2FkJTIwdHJpcHxlbnwwfHx8fDE3NTM4OTc1OTV8MA&ixlib=rb-4.1.0&q=85",
    ctaText: "Book Now"
  }
];

export const specialOffers = [
  {
    id: 1,
    title: "SPECIAL OFFER",
    discount: "10% OFF",
    validUntil: "Limited Time",
    type: "limited"
  },
  {
    id: 2,
    title: "SPECIAL OFFER", 
    discount: "10% OFF",
    validUntil: "This Week",
    type: "weekly"
  }
];

export const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    location: "Mumbai",
    rating: 5,
    comment: "Excellent service! The car was in perfect condition and the booking process was seamless.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Priya Patel",
    location: "Delhi",
    rating: 5,
    comment: "Amazing experience with The Comfort Journey. Highly recommend for anyone looking for reliable car rentals.",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b5b5?w=150&h=150&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Amit Kumar",
    location: "Bangalore",
    rating: 4,
    comment: "Great cars and professional service. Will definitely book again for my next trip.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  }
];

export const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "FAQs", href: "/faqs" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" }
];

export const features = [
  {
    icon: "Car",
    title: "Wide Selection",
    description: "Choose from our extensive fleet of well-maintained vehicles"
  },
  {
    icon: "Shield",
    title: "Safe & Secure",
    description: "All vehicles are regularly serviced and safety checked"
  },
  {
    icon: "Clock",
    title: "24/7 Support",
    description: "Round-the-clock customer support for your convenience"
  },
  {
    icon: "MapPin",
    title: "Multiple Locations",
    description: "Pick up and drop off at convenient locations across the city"
  }
];

// Mock user for authentication testing
export const mockUser = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  phone: "+91 9876543210",
  bookings: []
};

// Mock booking data
export const mockBookings = [
  {
    id: 1,
    vehicleId: 1,
    userId: 1,
    startDate: "2025-01-15",
    endDate: "2025-01-17",
    totalAmount: 10000,
    status: "confirmed",
    createdAt: "2025-01-10"
  }
];