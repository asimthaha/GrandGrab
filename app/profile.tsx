import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import { mockUser } from "../constants/MockData";
import { useAppContext } from "../contexts/AppContext";

export default function ProfileScreen() {
  const [animatedValues] = useState({
    totalSaved: useRef(new Animated.Value(0)).current,
    itemsRedeemed: useRef(new Animated.Value(0)).current,
    businessesVisited: useRef(new Animated.Value(0)).current,
  });

  useEffect(() => {
    const animateValue = (animatedValue: Animated.Value, toValue: number) => {
      Animated.timing(animatedValue, {
        toValue,
        duration: 2000,
        useNativeDriver: false,
      }).start();
    };

    animateValue(animatedValues.totalSaved, mockUser.stats.totalSaved);
    animateValue(animatedValues.itemsRedeemed, mockUser.stats.itemsRedeemed);
    animateValue(
      animatedValues.businessesVisited,
      mockUser.stats.businessesVisited
    );
  }, [animatedValues]);

  const interpolatedValues = {
    totalSaved: animatedValues.totalSaved.interpolate({
      inputRange: [0, mockUser.stats.totalSaved],
      outputRange: ["$0.00", "$" + mockUser.stats.totalSaved.toFixed(2)],
    }),
    itemsRedeemed: animatedValues.itemsRedeemed.interpolate({
      inputRange: [0, mockUser.stats.itemsRedeemed],
      outputRange: ["0", mockUser.stats.itemsRedeemed.toString()],
    }),
    businessesVisited: animatedValues.businessesVisited.interpolate({
      inputRange: [0, mockUser.stats.businessesVisited],
      outputRange: ["0", mockUser.stats.businessesVisited.toString()],
    }),
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={60} color={Colors.secondary} />
        </View>
        <Text style={styles.userName}>{mockUser.name}</Text>
        <Text style={styles.userEmail}>{mockUser.email}</Text>
        <Text style={styles.userJoinDate}>
          Joined {new Date(mockUser.joinDate).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>Your Treasure Stats</Text>

        <View style={styles.statCard}>
          <Ionicons name="cash" size={40} color={Colors.success} />
          <View style={styles.statInfo}>
            <Text style={styles.statLabel}>Money Saved</Text>
            <Animated.Text style={styles.statValue}>
              {interpolatedValues.totalSaved}
            </Animated.Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <Ionicons name="gift" size={40} color={Colors.accent} />
          <View style={styles.statInfo}>
            <Text style={styles.statLabel}>Meals Saved</Text>
            <Animated.Text style={styles.statValue}>
              {interpolatedValues.itemsRedeemed}
            </Animated.Text>
          </View>
        </View>

        <View style={styles.statCard}>
          <Ionicons name="business" size={40} color={Colors.primary} />
          <View style={styles.statInfo}>
            <Text style={styles.statLabel}>Businesses Visited</Text>
            <Animated.Text style={styles.statValue}>
              {interpolatedValues.businessesVisited}
            </Animated.Text>
          </View>
        </View>
      </View>

      <View style={styles.settingsContainer}>
        <Text style={styles.sectionTitle}>Settings</Text>

        <View style={styles.settingSection}>
          <Text style={styles.settingTitle}>Notifications</Text>
          <TouchableOpacity style={styles.settingOption}>
            <Text style={styles.settingText}>Push Notifications</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingOption}>
            <Text style={styles.settingText}>Email Alerts</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.settingSection}>
          <Text style={styles.settingTitle}>Preferences</Text>
          <TouchableOpacity style={styles.settingOption}>
            <Text style={styles.settingText}>Theme</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.settingOption}>
            <Text style={styles.settingText}>Language</Text>
            <Ionicons name="chevron-forward" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="help-circle" size={24} color={Colors.secondary} />
            <Text style={styles.actionText}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="log-out" size={24} color={Colors.secondary} />
            <Text style={styles.actionText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  header: {
    alignItems: "center",
    paddingVertical: 40,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.accent,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  userName: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.secondary,
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: Colors.secondary,
    opacity: 0.8,
  },
  userJoinDate: {
    fontSize: 14,
    color: Colors.secondary,
    opacity: 0.6,
    marginTop: 5,
  },
  statsContainer: {
    padding: 20,
  },
  statsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    textAlign: "center",
    marginBottom: 20,
  },
  statCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statInfo: {
    flex: 1,
    marginLeft: 15,
  },
  statLabel: {
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 5,
  },
  statValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.primary,
  },
  settingsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 20,
  },
  settingSection: {
    marginBottom: 30,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 10,
  },
  settingOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.light.background,
    padding: 15,
    borderRadius: 8,
    marginVertical: 5,
  },
  settingText: {
    fontSize: 16,
    color: Colors.light.text,
  },
  actionsContainer: {
    marginTop: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 15,
    marginVertical: 5,
  },
  actionText: {
    color: Colors.secondary,
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 15,
  },
});
