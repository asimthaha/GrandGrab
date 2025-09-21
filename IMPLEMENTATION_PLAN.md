# Vendor Portal Implementation Plan

This document outlines the plan to build the vendor-side interface for the Surprise Bag app, based on the requirements in `vendor-prompt.md`.

## 1. Project Setup & Architecture

- **File Structure**: Create a new directory `app/vendor` to house all vendor-related components and screens.
- **Navigation**: Implement a state-based navigation system within the vendor portal. A new router will be created at `app/(vendor)/_layout.tsx` to handle the vendor section.
- **Authentication**: A mock authentication service will be created in `app/vendor/services/auth.ts` to handle login and session management.
- **Mock Data**: All mock data and interfaces will be centralized in `constants/MockData.ts`.
- **Styling**: We will continue to use the existing styling conventions from `constants/Styles.ts` and `constants/Colors.ts`, extending them for the vendor portal's theme.

## 2. Component Development Strategy

The development will be broken down into the following components, built in order:

### Phase 1: Core Infrastructure

1.  **`VendorContainer` (`app/vendor/index.tsx`)**: This will be the main entry point for the vendor portal. It will manage the overall state, such as the current vendor's session and the current view (e.g., 'dashboard', 'orders'). It will conditionally render the `VendorLogin` screen or the main vendor dashboard layout.
2.  **`VendorLogin` (`app/vendor/components/VendorLogin.tsx`)**: A component for the vendor login screen. It will include a form for username and password, display demo accounts, and handle the mock authentication flow with loading and error states.
3.  **`VendorNavigation` (`app/vendor/components/VendorNavigation.tsx`)**: A sidebar navigation component for desktop and a collapsible hamburger menu for mobile. It will display navigation links and show notifications.

### Phase 2: Main Feature Screens

4.  **`VendorDashboard` (`app/vendor/components/VendorDashboard.tsx`)**: The main dashboard screen, showing key metrics, recent orders, and quick actions.
5.  **`VendorBagManagement` (`app/vendor/components/VendorBagManagement.tsx`)**: A component for creating, updating, and managing surprise bags.
6.  **`VendorOrders` (`app/vendor/components/VendorOrders.tsx`)**: A screen to view and manage customer orders, including a pickup verification system.
7.  **`VendorAnalytics` (`app/vendor/components/VendorAnalytics.tsx`)**: A component to display business performance metrics and charts.
8.  **`VendorProfile` (`app/vendor/components/VendorProfile.tsx`)**: A screen for vendors to manage their business profile and settings.

## 3. State Management

- **Vendor Session**: The logged-in vendor's data will be managed using `useState` and `useContext` within the main `VendorContainer` component.
- **Local Component State**: Individual components will manage their own UI state (e.g., form inputs, loading states) using `useState`.
- **Toast Notifications**: A global `ToastContext` will be used to display notifications for actions like successful updates or errors.

## 4. Mock API and Services

- A `simulateApiCall` function will be created in `app/vendor/services/api.ts` to mimic network latency for a realistic user experience.
- Service functions will be created to handle fetching and updating mock data (e.g., `getVendorOrders`, `updateBagInventory`).

## 5. Key User Flows Implementation

- **Daily Workflow**: The flow from login to dashboard, checking orders, creating bags, and verifying pickups will be implemented as the core application experience.
- **Customer Pickup**: The order status system (`Pending` -> `Customer Arrived` -> `Verified` -> `Completed`) will be managed within the `VendorOrders` component.
- **Bag Creation**: The form and preview logic will be contained within the `VendorBagManagement` component.

## 6. Timeline & Milestones

1.  **Week 1**: Setup project structure, implement core authentication, and build the `VendorLogin` and `VendorNavigation` components.
2.  **Week 2**: Develop the `VendorDashboard` and `VendorBagManagement` components.
3.  **Week 3**: Build the `VendorOrders` and `VendorAnalytics` components.
4.  **Week 4**: Complete the `VendorProfile` component, refine the UI/UX, and perform final testing.

This plan provides a clear roadmap for developing a comprehensive and functional MVP for the vendor portal.
