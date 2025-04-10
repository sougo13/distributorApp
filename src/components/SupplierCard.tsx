
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Supplier } from "../types";
import {
  COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  SPACING,
  COMPONENT_STYLES,
} from "../styles";

interface SupplierCardProps {
  item: Supplier;
  selectedCategory: string | null;
  onPress?: () => void;
  onFavoriteToggle?: (id: string) => void;
}

const SupplierCard: React.FC<SupplierCardProps> = ({
  item,
  selectedCategory,
  onPress,
  onFavoriteToggle,
}) => {
  return (
    <TouchableOpacity
      style={styles.supplierCard}
      activeOpacity={onPress ? 0.9 : 1}
      onPress={onPress}
    >
      <Image source={item.image} style={styles.supplierImage} />
      <View style={styles.supplierInfo}>
        <Text style={styles.supplierName}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <MaterialIcons name="star" size={16} color={COLORS.secondary} />
          <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
          <Text style={styles.reviewsText}>({item.reviews})</Text>
        </View>
        <View style={styles.tagsContainer}>
          {item.tags.map((tag, index) => {
            const isHighlighted =
              selectedCategory?.toLowerCase() === tag.toLowerCase();
            return (
              <View
                key={`${item.id}-tag-${index}`}
                style={[styles.tag, isHighlighted && styles.tagHighlight]}
              >
                <Text
                  style={[
                    styles.tagText,
                    isHighlighted && styles.tagTextHighlight,
                  ]}
                >
                  {tag}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
      {onFavoriteToggle && (
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => onFavoriteToggle(item.id)}
        >
          <Ionicons
            name={item.isFavorite ? "heart" : "heart-outline"}
            size={24}
            color={item.isFavorite ? COLORS.secondary : COLORS.grey}
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  supplierCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: COMPONENT_STYLES.cardBorderRadius,
    marginBottom: SPACING.cardMargin,
    padding: SPACING.m,
    flexDirection: "row",
    alignItems: "center",
  },
  supplierImage: {
    width: 60,
    height: 60,
    borderRadius: COMPONENT_STYLES.borderRadius,
    marginRight: SPACING.m,
    backgroundColor: COLORS.white,
  },
  supplierInfo: {
    flex: 1,
    marginRight: SPACING.s,
  },
  supplierName: {
    color: COLORS.accent,
    fontSize: FONT_SIZES.bodyM,
    fontFamily: FONT_FAMILY.medium,
    marginBottom: SPACING.xs,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.s,
  },
  ratingText: {
    color: COLORS.accent,
    fontSize: FONT_SIZES.bodyXS,
    fontFamily: FONT_FAMILY.regular,
    marginLeft: SPACING.xs,
    marginRight: SPACING.xs,
  },
  reviewsText: {
    color: COLORS.grey,
    fontSize: FONT_SIZES.bodyXS,
    fontFamily: FONT_FAMILY.regular,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: COLORS.tagBackground,
    borderRadius: 6,
    paddingVertical: SPACING.xs / 2,
    paddingHorizontal: SPACING.s,
    marginRight: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  tagHighlight: {
    backgroundColor: COLORS.secondary,
  },
  tagText: {
    color: COLORS.accent,
    fontSize: FONT_SIZES.bodyXS,
    fontFamily: FONT_FAMILY.regular,
  },
  tagTextHighlight: {
    color: COLORS.primary,
  },
  favoriteButton: {
    padding: SPACING.xs,
  },
});

export default SupplierCard;
