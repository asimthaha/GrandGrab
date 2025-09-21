import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../../constants/Colors";
import { VendorProfile } from "../../../constants/MockData";
interface VendorDashboardProps {
  vendor?: VendorProfile;
  onLogout?: () => void;
}

const VendorDashboard: React.FC<VendorDashboardProps> = ({
  vendor,
  onLogout,
}) => {
  console.log("VendorDashboard: vendor prop:", vendor);
  if (!vendor) {
    return <Text style={styles.welcomeText}>Loading dashboard...</Text>;
  }
  return (
    <ScrollView style={styles.content}>
      <Text style={styles.welcomeText}>Welcome back, {vendor?.ownerName}!</Text>
      <Text style={styles.businessName}>{vendor.businessName}</Text>

      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>$250.00</Text>
          <Text style={styles.metricLabel}>Today&apos;s Revenue</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>8</Text>
          <Text style={styles.metricLabel}>Active Bags</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>15</Text>
          <Text style={styles.metricLabel}>Customers Served</Text>
        </View>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>25kg</Text>
          <Text style={styles.metricLabel}>Waste Reduced</Text>
        </View>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Add New Bag</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>View Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Analytics</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.recentOrders}>
        <Text style={styles.sectionTitle}>Recent Orders</Text>
        <View style={styles.orderItem}>
          <Text style={styles.orderCustomer}>Alice Smith</Text>
          <Text style={styles.orderDetails}>Pickup Code: ABC123 • $7.99</Text>
        </View>
        <View style={styles.orderItem}>
          <Text style={styles.orderCustomer}>Bob Johnson</Text>
          <Text style={styles.orderDetails}>Pickup Code: DEF456 • $8.99</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: Colors.primary,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.secondary,
    marginBottom: 4,
  },
  businessName: {
    fontSize: 18,
    color: Colors.secondary,
    opacity: 0.8,
    marginBottom: 30,
  },
  metricsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  metricCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    width: "48%",
    marginBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  quickActions: {
    marginBottom: 30,
  },
  actionButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 12,
  },
  actionButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  recentOrders: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.secondary,
    marginBottom: 16,
  },
  orderItem: {
    backgroundColor: Colors.card,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  orderCustomer: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 4,
  },
  orderDetails: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});

export default VendorDashboard;
