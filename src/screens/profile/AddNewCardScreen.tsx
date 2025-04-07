// src/screens/profile/AddNewCardScreen.tsx
import React, { useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import * as styles from "../../styles";
import PrimaryButton from "../../components/PrimaryButton";
import FormInput from "../../components/FormInput";
import { ProfileStackParamList } from "../../navigation/ProfileStackNavigator";

// Navigation prop type
type AddNewCardNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "AddNewCard"
>;

const AddNewCardScreen = () => {
  const navigation = useNavigation<AddNewCardNavigationProp>();

  // --- State ---
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState(""); // Expect MM/YY
  const [ccv, setCcv] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Input Formatting/Masking (Simple) ---
  const formatCardNumber = (text: string) => {
      const cleaned = text.replace(/\D/g, ''); // Remove non-digits
      const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim(); // Add space every 4 digits
      setCardNumber(formatted.slice(0, 19)); // Limit to XXXX XXXX XXXX XXXX format (16 digits + 3 spaces)
  };

  const formatExpiryDate = (text: string) => {
      const cleaned = text.replace(/\D/g, '');
      let formatted = cleaned;
      if (cleaned.length > 2) {
          formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
      }
       setExpiryDate(formatted.slice(0, 5)); // Limit to MM/YY
  };

  const formatCcv = (text: string) => {
      const cleaned = text.replace(/\D/g, '');
      setCcv(cleaned.slice(0, 4)); // Limit to 3 or 4 digits
  };


  // --- Handlers ---
  const handleSaveCard = () => {
    setError(null);
    // --- Basic Validation ---
    if (!cardNumber || !expiryDate || !ccv || !cardHolder) {
      setError("Please fill in all card details.");
      return;
    }
    const rawCardNumber = cardNumber.replace(/\s/g, '');
    if (rawCardNumber.length < 15 || rawCardNumber.length > 16) { // Basic length check
        setError("Invalid card number length.");
        return;
    }
    if (expiryDate.length !== 5 || !expiryDate.includes('/')) {
        setError("Invalid expiry date format (MM/YY).");
        return;
    }
     if (ccv.length < 3 || ccv.length > 4) {
        setError("Invalid CCV length.");
        return;
    }
    // TODO: Add more robust validation (Luhn algorithm, date check)

    console.log("Saving card:", {
        cardNumber: rawCardNumber, // Send raw number to backend
        expiryDate,
        ccv,
        cardHolder
    });
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert("Success", "Card added successfully.");
      navigation.goBack(); // Go back to the list screen
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
          <FormInput
            label="Number"
            // iconName="card-outline" // Optional icon
            value={cardNumber}
            onChangeText={formatCardNumber} // Use formatter
            placeholder="XXXX XXXX XXXX XXXX"
            keyboardType="numeric"
            maxLength={19} // Length with spaces
          />
          <View style={s.row}>
            <FormInput
              label="Valid"
              value={expiryDate}
              onChangeText={formatExpiryDate} // Use formatter
              placeholder="MM/YY"
              keyboardType="numeric"
              maxLength={5}
              containerStyle={s.expiryInput}
            />
            <FormInput
              label="CCV Code"
              value={ccv}
              onChangeText={formatCcv} // Use formatter
              placeholder="CCV"
              keyboardType="numeric"
              maxLength={4}
              secureTextEntry={true} // Hide CCV
              containerStyle={s.ccvInput}
            />
          </View>
          <FormInput
            label="Card Holder"
            value={cardHolder}
            onChangeText={setCardHolder}
            placeholder="Name and Surname"
            autoCapitalize="words"
          />

          {error && <Text style={s.errorText}>{error}</Text>}

        </ScrollView>

        <View style={s.buttonContainer}>
          <PrimaryButton
            title="Save Card"
            onPress={handleSaveCard}
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
    flex: 1,
  },
  scrollContentContainer: {
    padding: styles.SPACING.containerPadding,
    paddingBottom: styles.SPACING.xl,
  },
  row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      // marginBottom: styles.SPACING.m, // Margin is handled by FormInput's outerContainer
  },
  expiryInput: {
      flex: 1, // Take half width
      marginRight: styles.SPACING.s, // Space between expiry and ccv
  },
  ccvInput: {
      flex: 1, // Take half width
      marginLeft: styles.SPACING.s,
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
});

export default AddNewCardScreen;