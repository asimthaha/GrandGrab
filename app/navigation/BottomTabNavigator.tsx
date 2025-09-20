import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import { Colors } from "../../constants/Colors";
import FavoritesScreen from "../favorites";
import DiscoverScreen from "../index"; // Discover is app/index.tsx
import OrdersScreen from "../orders";
import ProfileScreen from "../profile";

const Tab = createBottomTabNavigator();

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function BottomTabNavigator() {

  return (
    <Tab.Navigator
      initialRouteName="Discover"
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          title: "Discover",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          title: "Orders",
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
