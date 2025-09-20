import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Animated,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../constants/Colors";
import {
  Business,
  mockBusinesses,
  mockLocalHauls,
} from "../constants/MockData";
import { Styles } from "../constants/Styles";
import { useAppContext } from "../contexts/AppContext";

export default function DiscoverScreen() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>(mockBusinesses);
  const { favorites, toggleFavorite } = useAppContext();

  useEffect(() => {
    (async () => {
      // Request location permissions
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Location permission is required for distance calculation."
        );
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      // Calculate distances (simplified - in real app, use Haversine formula)
      const updatedBusinesses = mockBusinesses.map((business) => {
        const distance =
          Math.sqrt(
            Math.pow(business.location.latitude - latitude, 2) +
              Math.pow(business.location.longitude - longitude, 2)
          ) * 69; // Rough conversion to miles
        return { ...business, distance: Math.round(distance * 10) / 10 };
      });

      setBusinesses(updatedBusinesses);

      // Request notification permissions and send welcome notification
      const { status: notificationStatus } =
        await Notifications.requestPermissionsAsync();
      if (notificationStatus === "granted") {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Welcome to Surprise Bag!",
            body: "Discover amazing treasures near you.",
          },
          trigger: null,
        });
      }
    })();
  }, []);

  const combinedData = useMemo(() => {
    if (viewMode !== "list") return [];

    const filteredBusinesses = businesses.filter((business) => {
      const matchesSearch =
        searchQuery === "" ||
        business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter =
        selectedFilters.length === 0 ||
        selectedFilters.some(
          (filter) =>
            business.name.toLowerCase().includes(filter.toLowerCase()) ||
            business.description.toLowerCase().includes(filter.toLowerCase())
        );
      return matchesSearch && matchesFilter;
    });

    const sortedBusinesses = [...filteredBusinesses].sort((a, b) => {
      if (selectedFilters.includes("nearby")) {
        return a.distance - b.distance;
      }
      return 0;
    });

    const businessItems = sortedBusinesses.map((business) => ({
      type: "business",
      data: business,
    }));

    const localHaulRows = [];
    for (let i = 0; i < mockLocalHauls.length; i += 2) {
      localHaulRows.push({
        type: "localHaulRow",
        data: mockLocalHauls.slice(i, i + 2),
      });
    }

    const data = [
      ...businessItems,
      { type: "sectionTitle", title: "Local Hauls" },
      ...localHaulRows,
    ];
    console.log(
      "Building combinedData, filtered businesses:",
      filteredBusinesses.length,
      "localHauls length:",
      mockLocalHauls.length,
      "total items:",
      data.length
    );
    return data;
  }, [businesses, viewMode, searchQuery, selectedFilters]);

  const BusinessCard = ({ item }: { item: Business }) => {
    const scaleAnim = React.useRef(new Animated.Value(1)).current;

    return (
      <TouchableOpacity
        style={styles.businessCard}
        onPress={() =>
          router.push({
            pathname: "/store-detail",
            params: { business: JSON.stringify(item) },
          })
        }
      >
        <View style={styles.businessInfo}>
          <Text style={styles.businessName}>{item.name}</Text>
          <Text style={styles.businessDescription}>{item.description}</Text>
          <Text style={styles.businessDistance}>
            {item.distance} miles away
          </Text>
          <Text style={styles.businessRating}>⭐ {item.rating}</Text>
        </View>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => {
            toggleFavorite(item.id);
            Animated.sequence([
              Animated.timing(scaleAnim, {
                toValue: 1.3,
                duration: 150,
                useNativeDriver: true,
              }),
              Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
              }),
            ]).start();
          }}
        >
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Ionicons
              name={favorites.includes(item.id) ? "heart" : "heart-outline"}
              size={24}
              color={Colors.primary}
            />
          </Animated.View>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const renderBusinessCard = ({ item }: { item: Business }) => (
    <BusinessCard item={item} />
  );

  const renderLocalHaul = ({ item }: { item: any }) => {
    console.log(
      "Rendering renderLocalHaul for item:",
      item.id,
      "image URI:",
      item.image
    );
    return (
      <View style={styles.localHaulItem}>
        <Image
          source={{ uri: item.image }}
          style={styles.localHaulImage}
          onError={(e) =>
            console.log("Image failed to load for haul:", item.id, "error:", e)
          }
        />
      </View>
    );
  };

  const renderItem = ({ item }: { item: any }) => {
    if (item.type === "business") {
      return renderBusinessCard({ item: item.data });
    } else if (item.type === "sectionTitle") {
      console.log("Rendering sectionTitle:", item.title);
      return <Text style={styles.sectionTitle}>{item.title}</Text>;
    } else if (item.type === "localHaulRow") {
      console.log(
        "Rendering localHaulRow with data length:",
        item.data.length,
        "data:",
        item.data
      );
      return (
        <View style={styles.localHaulRow}>
          {item.data.map((haul: any) => (
            <View key={haul.id} style={{ flex: 1 }}>
              {renderLocalHaul({ item: haul })}
            </View>
          ))}
        </View>
      );
    }
    return null;
  };

  return (
    <View style={Styles.screen}>
      {/* Header with Gradient */}
      <LinearGradient
        colors={[Colors.primary, Colors.accent]}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Discover Treasure</Text>
          <View style={styles.locationSelector}>
            <Ionicons name="location" size={20} color={Colors.secondary} />
            <Text style={styles.locationText}>Current Location</Text>
            <Ionicons name="chevron-down" size={20} color={Colors.secondary} />
          </View>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={Colors.primary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for treasures..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterChips}
          >
            <TouchableOpacity
              style={[
                styles.filterChip,
                selectedFilters.includes("nearby") && styles.selectedFilterChip,
              ]}
              onPress={() =>
                setSelectedFilters((prev) =>
                  prev.includes("nearby")
                    ? prev.filter((f) => f !== "nearby")
                    : [...prev, "nearby"]
                )
              }
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedFilters.includes("nearby") &&
                    styles.selectedFilterChipText,
                ]}
              >
                Nearby
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterChip,
                selectedFilters.includes("bakery") && styles.selectedFilterChip,
              ]}
              onPress={() =>
                setSelectedFilters((prev) =>
                  prev.includes("bakery")
                    ? prev.filter((f) => f !== "bakery")
                    : [...prev, "bakery"]
                )
              }
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedFilters.includes("bakery") &&
                    styles.selectedFilterChipText,
                ]}
              >
                Bakery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterChip,
                selectedFilters.includes("grocery") &&
                  styles.selectedFilterChip,
              ]}
              onPress={() =>
                setSelectedFilters((prev) =>
                  prev.includes("grocery")
                    ? prev.filter((f) => f !== "grocery")
                    : [...prev, "grocery"]
                )
              }
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedFilters.includes("grocery") &&
                    styles.selectedFilterChipText,
                ]}
              >
                Grocery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterChip,
                selectedFilters.includes("clothing") &&
                  styles.selectedFilterChip,
              ]}
              onPress={() =>
                setSelectedFilters((prev) =>
                  prev.includes("clothing")
                    ? prev.filter((f) => f !== "clothing")
                    : [...prev, "clothing"]
                )
              }
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedFilters.includes("clothing") &&
                    styles.selectedFilterChipText,
                ]}
              >
                Clothing
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.filterChip,
                selectedFilters.includes("electronics") &&
                  styles.selectedFilterChip,
              ]}
              onPress={() =>
                setSelectedFilters((prev) =>
                  prev.includes("electronics")
                    ? prev.filter((f) => f !== "electronics")
                    : [...prev, "electronics"]
                )
              }
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedFilters.includes("electronics") &&
                    styles.selectedFilterChipText,
                ]}
              >
                Electronics
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* View Toggle */}
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === "list" && styles.activeToggle,
            ]}
            onPress={() => setViewMode("list")}
          >
            <Ionicons
              name="list"
              size={20}
              color={viewMode === "list" ? Colors.secondary : Colors.primary}
            />
            <Text
              style={[
                styles.toggleText,
                viewMode === "list" && styles.activeToggleText,
              ]}
            >
              List
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === "map" && styles.activeToggle,
            ]}
            onPress={() => setViewMode("map")}
          >
            <Ionicons
              name="map"
              size={20}
              color={viewMode === "map" ? Colors.secondary : Colors.primary}
            />
            <Text
              style={[
                styles.toggleText,
                viewMode === "map" && styles.activeToggleText,
              ]}
            >
              Map
            </Text>
          </TouchableOpacity>
        </View>

        {/* Business List and Local Hauls */}
        {viewMode === "list" && (
          <FlatList
            data={combinedData}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.type + index.toString()}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Map View Placeholder */}
        {viewMode === "map" && (
          <View style={styles.mapPlaceholder}>
            <Ionicons name="map" size={100} color={Colors.primary} />
            <Text style={styles.mapText}>Map View Coming Soon!</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.secondary,
    textAlign: "center",
    marginBottom: 20,
  },
  locationSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.secondary,
    borderRadius: 25,
    padding: 10,
    marginBottom: 15,
  },
  locationText: {
    flex: 1,
    marginHorizontal: 10,
    color: Colors.primary,
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.secondary,
    borderRadius: 25,
    padding: 10,
    marginBottom: 15,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: Colors.primary,
  },
  filterChips: {
    flexDirection: "row",
  },
  filterChip: {
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  filterChipText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "600",
  },
  selectedFilterChip: {
    backgroundColor: Colors.primary,
  },
  selectedFilterChipText: {
    color: Colors.secondary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  viewToggle: {
    flexDirection: "row",
    backgroundColor: Colors.light.background,
    borderRadius: 25,
    padding: 5,
    marginVertical: 20,
    alignSelf: "center",
  },
  toggleButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  activeToggle: {
    backgroundColor: Colors.primary,
  },
  toggleText: {
    marginLeft: 5,
    fontSize: 16,
    color: Colors.primary,
  },
  activeToggleText: {
    color: Colors.secondary,
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
  mapPlaceholder: {
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    marginVertical: 20,
  },
  mapText: {
    fontSize: 18,
    color: Colors.primary,
    marginTop: 10,
  },
  map: {
    flex: 1,
  },
  localHaulsSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 15,
  },
  localHaulItem: {
    flex: 1,
    marginHorizontal: 5,
    aspectRatio: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  localHaulImage: {
    height: "100%",
    resizeMode: "cover",
  },
  localHaulRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
});
