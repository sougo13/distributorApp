import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import * as styles from "../styles";
import { CartItem } from "../types";
import QuantityStepper from "./common/QuantityStepper";

interface CartListItemProps {
  item: CartItem;

  onQuantityChange?: (itemId: string, newQuantity: number) => void;
  onRemove?: (itemId: string) => void;
  isCheckout?: boolean;
  isAvailable?: boolean;
}

const placeholderImage = require("../assets/images/rice_basmati.png");

const CartListItem: React.FC<CartListItemProps> = ({
  item,
  onQuantityChange,
  onRemove,
  isCheckout = false,
  isAvailable = true,
}) => {
  const { t } = useTranslation();
  const { product, quantity, id: cartItemId } = item;

  const handleIncrement = () => {
    if (onQuantityChange && isAvailable) {
      onQuantityChange(cartItemId, quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (onQuantityChange && quantity > 1 && isAvailable) {
      onQuantityChange(cartItemId, quantity - 1);
    }
  };

  const handleRemove = () => {
    if (onRemove && isAvailable) {
      onRemove(cartItemId);
    }
  };

  const imageSource =
    typeof product.imageUrl === "string"
      ? { uri: product.imageUrl }
      : product.imageUrl || placeholderImage;

  const containerStyle = [s.container, !isAvailable && s.unavailableContainer];

  const textStyle = !isAvailable ? s.unavailableText : s.productName;
  const priceStyle = !isAvailable ? s.unavailableText : s.priceText;

  return (
    <View style={containerStyle}>
      <Image source={imageSource} style={s.image} />
      <View style={s.infoContainer}>
        <View style={s.row}>
          <Text style={textStyle} numberOfLines={2}>
            {product.name}
          </Text>

          {!isCheckout && isAvailable && onRemove && (
            <TouchableOpacity
              onPress={handleRemove}
              style={s.removeButton}
              disabled={!isAvailable}
            >
              <Ionicons
                name="trash-outline"
                size={22}
                color={styles.COLORS.grey}
              />
            </TouchableOpacity>
          )}

          {!isAvailable && (
            <Text style={s.unavailableBadge}>
              {t("checkout.itemUnavailable")}
            </Text>
          )}
        </View>
        <View style={s.row}>
          <Text style={priceStyle}>
            {product.pricePerUnit.toFixed(2)} ₾
            {t("cart.perUnit", { unit: product.unit })}
            {isAvailable && ` x ${quantity}`}
          </Text>

          {!isCheckout && onQuantityChange && (
            <QuantityStepper
              quantity={quantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
              minValue={1}
              disabled={!isAvailable}
            />
          )}
        </View>
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: styles.SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: styles.COLORS.inputBackground,
  },
  unavailableContainer: {
    opacity: 0.6,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: styles.COMPONENT_STYLES.borderRadiusS,
    marginRight: styles.SPACING.m,
    backgroundColor: styles.COLORS.inputBackground,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: styles.SPACING.xs,
  },
  productName: {
    flex: 1,
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.bodyM,
    color: styles.COLORS.accent,
    marginRight: styles.SPACING.s,
  },
  priceText: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyS,
    color: styles.COLORS.grey,
  },
  unavailableText: {
    color: styles.COLORS.grey,
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyM,
    marginRight: styles.SPACING.s,
    flex: 1,
  },
  unavailableBadge: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.bodyS,
    color: styles.COLORS.error,
    marginLeft: styles.SPACING.s,
  },
  removeButton: {
    padding: styles.SPACING.xs,
  },
});

export default CartListItem;
