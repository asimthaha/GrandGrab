Prompt: 'Surprise Bag App' - A Mobile-First, Treasure Hunt-Themed Food Surplus Marketplace using Expo
This prompt outlines the creation of a full-featured, mobile-first food surplus marketplace app called 'Surprise Bag App'. The app should be built as a pure React Native application within the Expo managed workflow. All routing will be handled by File based Navigation.

1. Core Technology Stack
   Framework: React Native (via Expo)
   Styling: React Native StyleSheet
   State Management: React Context and useState hooks
2. Design System & Aesthetics
   The app's visual identity should reflect a treasure hunt theme.
   Color Palette:
   Primary: Deep Burgundy (#7C0A02)
   Secondary: Creamy Off-White (#F5F5DC)
   Accent: Burnt Orange (#CC5500)
   Success: Sage Green (#87A96B)
   Typography: Utilize a clean, modern, and accessible font system.
   Animations: Use the Animated API to create:
   Smooth screen transitions.
   A "treasure glow" effect on key interactive elements.
   A "heart pulse" animation for the favorites button.
   "Count-up" number animations on the Profile screen.
3. App Structure & Pages
   The app will have a fixed bottom navigation bar on most screens. All components must be built for a mobile-first experience.
   Discover Screen (DiscoverScreen.tsx):
   Header: A gradient background with a location selector, search bar, and filter chips.
   Content: Display business cards in a scrollable list view, with an option to toggle to a map view.
   "Local Hauls" Section: A two-column grid showcasing user-submitted photos.
   Store Detail Screen (StoreDetailScreen.tsx):
   Hero Image: A full-width business photo.
   Info: Display the business name, rating, address, and an icon.
   Surprise Bag Card: A card detailing the price, discount, pickup window, and available quantity.
   Fixed Reserve Button: A prominent, treasure-themed gradient button at the bottom.
   Orders Screen (OrdersScreen.tsx):
   Tabbed Interface: Separate views for "Current Orders" and "Order History."
   Current Orders: Display active orders with real-time countdown timers.
   Redeem Feature: Implement a "Swipe to Redeem" button that triggers a full-screen modal with a pickup code.
   Profile Screen (ProfileScreen.tsx):
   User Info: Display the user's name, email, and join date.
   Impact Dashboard: Use animated counters to show key stats like "Meals Saved" and "Money Saved."
   Settings: Sections for user preferences.
   Favorites Screen (FavoritesScreen.tsx):
   List View: A simple list of favorited businesses.
   Empty State: A message to encourage the user to favorite businesses.
   Bottom Navigation (Navigation.tsx):
   A fixed bottom tab bar with four tabs: Discover, Favorites, Orders, and Profile.
   The active tab should have a distinct visual style (e.g., scaling and color change).
4. Data & Functionality
   Mock Data: Create comprehensive mock data to simulate the app's content, including businesses, orders, and user profile stats.
   Key Functionality:
   Location: Use location to get the user's coordinates for distance calculation.
   Maps: Use maps to display business locations on the map view.
   Notifications: Use notifications to handle alerts and simple pop-up messages.
   Swipe to Redeem: Implement a custom gesture recognizer using the API.
   Simulated API Calls: Use async/await with a brief delay to simulate network requests.
   Your task is to build this app from scratch using the Expo managed workflow, ensuring all components are well-structured, functional, and adhere to the specified design and technical requirements.
