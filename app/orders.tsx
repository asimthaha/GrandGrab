import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { Colors } from "../constants/Colors";
import { mockOrders, Order } from "../constants/MockData";

const CountdownTimer = ({ pickupTime }: { pickupTime: string }) => {
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const pickup = new Date(pickupTime).getTime();
      const diff = pickup - now;

      if (diff > 0) {
        const hours = Math.floor(
          (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      } else {
        setTimeLeft("Overdue");
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [pickupTime]);

  return (
    <Text style={styles.countdown}>
      {timeLeft === "Overdue" ? "Overdue" : `Pickup in: ${timeLeft}`}
    </Text>
  );
};

export default function OrdersScreen() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "current", title: "Current Orders" },
    { key: "history", title: "Order History" },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const generatePickupCode = () => {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const handleRedeem = (order: Order) => {
    const code = generatePickupCode();
    setSelectedOrder({ ...order, pickupCode: code });
    setModalVisible(true);
  };

  const confirmRedeem = () => {
    if (selectedOrder) {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === selectedOrder.id
            ? { ...selectedOrder, status: "picked_up" as const }
            : order
        )
      );
      setModalVisible(false);
      setSelectedOrder(null);
    }
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
          handleRedeem(item);
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
          style={[styles.orderCard, { transform: [{ translateX }] }]}
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
            {item.status !== "picked_up" && (
              <CountdownTimer pickupTime={item.pickupTime} />
            )}
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

  const CurrentScene = () => {
    const currentOrders = orders.filter(
      (order) => order.status !== "picked_up"
    );
    return (
      <View style={styles.scene}>
        {currentOrders.length > 0 ? (
          <FlatList
            data={currentOrders}
            renderItem={renderOrderCard}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="list-outline" size={100} color={Colors.primary} />
            <Text style={styles.emptyText}>No current orders!</Text>
            <Text style={styles.emptySubtext}>
              Your active orders will appear here.
            </Text>
          </View>
        )}
      </View>
    );
  };

  const HistoryScene = () => {
    const historyOrders = orders.filter(
      (order) => order.status === "picked_up"
    );
    return (
      <View style={styles.scene}>
        {historyOrders.length > 0 ? (
          <FlatList
            data={historyOrders}
            renderItem={renderOrderCard}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="time-outline" size={100} color={Colors.primary} />
            <Text style={styles.emptyText}>No order history yet!</Text>
            <Text style={styles.emptySubtext}>
              Your completed orders will appear here.
            </Text>
          </View>
        )}
      </View>
    );
  };

  const renderScene = SceneMap({
    current: CurrentScene,
    history: HistoryScene,
  });

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get("window").width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: Colors.accent }}
            style={{ backgroundColor: Colors.primary }}
          />
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Pickup Code</Text>
            <Text style={styles.modalCode}>{selectedOrder?.pickupCode}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={confirmRedeem}
            >
              <Text style={styles.modalButtonText}>Confirm Redemption</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  scene: {
    flex: 1,
    padding: 16,
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
  countdown: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.accent,
    marginTop: 5,
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 15,
  },
  modalCode: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.success,
    marginBottom: 30,
  },
  modalButton: {
    backgroundColor: Colors.success,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  modalButtonText: {
    color: Colors.secondary,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalCancel: {
    padding: 10,
  },
  modalCancelText: {
    color: Colors.accent,
    fontWeight: "bold",
  },
});
