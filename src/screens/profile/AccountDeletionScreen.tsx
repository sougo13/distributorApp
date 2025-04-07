// src/screens/profile/AccountDeletionScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import * as styles from "../../styles";
import PrimaryButton from "../../components/PrimaryButton";
import { ProfileStackParamList } from "../../navigation/ProfileStackNavigator";

// Navigation prop type
type AccountDeletionNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "AccountDeletion"
>;

// List of consequences
const DELETION_CONSEQUENCES = [
  "Any ongoing orders will be canceled.",
  "Refunds may take a few days to process.",
  "You'll need to create a new account if you wish to use our service again.",
];

const AccountDeletionScreen = () => {
  const navigation = useNavigation<AccountDeletionNavigationProp>();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Confirm Deletion",
      "This action is permanent and cannot be undone. Are you absolutely sure you want to delete your account?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete Account",
          style: "destructive", // Makes text red on iOS
          onPress: () => performDeletion(),
        },
      ]
    );
  };

  const performDeletion = () => {
    console.log("Performing account deletion...");
    setIsLoading(true);

    // Simulate API call for deletion
    setTimeout(() => {
      setIsLoading(false);
      console.log("Account deleted successfully.");
      // --- IMPORTANT ---
      // TODO: Implement actual logout & navigation logic
      // 1. Clear user session/token (AsyncStorage, etc.)
      // 2. Update global state (isLoggedIn = false in App.tsx)
      // This will automatically navigate the user away from the protected routes
      Alert.alert(
        "Account Deleted",
        "Your account has been permanently deleted."
      );
      // Example: Trigger logout function passed via props or context
      // logoutFunction();
    }, 2000); // Simulate 2 seconds delay
  };

  const renderConsequenceItem = (text: string, index: number) => (
    <View key={index} style={s.consequenceItem}>
      <View style={s.bulletPoint} />
      <Text style={s.consequenceText}>{text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={s.safeArea}>
      <ScrollView
        style={s.scrollView}
        contentContainerStyle={s.scrollContentContainer}
      >
        <Text style={s.mainText}>
          We're sorry to see you go. Deleting your account will permanently
          remove your profile, order history, and saved preferences. This action
          cannot be undone.
        </Text>

        <Text style={s.subHeaderText}>Before you proceed:</Text>

        {DELETION_CONSEQUENCES.map(renderConsequenceItem)}
      </ScrollView>

      {/* Buttons Container */}
      <View style={s.buttonContainer}>
        {/* Back Button */}
        <TouchableOpacity
          style={s.backButton}
          onPress={handleGoBack}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          <Text style={s.backButtonText}>Back</Text>
        </TouchableOpacity>

        {/* Delete Button */}
        <View style={s.deleteButtonWrapper}>
          <PrimaryButton
            title="Delete My Account"
            onPress={handleDeleteAccount}
            loading={isLoading}
            disabled={isLoading}
            // Optional: Change button color for destructive action (requires modification in PrimaryButton or a new component)
            // style={{ backgroundColor: 'red' }}
            // textStyle={{ color: styles.COLORS.white }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: styles.COLORS.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: styles.SPACING.containerPadding,
    paddingBottom: styles.SPACING.xl, // Space above buttons
  },
  mainText: {
    color: styles.COLORS.accent,
    fontSize: styles.FONT_SIZES.bodyM,
    fontFamily: styles.FONT_FAMILY.regular,
    lineHeight: styles.FONT_SIZES.bodyM * 1.5,
    marginBottom: styles.SPACING.xl,
  },
  subHeaderText: {
    color: styles.COLORS.accent,
    fontSize: styles.FONT_SIZES.bodyM,
    fontFamily: styles.FONT_FAMILY.medium, // Make it slightly bolder
    marginBottom: styles.SPACING.m,
  },
  consequenceItem: {
    flexDirection: "row",
    alignItems: "flex-start", // Align items to the top
    marginBottom: styles.SPACING.m,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: styles.COLORS.grey, // Use grey color for bullet
    marginRight: styles.SPACING.m,
    marginTop: Platform.OS === "ios" ? 5 : 6, // Adjust vertical alignment of bullet
  },
  consequenceText: {
    flex: 1, // Allow text to wrap
    color: styles.COLORS.grey, // Muted text color for consequences
    fontSize: styles.FONT_SIZES.bodyM,
    fontFamily: styles.FONT_FAMILY.regular,
    lineHeight: styles.FONT_SIZES.bodyM * 1.5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: styles.SPACING.containerPadding,
    paddingBottom: Platform.OS === "ios" ? styles.SPACING.l : styles.SPACING.m,
    paddingTop: styles.SPACING.s,
    backgroundColor: styles.COLORS.primary, // Match background
  },
  backButton: {
    backgroundColor: styles.COLORS.deleteButtonBackBackground, // Use the defined semi-transparent dark color
    height: styles.COMPONENT_STYLES.buttonHeight,
    borderRadius: styles.COMPONENT_STYLES.borderRadius,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: styles.SPACING.l, // Adjust padding as needed
    marginRight: styles.SPACING.s, // Space between buttons
    flex: 1, // Make buttons roughly equal width
  },
  backButtonText: {
    color: styles.COLORS.accent, // White text on dark button
    fontSize: styles.FONT_SIZES.button,
    fontFamily: styles.FONT_FAMILY.medium,
  },
  deleteButtonWrapper: {
    flex: 1, // Make buttons roughly equal width
    marginLeft: styles.SPACING.s, // Space between buttons
  },
  // PrimaryButton already styles the delete button correctly based on design
});

export default AccountDeletionScreen;
