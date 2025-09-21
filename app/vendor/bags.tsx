import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/Colors";

const VendorBags = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bag Management</Text>
        <Text style={styles.subtitle}>
          Create and manage your surprise bags
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Active Bags</Text>

        <View style={styles.bagCard}>
          <View style={styles.bagHeader}>
            <Text style={styles.bagName}>Bakery Surprise Bag</Text>
            <Text style={styles.bagPrice}>$7.99</Text>
          </View>
          <Text style={styles.bagDescription}>
            Assorted fresh breads and pastries
          </Text>
          <View style={styles.bagStats}>
            <Text style={styles.bagStat}>Available: 5</Text>
            <Text style={styles.bagStat}>Sold: 3</Text>
          </View>
        </View>

        <View style={styles.bagCard}>
          <View style={styles.bagHeader}>
            <Text style={styles.bagName}>Grocery Surprise Bag</Text>
            <Text style={styles.bagPrice}>$12.99</Text>
          </View>
          <Text style={styles.bagDescription}>
            Fresh produce and dairy items
          </Text>
          <View style={styles.bagStats}>
            <Text style={styles.bagStat}>Available: 3</Text>
            <Text style={styles.bagStat}>Sold: 2</Text>
          </View>
        </View>
      </View>

      <View style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add New Bag</Text>
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
  bagCard: {
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
  bagHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  bagName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.text,
  },
  bagPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.accent,
  },
  bagDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  bagStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bagStat: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: "600",
  },
  addButton: {
    backgroundColor: Colors.accent,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  addButtonText: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default VendorBags;
