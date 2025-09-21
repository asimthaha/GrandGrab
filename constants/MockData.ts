export interface SurpriseBag {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  pickupWindow: {
    start: string; // ISO date string
    end: string; // ISO date string
  };
  availableQuantity: number;
  image: string;
}

export interface Business {
  id: string;
  name: string;
  description: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  distance: number; // in miles
  rating: number;
  image: string; // placeholder for image URL
  heroImage: string; // for store detail hero
  surpriseBags: SurpriseBag[];
}

export interface Order {
  id: string;
  businessId: string;
  businessName: string;
  items: string[];
  total: number;
  status: "pending" | "ready" | "picked_up" | "reserved" | "redeemed";
  pickupTime: string;
  pickupCode?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  stats: {
    totalSaved: number;
    itemsRedeemed: number;
    businessesVisited: number;
  };
}

export interface AppState {
  user: User;
  favorites: string[]; // array of business IDs
  orders: Order[];
}

export interface VendorProfile {
  id: string;
  businessId: string;
  username: string;
  password: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  joinDate: string;
  subscription: "free" | "premium";
  settings: {
    notifications: boolean;
    autoConfirm: boolean;
    closedDays: string[];
  };
}

export interface VendorAnalytics {
  businessId: string;
  thisWeek: {
    bagsCreated: number;
    bagsSold: number;
    revenue: number;
    wasteReduced: number;
    customers: number;
  };
  thisMonth: {
    bagsCreated: number;
    bagsSold: number;
    revenue: number;
    wasteReduced: number;
    customers: number;
  };
  peakHours: Array<{ hour: string; orders: number }>;
  topCustomers: Array<{ name: string; orders: number; value: number }>;
}

export interface VendorOrder extends Order {
  customerName: string;
  customerPhone: string;
  pickupCode: string;
  specialRequests?: string;
  customerArrived: boolean;
  verificationRequired: boolean;
}

export const mockSurpriseBags: SurpriseBag[] = [
  {
    id: "bag1",
    name: "Bakery Surprise Bag",
    description: "Assorted fresh breads and pastries",
    originalPrice: 15.99,
    discountedPrice: 7.99,
    discountPercentage: 50,
    pickupWindow: {
      start: "2023-10-01T17:00:00Z",
      end: "2023-10-01T19:00:00Z",
    },
    availableQuantity: 5,
    image:
      "https://images.unsplash.com/photo-1556909114-2c36e8d77b2f?w=200&h=200&fit=crop&auto=format",
  },
  {
    id: "bag2",
    name: "Grocery Surprise Bag",
    description: "Fresh produce and dairy items",
    originalPrice: 25.99,
    discountedPrice: 12.99,
    discountPercentage: 50,
    pickupWindow: {
      start: "2023-10-01T18:00:00Z",
      end: "2023-10-01T20:00:00Z",
    },
    availableQuantity: 3,
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop&auto=format",
  },
  {
    id: "bag3",
    name: "Deli Surprise Bag",
    description: "Assorted deli meats and cheeses",
    originalPrice: 30.99,
    discountedPrice: 15.99,
    discountPercentage: 48,
    pickupWindow: {
      start: "2023-10-01T16:00:00Z",
      end: "2023-10-01T18:00:00Z",
    },
    availableQuantity: 4,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=200&h=200&fit=crop&auto=format",
  },
  {
    id: "bag4",
    name: "Beverage Surprise Bag",
    description: "Soft drinks and juices",
    originalPrice: 50.99,
    discountedPrice: 25.99,
    discountPercentage: 49,
    pickupWindow: {
      start: "2023-10-01T17:00:00Z",
      end: "2023-10-01T19:00:00Z",
    },
    availableQuantity: 2,
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&h=200&fit=crop&auto=format",
  },
];

export const mockBusinesses: Business[] = [
  {
    id: "1",
    name: "Green Leaf Bakery",
    description: "Fresh surplus bread and pastries available daily.",
    location: {
      latitude: 40.7128,
      longitude: -74.006,
      address: "123 Main St, NYC",
    },
    distance: 0.5,
    rating: 4.5,
    image:
      "https://images.unsplash.com/photo-1556909114-2c36e8d77b2f?w=300&h=200&fit=crop&auto=format",
    heroImage:
      "https://images.unsplash.com/photo-1556909114-3c36e8d77b2f?w=800&h=400&fit=crop&auto=format",
    surpriseBags: [mockSurpriseBags[0]],
  },
  {
    id: "2",
    name: "Fresh Harvest Grocery",
    description: "Organic produce and dairy items nearing expiration.",
    location: {
      latitude: 40.7589,
      longitude: -73.9851,
      address: "456 Elm St, NYC",
    },
    distance: 1.2,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop&auto=format",
    heroImage:
      "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&h=400&fit=crop&auto=format",
    surpriseBags: [mockSurpriseBags[1]],
  },
  {
    id: "3",
    name: "Deli Delights",
    description: "Fresh deli meats and cheeses nearing expiration.",
    location: {
      latitude: 40.7505,
      longitude: -73.9934,
      address: "789 Oak St, NYC",
    },
    distance: 2.1,
    rating: 4.3,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop&auto=format",
    heroImage:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=400&fit=crop&auto=format",
    surpriseBags: [mockSurpriseBags[2]],
  },
  {
    id: "4",
    name: "Beverage Barn",
    description: "Beverages and drinks from local suppliers.",
    location: {
      latitude: 40.7614,
      longitude: -73.9776,
      address: "101 Pine St, NYC",
    },
    distance: 1.8,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=200&fit=crop&auto=format",
    heroImage:
      "https://images.unsplash.com/photo-1556909114-2c36e8d77b2f?w=800&h=400&fit=crop&auto=format",
    surpriseBags: [mockSurpriseBags[3]],
  },
];

export const mockOrders: Order[] = [
  {
    id: "1",
    businessId: "1",
    businessName: "Green Leaf Bakery",
    items: ["Bread Loaf", "Croissants"],
    total: 5.99,
    status: "ready",
    pickupTime: "2025-09-21T18:00:00Z",
  },
  {
    id: "2",
    businessId: "2",
    businessName: "Fresh Harvest Grocery",
    items: ["Bananas", "Milk"],
    total: 8.99,
    status: "pending",
    pickupTime: "2025-09-22T17:00:00Z",
  },
  {
    id: "3",
    businessId: "3",
    businessName: "Deli Delights",
    items: ["Ham", "Cheese"],
    total: 12.99,
    status: "ready",
    pickupTime: "2025-09-22T18:00:00Z",
  },
];

export const mockUser: User = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  joinDate: "2023-01-15",
  stats: {
    totalSaved: 42.5,
    itemsRedeemed: 15,
    businessesVisited: 8,
  },
};

export const mockLocalHauls = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=200&h=200&fit=crop&auto=format",
    description: "Mystery deli bundle",
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop&auto=format",
    description: "Dairy treasures",
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop&auto=format",
    description: "Fresh produce surprise",
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop&auto=format",
    description: "Bakery delights",
  },
  {
    id: "5",
    image:
      "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&h=200&fit=crop&auto=format",
    description: "Beverage collection",
  },
  {
    id: "6",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop&auto=format",
    description: "Pantry surprises",
  },
];

export const mockVendorProfiles: VendorProfile[] = [
  {
    id: "1",
    businessId: "1",
    username: "goldencrust",
    password: "baker123",
    businessName: "Golden Crust Bakery",
    ownerName: "Maria Rodriguez",
    email: "maria@goldencrust.com",
    phone: "+1-555-0123",
    joinDate: "2023-03-15",
    subscription: "premium",
    settings: {
      notifications: true,
      autoConfirm: false,
      closedDays: ["Sunday"],
    },
  },
  {
    id: "2",
    businessId: "2",
    username: "freshmarket",
    password: "fresh456",
    businessName: "Fresh Market Co.",
    ownerName: "David Chen",
    email: "david@freshmarket.com",
    phone: "+1-555-0456",
    joinDate: "2023-04-20",
    subscription: "free",
    settings: {
      notifications: true,
      autoConfirm: true,
      closedDays: ["Monday"],
    },
  },
  {
    id: "3",
    businessId: "3",
    username: "bellas",
    password: "italian789",
    businessName: "Bella's Italian Kitchen",
    ownerName: "Giuseppe Romano",
    email: "giuseppe@bellaskitchen.com",
    phone: "+1-555-0789",
    joinDate: "2023-02-10",
    subscription: "premium",
    settings: {
      notifications: false,
      autoConfirm: false,
      closedDays: ["Tuesday"],
    },
  },
  {
    id: "4",
    businessId: "4",
    username: "morningbrew",
    password: "coffee000",
    businessName: "Morning Brew Cafe",
    ownerName: "Sarah Johnson",
    email: "sarah@morningbrew.com",
    phone: "+1-555-0000",
    joinDate: "2023-05-01",
    subscription: "free",
    settings: {
      notifications: true,
      autoConfirm: true,
      closedDays: ["Wednesday"],
    },
  },
];

export const mockVendorAnalytics: VendorAnalytics[] = [
  {
    businessId: "1",
    thisWeek: {
      bagsCreated: 25,
      bagsSold: 20,
      revenue: 150.0,
      wasteReduced: 45,
      customers: 18,
    },
    thisMonth: {
      bagsCreated: 95,
      bagsSold: 82,
      revenue: 615.0,
      wasteReduced: 180,
      customers: 75,
    },
    peakHours: [
      { hour: "17:00", orders: 8 },
      { hour: "18:00", orders: 12 },
      { hour: "19:00", orders: 6 },
    ],
    topCustomers: [
      { name: "Alice Smith", orders: 5, value: 37.5 },
      { name: "Bob Johnson", orders: 4, value: 30.0 },
      { name: "Charlie Brown", orders: 3, value: 22.5 },
    ],
  },
  {
    businessId: "2",
    thisWeek: {
      bagsCreated: 18,
      bagsSold: 15,
      revenue: 195.0,
      wasteReduced: 35,
      customers: 14,
    },
    thisMonth: {
      bagsCreated: 72,
      bagsSold: 68,
      revenue: 884.0,
      wasteReduced: 140,
      customers: 62,
    },
    peakHours: [
      { hour: "16:00", orders: 6 },
      { hour: "17:00", orders: 9 },
      { hour: "18:00", orders: 7 },
    ],
    topCustomers: [
      { name: "Diana Wilson", orders: 4, value: 52.0 },
      { name: "Edward Davis", orders: 3, value: 39.0 },
      { name: "Fiona Garcia", orders: 3, value: 39.0 },
    ],
  },
];

export const mockVendorOrders: VendorOrder[] = [
  {
    id: "1",
    businessId: "1",
    businessName: "Golden Crust Bakery",
    items: ["Bread Loaf", "Croissants"],
    total: 5.99,
    status: "ready",
    pickupTime: "2025-09-21T18:00:00Z",
    customerName: "Alice Smith",
    customerPhone: "+1-555-1111",
    pickupCode: "ABC123",
    customerArrived: false,
    verificationRequired: true,
  },
  {
    id: "2",
    businessId: "2",
    businessName: "Fresh Market Co.",
    items: ["Bananas", "Milk"],
    total: 8.99,
    status: "pending",
    pickupTime: "2025-09-22T17:00:00Z",
    customerName: "Bob Johnson",
    customerPhone: "+1-555-2222",
    pickupCode: "DEF456",
    customerArrived: false,
    verificationRequired: false,
  },
  {
    id: "3",
    businessId: "3",
    businessName: "Bella's Italian Kitchen",
    items: ["Ham", "Cheese"],
    total: 12.99,
    status: "ready",
    pickupTime: "2025-09-22T18:00:00Z",
    customerName: "Charlie Brown",
    customerPhone: "+1-555-3333",
    pickupCode: "GHI789",
    specialRequests: "No spicy items please",
    customerArrived: true,
    verificationRequired: true,
  },
];
