
import React from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, Platform } from "react-native";
import { useTranslation } from "react-i18next"; 


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
import * as styles from "../styles";


export type ProfileStackParamList = {
  ProfileMain: undefined; 
  PersonalInformation: undefined;
  ChangePassword: undefined;
  SavedAddresses: undefined;
  AddEditAddress: { addressId?: string }; 
  ChangePaymentMethod: undefined;
  AddNewCard: undefined;
  ChangeLanguage: undefined;
  FAQ: undefined;
  AccountDeletion: undefined;
};

const Stack = createStackNavigator<ProfileStackParamList>();

const ProfileStackNavigator = () => {
  const { t } = useTranslation(); 


  const screenOptions: StackNavigationOptions = {
    headerStyle: {
      backgroundColor: styles.COLORS.primary,
      shadowOpacity: 0, 
      elevation: 0, 
      borderBottomWidth: 0, 
    },
    headerTintColor: styles.COLORS.accent, 
    headerTitleStyle: {
      fontFamily: styles.FONT_FAMILY.medium,
      fontSize: styles.FONT_SIZES.h3,
    },
    headerBackTitleVisible: false, 
    headerLeftContainerStyle: {
      paddingLeft: styles.SPACING.m,
    },
    headerTitleAlign: "center",

    headerBackImage: ({ tintColor }) => (
      <Ionicons
        name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
        size={24}
        color={tintColor} 
      />
    ),

    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };

  return (

    <Stack.Navigator
      initialRouteName="ProfileMain"
      screenOptions={screenOptions}
    >
      <Stack.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PersonalInformation"
        component={PersonalInformationScreen}
        options={{ title: t("profileStack.personalInfo") }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{ title: t("profileStack.changePassword") }}
      />
      <Stack.Screen
        name="SavedAddresses"
        component={SavedAddressesScreen}
        options={{ title: t("profileStack.savedAddresses") }}
      />
      <Stack.Screen
        name="AddEditAddress"
        component={AddEditAddressScreen}
        options={({ route }) => ({

          title: route.params?.addressId
            ? t("profileStack.editAddress")
            : t("profileStack.addAddress"),
        })}
      />
      <Stack.Screen
        name="ChangePaymentMethod"
        component={ChangePaymentMethodScreen}

        options={{ title: t("profileStack.paymentMethods") }}
      />
      <Stack.Screen
        name="AddNewCard"
        component={AddNewCardScreen}
        options={{ title: t("profileStack.addCard") }}
      />
      <Stack.Screen
        name="ChangeLanguage"
        component={ChangeLanguageScreen}
        options={{ title: t("profileStack.changeLanguage") }} 
      />
      <Stack.Screen
        name="FAQ"
        component={FaqScreen}
        options={{ title: t("profileStack.faq") }}
      />
      <Stack.Screen
        name="AccountDeletion"
        component={AccountDeletionScreen}
        options={{ title: t("profileStack.deleteAccount") }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
