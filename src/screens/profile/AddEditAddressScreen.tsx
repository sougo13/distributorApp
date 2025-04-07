// src/screens/profile/AddEditAddressScreen.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  Text,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import * as styles from "../../styles";
import PrimaryButton from "../../components/PrimaryButton";
import FormInput from "../../components/FormInput";
import { ProfileStackParamList } from "../../navigation/ProfileStackNavigator";

// Define route prop type
type AddEditAddressRouteProp = RouteProp<ProfileStackParamList, 'AddEditAddress'>;
// Define navigation prop type
type AddEditAddressNavigationProp = StackNavigationProp<ProfileStackParamList, 'AddEditAddress'>;

const AddEditAddressScreen = () => {
  const navigation = useNavigation<AddEditAddressNavigationProp>();
  const route = useRoute<AddEditAddressRouteProp>();
  const addressId = route.params?.addressId; // Get ID if editing
  const isEditing = !!addressId;

  // --- State ---
  const [fullAddress, setFullAddress] = useState("");
  // Add state for other fields if you decide to split the address
  // const [city, setCity] = useState("");
  // const [postalCode, setPostalCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Effects ---
  useEffect(() => {
    if (isEditing) {
      // TODO: Fetch the address data based on addressId
      console.log("Editing address with ID:", addressId);
      // Simulate fetching data for editing
      setIsLoading(true);
      setTimeout(() => {
        // Replace with actual fetched data
        setFullAddress(`Fetched Address for ID ${addressId}`);
        setIsLoading(false);
      }, 500);
    } else {
        console.log("Adding new address");
        // Optionally clear fields if navigating back and forth
        setFullAddress("");
    }
  }, [addressId, isEditing]); // Re-run if addressId changes

  // --- Handlers ---
  const handleSaveAddress = () => {
    setError(null);
    if (!fullAddress) {
      setError("Please enter the full address.");
      return;
    }
    // TODO: Add more validation if needed

    console.log("Saving address:", { id: addressId, fullAddress }); // Log ID if editing
    setIsLoading(true);

    // Simulate API call (either create or update)
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("Success", `Address ${isEditing ? 'updated' : 'saved'} successfully.`);
      navigation.goBack(); // Go back to the list screen after saving
    }, 1500);
  };

  return (
    <SafeAreaView style={s.safeArea}>
      <KeyboardAvoidingView
        style={s.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView
          style={s.scrollView}
          contentContainerStyle={s.scrollContentContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* Single input for full address as per design */}
          <FormInput
            label="Full Address"
            // iconName="location-outline" // Optional icon
            value={fullAddress}
            onChangeText={setFullAddress}
            placeholder="Enter street, city, region..."
            // Potentially use multiline if addresses can be long?
            // multiline={true}
            // numberOfLines={3}
            // style={{ height: 100, textAlignVertical: 'top' }} // Adjust input style for multiline
          />

          {/* Add other FormInput components here if you split the address */}
          {/*
          <FormInput label="City" ... />
          <FormInput label="Postal Code" ... />
          */}

          {/* Map Placeholder - Implement later */}
          {/*
          <View style={s.mapPlaceholder}>
              <Text style={s.mapPlaceholderText}>Map View Placeholder</Text>
          </View>
          */}

          {error && <Text style={s.errorText}>{error}</Text>}

        </ScrollView>

        <View style={s.buttonContainer}>
          <PrimaryButton
            title={isEditing ? "Update Address" : "Save Address"}
            onPress={handleSaveAddress}
            loading={isLoading}
            disabled={isLoading} // Disable button while loading existing address too
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: styles.COLORS.primary,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: styles.SPACING.containerPadding,
    paddingBottom: styles.SPACING.xl,
  },
  buttonContainer: {
    paddingHorizontal: styles.SPACING.containerPadding,
    paddingBottom: Platform.OS === "ios" ? styles.SPACING.l : styles.SPACING.m,
    paddingTop: styles.SPACING.s,
    backgroundColor: styles.COLORS.primary,
  },
   errorText: {
      color: 'red',
      fontSize: styles.FONT_SIZES.bodyS,
      fontFamily: styles.FONT_FAMILY.regular,
      textAlign: 'center',
      marginTop: styles.SPACING.s,
      marginBottom: styles.SPACING.xs,
  },
  // Styles for map placeholder (optional for now)
  // mapPlaceholder: {
  //   height: 200,
  //   backgroundColor: styles.COLORS.inputBackground,
  //   borderRadius: styles.COMPONENT_STYLES.borderRadius,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginTop: styles.SPACING.m,
  // },
  // mapPlaceholderText: {
  //   color: styles.COLORS.grey,
  //   fontSize: styles.FONT_SIZES.bodyM,
  // },
});

export default AddEditAddressScreen;