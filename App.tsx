import "./src/i18n";
import React, { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator, StyleSheet } from "react-native";

import AppNavigator from "./src/navigation/AppNavigator";

import { AuthProvider, useAuth } from "./src/context/AuthContext";
import QueryProvider from "./src/providers/QueryProvider";

import * as styles from "./src/styles";
import AuthStackNavigator from "./src/navigation/AuthStackNavigator";

const loadFonts = async () => {
  await Font.loadAsync({
    "Satoshi-Regular": require("./src/assets/fonts/Satoshi-Regular.otf"),
    "Satoshi-Medium": require("./src/assets/fonts/Satoshi-Medium.otf"),
  });
};

const AppContent = () => {
  const { isLoggedIn, isLoading: isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return (
      <View style={loadingStyles.container}>
        <ActivityIndicator size="large" color={styles.COLORS.secondary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts()
      .then(() => setFontsLoaded(true))
      .catch(console.warn);
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={loadingStyles.container}>
        <ActivityIndicator size="large" color={styles.COLORS.secondary} />
      </View>
    );
  }

  return (
    <AuthProvider>
      <QueryProvider>
        <SafeAreaProvider>
          <StatusBar style="light" backgroundColor={styles.COLORS.primary} />
          <AppContent />
        </SafeAreaProvider>
      </QueryProvider>
    </AuthProvider>
  );
}

const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: styles.COLORS.primary,
  },
});
