import React from "react";
import {
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  View, 
} from "react-native";
import { Category } from "../types";
import {
  COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  SPACING,
  COMPONENT_STYLES,
} from "../styles";

const CARD_MARGIN_HORIZONTAL = SPACING.s / 2; 

interface CategoryCardProps {
  item: Category;
  onPress: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ item, onPress }) => {
  return (
    <View style={styles.cardWrapper}>
      <TouchableOpacity
        style={styles.categoryCard}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <Image source={item.image} style={styles.categoryImage} />
        <Text style={styles.categoryTitle} numberOfLines={2}>
          
          
          {item.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1, 
    marginHorizontal: CARD_MARGIN_HORIZONTAL, 
  },
  categoryCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: COMPONENT_STYLES.cardBorderRadius,

    overflow: "hidden",
    alignItems: "center",
    paddingBottom: SPACING.s,

    flex: 1,
  },
  categoryImage: {
    width: "100%",

    aspectRatio: 1 / 0.9, 
    marginBottom: SPACING.s,
  },
  categoryTitle: {
    color: COLORS.accent,
    fontSize: FONT_SIZES.bodyS,
    fontFamily: FONT_FAMILY.medium,
    textAlign: "center",
    paddingHorizontal: SPACING.xs,
  },
});

export default CategoryCard;
