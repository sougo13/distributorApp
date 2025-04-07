// src/screens/profile/PersonalInformationScreen.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import * as styles from "../../styles"; // Import styles
import PrimaryButton from "../../components/PrimaryButton"; // Import custom button
import FormInput from "../../components/FormInput"; // Import custom input

const PersonalInformationScreen = () => {
  // --- State ---
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Add error states if needed for validation
  // const [nameError, setNameError] = useState<string | null>(null);

  // --- Effects ---
  // TODO: Fetch initial user data when the screen loads
  useEffect(() => {
    // Simulate fetching data
    setName("Awesome Business LLC");
    setEmail("business@name.com");
    setPhone("+995 555 111 222");
  }, []);

  // --- Handlers ---
  const handleSaveChanges = () => {
    // TODO: Add validation logic here
    // if (!name) { setNameError('Name cannot be empty'); return; } else { setNameError(null); }
    // ... other validations

    console.log("Saving data:", { name, email, phone });
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("Success", "Personal information updated.");
      // Optionally navigate back or show success message
      // navigation.goBack();
    }, 1500); // Simulate 1.5 seconds delay
  };

  return (
    <SafeAreaView style={s.safeArea}>
      <KeyboardAvoidingView
        style={s.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0} // Adjust offset if needed (depends on header height)
      >
        <ScrollView
          style={s.scrollView}
          contentContainerStyle={s.scrollContentContainer}
          keyboardShouldPersistTaps="handled" // Dismiss keyboard when tapping outside inputs
        >
          <FormInput
            label="Name"
            iconName="person-outline"
            value={name}
            onChangeText={setName}
            placeholder="Business Name"
            autoCapitalize="words"
            // error={nameError}
            // onBlur={() => { /* Add validation on blur if needed */ }}
          />
          <FormInput
            label="Email Address"
            iconName="mail-outline"
            value={email}
            onChangeText={setEmail}
            placeholder="business@name.com"
            keyboardType="email-address"
            autoCapitalize="none"
            // editable={false} // Email might not be editable
          />
          <FormInput
            label="Phone Number"
            iconName="call-outline"
            value={phone}
            onChangeText={setPhone}
            placeholder="+XXX XXX XXX XXX"
            keyboardType="phone-pad"
          />
        </ScrollView>

        {/* Button Container - Outside ScrollView but inside KeyboardAvoidingView */}
        <View style={s.buttonContainer}>
          <PrimaryButton
            title="Save Changes"
            onPress={handleSaveChanges}
            loading={isLoading}
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
    flex: 1, // Allows ScrollView to take available space
  },
  scrollContentContainer: {
    padding: styles.SPACING.containerPadding,
    paddingBottom: styles.SPACING.xl, // Add padding at the bottom inside scroll
  },
  buttonContainer: {
    paddingHorizontal: styles.SPACING.containerPadding,
    paddingBottom: Platform.OS === "ios" ? styles.SPACING.l : styles.SPACING.m, // Padding at the very bottom
    paddingTop: styles.SPACING.s, // Small space above the button
    backgroundColor: styles.COLORS.primary, // Match background color
  },
});

export default PersonalInformationScreen;
