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
}

export interface Order {
  id: string;
  businessId: string;
  businessName: string;
  items: string[];
  total: number;
  status: "pending" | "ready" | "picked_up";
  pickupTime: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  stats: {
    totalSaved: number;
    itemsRedeemed: number;
    businessesVisited: number;
  };
}

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
