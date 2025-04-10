
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import { ProductListItemData } from "../types"; 
import * as styles from "../styles"; 

interface ProductListItemProps {
  item: ProductListItemData;
  onAddToCartPress: (item: ProductListItemData) => void; 
  onPress?: (item: ProductListItemData) => void; 
}

const ProductListItem: React.FC<ProductListItemProps> = ({
  item,
  onAddToCartPress,
  onPress, 
}) => {
  const { t } = useTranslation(); 


  const handlePress = () => {
    if (onPress) {
      onPress(item);
    }
  };

  return (

    <TouchableOpacity onPress={handlePress} disabled={!onPress} activeOpacity={onPress ? 0.7 : 1}>
      <View style={componentStyles.card}>
        <Image source={item.imageUrl} style={componentStyles.productImage} />
        <View style={componentStyles.infoContainer}>
          <Text style={componentStyles.productName}>{item.name}</Text>
          <Text style={componentStyles.productDescription} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={componentStyles.priceContainer}>
            <Text style={componentStyles.currentPrice}>
              {item.pricePerUnit.toFixed(2)} {item.currencySymbol}
            </Text>
            {item.oldPricePerUnit && ( 
              <Text style={componentStyles.originalPrice}>
                {item.oldPricePerUnit.toFixed(2)} {item.currencySymbol}
              </Text>
            )}
            <Text style={componentStyles.unitText}> / {item.unit}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={componentStyles.addButton}
          onPress={() => onAddToCartPress(item)} 
        >
          <Ionicons name="add" size={28} color={styles.COLORS.secondary} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const componentStyles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: styles.COLORS.cardBackground, 
    borderRadius: styles.COMPONENT_STYLES.cardBorderRadius,
    padding: styles.SPACING.m,
    marginBottom: styles.SPACING.m, 
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: styles.COMPONENT_STYLES.borderRadius,
    marginRight: styles.SPACING.m,
    backgroundColor: styles.COLORS.inputBackground, 
  },
  infoContainer: {
    flex: 1, 
    marginRight: styles.SPACING.s,
  },
  productName: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.bodyM,
    color: styles.COLORS.accent,
    marginBottom: styles.SPACING.xs,
  },
  productDescription: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyS,
    color: styles.COLORS.grey,
    marginBottom: styles.SPACING.s,
    lineHeight: styles.FONT_SIZES.bodyS * 1.4, 
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline", 
  },
  currentPrice: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.bodyL, 
    color: styles.COLORS.accent,
    marginRight: styles.SPACING.xs,
  },
  originalPrice: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyS,
    color: styles.COLORS.grey,
    textDecorationLine: "line-through", 
    marginRight: styles.SPACING.xs,
  },
  unitText: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyS,
    color: styles.COLORS.grey,
  },
  addButton: {
    padding: styles.SPACING.xs, 



  },
});

export default ProductListItem;
