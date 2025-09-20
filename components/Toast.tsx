import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../constants/Colors";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number;
  onDismiss?: () => void;
  visible: boolean;
}

export default function Toast({
  message,
  type = "success",
  duration = 3000,
  onDismiss,
  visible,
}: ToastProps) {
  const slideAnim = useRef(new Animated.Value(100)).current; // Start below screen

  const dismiss = useCallback(() => {
    Animated.timing(slideAnim, {
      toValue: 100,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onDismiss?.();
    });
  }, [slideAnim, onDismiss]);

  useEffect(() => {
    if (visible) {
      // Slide in
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();

      // Auto dismiss
      const timer = setTimeout(() => {
        dismiss();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration, dismiss, slideAnim]);

  if (!visible) return null;

  const getIconName = () => {
    switch (type) {
      case "success":
        return "checkmark-circle";
      case "error":
        return "close-circle";
      case "info":
        return "information-circle";
      default:
        return "checkmark-circle";
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return Colors.success;
      case "error":
        return Colors.accent; // Assuming accent is red-like
      case "info":
        return Colors.primary;
      default:
        return Colors.success;
    }
  };

  return (
    <Animated.View
      style={[styles.container, { transform: [{ translateY: slideAnim }] }]}
    >
      <View
        style={[styles.toast, { backgroundColor: getBackgroundColor() }]}
        accessible={true}
        accessibilityLabel={`${type} notification: ${message}`}
        accessibilityRole="alert"
      >
        <Ionicons
          name={getIconName()}
          size={24}
          color={Colors.secondary}
          style={styles.icon}
        />
        <Text style={styles.message}>{message}</Text>
        <TouchableOpacity
          onPress={dismiss}
          style={styles.closeButton}
          accessible={true}
          accessibilityLabel="Close notification"
          accessibilityRole="button"
        >
          <Ionicons name="close" size={20} color={Colors.secondary} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 100, // Above bottom tab
    left: 16,
    right: 16,
    zIndex: 1000,
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    marginRight: 12,
  },
  message: {
    flex: 1,
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: "500",
  },
  closeButton: {
    padding: 4,
    marginLeft: 8,
  },
});
