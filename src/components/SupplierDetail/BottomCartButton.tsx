import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets, EdgeInsets } from "react-native-safe-area-context";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import * as styles from "../../styles"; // Adjust path as needed
import { TabParamList } from "../../navigation/AppNavigator"; // Adjust path as needed

type BottomCartButtonProps = {
  cartTotal: number;
  insets: EdgeInsets;
};

// Define the correct navigation prop type for this context
type CartButtonNavigationProp = BottomTabNavigationProp<TabParamList, 'Home'>; // Or whichever tab is appropriate

const BottomCartButton: React.FC<BottomCartButtonProps> = ({
  cartTotal,
  insets,
}) => {
  const { t } = useTranslation();
  // Get navigation object inside the component
  const navigation = useNavigation<CartButtonNavigationProp>();

  return (
    <View
      style={[
        componentStyles.bottomCartContainer,
        // Apply dynamic padding here
        { paddingBottom: Math.max(insets.bottom, styles.SPACING.xl) },
      ]}
    >
      <TouchableOpacity
        style={componentStyles.bottomCartButton}
        // Use the navigation object obtained from the hook
        onPress={() => navigation.navigate("Cart")}
      >
        <Text style={componentStyles.bottomCartButtonText}>
          {t("supplierDetail.viewCart", "View Cart")}
        </Text>
        <View style={componentStyles.dotSeparator} />
        <Text style={componentStyles.bottomCartButtonPriceText}>
          {`₾${cartTotal.toFixed(2)}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const componentStyles = StyleSheet.create({
  bottomCartContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(20, 20, 20, 0.8)",
    paddingVertical: styles.SPACING.m,
    paddingHorizontal: styles.SPACING.xl,
    alignItems: "center",
    // paddingBottom is applied dynamically using insets
  },
  bottomCartButton: {
    backgroundColor: styles.COLORS.secondary,
    paddingVertical: styles.SPACING.s,
    paddingHorizontal: styles.SPACING.m,
    borderRadius: styles.COMPONENT_STYLES.buttonBorderRadius,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  bottomCartButtonText: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.h3,
    color: styles.COLORS.primary,
    marginRight: styles.SPACING.s,
  },
  dotSeparator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: styles.COLORS.primary + "66", // Hex with alpha
    marginHorizontal: styles.SPACING.xs,
  },
  bottomCartButtonPriceText: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.h3,
    color: styles.COLORS.primary,
    marginLeft: styles.SPACING.s,
  },
});

export default BottomCartButton; 