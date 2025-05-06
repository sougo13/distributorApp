import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from 'react-native-safe-area-context'; // <-- Import from correct library

// import { SvgUri } from "react-native-svg"; // No longer needed for direct import

import { AuthStackParamList } from "../../navigation/AuthStackNavigator";
import * as styles from "../../styles"; // Import style constants

// Define role type
type Role = "supplier" | "buyer";

// Define navigation prop type
type RoleSelectionScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "RoleSelection"
>;

// Import local SVGs - Adjust paths if necessary
// Using SvgUri for simplicity assuming icons are served or accessible via URI
// If using local files directly with react-native-svg, setup might be needed (e.g., using transformers)
// For now, let's assume a way to reference them, e.g., placeholder URIs or direct require if setup allows.
// We'll use placeholder paths for now. You might need to adjust how SVGs are loaded.
// If direct require doesn't work, you might need react-native-svg-transformer
// and configure metro.config.js
import SupplierIcon from "../../assets/icons/supplier_icon.svg"; // Use direct import
import BuyerIcon from "../../assets/icons/buyer_icon.svg"; // Use direct import


const RoleSelectionScreen = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const navigation = useNavigation<RoleSelectionScreenNavigationProp>();

  const handleSelectRole = (role: Role) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      navigation.navigate("SignUp", { role: selectedRole });
    }
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  // Helper to determine border color for selection
  const getSelectionStyle = (role: Role) => {
    return selectedRole === role
      ? s.selectedOption
      : s.unselectedOption;
  };

  return (
    <SafeAreaView style={s.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#141414" />
      <View style={s.container}>
        {/* Header Text */}
        <View style={s.headerContainer}>
          <Text style={s.title}>Who Are You?</Text>
          <Text style={s.subtitle}>
            Pick the role that fits you best. Each one unlocks different
            features tailored to your needs.
          </Text>
        </View>

        {/* Role Selection Options */}
        <View style={s.optionsContainer}>
          <TouchableOpacity
            style={[s.optionBox, getSelectionStyle("supplier")]}
            onPress={() => handleSelectRole("supplier")}
            activeOpacity={0.7}
          >
            {/* Radio visual (simplified) */}
            <View style={[s.radioOuter, selectedRole === 'supplier' && s.radioOuterSelected]}>
              {selectedRole === "supplier" && <View style={s.radioInnerSelected} />}
            </View>
             <SupplierIcon width={24} height={24} fill={"rgba(255, 250, 255, 0.4)"} />
             {/* <Text style={styles.iconPlaceholder}>SUP</Text> */}
            <Text style={s.optionText}>A Supplier</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[s.optionBox, getSelectionStyle("buyer")]}
            onPress={() => handleSelectRole("buyer")}
            activeOpacity={0.7}
          >
             {/* Radio visual (simplified) */}
             <View style={[s.radioOuter, selectedRole === 'buyer' && s.radioOuterSelected]}>
               {selectedRole === "buyer" && <View style={s.radioInnerSelected} />}
             </View>
            <BuyerIcon width={24} height={24} fill={"rgba(255, 250, 255, 0.4)"} />
            {/* <Text style={styles.iconPlaceholder}>BUY</Text> */}
            <Text style={s.optionText}>A Buyer</Text>
          </TouchableOpacity>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[s.button, !selectedRole && s.buttonDisabled]}
          onPress={handleContinue}
          disabled={!selectedRole}
          activeOpacity={0.8}
        >
          <Text style={s.buttonText}>Continue</Text>
        </TouchableOpacity>

        {/* Login Link */}
        <View style={s.loginContainer}>
          <Text style={s.loginText}>Have an account?</Text>
          <TouchableOpacity onPress={handleLogin} activeOpacity={0.7}>
            <Text style={s.loginLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: styles.COLORS.primary, // Updated
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: styles.SPACING.l, // Updated
    paddingTop: styles.SPACING.xxl, // Updated
    paddingBottom: styles.SPACING.m, // Updated
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: styles.SPACING.xxl, // Using xxl (40) for 38
    width: '100%',
  },
  title: {
    fontFamily: styles.FONT_FAMILY.medium, // Updated (assuming Satoshi-Bold is medium)
    fontSize: styles.FONT_SIZES.h3, // Updated
    fontWeight: styles.FONT_WEIGHTS.medium, // Updated (using 500 from Figma, assuming it's medium)
    color: styles.COLORS.accent, // Updated
    textAlign: "center",
    lineHeight: styles.FONT_SIZES.h3 * 1.35,
    marginBottom: styles.SPACING.m, // Updated
  },
  subtitle: {
    fontFamily: styles.FONT_FAMILY.regular, // Updated
    fontSize: styles.FONT_SIZES.bodyM, // Updated
    fontWeight: styles.FONT_WEIGHTS.regular, // Updated
    color: styles.COLORS.grey, // Updated (using grey for the rgba value)
    textAlign: "center",
    lineHeight: styles.FONT_SIZES.bodyM * 1.35,
    maxWidth: 345,
  },
  optionsContainer: {
    width: "100%",
    marginBottom: styles.SPACING.xxl, // Updated
    gap: styles.SPACING.l, // Updated
  },
  optionBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: styles.COLORS.inputBackground,
    borderRadius: styles.COMPONENT_STYLES.cardBorderRadius, // Updated to cardBorderRadius (12px)
    padding: styles.SPACING.m,
    borderWidth: 1,
    gap: styles.SPACING.sm, // Updated to sm (12px) for 10px gap
  },
  unselectedOption: {
     borderColor: styles.COLORS.border, // Updated (using border for the rgba value)
  },
  selectedOption: {
    borderColor: styles.COLORS.secondary, // Updated
    borderWidth: 1.5,
  },
   radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: styles.COLORS.border, // Updated
    justifyContent: 'center',
    alignItems: 'center',
  },
   radioOuterSelected: {
     borderColor: styles.COLORS.secondary, // Updated
   },
  radioInnerSelected: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: styles.COLORS.secondary, // Updated
  },
   /* iconPlaceholder: { // Temporary placeholder for SVG - Removed
    width: 24,
    height: 24,
    textAlign: 'center',
    lineHeight: 24,
    color: 'rgba(255, 250, 255, 0.4)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    fontSize: 10,
   }, */
  optionText: {
    fontFamily: styles.FONT_FAMILY.medium, // Updated
    fontSize: styles.FONT_SIZES.bodyM, // Updated
    fontWeight: styles.FONT_WEIGHTS.medium, // Updated
    color: styles.COLORS.accent, // Updated
    lineHeight: styles.FONT_SIZES.bodyM * 1.35,
    flex: 1,
  },
  button: {
    backgroundColor: styles.COLORS.secondary,
    paddingVertical: 12,
    paddingHorizontal: styles.SPACING.m,
    borderRadius: styles.COMPONENT_STYLES.borderRadius, // Updated to borderRadius (8px)
    alignItems: "center",
    justifyContent: "center",
    width: '100%',
    minHeight: 45,
    marginBottom: styles.SPACING.l, // Updated
  },
  buttonDisabled: {
    backgroundColor: styles.COLORS.secondaryDisabled, // Updated
  },
  buttonText: {
    fontFamily: styles.FONT_FAMILY.regular, // Updated
    fontSize: styles.FONT_SIZES.bodyL, // Updated
    fontWeight: styles.FONT_WEIGHTS.regular, // Updated
    color: styles.COLORS.primary, // Updated
    lineHeight: styles.FONT_SIZES.bodyL * 1.35,
  },
  loginContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: styles.SPACING.sm, // Updated to sm (12px) for 10px gap
  },
  loginText: {
    fontFamily: styles.FONT_FAMILY.regular, // Updated
    fontSize: styles.FONT_SIZES.bodyL, // Updated
    fontWeight: styles.FONT_WEIGHTS.regular, // Updated
    color: styles.COLORS.accent, // Updated
    lineHeight: styles.FONT_SIZES.bodyL * 1.35,
  },
  loginLink: {
    fontFamily: styles.FONT_FAMILY.medium, // Updated
    fontSize: styles.FONT_SIZES.bodyL, // Updated
    fontWeight: styles.FONT_WEIGHTS.medium, // Updated
    color: styles.COLORS.secondary, // Updated
    lineHeight: styles.FONT_SIZES.bodyL * 1.35,
  },
});

export default RoleSelectionScreen;
