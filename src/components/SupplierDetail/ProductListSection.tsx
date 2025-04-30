import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ListRenderItemInfo,
  FlatListProps,
} from "react-native";
import Animated from "react-native-reanimated";
import { TFunction } from "i18next";

import * as styles from "../../styles";
import { ProductListItemData } from "../../types";
import ProductListItem from "../ProductListItem"; // Assuming ProductListItem is in components folder

// Remove custom ScrollHandler type
// type ScrollHandler = (...args: any[]) => void;

interface ProductListSectionProps {
  products: ProductListItemData[];
  onScroll: (...args: any[]) => void; // Use a simpler type for the scroll handler prop
  onOpenProductDetail: (item: ProductListItemData) => void;
  listHeaderComponent: React.ReactElement;
  cartItemsCount: number;
  t: TFunction<"translation", undefined>;
}

// Remove the `as any` cast
const AnimatedFlatList = Animated.createAnimatedComponent<ProductListItemData>(
  Animated.FlatList
);

const ProductListSection: React.FC<ProductListSectionProps> = ({
  products,
  onScroll,
  onOpenProductDetail,
  listHeaderComponent,
  cartItemsCount,
  t,
}) => {
  const renderProductItem = ({ item }: { item: ProductListItemData }) => (
    // Use the passed handler
    <ProductListItem
      item={item}
      onAddToCartPress={() => onOpenProductDetail(item)}
      onPress={() => onOpenProductDetail(item)}
    />
  );

  const keyExtractor = (item: ProductListItemData) => item.id;

  const ItemSeparatorComponent = () => <View style={componentStyles.separator} />;

  const ListEmptyComponent = () => (
    <View style={componentStyles.emptyListContainer}>
      <Text style={componentStyles.emptyListText}>
        {t("common.noItemsFound", "No products found.")}
      </Text>
    </View>
  );

  const contentContainerStyle = {
    paddingBottom:
      cartItemsCount > 0
        ? styles.SPACING.xxl + styles.SPACING.xxl // Keep adjusted padding
        : styles.SPACING.l,
  };

  return (
    <AnimatedFlatList
      onScroll={onScroll}
      scrollEventThrottle={16}
      ListHeaderComponent={listHeaderComponent}
      data={products}
      renderItem={renderProductItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={ItemSeparatorComponent}
      contentContainerStyle={contentContainerStyle}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
};

// --- Styles --- //
const componentStyles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: "rgba(255, 250, 255, 0.1)",
    marginHorizontal: styles.SPACING.containerPadding,
    marginVertical: styles.SPACING.m,
  },
  emptyListContainer: {
    paddingVertical: styles.SPACING.xl,
    alignItems: "center",
  },
  emptyListText: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyM,
    color: styles.COLORS.grey,
  },
});

export default ProductListSection; 