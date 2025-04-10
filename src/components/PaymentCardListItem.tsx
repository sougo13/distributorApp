
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as styles from "../styles";

interface PaymentCardListItemProps {
  id: string;
  cardTypeIcon?: keyof typeof Ionicons.glyphMap; 
  maskedNumber: string; 
  isSelected: boolean;
  onPress: (id: string) => void;
}

const PaymentCardListItem: React.FC<PaymentCardListItemProps> = ({
  id,
  cardTypeIcon = "card-outline", 
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
      
      {isSelected && (
         <Ionicons
            name="checkmark-circle"
            size={24}
            color={styles.COLORS.secondary} 
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
    paddingVertical: styles.SPACING.m + styles.SPACING.xs, 
    paddingHorizontal: styles.SPACING.m,
    marginBottom: styles.SPACING.m,
    borderWidth: 2, 
    borderColor: "transparent", 
  },
  selectedContainer: {
    borderColor: styles.COLORS.secondary, 
  },
  icon: {
    marginRight: styles.SPACING.m,
  },
  cardText: {
    flex: 1, 
    color: styles.COLORS.accent,
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyM,
    marginRight: styles.SPACING.s,
  },
  checkmarkIcon: {
      marginLeft: 'auto', 
  }
});

export default PaymentCardListItem;