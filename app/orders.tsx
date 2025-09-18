import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { Colors } from "../constants/Colors";
import { mockOrders, Order } from "../constants/MockData";

export default function OrdersScreen() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  const handleRedeem = (orderId: string) => {
    Alert.alert("Redeem Order", "Are you ready to pick up your treasure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Redeem",
        onPress: () => {
          setOrders((prev) =>
            prev.map((order) =>
              order.id === orderId
                ? { ...order, status: "picked_up" as const }
                : order
            )
          );
        },
      },
    ]);
  };

  const renderOrderCard = ({ item }: { item: Order }) => {
    const translateX = new Animated.Value(0);

    const onGestureEvent = Animated.event(
      [{ nativeEvent: { translationX: translateX } }],
      { useNativeDriver: false }
    );

    const onHandlerStateChange = (event: any) => {
      if (event.nativeEvent.state === State.END) {
        if (event.nativeEvent.translationX > 100 && item.status === "ready") {
          handleRedeem(item.id);
        }
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    };

    return (
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}
      >
        <Animated.View
          style={[
            styles.orderCard,
            { transform: [{ translateX }] },
          ]}
        >
          <View style={styles.orderInfo}>
            <Text style={styles.businessName}>{item.businessName}</Text>
            <Text style={styles.orderItems}>{item.items.join(", ")}</Text>
            <Text style={styles.orderTotal}>Total: ${item.total}</Text>
            <Text style={styles.orderStatus}>
              Status: {item.status.replace("_", " ")}
            </Text>
            <Text style={styles.pickupTime}>
              Pickup: {new Date(item.pickupTime).toLocaleString()}
            </Text>
            {item.status === "ready" && (
              <Text style={styles.swipeHint}>Swipe right to redeem</Text>
            )}
          </View>
          {item.status === "ready" && (
            <View style={styles.redeemIndicator}>
              <Ionicons
                name="checkmark-circle"
                size={30}
                color={Colors.success}
              />
            </View>
          )}
        </Animated.View>
      </PanGestureHandler>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenHeader}>Your Orders</Text>
      {orders.length > 0 ? (
        <FlatList
          data={orders}
          renderItem={renderOrderCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="list-outline" size={100} color={Colors.primary} />
          <Text style={styles.emptyText}>No orders yet!</Text>
          <Text style={styles.emptySubtext}>
            Start discovering treasures to place your first order.
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
    padding: 16,
  },
  screenHeader: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "center",
    marginVertical: 20,
  },
  orderCard: {
    flexDirection: "row",
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderInfo: {
    flex: 1,
  },
  businessName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 5,
  },
  orderItems: {
    fontSize: 14,
    color: Colors.light.text,
    marginBottom: 5,
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.success,
    marginBottom: 5,
  },
  orderStatus: {
    fontSize: 14,
    color: Colors.accent,
    marginBottom: 5,
  },
  pickupTime: {
    fontSize: 12,
    color: Colors.light.text,
    opacity: 0.7,
  },
  redeemButton: {
    backgroundColor: Colors.success,
    borderRadius: 8,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  redeemText: {
    color: Colors.secondary,
    fontSize: 12,
    fontWeight: "bold",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 16,
    color: Colors.light.text,
    textAlign: "center",
    marginTop: 10,
  },
  swipeHint: {
    fontSize: 12,
    color: Colors.accent,
    fontStyle: "italic",
    marginTop: 5,
  },
  redeemIndicator: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
