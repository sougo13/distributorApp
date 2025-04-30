import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TFunction } from "i18next";

import * as styles from "../../styles";
import { ProductListItemData } from "../../types";
import ProductListItem from "../ProductListItem";

// --- Key Extractor --- //
export const keyExtractor = (item: ProductListItemData): string => item.id;

// --- Item Separator --- //
// Styles are passed from the parent component where StyleSheet is defined
export const renderItemSeparator = (separatorStyle: object) => (
  <View style={separatorStyle} />
);

// --- Empty List Component --- //
// Styles are passed from the parent component
export const renderListEmptyComponent = (
  t: TFunction<"translation", undefined>,
  emptyContainerStyle: object,
  emptyTextStyle: object
) => (
  <View style={emptyContainerStyle}>
    <Text style={emptyTextStyle}>
      {t("common.noItemsFound", "No products found.")}
    </Text>
  </View>
);

// --- Render Product Item --- //
// Returns a function suitable for FlatList's renderItem prop
export const createRenderProductItem = (
  onOpenProductDetail: (item: ProductListItemData) => void
) => {
  return ({ item }: { item: ProductListItemData }) => (
    <ProductListItem
      item={item}
      onAddToCartPress={() => onOpenProductDetail(item)}
      onPress={() => onOpenProductDetail(item)}
    />
  );
}; 