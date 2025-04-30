import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { TFunction } from "i18next";

import * as styles from "../../styles";

interface SupplierNotFoundProps {
  onGoBack: () => void;
  t: TFunction<"translation", undefined>;
}

const SupplierNotFound: React.FC<SupplierNotFoundProps> = ({ onGoBack, t }) => {
  return (
    <SafeAreaView style={componentStyles.safeArea} edges={["left", "right"]}>
      <StatusBar barStyle="light-content" />
      <View style={componentStyles.centered}>
        <TouchableOpacity
          onPress={onGoBack}
          style={componentStyles.fallbackBackButton}
        >
          <Ionicons name="arrow-back" size={28} color={styles.COLORS.accent} />
        </TouchableOpacity>
        <Text style={componentStyles.errorText}>
          {t("supplierDetail.notFound", "Supplier not found.")}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const componentStyles = StyleSheet.create({
  safeArea: {
    // Need to define safeArea style here if not globally available
    flex: 1,
    backgroundColor: styles.COLORS.primary,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: styles.SPACING.l,
  },
  fallbackBackButton: {
    position: "absolute",
    // Adjust top based on platform/StatusBar
    top:
      Platform.OS === "ios"
        ? (StatusBar.currentHeight || 0) + styles.SPACING.m
        : styles.SPACING.l,
    left: styles.SPACING.m,
    padding: styles.SPACING.s,
    zIndex: 1, // Ensure button is pressable
  },
  errorText: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.h3,
    color: styles.COLORS.accent,
    textAlign: "center",
  },
});

export default SupplierNotFound; 