import React from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import LoginScreen from "../screens/auth/LoginScreen";
import RoleSelectionScreen from "../screens/auth/RoleSelectionScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import EmailVerificationScreen from "../screens/auth/EmailVerificationScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";
import PasswordResetSentScreen from "../screens/auth/PasswordResetSentScreen";

export type AuthStackParamList = {
  Login: undefined;
  RoleSelection: undefined;
  SignUp: { role?: "supplier" | "buyer" };
  EmailVerification: { email?: string };
  ForgotPassword: undefined;
  PasswordResetSent: { email?: string };
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  const screenOptions: StackNavigationOptions = {
    headerShown: false,
  };

  return (
    <Stack.Navigator
      initialRouteName="RoleSelection"
      screenOptions={screenOptions}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen
        name="EmailVerification"
        component={EmailVerificationScreen}
      />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="PasswordResetSent" component={PasswordResetSentScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
