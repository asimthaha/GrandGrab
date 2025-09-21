import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/Colors";

const VendorOrders = () => {
  const orders = [
    {
      id: "1",
      customerName: "Alice Smith",
      customerPhone: "+1-555-1111",
      pickupCode: "ABC123",
      specialRequests: null,
      customerArrived: false,
      verificationRequired: true,
      status: "ready",
      total: 7.99,
      items: ["Bread Loaf", "Croissants"],
    },
    {
      id: "2",
      customerName: "Bob Johnson",
      customerPhone: "+1-555-2222",
      pickupCode: "DEF456",
      specialRequests: null,
      customerArrived: false,
      verificationRequired: false,
      status: "pending",
      total: 8.99,
      items: ["Bananas", "Milk"],
    },
    {
      id: "3",
      customerName: "Charlie Brown",
      customerPhone: "+1-555-3333",
      pickupCode: "GHI789",
      specialRequests: "No spicy items please",
      customerArrived: true,
      verificationRequired: true,
      status: "ready",
      total: 12.99,
      items: ["Ham", "Cheese"],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ready":
        return Colors.success;
      case "pending":
        return Colors.accent;
      default:
        return Colors.textSecondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "ready":
        return "Ready for Pickup";
      case "pending":
        return "Preparing";
      default:
        return status;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Order Management</Text>
        <Text style={styles.subtitle}>Track and manage customer orders</Text>
      </View>

      <View style={styles.ordersList}>
        {orders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View>
                <Text style={styles.customerName}>{order.customerName}</Text>
                <Text style={styles.customerPhone}>{order.customerPhone}</Text>
              </View>
              <View style={styles.orderStatus}>
                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusColor(order.status) },
                  ]}
                >
                  {getStatusText(order.status)}
                </Text>
              </View>
            </View>

            <View style={styles.orderDetails}>
              <Text style={styles.itemsText}>
                Items: {order.items.join(", ")}
              </Text>
              <Text style={styles.totalText}>Total: ${order.total}</Text>
            </View>

            {order.specialRequests && (
              <Text style={styles.specialRequests}>
                Special: {order.specialRequests}
              </Text>
            )}

            <View style={styles.pickupSection}>
              <Text style={styles.pickupCodeLabel}>Pickup Code:</Text>
              <Text style={styles.pickupCode}>{order.pickupCode}</Text>
              <TouchableOpacity style={styles.copyButton}>
                <Text style={styles.copyButtonText}>Copy</Text>
              </TouchableOpacity>
            </View>

            {order.customerArrived && (
              <View style={styles.arrivalBadge}>
                <Text style={styles.arrivalText}>Customer Arrived</Text>
              </View>
            )}

            <View style={styles.actionButtons}>
              {order.customerArrived ? (
                <>
                  <TouchableOpacity style={styles.verifyButton}>
                    <Text style={styles.verifyButtonText}>
                      Verify & Complete
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.messageButton}>
                    <Text style={styles.messageButtonText}>Message</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <TouchableOpacity style={styles.notifyButton}>
                  <Text style={styles.notifyButtonText}>Notify Customer</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
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
  ordersList: {
    marginBottom: 30,
  },
  orderCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  customerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 4,
  },
  customerPhone: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  orderStatus: {
    alignItems: "flex-end",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "600",
  },
  orderDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  itemsText: {
    fontSize: 14,
    color: Colors.textSecondary,
    flex: 1,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.accent,
  },
  specialRequests: {
    fontSize: 14,
    color: Colors.accent,
    fontStyle: "italic",
    marginBottom: 12,
  },
  pickupSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  pickupCodeLabel: {
    fontSize: 14,
    color: Colors.secondary,
    marginRight: 8,
  },
  pickupCode: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.secondary,
    letterSpacing: 2,
    flex: 1,
  },
  copyButton: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  copyButtonText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: "bold",
  },
  arrivalBadge: {
    backgroundColor: Colors.success,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  arrivalText: {
    color: Colors.secondary,
    fontSize: 12,
    fontWeight: "bold",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  verifyButton: {
    backgroundColor: Colors.success,
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginRight: 8,
    alignItems: "center",
  },
  verifyButtonText: {
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: "bold",
  },
  messageButton: {
    backgroundColor: Colors.accent,
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginLeft: 8,
    alignItems: "center",
  },
  messageButtonText: {
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: "bold",
  },
  notifyButton: {
    backgroundColor: Colors.accent,
    borderRadius: 8,
    padding: 12,
    flex: 1,
    alignItems: "center",
  },
  notifyButtonText: {
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default VendorOrders;
