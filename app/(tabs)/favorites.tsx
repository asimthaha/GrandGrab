import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../../constants/Colors";
import { Business, mockBusinesses } from "../../constants/MockData";
import { useAppContext } from "../../contexts/AppContext";

export default function FavoritesScreen() {
  const { favorites } = useAppContext();
  const favoriteBusinesses = mockBusinesses.filter((business) =>
    favorites.includes(business.id)
  );

  const renderBusinessCard = ({ item }: { item: Business }) => (
    <View style={styles.businessCard}>
      <View style={styles.businessInfo}>
        <Text style={styles.businessName}>{item.name}</Text>
        <Text style={styles.businessDescription}>{item.description}</Text>
        <Text style={styles.businessDistance}>{item.distance} miles away</Text>
        <Text style={styles.businessRating}>⭐ {item.rating}</Text>
      </View>
      <TouchableOpacity style={styles.favoriteButton}>
        <Ionicons name="heart" size={24} color={Colors.accent} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.screenHeader}>Your Treasures</Text>
      {favoriteBusinesses.length > 0 ? (
        <FlatList
          data={favoriteBusinesses}
          renderItem={renderBusinessCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Ionicons name="heart-outline" size={100} color={Colors.primary} />
          <Text style={styles.emptyText}>No favorites yet!</Text>
          <Text style={styles.emptySubtext}>
            Start exploring to add some treasures.
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
  businessCard: {
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
  businessInfo: {
    flex: 1,
  },
  businessName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 5,
  },
  businessDescription: {
    fontSize: 14,
    color: Colors.light.text,
    marginBottom: 5,
  },
  businessDistance: {
    fontSize: 12,
    color: Colors.accent,
    marginBottom: 5,
  },
  businessRating: {
    fontSize: 14,
    color: Colors.success,
  },
  favoriteButton: {
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
});
