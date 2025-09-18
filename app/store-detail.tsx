import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../constants/Colors";
import { Business, SurpriseBag } from "../constants/MockData";

const { width } = Dimensions.get("window");

export default function StoreDetailScreen() {
  const { business: businessString } = useLocalSearchParams();
  const business: Business = JSON.parse(businessString as string);

  const handleReserve = (surpriseBag: SurpriseBag) => {
    // TODO: Implement reserve functionality
    // Create new order, navigate to orders
    console.log("Reserve", surpriseBag);
  };

  const SurpriseBagCard = ({ bag }: { bag: SurpriseBag }) => (
    <View style={styles.surpriseBagCard}>
      <Image source={{ uri: bag.image }} style={styles.bagImage} />
      <View style={styles.bagInfo}>
        <Text style={styles.bagName}>{bag.name}</Text>
        <Text style={styles.bagDescription}>{bag.description}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.originalPrice}>${bag.originalPrice}</Text>
          <Text style={styles.discountedPrice}>${bag.discountedPrice}</Text>
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>
              {bag.discountPercentage}% OFF
            </Text>
          </View>
        </View>
        <View style={styles.pickupInfo}>
          <Ionicons name="time-outline" size={16} color={Colors.primary} />
          <Text style={styles.pickupText}>
            Pickup:{" "}
            {new Date(bag.pickupWindow.start).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            -{" "}
            {new Date(bag.pickupWindow.end).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
        <Text style={styles.quantityText}>
          {bag.availableQuantity} available
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Hero Image */}
        <Image source={{ uri: business.heroImage }} style={styles.heroImage} />

        {/* Business Info */}
        <View style={styles.businessInfoSection}>
          <View style={styles.businessHeader}>
            <View style={styles.businessDetails}>
              <Text style={styles.businessName}>{business.name}</Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color={Colors.success} />
                <Text style={styles.ratingText}>{business.rating}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.favoriteButton}>
              <Ionicons name="heart-outline" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          <View style={styles.locationContainer}>
            <Ionicons name="location" size={16} color={Colors.primary} />
            <Text style={styles.addressText}>{business.location.address}</Text>
          </View>

          <Text style={styles.businessDescription}>{business.description}</Text>
        </View>

        {/* Surprise Bags */}
        <View style={styles.surpriseBagsSection}>
          <Text style={styles.sectionTitle}>Surprise Bags</Text>
          {business.surpriseBags.map((bag) => (
            <SurpriseBagCard key={bag.id} bag={bag} />
          ))}
        </View>
      </ScrollView>

      {/* Fixed Reserve Button */}
      {business.surpriseBags.length > 0 && (
        <LinearGradient
          colors={[Colors.primary, Colors.accent]}
          style={styles.reserveButtonContainer}
        >
          <TouchableOpacity
            style={styles.reserveButton}
            onPress={() => handleReserve(business.surpriseBags[0])}
          >
            <Ionicons name="bag-handle" size={24} color={Colors.secondary} />
            <Text style={styles.reserveButtonText}>Reserve Surprise Bag</Text>
          </TouchableOpacity>
        </LinearGradient>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  scrollView: {
    flex: 1,
  },
  heroImage: {
    width: width,
    height: 250,
    resizeMode: "cover",
  },
  businessInfoSection: {
    padding: 20,
    backgroundColor: Colors.light.background,
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  businessHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  businessDetails: {
    flex: 1,
  },
  businessName: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    color: Colors.success,
    fontWeight: "600",
  },
  favoriteButton: {
    padding: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  addressText: {
    marginLeft: 5,
    fontSize: 16,
    color: Colors.light.text,
  },
  businessDescription: {
    fontSize: 16,
    color: Colors.light.text,
    lineHeight: 24,
  },
  surpriseBagsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 20,
  },
  surpriseBagCard: {
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bagImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    resizeMode: "cover",
  },
  bagInfo: {
    flex: 1,
    marginLeft: 16,
  },
  bagName: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 4,
  },
  bagDescription: {
    fontSize: 14,
    color: Colors.light.text,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  originalPrice: {
    fontSize: 16,
    color: Colors.light.text,
    textDecorationLine: "line-through",
    marginRight: 8,
  },
  discountedPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.success,
    marginRight: 8,
  },
  discountBadge: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  discountText: {
    color: Colors.secondary,
    fontSize: 12,
    fontWeight: "bold",
  },
  pickupInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  pickupText: {
    marginLeft: 4,
    fontSize: 14,
    color: Colors.primary,
  },
  quantityText: {
    fontSize: 14,
    color: Colors.accent,
    fontWeight: "600",
  },
  reserveButtonContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  reserveButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 25,
  },
  reserveButtonText: {
    color: Colors.secondary,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
