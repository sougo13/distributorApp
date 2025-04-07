// src/components/PaymentCardListItem.tsx
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as styles from "../styles";

interface PaymentCardListItemProps {
  id: string;
  cardTypeIcon?: keyof typeof Ionicons.glyphMap; // Optional: Detect card type later
  maskedNumber: string; // e.g., "Card Ending In 1119"
  isSelected: boolean;
  onPress: (id: string) => void;
}

const PaymentCardListItem: React.FC<PaymentCardListItemProps> = ({
  id,
  cardTypeIcon = "card-outline", // Default icon
  maskedNumber,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[s.container, isSelected ? s.selectedContainer : {}]}
      onPress={() => onPress(id)}
      activeOpacity={0.7}
    >
      <Ionicons
        name={cardTypeIcon}
        size={24}
        color={styles.COLORS.iconGrey}
        style={s.icon}
      />
      <Text style={s.cardText}>{maskedNumber}</Text>
      {/* Optional: Add a checkmark or radio button for selected state */}
      {isSelected && (
         <Ionicons
            name="checkmark-circle"
            size={24}
            color={styles.COLORS.secondary} // Green checkmark
            style={s.checkmarkIcon}
        />
      )}
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: styles.COLORS.inputBackground,
    borderRadius: styles.COMPONENT_STYLES.borderRadius,
    paddingVertical: styles.SPACING.m + styles.SPACING.xs, // Slightly more padding
    paddingHorizontal: styles.SPACING.m,
    marginBottom: styles.SPACING.m,
    borderWidth: 2, // Prepare for selection border
    borderColor: "transparent", // Default border is transparent
  },
  selectedContainer: {
    borderColor: styles.COLORS.secondary, // Green border when selected
  },
  icon: {
    marginRight: styles.SPACING.m,
  },
  cardText: {
    flex: 1, // Take available space
    color: styles.COLORS.accent,
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyM,
    marginRight: styles.SPACING.s,
  },
  checkmarkIcon: {
      marginLeft: 'auto', // Push checkmark to the right
  }
});

export default PaymentCardListItem;