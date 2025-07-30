import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from '../hooks/use-toast';
import { 
  CalendarIcon, 
  Clock, 
  MapPin, 
  Car, 
  Users, 
  Fuel,
  CreditCard,
  CheckCircle
} from 'lucide-react';
import { format } from 'date-fns';

const BookingModal = ({ isOpen, onClose, vehicle, user }) => {
  const [bookingStep, setBookingStep] = useState(1); // 1: Details, 2: Payment, 3: Confirmation
  const [pickupDate, setPickupDate] = useState();
  const [returnDate, setReturnDate] = useState();
  const [pickupTime, setPickupTime] = useState('');
  const [returnTime, setReturnTime] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
    '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const pickupLocations = [
    'Airport Terminal',
    'Railway Station',
    'Hotel Pickup',
    'Office Location - Indore',
    'Home Pickup (Extra Charges Apply)'
  ];

  const calculateTotal = () => {
    if (!pickupDate || !returnDate || !vehicle) return 0;
    
    const days = Math.ceil((returnDate - pickupDate) / (1000 * 60 * 60 * 24));
    const basePrice = vehicle.pricing.daily || vehicle.pricing.fullDay || 3000;
    const subtotal = basePrice * Math.max(1, days);
    const tax = subtotal * 0.18; // 18% GST
    return { subtotal, tax, total: subtotal + tax, days };
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Please login first",
        description: "You need to be logged in to make a booking",
        variant: "destructive",
      });
      return;
    }

    if (!pickupDate || !returnDate || !pickupTime || !returnTime || !pickupLocation) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Mock booking process
    setTimeout(() => {
      setBookingStep(2); // Move to payment step
      setIsLoading(false);
    }, 1000);
  };

  const handlePayment = async () => {
    setIsLoading(true);
    
    // Mock payment process
    setTimeout(() => {
      setBookingStep(3); // Move to confirmation
      setIsLoading(false);
      toast({
        title: "Booking Confirmed!",
        description: "Your car rental has been successfully booked",
      });
    }, 2000);
  };

  const resetForm = () => {
    setBookingStep(1);
    setPickupDate(undefined);
    setReturnDate(undefined);
    setPickupTime('');
    setReturnTime('');
    setPickupLocation('');
    setSpecialRequests('');
    setPaymentMethod('card');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!vehicle) return null;

  const pricing = calculateTotal();

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {bookingStep === 1 && 'Book Your Vehicle'}
            {bookingStep === 2 && 'Payment Details'}
            {bookingStep === 3 && 'Booking Confirmed'}
          </DialogTitle>
        </DialogHeader>

        {/* Step Indicator */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step <= bookingStep 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step < bookingStep ? <CheckCircle className="h-4 w-4" /> : step}
              </div>
              {step < 3 && (
                <div className={`w-12 h-0.5 ${
                  step < bookingStep ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Vehicle Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-4">
            <img 
              src={vehicle.image} 
              alt={vehicle.name}
              className="w-20 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{vehicle.name}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{vehicle.seating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Fuel className="h-4 w-4" />
                  <span>{vehicle.fuelType}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Car className="h-4 w-4" />
                  <span>{vehicle.transmission}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {bookingStep === 1 && (
          <form onSubmit={handleBookingSubmit} className="space-y-6">
            {/* Date Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Pickup Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {pickupDate ? format(pickupDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={pickupDate}
                      onSelect={setPickupDate}
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label>Return Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {returnDate ? format(returnDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={returnDate}
                      onSelect={setReturnDate}
                      disabled={(date) => date < pickupDate}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Time Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Pickup Time *</Label>
                <Select value={pickupTime} onValueChange={setPickupTime}>
                  <SelectTrigger>
                    <Clock className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Return Time *</Label>
                <Select value={returnTime} onValueChange={setReturnTime}>
                  <SelectTrigger>
                    <Clock className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Pickup Location */}
            <div>
              <Label>Pickup Location *</Label>
              <Select value={pickupLocation} onValueChange={setPickupLocation}>
                <SelectTrigger>
                  <MapPin className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Select pickup location" />
                </SelectTrigger>
                <SelectContent>
                  {pickupLocations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Special Requests */}
            <div>
              <Label>Special Requests (Optional)</Label>
              <Textarea
                placeholder="Any special requirements or requests..."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                rows={3}
              />
            </div>

            {/* Price Summary */}
            {pickupDate && returnDate && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">Price Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Rental ({pricing.days} day{pricing.days > 1 ? 's' : ''})</span>
                    <span>₹{pricing.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span>₹{pricing.tax.toLocaleString()}</span>
                  </div>
                  <div className="border-t pt-1 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{pricing.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Processing...' : 'Continue to Payment'}
            </Button>
          </form>
        )}

        {bookingStep === 2 && (
          <div className="space-y-6">
            {/* Payment Method Selection */}
            <div>
              <Label className="text-base font-semibold mb-4 block">Select Payment Method</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
                  { id: 'upi', label: 'UPI Payment', icon: CreditCard },
                  { id: 'wallet', label: 'Digital Wallet', icon: CreditCard }
                ].map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 border rounded-lg flex flex-col items-center space-y-2 ${
                      paymentMethod === method.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <method.icon className="h-6 w-6" />
                    <span className="text-sm font-medium">{method.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Form */}
            {paymentMethod === 'card' && (
              <div className="space-y-4">
                <div>
                  <Label>Card Number</Label>
                  <Input placeholder="1234 5678 9012 3456" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Expiry Date</Label>
                    <Input placeholder="MM/YY" />
                  </div>
                  <div>
                    <Label>CVV</Label>
                    <Input placeholder="123" />
                  </div>
                </div>
                <div>
                  <Label>Cardholder Name</Label>
                  <Input placeholder="John Doe" />
                </div>
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold mb-3">Order Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>{vehicle.name}</span>
                  <span>₹{pricing.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (18%)</span>
                  <span>₹{pricing.tax.toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold text-base">
                  <span>Total Amount</span>
                  <span>₹{pricing.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setBookingStep(1)}
                className="flex-1"
              >
                Back
              </Button>
              <Button
                onClick={handlePayment}
                disabled={isLoading}
                className="flex-1"
              >
                {isLoading ? 'Processing Payment...' : `Pay ₹${pricing.total.toLocaleString()}`}
              </Button>
            </div>
          </div>
        )}

        {bookingStep === 3 && (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-green-600 mb-2">
                Booking Confirmed!
              </h3>
              <p className="text-gray-600">
                Your booking has been confirmed. You will receive a confirmation email shortly.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <h4 className="font-semibold mb-3">Booking Details</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Booking ID:</span>
                  <span className="font-mono">TCJ-{Date.now().toString().slice(-6)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Vehicle:</span>
                  <span>{vehicle.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pickup:</span>
                  <span>{pickupDate && format(pickupDate, "PP")} at {pickupTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Return:</span>
                  <span>{returnDate && format(returnDate, "PP")} at {returnTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span>{pickupLocation}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total Paid:</span>
                  <span>₹{pricing.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button onClick={handleClose} className="w-full">
                Done
              </Button>
              <Button variant="outline" className="w-full">
                Download Receipt
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;