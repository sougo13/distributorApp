import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageSourcePropType,
  Platform,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import * as styles from "../styles";
import { ProductListItemData } from "../types";
import { BlurView } from "expo-blur";

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
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={s.overlay}>
        <View style={s.container}>
          <BlurView
            intensity={90}
            tint="dark"
            style={s.closeButtonBlurContainer}
          >
            <TouchableOpacity style={s.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color={styles.COLORS.white} />
            </TouchableOpacity>
          </BlurView>

          <Image
            source={product.imageUrl || FALLBACK_IMAGE}
            style={s.productImage}
            resizeMode="cover"
          />

          <ScrollView
            style={s.contentScrollView}
            contentContainerStyle={s.contentContainer}
          >
            <Text style={s.productName}>{product.name}</Text>

            <View style={s.priceRow}>
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

            <View style={s.negotiationContainer}>
              <Text style={s.negotiationText}>
                {t("productDetail.bulkRequestPrompt")}
              </Text>
              <TouchableOpacity
                style={s.requestButton}
                onPress={handleRequestPress}
              >
                <Text style={s.requestButtonText}>
                  {t("productDetail.requestButton")}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View style={s.footer}>
            <View style={s.quantityContainer}>
              <TouchableOpacity
                style={s.quantityButton}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Ionicons
                  name="remove"
                  size={20}
                  color={
                    quantity > 1 ? styles.COLORS.white : styles.COLORS.grey
                  }
                />
              </TouchableOpacity>
              <Text style={s.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={s.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Ionicons name="add" size={20} color={styles.COLORS.white} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={s.addToCartButton}
              onPress={handleAddToCartPress}
            >
              <Ionicons
                name="cart-outline"
                size={20}
                color={styles.COLORS.primary}
                style={{ marginRight: styles.SPACING.s }}
              />
              <Text style={s.addToCartButtonText}>
                {t("productDetail.addToCartButton")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const s = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#141414",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    maxHeight: "90%",
  },
  productImage: {
    height: 220,
    width: "100%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  closeButtonBlurContainer: {
    position: "absolute",
    top: styles.SPACING.l,
    right: styles.SPACING.l,
    borderRadius: 12,
    overflow: "hidden",
    zIndex: 10,
  },
  closeButton: {
    padding: styles.SPACING.s,
  },
  contentScrollView: {},
  contentContainer: {
    padding: styles.SPACING.l,
  },
  productName: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: 18,
    color: "#FFFAFF",
    marginBottom: styles.SPACING.m,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: styles.SPACING.m,
  },
  currentPrice: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: 16,
    color: "#59FFA0",
    marginRight: styles.SPACING.s,
  },
  oldPrice: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: 14,
    color: "#727072",
    textDecorationLine: "line-through",
    marginRight: styles.SPACING.s,
  },
  description: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: 16,
    color: "#FFFFFF",
    lineHeight: 16 * 1.4,
    marginBottom: styles.SPACING.l,
  },
  negotiationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 250, 255, 0.05)",
    borderRadius: 20,
    paddingVertical: styles.SPACING.m,
    paddingHorizontal: styles.SPACING.l,
    marginBottom: styles.SPACING.l,
  },
  negotiationText: {
    flex: 1,
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: 16,
    color: "#FFFFFF",
    marginRight: styles.SPACING.m,
    lineHeight: 16 * 1.4,
  },
  requestButton: {
    backgroundColor: "#59FFA0",
    borderRadius: 8,
    paddingVertical: styles.SPACING.s,
    paddingHorizontal: styles.SPACING.m,
  },
  requestButtonText: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: 18,
    color: "#141414",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: styles.SPACING.l,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    backgroundColor: "#141414",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 250, 255, 0.2)",
    borderRadius: 8,
    paddingHorizontal: styles.SPACING.s,
  },
  quantityButton: {
    padding: styles.SPACING.m,
  },
  quantityText: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: 18,
    color: "#FFFAFF",
    minWidth: 30,
    textAlign: "center",
    marginHorizontal: styles.SPACING.xs,
  },
  addToCartButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#59FFA0",
    borderRadius: 8,
    paddingHorizontal: styles.SPACING.m,
    marginLeft: styles.SPACING.m,
    height: 50,
  },
  addToCartButtonText: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: 18,
    color: "#141414",
    fontWeight: "500",
  },
});

export default ProductDetailModal;
