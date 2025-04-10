import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as styles from "../styles";

interface QuantityStepperProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  minValue?: number;
  disabled?: boolean;
}

const QuantityStepper: React.FC<QuantityStepperProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  minValue = 1,
  disabled = false,
}) => {
  const canDecrement = quantity > minValue && !disabled;

  const canIncrement = !disabled;

  return (
    <View style={[s.container, disabled && s.disabledContainer]}>
      <TouchableOpacity
        style={[s.button, !canDecrement && s.disabledButton]}
        onPress={onDecrement}
        disabled={!canDecrement}
        activeOpacity={0.7}
      >
        <Ionicons
          name="remove"
          size={18}
          color={canDecrement ? styles.COLORS.accent : styles.COLORS.grey}
        />
      </TouchableOpacity>
      <Text style={[s.quantityText, disabled && s.disabledText]}>
        {quantity}
      </Text>
      <TouchableOpacity
        style={[s.button, !canIncrement && s.disabledButton]}
        onPress={onIncrement}
        disabled={!canIncrement}
        activeOpacity={0.7}
      >
        <Ionicons
          name="add"
          size={18}
          color={canIncrement ? styles.COLORS.accent : styles.COLORS.grey}
        />
      </TouchableOpacity>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: styles.COLORS.inputBackground,
    borderRadius: styles.COMPONENT_STYLES.borderRadius,
    paddingHorizontal: styles.SPACING.s,
    paddingVertical: styles.SPACING.xs,
    minWidth: 100,
    justifyContent: "space-between",
  },
  disabledContainer: {
    opacity: 0.6,
  },
  button: {
    padding: styles.SPACING.xs,
  },
  disabledButton: {},
  quantityText: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.bodyM,
    color: styles.COLORS.accent,
    marginHorizontal: styles.SPACING.m,
    minWidth: 20,
    textAlign: "center",
  },
  disabledText: {
    color: styles.COLORS.grey,
  },
});

export default QuantityStepper;
