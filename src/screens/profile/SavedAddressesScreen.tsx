// src/screens/profile/SavedAddressesScreen.tsx
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity, // For the "Add New" button
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import * as styles from "../../styles";
import AddressListItem from "../../components/AddressListItem"; // Import the new component
import { ProfileStackParamList } from "../../navigation/ProfileStackNavigator"; // Import Param List

// Mock data type
interface Address {
  id: string;
  fullAddress: string;
  // Add other fields if needed later (city, postalCode, etc.)
}

// Mock Data (replace with actual data fetching)
const MOCK_ADDRESSES: Address[] = [
  { id: "1", fullAddress: "38 Kote and Soso Tsereteli Street, Tbilisi" },
  { id: "2", fullAddress: "12 Rustaveli Avenue, Batumi, Georgia" },
  { id: "3", fullAddress: "Another Saved Address Example, City Name" },
];

// Navigation prop type
type SavedAddressesNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "SavedAddresses"
>;

const SavedAddressesScreen = () => {
  const navigation = useNavigation<SavedAddressesNavigationProp>();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- Effects ---
  useEffect(() => {
    // Simulate fetching addresses
    setTimeout(() => {
      setAddresses(MOCK_ADDRESSES);
      setIsLoading(false);
    }, 500); // Simulate short delay
  }, []);

  // --- Handlers ---
  const handleEditAddress = useCallback(
    (addressId: string) => {
      navigation.navigate("AddEditAddress", { addressId }); // Pass ID for editing
    },
    [navigation]
  );

  const handleAddNewAddress = useCallback(() => {
    navigation.navigate("AddEditAddress", {}); // No ID means adding new
  }, [navigation]);

  // --- Render ---
  const renderAddressItem = ({ item }: { item: Address }) => (
    <AddressListItem
      id={item.id}
      addressText={item.fullAddress}
      onPress={handleEditAddress}
    />
  );

  // TODO: Add a loading indicator while fetching
  // TODO: Add empty state text if addresses.length === 0

  return (
    <SafeAreaView style={s.safeArea}>
      <FlatList
        data={addresses}
        renderItem={renderAddressItem}
        keyExtractor={(item) => item.id}
        style={s.list}
        contentContainerStyle={s.listContent}
        ListEmptyComponent={
          !isLoading ? ( // Show only after loading is done
            <View style={s.emptyContainer}>
              <Text style={s.emptyText}>
                You haven't saved any addresses yet.
              </Text>
            </View>
          ) : null
        }
      />

      {/* "Add New Address" Button */}
      <TouchableOpacity
        style={s.addButton}
        onPress={handleAddNewAddress}
        activeOpacity={0.8}
      >
        <Ionicons
          name="add-outline"
          size={28}
          color={styles.COLORS.accent} // White icon
          style={s.addIcon}
        />
        <Text style={s.addButtonText}>Add New Address</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: styles.COLORS.primary,
  },
  list: {
    flex: 1, // Takes up available space before the button
  },
  listContent: {
    padding: styles.SPACING.containerPadding,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: styles.COLORS.inputBackground, // Same as list items
    borderRadius: styles.COMPONENT_STYLES.borderRadius,
    paddingVertical: styles.SPACING.m,
    paddingHorizontal: styles.SPACING.m,
    margin: styles.SPACING.containerPadding, // Margin around the button
    // Position it above the tab bar if needed, adjust SafeAreaView/padding
  },
  addIcon: {
    marginRight: styles.SPACING.m,
  },
  addButtonText: {
    color: styles.COLORS.accent,
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.bodyM,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50, // Adjust as needed
  },
  emptyText: {
    color: styles.COLORS.grey,
    fontSize: styles.FONT_SIZES.bodyM,
    fontFamily: styles.FONT_FAMILY.regular,
  },
});

export default SavedAddressesScreen;
