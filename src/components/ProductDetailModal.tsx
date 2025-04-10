import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import * as styles from "../styles";
import { ProductListItemData } from "../types";
import PrimaryButton from "./PrimaryButton";
import QuantityStepper from "./QuantityStepper";

interface ProductDetailModalProps {
  product: ProductListItemData | null;
  isVisible: boolean;
  onClose: () => void;
  onAddToCart: (productId: string, quantity: number) => void;
  onRequestNegotiation: (productId: string) => void;
}

const FALLBACK_IMAGE: ImageSourcePropType = require("../assets/images/rice_basmati.png");

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isVisible,
  onClose,
  onAddToCart,
  onRequestNegotiation,
}) => {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(1);

  React.useEffect(() => {
    if (isVisible) {
      setQuantity(1);
    }
  }, [isVisible, product]);

  if (!product) {
    return null;
  }

  const handleAddToCartPress = () => {
    onAddToCart(product.id, quantity);
    onClose();
  };

  const handleRequestPress = () => {
    onRequestNegotiation(product.id);

    onClose();
  };

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={s.overlay}>
        <View style={s.container}>
          <ImageBackground
            source={product.imageUrl || FALLBACK_IMAGE}
            style={s.headerImage}
            resizeMode="cover"
          >
            <TouchableOpacity style={s.closeButton} onPress={onClose}>
              <Ionicons
                name="close-circle"
                size={32}
                color={styles.COLORS.white}
              />
            </TouchableOpacity>
          </ImageBackground>

          <ScrollView
            style={s.contentScrollView}
            contentContainerStyle={s.contentContainer}
          >
            <Text style={s.productName}>{product.name}</Text>

            <View style={s.priceContainer}>
              <Text style={s.currentPrice}>
                {product.pricePerUnit.toFixed(2)}
                {product.currencySymbol || "₾"} / {product.unit}
              </Text>
              {product.oldPricePerUnit && (
                <Text style={s.oldPrice}>
                  {product.oldPricePerUnit.toFixed(2)}
                  {product.currencySymbol || "₾"} / {product.unit}
                </Text>
              )}
            </View>

            <Text style={s.description}>{product.description}</Text>

            <View style={s.bulkRequestContainer}>
              <Text style={s.bulkRequestText}>
                {t("productDetail.bulkRequestPrompt")}
              </Text>
              <PrimaryButton
                title={t("productDetail.requestButton")}
                onPress={handleRequestPress}
                style={s.requestButton}
                textStyle={s.requestButtonText}
              />
            </View>
          </ScrollView>

          <View style={s.footer}>
            <QuantityStepper
              quantity={quantity}
              onIncrement={() => setQuantity(quantity + 1)}
              onDecrement={() => setQuantity(Math.max(1, quantity - 1))}
              minValue={1}
            />
            <PrimaryButton
              title={t("productDetail.addToCartButton")}
              onPress={handleAddToCartPress}
              iconName="cart-outline"
              style={s.addToCartButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const s = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: styles.COLORS.primary,
    borderTopLeftRadius: styles.COMPONENT_STYLES.borderRadius * 2,
    borderTopRightRadius: styles.COMPONENT_STYLES.borderRadius * 2,

    maxHeight: "85%",
    overflow: "hidden",
  },

  headerImage: {
    height: 250,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingTop: styles.SPACING.m,
    paddingRight: styles.SPACING.m,
  },
  closeButton: {
    padding: styles.SPACING.xs,
  },
  closeButtonAbs: {
    position: "absolute",
    top: styles.SPACING.m,
    right: styles.SPACING.m,
    zIndex: 10,
    padding: styles.SPACING.xs,
  },
  contentScrollView: {},
  contentContainer: {
    padding: styles.SPACING.containerPadding,
    paddingBottom: styles.SPACING.l,
  },
  productName: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.h2,
    color: styles.COLORS.accent,
    marginBottom: styles.SPACING.s,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: styles.SPACING.m,
  },
  currentPrice: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.h3,
    color: styles.COLORS.secondary,
    marginRight: styles.SPACING.s,
  },
  oldPrice: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyM,
    color: styles.COLORS.grey,
    textDecorationLine: "line-through",
    marginRight: styles.SPACING.s,
  },
  description: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyM,
    color: styles.COLORS.accent,
    lineHeight: styles.FONT_SIZES.bodyM * 1.5,
    marginBottom: styles.SPACING.xl,
  },
  bulkRequestContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: styles.COLORS.inputBackground,
    borderRadius: styles.COMPONENT_STYLES.borderRadius,
    padding: styles.SPACING.m,
    marginBottom: styles.SPACING.l,
  },
  bulkRequestText: {
    flex: 1,
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyM,
    color: styles.COLORS.accent,
    marginRight: styles.SPACING.m,
    lineHeight: styles.FONT_SIZES.bodyM * 1.4,
  },
  requestButton: {
    paddingHorizontal: styles.SPACING.l,
    height: styles.COMPONENT_STYLES.buttonHeight * 0.8,
    minWidth: 100,
  },
  requestButtonText: {
    fontSize: styles.FONT_SIZES.bodyM,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: styles.SPACING.containerPadding,
    borderTopWidth: 1,
    borderTopColor: styles.COLORS.inputBackground,
    backgroundColor: styles.COLORS.primary,
  },
  addToCartButton: {
    flex: 1,
    marginLeft: styles.SPACING.m,
  },
});

export default ProductDetailModal;
