import React from "react";
import {
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Category } from "../types"; // Предполагаем, что есть тип Category
import {
  COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  SPACING,
  COMPONENT_STYLES,
} from "../styles";

// Рассчитываем ширину здесь, если она используется только тут
// Либо передаем как prop из HomeScreen
const { width } = Dimensions.get("window");
const CARD_MARGIN = SPACING.s;
const NUM_COLUMNS = 3; // Важно, чтобы это значение совпадало с HomeScreen
const CARD_WIDTH =
  (width - SPACING.containerPadding * 2 - CARD_MARGIN * (NUM_COLUMNS - 1)) /
  NUM_COLUMNS;

interface CategoryCardProps {
  item: Category; // Используем тип Category
  onPress: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ item, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.categoryCard}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryTitle}>{item.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: COMPONENT_STYLES.cardBorderRadius,
    width: CARD_WIDTH,
    overflow: "hidden",
    alignItems: "center",
    paddingBottom: SPACING.s,
    // marginBottom убран, управляется columnWrapperStyle в FlatList
  },
  categoryImage: {
    width: "100%",
    height: CARD_WIDTH * 0.9, // Пропорциональная высота
    marginBottom: SPACING.s,
  },
  categoryTitle: {
    color: COLORS.accent,
    fontSize: FONT_SIZES.bodyS,
    fontFamily: FONT_FAMILY.medium, // Используем medium
    textAlign: "center",
    paddingHorizontal: SPACING.xs, // Небольшой отступ для длинных названий
  },
});

export default CategoryCard;
