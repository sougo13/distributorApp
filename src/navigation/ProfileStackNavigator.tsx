// src/navigation/ProfileStackNavigator.tsx
import React from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Platform } from "react-native";

// Import Screens
import ProfileScreen from "../screens/ProfileScreen";
import PersonalInformationScreen from "../screens/profile/PersonalInformationScreen";
import ChangePasswordScreen from "../screens/profile/ChangePasswordScreen";
import SavedAddressesScreen from "../screens/profile/SavedAddressesScreen";
import AddEditAddressScreen from "../screens/profile/AddEditAddressScreen";
import ChangePaymentMethodScreen from "../screens/profile/ChangePaymentMethodScreen";
import AddNewCardScreen from "../screens/profile/AddNewCardScreen";
import ChangeLanguageScreen from "../screens/profile/ChangeLanguageScreen";
import FaqScreen from "../screens/profile/FaqScreen";
import AccountDeletionScreen from "../screens/profile/AccountDeletionScreen";

// Import Styles
import * as styles from "../styles";

// Define Param List for type safety
export type ProfileStackParamList = {
  ProfileMain: undefined; // No params expected for the main profile screen
  PersonalInformation: undefined;
  ChangePassword: undefined;
  SavedAddresses: undefined;
  AddEditAddress: { addressId?: string }; // Optional param for editing
  ChangePaymentMethod: undefined;
  AddNewCard: undefined;
  ChangeLanguage: undefined;
  FAQ: undefined;
  AccountDeletion: undefined;
};

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator = () => {
  const screenOptions: StackNavigationOptions = {
    headerStyle: {
      backgroundColor: styles.COLORS.primary,
      shadowOpacity: 0, // Remove shadow on iOS
      elevation: 0, // Remove shadow on Android
      borderBottomWidth: 0, // Remove bottom border line
    },
    headerTintColor: styles.COLORS.accent, // Color of the back button and title
    headerTitleStyle: {
      fontFamily: styles.FONT_FAMILY.medium,
      fontSize: styles.FONT_SIZES.h3,
    },
    headerBackTitleVisible: false, // Hide "Back" text on iOS
    headerLeftContainerStyle: {
      paddingLeft: styles.SPACING.m,
    },
    headerTitleAlign: "center",
    // Custom back icon
    headerBackImage: ({ tintColor }) => (
      <Ionicons
        name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
        size={24}
        color={tintColor} // Use the tintColor provided
      />
    ),
    // Standard slide animation
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };

  return (
    <Stack.Navigator initialRouteName="ProfileMain" screenOptions={screenOptions}>
      <Stack.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{ headerShown: false }} // Hide header only for the main profile screen
      />
      <Stack.Screen
        name="PersonalInformation"
        component={PersonalInformationScreen}
        options={{ title: "Personal Information" }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ title: "Change Password" }}
      />
      <Stack.Screen
        name="SavedAddresses"
        component={SavedAddressesScreen}
        options={{ title: "Saved Addresses" }}
      />
      <Stack.Screen
        name="AddEditAddress"
        component={AddEditAddressScreen}
        options={({ route }) => ({ // Dynamic title based on editing or adding
           title: route.params?.addressId ? "Edit Address" : "Add New Address",
        })}
      />
      <Stack.Screen
        name="ChangePaymentMethod"
        component={ChangePaymentMethodScreen}
        options={{ title: "Change Payment Method" }}
      />
       <Stack.Screen
        name="AddNewCard"
        component={AddNewCardScreen}
        options={{ title: "Add New Card" }}
      />
      <Stack.Screen
        name="ChangeLanguage"
        component={ChangeLanguageScreen}
        options={{ title: "Change Language" }}
      />
      <Stack.Screen
        name="FAQ"
        component={FaqScreen}
        options={{ title: "FAQ" }}
      />
      <Stack.Screen
        name="AccountDeletion"
        component={AccountDeletionScreen}
        options={{ title: "Account Deletion" }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;