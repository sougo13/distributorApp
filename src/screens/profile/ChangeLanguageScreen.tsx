// src/screens/profile/ChangeLanguageScreen.tsx
import React, { useState, useEffect } from "react";
import { View, StyleSheet, SafeAreaView, Platform, Alert } from "react-native";
// Remove Picker import: import { Picker } from '@react-native-picker/picker';
import { Ionicons } from "@expo/vector-icons"; // Keep if used for label icon

import * as styles from "../../styles";
import PrimaryButton from "../../components/PrimaryButton";
import CustomLanguagePicker from "../../components/CustomDropdown"; // Import the new component

// Define available languages (only English and Georgian as requested)
const AVAILABLE_LANGUAGES = [
  { label: "English", value: "en" },
  { label: "ქართული", value: "ka" }, // Georgian
];

const ChangeLanguageScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // TODO: Fetch saved language preference
    console.log("Screen loaded. Current language:", selectedLanguage);
  }, []);

  const handleSaveChanges = () => {
    console.log("Saving language:", selectedLanguage);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // TODO: Update global state/context
      Alert.alert(
        "Success",
        `Language preference saved to ${
          AVAILABLE_LANGUAGES.find((lang) => lang.value === selectedLanguage)
            ?.label || selectedLanguage
        }.`
      );
    }, 1000);
  };

  return (
    <SafeAreaView style={s.safeArea}>
      <View style={s.container}>
        {/* Use the Custom Language Picker */}
        <CustomLanguagePicker
          label="Select Language" // Pass the label
          iconName="language-outline" // Pass the icon name
          options={AVAILABLE_LANGUAGES}
          selectedValue={selectedLanguage}
          onValueChange={setSelectedLanguage}
        />

        {/* Spacer to push button down */}
        <View style={s.spacer} />

        {/* Button Container */}
        <View style={s.buttonContainer}>
          <PrimaryButton
            title="Save Changes"
            onPress={handleSaveChanges}
            loading={isLoading}
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
  container: {
    flex: 1,
    padding: styles.SPACING.containerPadding,
  },
  // Remove picker related styles (pickerWrapper, picker, pickerItemIOS, etc.)
  spacer: {
    flex: 1, // Pushes button to the bottom
  },
  buttonContainer: {
    paddingBottom: Platform.OS === "ios" ? styles.SPACING.l : styles.SPACING.m,
  },
});

export default ChangeLanguageScreen;
