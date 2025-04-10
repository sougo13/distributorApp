import React from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import LoginScreen from "../screens/LoginScreen";
import RoleSelectionScreen from "../screens/auth/RoleSelectionScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import EmailVerificationScreen from "../screens/auth/EmailVerificationScreen";

export type AuthStackParamList = {
  Login: undefined;
  RoleSelection: undefined;
  SignUp: { role?: "supplier" | "buyer" };
  EmailVerification: { email?: string };
  ForgotPassword: undefined;
};

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  const screenOptions: StackNavigationOptions = {
    headerShown: false,
  };

  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={screenOptions}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen
        name="EmailVerification"
        component={EmailVerificationScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
