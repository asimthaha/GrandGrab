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
    image: "https://example.com/bakery-bag.jpg",
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
    image: "https://example.com/grocery-bag.jpg",
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
    image: "https://example.com/bakery.jpg",
    heroImage: "https://example.com/bakery-hero.jpg",
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
    image: "https://example.com/grocery.jpg",
    heroImage: "https://example.com/grocery-hero.jpg",
    surpriseBags: [mockSurpriseBags[1]],
  },
  // Add more as needed
];

export const mockOrders: Order[] = [
  {
    id: "1",
    businessId: "1",
    businessName: "Green Leaf Bakery",
    items: ["Bread Loaf", "Croissants"],
    total: 5.99,
    status: "ready",
    pickupTime: "2023-10-01T18:00:00Z",
  },
  // Add more
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
  { id: "1", image: "https://example.com/photo1.jpg" },
  { id: "2", image: "https://example.com/photo2.jpg" },
  // Add more
];
