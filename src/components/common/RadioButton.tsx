import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
// Adjust the path to styles based on the new location
import * as styles from "../../styles";

interface RadioButtonProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  selected,
  onPress,
  disabled = false,
}) => {
  let iconColor = styles.COLORS.grey;
  let labelStyle = s.label;
  if (selected) {
    iconColor = disabled ? styles.COLORS.grey : styles.COLORS.secondary;
    labelStyle = disabled ? s.disabledSelectedLabel : s.selectedLabel;
  } else if (disabled) {
    labelStyle = s.disabledLabel;
  }

  return (
    <TouchableOpacity
      style={[s.container, disabled && s.disabledContainer]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.8}
    >
      <MaterialCommunityIcons
        name={selected ? "radiobox-marked" : "radiobox-blank"}
        size={24}
        color={iconColor}
        style={s.icon}
      />
      <Text style={labelStyle}>{label}</Text>
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: styles.SPACING.m,
    paddingVertical: styles.SPACING.xs,
  },
  disabledContainer: {
    opacity: 0.6,
  },
  icon: {
    marginRight: styles.SPACING.m,
  },
  label: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyM,
    color: styles.COLORS.accent,
  },
  selectedLabel: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.bodyM,
    color: styles.COLORS.secondary,
  },
  disabledLabel: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyM,
    color: styles.COLORS.grey,
  },
  disabledSelectedLabel: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.bodyM,
    color: styles.COLORS.grey,
  },
});

export default RadioButton; 