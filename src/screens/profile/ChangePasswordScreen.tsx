// src/screens/profile/ChangePasswordScreen.tsx
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  Text, // For potential error messages
} from "react-native";
import * as styles from "../../styles"; // Import styles
import PrimaryButton from "../../components/PrimaryButton"; // Import custom button
import FormInput from "../../components/FormInput"; // Import custom input

const ChangePasswordScreen = () => {
  // --- State ---
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // General error message

  // --- Handlers ---
  const handleSaveChanges = () => {
    setError(null); // Clear previous errors

    // --- Basic Validation ---
    if (!currentPassword || !newPassword || !repeatNewPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (newPassword !== repeatNewPassword) {
      setError("New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      // Example minimum length validation
      setError("New password must be at least 6 characters long.");
      return;
    }
    // TODO: Add more complex password validation if needed (strength, etc.)
    // TODO: Add check for current password validity via API

    console.log("Changing password...");
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // --- Handle API response ---
      const isSuccess = Math.random() > 0.2; // Simulate success/failure (replace with actual API result)

      if (isSuccess) {
        Alert.alert("Success", "Password changed successfully.");
        // Clear fields after success
        setCurrentPassword("");
        setNewPassword("");
        setRepeatNewPassword("");
        // Optionally navigate back
        // navigation.goBack();
      } else {
        setError(
          "Failed to change password. Please check your current password or try again later."
        );
        // Don't clear fields on failure
      }
    }, 1500); // Simulate 1.5 seconds delay
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
          <FormInput
            label="Current Password"
            iconName="lock-closed-outline"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder="Enter your current password"
            secureTextEntry={true}
            autoCapitalize="none"
          />
          <FormInput
            label="New Password"
            iconName="lock-closed-outline"
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder="Enter new password"
            secureTextEntry={true}
            autoCapitalize="none"
            // Add margin if needed
            containerStyle={{ marginTop: styles.SPACING.s }}
          />
          <FormInput
            label="Repeat New Password"
            iconName="lock-closed-outline"
            value={repeatNewPassword}
            onChangeText={setRepeatNewPassword}
            placeholder="Repeat new password"
            secureTextEntry={true}
            autoCapitalize="none"
            // Add margin if needed
            containerStyle={{ marginTop: styles.SPACING.s }}
          />

          {/* Display general error messages */}
          {error && <Text style={s.errorText}>{error}</Text>}
        </ScrollView>

        {/* Button Container */}
        <View style={s.buttonContainer}>
          <PrimaryButton
            title="Save Changes"
            onPress={handleSaveChanges}
            loading={isLoading}
            // Disable button if fields are empty?
            // disabled={!currentPassword || !newPassword || !repeatNewPassword}
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
    color: "red", // Use a specific error color if defined in styles.COLORS
    fontSize: styles.FONT_SIZES.bodyS,
    fontFamily: styles.FONT_FAMILY.regular,
    textAlign: "center",
    marginTop: styles.SPACING.s,
    marginBottom: styles.SPACING.xs,
  },
});

export default ChangePasswordScreen;
