import React from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/Colors";

const VendorProfile = () => {
  const vendor = {
    businessName: "Golden Crust Bakery",
    ownerName: "Maria Rodriguez",
    email: "maria@goldencrust.com",
    phone: "+1-555-0123",
    joinDate: "March 15, 2023",
    subscription: "premium",
    settings: {
      notifications: true,
      autoConfirm: false,
      closedDays: ["Sunday"],
    },
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Business Profile</Text>
        <Text style={styles.subtitle}>Manage your business settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Business Information</Text>

        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Business Name</Text>
            <Text style={styles.infoValue}>{vendor.businessName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Owner Name</Text>
            <Text style={styles.infoValue}>{vendor.ownerName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{vendor.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoValue}>{vendor.phone}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Member Since</Text>
            <Text style={styles.infoValue}>{vendor.joinDate}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Business Information</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Subscription</Text>
        <View style={styles.subscriptionCard}>
          <View style={styles.subscriptionHeader}>
            <Text style={styles.subscriptionType}>
              {vendor.subscription === "premium" ? "Premium" : "Free"} Plan
            </Text>
            {vendor.subscription === "premium" && (
              <View style={styles.premiumBadge}>
                <Text style={styles.premiumBadgeText}>👑</Text>
              </View>
            )}
          </View>
          <Text style={styles.subscriptionDescription}>
            {vendor.subscription === "premium"
              ? "Enjoy all premium features including advanced analytics, priority support, and unlimited bags."
              : "Upgrade to premium for advanced features and unlimited potential."}
          </Text>
          {vendor.subscription === "free" && (
            <TouchableOpacity style={styles.upgradeButton}>
              <Text style={styles.upgradeButtonText}>Upgrade to Premium</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notification Settings</Text>
        <View style={styles.settingsCard}>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Order Notifications</Text>
            <Switch
              value={vendor.settings.notifications}
              onValueChange={() => {}}
              trackColor={{ false: Colors.border, true: Colors.accent }}
              thumbColor={
                vendor.settings.notifications
                  ? Colors.secondary
                  : Colors.textSecondary
              }
            />
          </View>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Auto-confirm Orders</Text>
            <Switch
              value={vendor.settings.autoConfirm}
              onValueChange={() => {}}
              trackColor={{ false: Colors.border, true: Colors.accent }}
              thumbColor={
                vendor.settings.autoConfirm
                  ? Colors.secondary
                  : Colors.textSecondary
              }
            />
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Business Hours</Text>
        <View style={styles.hoursCard}>
          <Text style={styles.hoursInfo}>
            Currently closed on: {vendor.settings.closedDays.join(", ")}
          </Text>
          <TouchableOpacity style={styles.editHoursButton}>
            <Text style={styles.editHoursButtonText}>Edit Hours</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Actions</Text>
        <View style={styles.actionsCard}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>Download Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, styles.logoutButton]}>
            <Text style={[styles.actionButtonText, styles.logoutButtonText]}>
              Logout
            </Text>
          </TouchableOpacity>
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
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.secondary,
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: "600",
  },
  editButton: {
    backgroundColor: Colors.accent,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  editButtonText: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: "600",
  },
  subscriptionCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
  },
  subscriptionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  subscriptionType: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
    marginRight: 12,
  },
  premiumBadge: {
    backgroundColor: Colors.accent,
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  premiumBadgeText: {
    fontSize: 12,
  },
  subscriptionDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  upgradeButton: {
    backgroundColor: Colors.accent,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  upgradeButtonText: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: "600",
  },
  settingsCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingLabel: {
    fontSize: 16,
    color: Colors.text,
  },
  hoursCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
  },
  hoursInfo: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  editHoursButton: {
    backgroundColor: Colors.accent,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  editHoursButtonText: {
    color: Colors.secondary,
    fontSize: 14,
    fontWeight: "600",
  },
  actionsCard: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 16,
  },
  actionButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    padding: 14,
    alignItems: "center",
    marginBottom: 12,
  },
  actionButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    backgroundColor: Colors.accent,
  },
  logoutButtonText: {
    color: Colors.secondary,
  },
});

export default VendorProfile;
