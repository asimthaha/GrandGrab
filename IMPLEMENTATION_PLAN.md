# Surprise Bag App - Implementation Plan

## Overview

This plan addresses the missing features identified in the codebase audit against the original prompt. The app is 70% complete with core screens and functionality, but critical components like Store Detail Screen and enhanced animations are missing.

## Priority Matrix

- **Critical**: Blocks core user flows
- **High**: Important for user experience
- **Medium**: Enhances polish
- **Low**: Nice-to-have improvements

## Phase 1: Critical Missing Components

### 1.1 Store Detail Screen (Critical)

**File**: `app/store-detail.tsx`
**Status**: Missing
**Dependencies**: Navigation, MockData updates

**Requirements**:

- Hero image (full-width business photo)
- Business info section (name, rating, address, icon)
- Surprise Bag Card (price, discount, pickup window, available quantity)
- Fixed Reserve Button (prominent, treasure-themed gradient)

**Implementation Steps**:

1. Create `app/store-detail.tsx` component
2. Add route in navigation for store details
3. Update Business interface to include hero image and surprise bag data
4. Implement Reserve functionality that creates new Order
5. Add navigation from Discover business cards to Store Detail

**Estimated Time**: 4-6 hours

### 1.2 Actual Map View (Critical)

**File**: `app/index.tsx` (replace placeholder)
**Status**: Placeholder
**Dependencies**: expo-maps or react-native-maps

**Requirements**:

- Display business locations on map
- User location marker
- Business markers with info windows
- Seamless switch between list and map views

**Implementation Steps**:

1. Install and configure react-native-maps
2. Replace map placeholder with MapView component
3. Add markers for businesses
4. Implement marker clustering for performance
5. Add callouts/info windows for business details

**Estimated Time**: 6-8 hours

## Phase 2: Core Functionality Enhancements

### 2.1 Favorites Toggle Logic (High)

**Files**: `app/index.tsx`, `app/favorites.tsx`, `constants/MockData.ts`
**Status**: Mocked data only
**Dependencies**: State management, persistence

**Requirements**:

- Toggle favorite status on heart press
- Heart pulse animation
- Persist favorites (AsyncStorage)
- Update Favorites screen dynamically

**Implementation Steps**:

1. Add favorite state to Business interface
2. Implement toggle logic in business cards
3. Add pulse animation to heart icon
4. Implement AsyncStorage for persistence
5. Update Favorites screen to use real data

**Estimated Time**: 3-4 hours

### 2.2 Reserve/Order Creation Flow (High)

**Files**: `app/store-detail.tsx`, `app/orders.tsx`, `constants/MockData.ts`
**Status**: Orders are static
**Dependencies**: Store Detail Screen, Navigation

**Requirements**:

- Reserve button creates new order
- Order appears in Current Orders tab
- Generates pickup code and time
- Updates user stats

**Implementation Steps**:

1. Implement reserve button onPress handler
2. Create new Order object with business data
3. Add order to mockOrders array
4. Navigate to Orders screen
5. Update Profile stats (items redeemed, total saved)

**Estimated Time**: 2-3 hours

## Phase 3: Animation & Polish

### 3.1 Enhanced Animations (Medium)

**Files**: Multiple components
**Status**: Basic animations present
**Dependencies**: Animated API

**Requirements**:

- Treasure glow effect on key interactive elements
- Heart pulse animation for favorites
- Smooth screen transitions
- Loading animations

**Implementation Steps**:

1. Create reusable glow animation component
2. Implement pulse animation for heart buttons
3. Add transition animations for navigation
4. Add loading states with shimmer effects

**Estimated Time**: 4-5 hours

### 3.2 Search and Filter Logic (Medium)

**File**: `app/index.tsx`
**Status**: UI only
**Dependencies**: Business data

**Requirements**:

- Functional search by business name/description
- Filter by category, distance, rating
- Real-time results

**Implementation Steps**:

1. Implement search filtering logic
2. Add category filtering
3. Add distance/rating sort options
4. Debounce search input for performance

**Estimated Time**: 2-3 hours

## Phase 4: Data & Settings

### 4.1 Enhanced Mock Data (Medium)

**File**: `constants/MockData.ts`
**Status**: Basic data
**Dependencies**: All screens

**Requirements**:

- More comprehensive business data
- Surprise bag items for each business
- More diverse local hauls
- Realistic order history

**Implementation Steps**:

1. Add hero images to businesses
2. Create SurpriseBag interface
3. Add surprise bags to each business
4. Expand mock orders and local hauls

**Estimated Time**: 1-2 hours

### 4.2 Settings Functionality (Low)

**File**: `app/profile.tsx`
**Status**: UI only
**Dependencies**: AsyncStorage, state management

**Requirements**:

- Functional notification toggles
- Theme selection
- Language selection
- Data persistence

**Implementation Steps**:

1. Implement toggle switches for notifications
2. Add theme switching logic
3. Add language selection
4. Persist settings using AsyncStorage

**Estimated Time**: 3-4 hours

## Phase 5: Testing & Optimization

### 5.1 Integration Testing (Medium)

**Files**: All
**Status**: Manual testing only
**Dependencies**: Jest, React Native Testing Library

**Requirements**:

- Unit tests for components
- Integration tests for user flows
- Navigation testing

**Implementation Steps**:

1. Set up testing framework
2. Write unit tests for utilities
3. Test navigation flows
4. Test state management

**Estimated Time**: 4-6 hours

### 5.2 Performance Optimization (Medium)

**Files**: All
**Status**: Basic implementation
**Dependencies**: React optimization

**Requirements**:

- Optimize FlatList rendering
- Implement virtualization
- Reduce bundle size

**Implementation Steps**:

1. Add React.memo to components
2. Implement FlatList optimizations
3. Lazy load screens
4. Optimize images and assets

**Estimated Time**: 2-3 hours

## Implementation Order Recommendation

1. **Phase 1**: Store Detail Screen & Map View (Critical user flows)
2. **Phase 2**: Favorites & Reserve Flow (Complete booking cycle)
3. **Phase 3**: Animations & Search (Polish and usability)
4. **Phase 4**: Data & Settings (Completeness)
5. **Phase 5**: Testing & Optimization (Quality assurance)

## Estimated Total Time: 32-48 hours

## Success Metrics

- All original prompt requirements implemented
- Seamless user flow from discovery to purchase
- Polished animations and interactions
- Comprehensive test coverage
- Performance optimized for mobile

## Risks & Mitigations

- **Map Integration**: Test on physical devices
- **State Management**: Implement proper global state if needed
- **Performance**: Monitor and optimize as you build
- **Dependencies**: Keep Expo SDK versions compatible
