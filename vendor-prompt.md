Create a comprehensive vendor-side interface for a surprise bag app. The vendor portal should be a complete MVP with simulated API calls and realistic interactions.

Design System & Aesthetics
Use the existing treasure hunt theme with gradient backgrounds (bg-gradient-subtle)
Include smooth animations using animate-fade-in, hover-scale, and pulse effects

Data Structure & Mock Data
Vendor Profile Interface:

interface VendorProfile {
id: string;
businessId: string;
username: string;
password: string;
businessName: string;
ownerName: string;
email: string;
phone: string;
joinDate: string;
subscription: 'free' | 'premium';
settings: {
notifications: boolean;
autoConfirm: boolean;
closedDays: string[];
};
}
Vendor Analytics Interface:

interface VendorAnalytics {
businessId: string;
thisWeek: { bagsCreated: number; bagsSold: number; revenue: number; wasteReduced: number; customers: number };
thisMonth: { bagsCreated: number; bagsSold: number; revenue: number; wasteReduced: number; customers: number };
peakHours: Array<{ hour: string; orders: number }>;
topCustomers: Array<{ name: string; orders: number; value: number }>;
}
Vendor Orders Interface:

interface VendorOrder extends Order {
customerName: string;
customerPhone: string;
pickupCode: string;
specialRequests?: string;
customerArrived: boolean;
verificationRequired: boolean;
}
Application Architecture
Main Vendor App Component (VendorApp.tsx):
State management for current vendor (useState)
Current page navigation state
Login/logout handlers
Conditional rendering: login screen vs dashboard
Layout: sidebar navigation + main content area
Route handling without React Router (internal state-based navigation)
Navigation Structure:
Dashboard - Overview and quick actions
Bags - Manage surprise bags and inventory
Orders - Customer orders and pickup verification
Analytics - Business performance metrics
Profile - Business settings and account management
Component Specifications

1. VendorLogin Component:
   Clean login form with business-style branding
   Mock authentication with realistic loading states (1.5s delay)
   Error handling for invalid credentials
   Demo accounts display for easy testing
   Success animation and smooth transition to dashboard
   Demo Accounts:

goldencrust / baker123 (Golden Crust Bakery - Premium)
freshmarket / fresh456 (Fresh Market Co. - Free)
bellas / italian789 (Bella's Italian Kitchen - Premium)
morningbrew / coffee000 (Morning Brew Cafe - Free) 2. VendorNavigation Component:
Desktop: Fixed sidebar with business branding
Mobile: Collapsible hamburger menu
Active page highlighting with gradient backgrounds
Badge notifications for pending pickups
Real-time customer arrival alerts
Smooth hover animations and transitions 3. VendorDashboard Component:
Welcome message with owner name
Key metrics cards: Revenue, Active Bags, Customers, Waste Reduced
Alert banner for customers waiting for pickup (if any)
Recent orders preview with customer names and pickup codes
Peak hours visualization with progress bars
Quick action buttons: Add Bag, View Orders, Analytics
Today's schedule and pickup window display 4. VendorBagManagement Component:
Create New Bags: Form with price, original value, description, pickup window, quantity
Time Slot Management: Predefined slots (5-7PM, 6-8PM, 7-9PM, 8-9:30PM)
Inventory Tracking: Current stock, sold count, availability toggle
Bag Preview: Real-time preview of customer-facing bag display
Photo Upload Simulation: Mock camera interface for bag contents
Bulk Actions: Create multiple bags, duplicate existing bags
Schedule Templates: Recurring daily schedules 5. VendorOrders Component:
Active Orders List: Customer name, pickup time, order value, special requests
Customer Arrival System: Real-time notifications when customers arrive
Pickup Code Verification: Large, clear code display with copy functionality
Customer Verification: Mock photo verification and ID checking
Order Status Updates: Pending → Customer Arrived → Verified → Completed
Communication Tools: Quick message templates for customers
Order History: Completed orders with timestamps and customer feedback 6. VendorAnalytics Component:
Sales Dashboard: Revenue trends, conversion rates, average order value
Performance Charts: Using Recharts library for interactive visualizations
Customer Analytics: Demographics, repeat customer rate, peak hours
Impact Metrics: Food waste reduced, environmental impact, community benefit
Time Period Filters: Daily, weekly, monthly views
Export Functionality: Mock PDF generation for reports 7. VendorProfile Component:
Business Information: Edit name, description, contact details, hours
Notification Settings: Order alerts, customer arrivals, daily summaries
Subscription Status: Free vs Premium features comparison
Business Hours Management: Weekly schedule with closed days
Account Security: Change password, download data options
Premium Badge: Crown icon for premium subscribers
Interactive Features & UX
Simulated API Calls:
Loading states with spinners (500ms-2s delays)
Toast notifications for all actions
Error simulation with retry mechanisms
Optimistic UI updates for better perceived performance
Real-time Elements:
Customer arrival notifications (mock WebSocket simulation)
Live order count updates
Inventory sync across different bag management actions
Push notification simulation for new orders
Mobile Optimization:
Touch-friendly button sizes (min 44px)
Swipe gestures for order management
Responsive grid layouts
Mobile-specific navigation patterns
Voice command simulation for hands-free operation
Key User Flows
Daily Vendor Workflow:
Login → Dashboard overview
Check pending pickups and customer arrivals
Create/update today's surprise bags
Monitor orders and verify customer pickups
Review daily analytics and performance
Customer Pickup Verification:
Customer arrives and order shows "Customer Arrived" badge
Vendor sees pickup code prominently displayed
Mock ID/photo verification process
Order status updates to "Completed"
Success feedback and next order ready
Bag Creation Process:
Navigate to Bags page
Click "Create New Bag"
Fill form: price, description, pickup window, quantity
Preview how bag appears to customers
Save and see live inventory updates
Technical Implementation
State Management:
React useState for vendor session
Local state for form data and UI states
Toast context for notifications
No external state management library needed
Styling:
Tailwind CSS with custom classes
Gradient backgrounds and treasure theme
Smooth animations and transitions
Responsive grid layouts
Custom button and card components
Mock Services:

// Simulated API delays and responses
const simulateApiCall = (action: string, delay = 1000) => {
return new Promise(resolve => setTimeout(resolve, delay));
};
Integration Points
Connect to Existing Customer App:
Share business data from existing mockBusinesses
Orders flow from customer actions to vendor interface
Real-time inventory sync (simulated)
Cross-platform impact tracking
Routing Structure:
/ (customer app - existing)
/vendor (vendor portal)

- /vendor → VendorLogin or VendorDashboard
- Internal navigation via state (dashboard, bags, orders, analytics, profile)
  Success Metrics & Feedback
  Visual Feedback:
  Success animations for completed actions
  Progress indicators for multi-step processes
  Celebratory effects for milestones (first sale, etc.)
  Clear error states with helpful messages
  Performance Indicators:
  Loading states never exceed 2 seconds
  Smooth 60fps animations
  Responsive interactions within 100ms
  Clear visual hierarchy and information density
  This comprehensive vendor portal should provide a realistic, functional MVP that demonstrates the complete business workflow while maintaining the treasure hunt aesthetic and professional vendor experience.
