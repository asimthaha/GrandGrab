import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";

// Mock vendor data - in real app this would come from context/auth
const mockVendor = {
  ownerName: "Maria Rodriguez",
  businessName: "Golden Crust Bakery",
};

const VendorDashboard = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          Welcome back, {mockVendor.ownerName}!
        </Text>
        <Text style={styles.businessName}>{mockVendor.businessName}</Text>
      </View>

      <View style={styles.metricsContainer}>
        <View style={styles.metricCard}>
          <Text style={styles.metricValue}>$250.00</Text>
          <Text style={styles.metricLabel}>Today's Revenue</Text>
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

      <View style={styles.section}>
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
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    padding: 20,
  },
  header: {
    marginBottom: 30,
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
  section: {
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
