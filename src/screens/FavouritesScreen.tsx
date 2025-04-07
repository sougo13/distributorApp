// Пример для src/screens/ProfileScreen.tsx
// Скопируй и измени 'Profile Screen Placeholder' для других файлов

import React from "react";
import { StyleSheet, Text, View, SafeAreaView, Platform } from "react-native";

import { COLORS, FONT_FAMILY, FONT_SIZES, SPACING } from "../styles";

const FavouritesScreen: React.FC = () => {
  // <--- Измени имя компонента для каждого файла (e.g., FavouritesScreen)
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Favourites Screen Placeholder {/* <--- ИЗМЕНИ ЭТОТ ТЕКСТ */}
        </Text>
        <Text style={styles.subtitle}>(Content will be added later)</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary, // Темный фон
  },
  container: {
    flex: 1,
    justifyContent: "center", // Центрируем текст
    alignItems: "center", // Центрируем текст
    paddingHorizontal: SPACING.m,
  },
  title: {
    color: COLORS.accent, // Светлый текст
    fontSize: FONT_SIZES.h2, // Размер заголовка
    fontFamily: FONT_FAMILY.medium, // Шрифт
    textAlign: "center",
    marginBottom: SPACING.m,
  },
  subtitle: {
    color: COLORS.secondary, // Используем акцентный цвет для подзаголовка
    fontSize: 14,
    fontFamily: FONT_FAMILY.regular,
    textAlign: "center",
  },
});

// Не забудь изменить имя экспорта для каждого файла!
export default FavouritesScreen; // <--- Измени имя экспорта (e.g., FavouritesScreen)
