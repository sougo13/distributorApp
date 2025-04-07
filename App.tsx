// App.tsx
import React, { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator, StyleSheet } from "react-native"; // Import necessary RN components

// Import Navigators and Screens
import AppNavigator from "./src/navigation/AppNavigator";
import LoginScreen from "./src/screens/LoginScreen"; // Keep LoginScreen import

// Import Auth Context
import { AuthProvider, useAuth } from "./src/context/AuthContext";

// Import Styles (needed for loading indicator)
import * as styles from "./src/styles";

// Загрузка шрифтов
const loadFonts = async () => {
  await Font.loadAsync({
    "Satoshi-Regular": require("./src/assets/fonts/Satoshi-Regular.otf"),
    "Satoshi-Medium": require("./src/assets/fonts/Satoshi-Medium.otf"),
    // Добавь другие начертания, если нужно
  });
};

// Компонент для управления навигацией на основе AuthState
const AppContent = () => {
  const { isLoggedIn, isLoading } = useAuth(); // Используем хук useAuth

  // Показываем индикатор загрузки, пока проверяется состояние аутентификации
  if (isLoading) {
    return (
      <View style={loadingStyles.container}>
        <ActivityIndicator size="large" color={styles.COLORS.secondary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppNavigator /> : <LoginScreen />}
    </NavigationContainer>
  );
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts()
      .then(() => setFontsLoaded(true))
      .catch(console.warn); // Log font loading errors
  }, []);

  // Показываем индикатор загрузки, пока грузятся шрифты
  if (!fontsLoaded) {
    return (
      <View style={loadingStyles.container}>
        <ActivityIndicator size="large" color={styles.COLORS.secondary} />
      </View>
    );
  }

  // Оборачиваем AppContent в AuthProvider и SafeAreaProvider
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <StatusBar style="light" backgroundColor={styles.COLORS.primary} />
        <AppContent />
      </SafeAreaProvider>
    </AuthProvider>
  );
}

// Стили для индикатора загрузки (можно вынести)
const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: styles.COLORS.primary,
  },
});
