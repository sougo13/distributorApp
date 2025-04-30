import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
  StatusBar,
} from "react-native";
import Animated, { AnimatedStyle } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

import * as styles from "../../styles";
import { SupplierCategoryTag } from "../../types";

interface StickyHeaderProps {
  stickyHeader1AnimatedStyle: AnimatedStyle;
  stickyHeader2AnimatedStyle: AnimatedStyle;
  headerMinHeight: number;
  filterHeaderHeight: number;
  supplierName: string;
  isFavorite: boolean;
  categories: SupplierCategoryTag[];
  selectedCategoryTag: string | null;
  onGoBack: () => void;
  onToggleFavorite: () => void;
  onSearchPress: () => void; // Assuming search icon press needs handling
  onMoreOptions: () => void;
  onCategorySelect: (categoryId: string) => void;
}

const StickyHeader: React.FC<StickyHeaderProps> = ({
  stickyHeader1AnimatedStyle,
  stickyHeader2AnimatedStyle,
  headerMinHeight,
  filterHeaderHeight,
  supplierName,
  isFavorite,
  categories,
  selectedCategoryTag,
  onGoBack,
  onToggleFavorite,
  onSearchPress,
  onMoreOptions,
  onCategorySelect,
}) => {
  // Memoize renderFilterCategory to prevent unnecessary re-renders
  const renderFilterCategory = useCallback(
    ({ item }: { item: SupplierCategoryTag }) => {
      const isActive = selectedCategoryTag === item.id;
      return (
        <TouchableOpacity
          style={[filterStyles.chip, isActive && filterStyles.chipActive]}
          onPress={() => onCategorySelect(item.id)}
        >
          <Text
            style={[
              filterStyles.chipText,
              isActive && filterStyles.chipTextActive,
            ]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    },
    [selectedCategoryTag, onCategorySelect]
  );

  return (
    <>
      {/* Sticky Header 1: Title and Actions */}
      <Animated.View
        style={[
          componentStyles.stickyHeader1,
          stickyHeader1AnimatedStyle,
          { height: headerMinHeight },
        ]}
      >
        <TouchableOpacity onPress={onGoBack} style={componentStyles.headerButton}>
          <Ionicons name="arrow-back" size={28} color={styles.COLORS.accent} />
        </TouchableOpacity>
        <Text style={componentStyles.stickyHeaderTitle} numberOfLines={1}>
          {supplierName}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={onToggleFavorite}
            style={componentStyles.headerButton}
          >
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={styles.COLORS.accent}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSearchPress} // Use the passed handler
            style={componentStyles.headerButton}
          >
            <Ionicons name="search" size={24} color={styles.COLORS.accent} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onMoreOptions}
            style={componentStyles.headerButton}
          >
            <Ionicons
              name="ellipsis-vertical"
              size={24}
              color={styles.COLORS.accent}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Sticky Header 2: Category Filters */}
      <Animated.View
        style={[
          componentStyles.stickyHeader2,
          stickyHeader2AnimatedStyle,
          { height: filterHeaderHeight },
        ]}
      >
        <FlatList
          data={categories}
          renderItem={renderFilterCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={filterStyles.listContainer}
        />
      </Animated.View>
    </>
  );
};

// --- Styles --- //

// Use a different name to avoid conflicts if imported elsewhere
const componentStyles = StyleSheet.create({
  stickyHeader1: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: styles.COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: styles.SPACING.m,
    paddingTop: StatusBar.currentHeight || styles.SPACING.m,
    zIndex: 10,
    borderBottomWidth: 1,
    borderBottomColor: styles.COLORS.inputBackground,
  },
  stickyHeaderTitle: {
    flex: 1,
    textAlign: "center",
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.h3,
    color: styles.COLORS.accent,
    marginHorizontal: styles.SPACING.s,
  },
  stickyHeader2: {
    position: "absolute",
    left: 0,
    right: 0,
    backgroundColor: styles.COLORS.primary,
    zIndex: 9,
    justifyContent: "center",
    // Transform is applied via animated style prop
  },
  headerButton: {
    padding: styles.SPACING.s,
  },
});

const filterStyles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: styles.SPACING.l,
    alignItems: 'center', // Vertically center items in the container
  },
  chip: {
    paddingVertical: styles.SPACING.m,
    paddingHorizontal: styles.SPACING.m, // Add horizontal padding for touch area
    marginRight: styles.SPACING.l,
    height: '100%', // Make chip fill height
    justifyContent: 'center', // Center text vertically
    borderBottomWidth: 2, // Use thicker border for active state
    borderBottomColor: 'transparent', // Default transparent border
  },
  chipActive: {
    borderBottomColor: styles.COLORS.secondary,
  },
  chipText: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: 16,
    color: styles.COLORS.white,
  },
  chipTextActive: {
    fontFamily: styles.FONT_FAMILY.medium,
    color: styles.COLORS.secondary, // Highlight active text color too
  },
});

export default StickyHeader; 