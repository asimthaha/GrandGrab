import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React, { useState } from "react";

import { Colors } from "../../constants/Colors";
import { VendorProfile } from "../../constants/MockData";
import VendorLogin from "./components/VendorLogin";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function VendorTabLayout() {
  const [currentVendor, setCurrentVendor] = useState<VendorProfile | null>(
    null
  );

  const handleLogin = (vendor: VendorProfile) => {
    setCurrentVendor(vendor);
  };

  const handleLogout = () => {
    setCurrentVendor(null);
  };

  // Show login screen if not authenticated
  if (!currentVendor) {
    return <VendorLogin onLogin={handleLogin} />;
  }

  // Show tab navigation if authenticated
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: Colors.secondary,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        tabBarStyle: {
          backgroundColor: Colors.secondary,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="bags"
        options={{
          title: "Bags",
          tabBarIcon: ({ color }) => <TabBarIcon name="bag" color={color} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: "Analytics",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bar-chart" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
          headerRight: () => (
            <Ionicons
              name="log-out"
              size={24}
              color={Colors.secondary}
              style={{ marginRight: 16 }}
              onPress={handleLogout}
            />
          ),
        }}
      />
    </Tabs>
  );
}
