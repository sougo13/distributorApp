import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, FONT_FAMILY, FONT_SIZES, SPACING } from "../styles";

interface FilterChipProps {
  categoryName: string;
  onClear: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ categoryName, onClear }) => {
  return (
    <View style={styles.filterChipContainer}>
      <View style={styles.filterChip}>
        <Text style={styles.filterChipText}>{categoryName}</Text>
        <TouchableOpacity onPress={onClear} style={styles.closeIconTouchable}>
          <Ionicons name="close-circle" size={20} color={COLORS.placeholder} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterChipContainer: {
    marginBottom: SPACING.m,
    alignItems: "flex-start",
  },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.searchBackground,
    borderRadius: 20,
    paddingVertical: SPACING.xs,
    paddingLeft: SPACING.m,
    paddingRight: SPACING.s,
  },
  filterChipText: {
    color: COLORS.accent,
    fontSize: FONT_SIZES.bodyS,
    fontFamily: FONT_FAMILY.medium, // medium
    marginRight: SPACING.s,
  },
  closeIconTouchable: {
    padding: SPACING.xs / 2,
  },
});

export default FilterChip;
