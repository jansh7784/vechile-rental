#!/usr/bin/env python3
"""
Comprehensive Backend Testing for The Comfort Journey Car Rental System
Tests all API endpoints including health check, authentication, vehicles, content, and bookings.
"""

import requests
import json
import time
from datetime import datetime, timedelta
from typing import Dict, Any, Optional

class ComfortJourneyAPITester:
    def __init__(self, base_url: str):
        self.base_url = base_url.rstrip('/')
        self.session = requests.Session()
        self.auth_token = None
        self.test_user_data = {
            "name": "Sarah Johnson",
            "email": "sarah.johnson@example.com",
            "phone": "+1234567890",
            "password": "SecurePass123!"
        }
        self.test_results = {
            "health_check": {"passed": 0, "failed": 0, "details": []},
            "authentication": {"passed": 0, "failed": 0, "details": []},
            "vehicles": {"passed": 0, "failed": 0, "details": []},
            "content": {"passed": 0, "failed": 0, "details": []},
            "bookings": {"passed": 0, "failed": 0, "details": []},
            "database": {"passed": 0, "failed": 0, "details": []}
        }
        
    def log_test(self, category: str, test_name: str, passed: bool, details: str = ""):
        """Log test result"""
        if passed:
            self.test_results[category]["passed"] += 1
            status = "✅ PASS"
        else:
            self.test_results[category]["failed"] += 1
            status = "❌ FAIL"
        
        self.test_results[category]["details"].append(f"{status}: {test_name} - {details}")
        print(f"{status}: {test_name} - {details}")

    def make_request(self, method: str, endpoint: str, data: Dict = None, headers: Dict = None) -> Dict[str, Any]:
        """Make HTTP request with error handling"""
        url = f"{self.base_url}{endpoint}"
        
        # Add auth header if token exists
        if self.auth_token and headers is None:
            headers = {"Authorization": f"Bearer {self.auth_token}"}
        elif self.auth_token and headers:
            headers["Authorization"] = f"Bearer {self.auth_token}"
        
        try:
            if method.upper() == "GET":
                response = self.session.get(url, headers=headers, timeout=30)
            elif method.upper() == "POST":
                response = self.session.post(url, json=data, headers=headers, timeout=30)
            elif method.upper() == "PUT":
                response = self.session.put(url, json=data, headers=headers, timeout=30)
            elif method.upper() == "DELETE":
                response = self.session.delete(url, headers=headers, timeout=30)
            else:
                return {"error": f"Unsupported method: {method}"}
            
            return {
                "status_code": response.status_code,
                "data": response.json() if response.content else {},
                "headers": dict(response.headers)
            }
        except requests.exceptions.RequestException as e:
            return {"error": str(e)}
        except json.JSONDecodeError:
            return {"error": "Invalid JSON response", "status_code": response.status_code if 'response' in locals() else 0}

    def test_health_check(self):
        """Test health check and root endpoints"""
        print("\n🔍 Testing Health Check & Connectivity...")
        
        # Test root endpoint
        result = self.make_request("GET", "/api/")
        if result.get("status_code") == 200 and "message" in result.get("data", {}):
            self.log_test("health_check", "Root endpoint", True, "API is running")
        else:
            self.log_test("health_check", "Root endpoint", False, f"Status: {result.get('status_code')}, Error: {result.get('error', 'Unknown')}")
        
        # Test health endpoint
        result = self.make_request("GET", "/api/health")
        if result.get("status_code") == 200:
            data = result.get("data", {})
            if data.get("status") == "healthy" and data.get("database") == "connected":
                self.log_test("health_check", "Health check", True, "All systems operational")
                self.log_test("database", "Database connection", True, "MongoDB connected successfully")
            else:
                self.log_test("health_check", "Health check", False, f"Unhealthy status: {data}")
                self.log_test("database", "Database connection", False, f"DB status: {data.get('database', 'unknown')}")
        else:
            self.log_test("health_check", "Health check", False, f"Status: {result.get('status_code')}, Error: {result.get('error', 'Unknown')}")
            self.log_test("database", "Database connection", False, "Health check failed")

    def test_authentication(self):
        """Test authentication system"""
        print("\n🔐 Testing Authentication System...")
        
        # Test user registration
        result = self.make_request("POST", "/api/auth/register", self.test_user_data)
        if result.get("status_code") == 200:
            data = result.get("data", {})
            if "access_token" in data and "user" in data:
                self.auth_token = data["access_token"]
                self.log_test("authentication", "User registration", True, f"User registered: {data['user'].get('name', 'Unknown')}")
            else:
                self.log_test("authentication", "User registration", False, "Missing token or user data")
        elif result.get("status_code") == 400 and "already registered" in str(result.get("data", {})):
            # User already exists, try login
            login_result = self.make_request("POST", "/api/auth/login", {
                "email": self.test_user_data["email"],
                "password": self.test_user_data["password"]
            })
            if login_result.get("status_code") == 200:
                data = login_result.get("data", {})
                if "access_token" in data:
                    self.auth_token = data["access_token"]
                    self.log_test("authentication", "User registration", True, "User already exists, logged in successfully")
                else:
                    self.log_test("authentication", "User registration", False, "Login failed after registration conflict")
            else:
                self.log_test("authentication", "User registration", False, f"Registration conflict and login failed: {login_result.get('status_code')}")
        else:
            self.log_test("authentication", "User registration", False, f"Status: {result.get('status_code')}, Error: {result.get('error', 'Unknown')}")
        
        # Test user login (if not already logged in)
        if not self.auth_token:
            result = self.make_request("POST", "/api/auth/login", {
                "email": self.test_user_data["email"],
                "password": self.test_user_data["password"]
            })
            if result.get("status_code") == 200:
                data = result.get("data", {})
                if "access_token" in data:
                    self.auth_token = data["access_token"]
                    self.log_test("authentication", "User login", True, "Login successful")
                else:
                    self.log_test("authentication", "User login", False, "Missing access token")
            else:
                self.log_test("authentication", "User login", False, f"Status: {result.get('status_code')}, Error: {result.get('error', 'Unknown')}")
        
        # Test get current user profile
        if self.auth_token:
            result = self.make_request("GET", "/api/auth/me")
            if result.get("status_code") == 200:
                data = result.get("data", {})
                if "email" in data and data["email"] == self.test_user_data["email"]:
                    self.log_test("authentication", "Get user profile", True, f"Profile retrieved: {data.get('name', 'Unknown')}")
                else:
                    self.log_test("authentication", "Get user profile", False, "Profile data mismatch")
            else:
                self.log_test("authentication", "Get user profile", False, f"Status: {result.get('status_code')}, Error: {result.get('error', 'Unknown')}")
        
        # Test invalid credentials
        result = self.make_request("POST", "/api/auth/login", {
            "email": "invalid@example.com",
            "password": "wrongpassword"
        })
        if result.get("status_code") == 401:
            self.log_test("authentication", "Invalid credentials", True, "Correctly rejected invalid login")
        else:
            self.log_test("authentication", "Invalid credentials", False, f"Should reject invalid login, got: {result.get('status_code')}")

    def test_vehicles(self):
        """Test vehicle management endpoints"""
        print("\n🚗 Testing Vehicle Management...")
        
        # Test get all vehicles
        result = self.make_request("GET", "/api/vehicles")
        if result.get("status_code") == 200:
            data = result.get("data", {})
            if "data" in data and isinstance(data["data"], list):
                vehicle_count = len(data["data"])
                self.log_test("vehicles", "Get all vehicles", True, f"Retrieved {vehicle_count} vehicles")
                
                # Store a vehicle ID for individual testing
                self.test_vehicle_id = data["data"][0]["_id"] if data["data"] else None
            else:
                self.log_test("vehicles", "Get all vehicles", False, "Invalid response format")
        else:
            self.log_test("vehicles", "Get all vehicles", False, f"Status: {result.get('status_code')}, Error: {result.get('error', 'Unknown')}")
        
        # Test vehicle filtering
        result = self.make_request("GET", "/api/vehicles?category=SUV&transmission=automatic")
        if result.get("status_code") == 200:
            self.log_test("vehicles", "Vehicle filtering", True, "Filtering works")
        else:
            self.log_test("vehicles", "Vehicle filtering", False, f"Status: {result.get('status_code')}")
        
        # Test pagination
        result = self.make_request("GET", "/api/vehicles?page=1&per_page=5")
        if result.get("status_code") == 200:
            data = result.get("data", {})
            if "page" in data and "per_page" in data:
                self.log_test("vehicles", "Pagination", True, f"Page {data['page']}, {data['per_page']} per page")
            else:
                self.log_test("vehicles", "Pagination", False, "Missing pagination data")
        else:
            self.log_test("vehicles", "Pagination", False, f"Status: {result.get('status_code')}")
        
        # Test individual vehicle retrieval
        if hasattr(self, 'test_vehicle_id') and self.test_vehicle_id:
            result = self.make_request("GET", f"/api/vehicles/{self.test_vehicle_id}")
            if result.get("status_code") == 200:
                data = result.get("data", {})
                if "_id" in data and data["_id"] == self.test_vehicle_id:
                    self.log_test("vehicles", "Get single vehicle", True, f"Retrieved vehicle: {data.get('name', 'Unknown')}")
                else:
                    self.log_test("vehicles", "Get single vehicle", False, "Vehicle ID mismatch")
            else:
                self.log_test("vehicles", "Get single vehicle", False, f"Status: {result.get('status_code')}")
        
        # Test vehicle categories
        result = self.make_request("GET", "/api/vehicles/categories/list")
        if result.get("status_code") == 200:
            data = result.get("data", {})
            if "categories" in data:
                self.log_test("vehicles", "Get categories", True, f"Categories: {len(data['categories'])}")
            else:
                self.log_test("vehicles", "Get categories", False, "Missing categories data")
        else:
            self.log_test("vehicles", "Get categories", False, f"Status: {result.get('status_code')}")
        
        # Test vehicle locations
        result = self.make_request("GET", "/api/vehicles/locations/list")
        if result.get("status_code") == 200:
            data = result.get("data", {})
            if "locations" in data:
                self.log_test("vehicles", "Get locations", True, f"Locations: {len(data['locations'])}")
            else:
                self.log_test("vehicles", "Get locations", False, "Missing locations data")
        else:
            self.log_test("vehicles", "Get locations", False, f"Status: {result.get('status_code')}")

    def test_content_management(self):
        """Test content management endpoints"""
        print("\n📝 Testing Content Management...")
        
        # Test get blogs
        result = self.make_request("GET", "/api/content/blogs")
        if result.get("status_code") == 200:
            data = result.get("data", [])
            if isinstance(data, list):
                self.log_test("content", "Get blogs", True, f"Retrieved {len(data)} blog posts")
            else:
                self.log_test("content", "Get blogs", False, "Invalid response format")
        else:
            self.log_test("content", "Get blogs", False, f"Status: {result.get('status_code')}, Error: {result.get('error', 'Unknown')}")
        
        # Test get FAQs
        result = self.make_request("GET", "/api/content/faqs")
        if result.get("status_code") == 200:
            data = result.get("data", [])
            if isinstance(data, list):
                self.log_test("content", "Get FAQs", True, f"Retrieved {len(data)} FAQs")
            else:
                self.log_test("content", "Get FAQs", False, "Invalid response format")
        else:
            self.log_test("content", "Get FAQs", False, f"Status: {result.get('status_code')}, Error: {result.get('error', 'Unknown')}")
        
        # Test get testimonials
        result = self.make_request("GET", "/api/content/testimonials")
        if result.get("status_code") == 200:
            data = result.get("data", [])
            if isinstance(data, list):
                self.log_test("content", "Get testimonials", True, f"Retrieved {len(data)} testimonials")
            else:
                self.log_test("content", "Get testimonials", False, "Invalid response format")
        else:
            self.log_test("content", "Get testimonials", False, f"Status: {result.get('status_code')}, Error: {result.get('error', 'Unknown')}")
        
        # Test contact form submission
        contact_data = {
            "name": "John Smith",
            "email": "john.smith@example.com",
            "phone": "+1987654321",
            "subject": "Inquiry about car rental",
            "message": "I would like to know more about your premium car rental services and availability for next month."
        }
        result = self.make_request("POST", "/api/content/contact", contact_data)
        if result.get("status_code") == 200:
            data = result.get("data", {})
            if "message" in data and "success" in str(data).lower():
                self.log_test("content", "Contact form submission", True, "Contact message submitted successfully")
            else:
                self.log_test("content", "Contact form submission", False, "Unexpected response format")
        else:
            self.log_test("content", "Contact form submission", False, f"Status: {result.get('status_code')}, Error: {result.get('error', 'Unknown')}")

    def test_bookings(self):
        """Test booking system endpoints"""
        print("\n📅 Testing Booking System...")
        
        if not self.auth_token:
            self.log_test("bookings", "Authentication required", False, "No auth token available for booking tests")
            return
        
        # Test get user bookings
        result = self.make_request("GET", "/api/bookings/")
        if result.get("status_code") == 200:
            data = result.get("data", [])
            if isinstance(data, list):
                self.log_test("bookings", "Get user bookings", True, f"Retrieved {len(data)} bookings")
            else:
                self.log_test("bookings", "Get user bookings", False, "Invalid response format")
        else:
            self.log_test("bookings", "Get user bookings", False, f"Status: {result.get('status_code')}, Error: {result.get('error', 'Unknown')}")
        
        # Test create booking (if we have a vehicle ID)
        if hasattr(self, 'test_vehicle_id') and self.test_vehicle_id:
            pickup_date = datetime.now() + timedelta(days=7)
            return_date = pickup_date + timedelta(days=3)
            
            booking_data = {
                "vehicle_id": self.test_vehicle_id,
                "pickup_date": pickup_date.isoformat(),
                "return_date": return_date.isoformat(),
                "pickup_time": "10:00",
                "return_time": "18:00",
                "pickup_location": "Downtown Office",
                "special_requests": "Please ensure the vehicle is clean and fueled"
            }
            
            result = self.make_request("POST", "/api/bookings", booking_data)
            if result.get("status_code") == 200:
                data = result.get("data", {})
                if "_id" in data and "booking_status" in data:
                    self.test_booking_id = data["_id"]
                    self.log_test("bookings", "Create booking", True, f"Booking created: {data['_id']}")
                else:
                    self.log_test("bookings", "Create booking", False, "Missing booking data")
            else:
                self.log_test("bookings", "Create booking", False, f"Status: {result.get('status_code')}, Error: {result.get('error', 'Unknown')}")

    def test_error_handling(self):
        """Test error handling for invalid requests"""
        print("\n⚠️  Testing Error Handling...")
        
        # Test invalid endpoint
        result = self.make_request("GET", "/api/nonexistent")
        if result.get("status_code") == 404:
            self.log_test("health_check", "Invalid endpoint", True, "Correctly returns 404")
        else:
            self.log_test("health_check", "Invalid endpoint", False, f"Expected 404, got: {result.get('status_code')}")
        
        # Test malformed request
        result = self.make_request("POST", "/api/auth/register", {"invalid": "data"})
        if result.get("status_code") in [400, 422]:
            self.log_test("authentication", "Malformed request", True, "Correctly rejects invalid data")
        else:
            self.log_test("authentication", "Malformed request", False, f"Expected 400/422, got: {result.get('status_code')}")
        
        # Test unauthorized access
        old_token = self.auth_token
        self.auth_token = "invalid_token"
        result = self.make_request("GET", "/api/auth/me")
        if result.get("status_code") == 401:
            self.log_test("authentication", "Unauthorized access", True, "Correctly rejects invalid token")
        else:
            self.log_test("authentication", "Unauthorized access", False, f"Expected 401, got: {result.get('status_code')}")
        
        # Restore valid token
        self.auth_token = old_token

    def run_all_tests(self):
        """Run all test suites"""
        print("🚀 Starting Comprehensive Backend Testing for The Comfort Journey")
        print(f"🌐 Testing API at: {self.base_url}")
        print("=" * 80)
        
        start_time = time.time()
        
        # Run test suites
        self.test_health_check()
        self.test_authentication()
        self.test_vehicles()
        self.test_content_management()
        self.test_bookings()
        self.test_error_handling()
        
        end_time = time.time()
        
        # Print summary
        print("\n" + "=" * 80)
        print("📊 TEST SUMMARY")
        print("=" * 80)
        
        total_passed = 0
        total_failed = 0
        
        for category, results in self.test_results.items():
            passed = results["passed"]
            failed = results["failed"]
            total_passed += passed
            total_failed += failed
            
            status = "✅" if failed == 0 else "❌"
            print(f"{status} {category.upper()}: {passed} passed, {failed} failed")
            
            # Print failed test details
            if failed > 0:
                for detail in results["details"]:
                    if "❌ FAIL" in detail:
                        print(f"   {detail}")
        
        print(f"\n🎯 OVERALL: {total_passed} passed, {total_failed} failed")
        print(f"⏱️  Total time: {end_time - start_time:.2f} seconds")
        
        if total_failed == 0:
            print("🎉 ALL TESTS PASSED! Backend is working correctly.")
        else:
            print(f"⚠️  {total_failed} tests failed. Please review the issues above.")
        
        return {
            "total_passed": total_passed,
            "total_failed": total_failed,
            "categories": self.test_results,
            "duration": end_time - start_time
        }

def main():
    """Main function to run tests"""
    # Get backend URL from environment or use default
    backend_url = "https://abf87d13-230c-4b15-99de-dfcef446723c.preview.emergentagent.com"
    
    print(f"Backend URL: {backend_url}")
    
    # Initialize tester
    tester = ComfortJourneyAPITester(backend_url)
    
    # Run all tests
    results = tester.run_all_tests()
    
    return results

if __name__ == "__main__":
    main()