


import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { COLORS, FONT_FAMILY, FONT_SIZES, SPACING } from "../styles";
import { SafeAreaView } from "react-native-safe-area-context";

const FavouritesScreen: React.FC = () => {

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Favourites Screen Placeholder 
        </Text>
        <Text style={styles.subtitle}>(Content will be added later)</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary, 
  },
  container: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center", 
    paddingHorizontal: SPACING.m,
  },
  title: {
    color: COLORS.accent, 
    fontSize: FONT_SIZES.h2, 
    fontFamily: FONT_FAMILY.medium, 
    textAlign: "center",
    marginBottom: SPACING.m,
  },
  subtitle: {
    color: COLORS.secondary, 
    fontSize: 14,
    fontFamily: FONT_FAMILY.regular,
    textAlign: "center",
  },
});


export default FavouritesScreen; 
