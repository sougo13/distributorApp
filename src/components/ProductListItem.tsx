import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
// Remove useTranslation if not needed directly in this component
// import { useTranslation } from "react-i18next";

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
  // const { t } = useTranslation();

  const handlePress = () => {
    if (onPress) {
      onPress(item);
    }
  };

  const currency = item.currencySymbol ?? "$"; // Default currency if not provided
  const unit = item.unit ?? "item"; // Default unit

  return (
    // Main TouchableOpacity for the entire item
    <TouchableOpacity
      onPress={handlePress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
      style={componentStyles.container} // Add container style for margin
    >
      <View style={componentStyles.innerContainer}> {/* Row layout */}
        {/* Left Part: Image and Text Info */}
        <View style={componentStyles.leftSection}>
          {item.imageUrl && (
             <Image source={item.imageUrl} style={componentStyles.productImage} />
          )}
          <View style={componentStyles.infoContainer}>
            <Text style={componentStyles.productName} numberOfLines={1}> {/* Ensure name fits */}
              {item.name}
            </Text>
            <Text style={componentStyles.productDescription} numberOfLines={2}> {/* Limit description */}
              {item.description}
            </Text>
          </View>
        </View>

        {/* Right Part: Price and Add Button */}
        <View style={componentStyles.rightSection}>
          {/* Price Block - Rebuilt based on Figma */}
          <View style={componentStyles.priceBlock}>
            {/* Current Price Row */}
            <View style={componentStyles.priceRow}>
              <Text style={componentStyles.currentPriceValue}>
                {item.pricePerUnit.toFixed(2)}
              </Text>
              <Text style={componentStyles.currentPriceCurrency}>
                 {currency}
              </Text>
              <Text style={componentStyles.currentPriceUnit}> / {unit}</Text>
            </View>

            {/* Old Price Row (Conditional) */}
            {item.oldPricePerUnit && (
              <View style={componentStyles.priceRow}> {/* Use same row style */}
                <Text style={componentStyles.oldPriceValue}>
                  {item.oldPricePerUnit.toFixed(2)}
                </Text>
                <Text style={componentStyles.oldPriceCurrency}>
                   {currency}
                </Text>
                <Text style={componentStyles.oldPriceUnit}> / {unit}</Text>
              </View>
            )}
          </View>

          {/* Add Button */}
          <TouchableOpacity
            style={componentStyles.addButton}
            onPress={(e) => {
              e.stopPropagation(); // Prevent triggering onPress of the whole item
              onAddToCartPress(item);
            }}
          >
            <Ionicons name="add" size={24} color={styles.COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

// --- Updated Styles based on Figma --- (Using Satoshi font requires setup)
const componentStyles = StyleSheet.create({
  container: {
    paddingHorizontal: styles.SPACING.containerPadding, // Keep horizontal padding
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 24, // Gap from Figma (79:1154)
  },
  leftSection: {
    flexDirection: "row",
    flex: 1, // Take available space
    gap: 12, // Gap from Figma (79:1155)
    alignItems: "flex-start", // Align image and text block top
  },
  productImage: {
    width: 90, // Increase size further
    height: 90, // Increase size further
    borderRadius: 12, // From Figma (79:1156)
    backgroundColor: styles.COLORS.inputBackground, // Placeholder color
  },
  infoContainer: {
    flex: 1, // Allow text block to fill space
    gap: 6, // Gap from Figma (79:1157)
  },
  productName: {
    // fontFamily: "Satoshi-Medium", // Requires font setup
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: 16, // From Figma style_E7LI9M
    color: styles.COLORS.white, // From Figma style_E7LI9M
    // letterSpacing: 16 * 0.025, // Adjust if needed
  },
  productDescription: {
    // fontFamily: "Satoshi-Light", // Requires font setup
    fontFamily: styles.FONT_FAMILY.regular, // Use regular if light is not available
    fontSize: 12, // From Figma style_8SGI4X
    color: styles.COLORS.white, // From Figma style_8SGI4X
    opacity: 0.8, // Make slightly transparent
    lineHeight: 12 * 1.35, // From Figma style_8SGI4X
    textAlign: 'left', // Explicitly align left
    // letterSpacing: 12 * 0.0333,
  },
  rightSection: {
    flexDirection: "column",
    justifyContent: "space-between", // Pushes price up, button down
    alignItems: "flex-end", // Align price/button to the right
    // minHeight: 70, // Ensure it takes at least image height if needed
  },
  priceBlock: {
    alignItems: 'flex-end',
    gap: 4, // From Figma (247:677)
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  oldPriceRow: {
    // No specific style needed now, just uses priceRow
  },
  // Remove combined price styles
  // currentPrice: { ... },
  // oldPrice: { ... },
  // currencySymbol: { ... },
  // unitText: { ... },

  // --- Start New Price Styles ---
  currentPriceValue: {
    fontFamily: styles.FONT_FAMILY.medium, // Satoshi Medium
    fontSize: 16, // 16pt
    color: styles.COLORS.secondary, // Green #59FFA0
  },
  currentPriceCurrency: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: 16,
    color: styles.COLORS.secondary,
    marginHorizontal: 2, // Small gap around symbol
  },
  currentPriceUnit: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: 16,
    color: styles.COLORS.secondary,
    opacity: 0.8, // Slight fade for unit
  },
  oldPriceValue: {
    fontFamily: styles.FONT_FAMILY.medium, // Satoshi Medium
    fontSize: 14, // 14pt
    color: styles.COLORS.grey, // Grey/Brown #6E4720
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  oldPriceCurrency: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: 14,
    color: styles.COLORS.grey,
    textDecorationLine: 'line-through',
    opacity: 0.7,
    marginHorizontal: 2,
  },
  oldPriceUnit: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: 14,
    color: styles.COLORS.grey,
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  // --- End New Price Styles ---

  addButton: {
    padding: styles.SPACING.xs, // Keep padding
    // Position at bottom right handled by rightSection justifyContent
  },
});

export default ProductListItem;
