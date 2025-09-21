import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";

const VendorAnalytics = () => {
  const analytics = {
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
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Business Analytics</Text>
        <Text style={styles.subtitle}>Track your performance and insights</Text>
      </View>

      <View style={styles.metricsSection}>
        <Text style={styles.sectionTitle}>This Week</Text>
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>
              {analytics.thisWeek.bagsCreated}
            </Text>
            <Text style={styles.metricLabel}>Bags Created</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>
              {analytics.thisWeek.bagsSold}
            </Text>
            <Text style={styles.metricLabel}>Bags Sold</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>
              ${analytics.thisWeek.revenue}
            </Text>
            <Text style={styles.metricLabel}>Revenue</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>
              {analytics.thisWeek.customers}
            </Text>
            <Text style={styles.metricLabel}>Customers</Text>
          </View>
        </View>
      </View>

      <View style={styles.metricsSection}>
        <Text style={styles.sectionTitle}>This Month</Text>
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>
              {analytics.thisMonth.bagsCreated}
            </Text>
            <Text style={styles.metricLabel}>Bags Created</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>
              {analytics.thisMonth.bagsSold}
            </Text>
            <Text style={styles.metricLabel}>Bags Sold</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>
              ${analytics.thisMonth.revenue}
            </Text>
            <Text style={styles.metricLabel}>Revenue</Text>
          </View>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>
              {analytics.thisMonth.customers}
            </Text>
            <Text style={styles.metricLabel}>Customers</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Peak Hours</Text>
        <View style={styles.peakHoursList}>
          {analytics.peakHours.map((peak, index) => (
            <View key={index} style={styles.peakHourItem}>
              <Text style={styles.peakHourTime}>{peak.hour}</Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${(peak.orders / 12) * 100}%` },
                  ]}
                />
              </View>
              <Text style={styles.peakHourOrders}>{peak.orders} orders</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Customers</Text>
        <View style={styles.customersList}>
          {analytics.topCustomers.map((customer, index) => (
            <View key={index} style={styles.customerItem}>
              <View style={styles.customerInfo}>
                <Text style={styles.customerName}>{customer.name}</Text>
                <Text style={styles.customerOrders}>
                  {customer.orders} orders
                </Text>
              </View>
              <Text style={styles.customerValue}>${customer.value}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.impactSection}>
        <Text style={styles.sectionTitle}>Environmental Impact</Text>
        <View style={styles.impactCard}>
          <Text style={styles.impactValue}>
            {analytics.thisMonth.wasteReduced}kg
          </Text>
          <Text style={styles.impactLabel}>Food Waste Reduced This Month</Text>
          <Text style={styles.impactDescription}>
            By selling surplus food, you've helped reduce food waste and
            provided affordable meals to your community.
          </Text>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.secondary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.secondary,
    opacity: 0.8,
  },
  metricsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.secondary,
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
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
  peakHoursList: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
  },
  peakHourItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  peakHourTime: {
    fontSize: 14,
    color: Colors.text,
    width: 60,
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: Colors.border,
    borderRadius: 4,
    marginHorizontal: 12,
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.accent,
    borderRadius: 4,
  },
  peakHourOrders: {
    fontSize: 12,
    color: Colors.textSecondary,
    width: 60,
    textAlign: "right",
  },
  customersList: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
  },
  customerItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 4,
  },
  customerOrders: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  customerValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.accent,
  },
  impactSection: {
    marginBottom: 30,
  },
  impactCard: {
    backgroundColor: Colors.success,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  impactValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.secondary,
    marginBottom: 8,
  },
  impactLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.secondary,
    textAlign: "center",
    marginBottom: 12,
  },
  impactDescription: {
    fontSize: 14,
    color: Colors.secondary,
    textAlign: "center",
    opacity: 0.9,
  },
});

export default VendorAnalytics;
