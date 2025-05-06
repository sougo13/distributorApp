import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Assuming usage for icons
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack"; // <-- Import StackNavigationProp
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context"; // <-- Import from correct library
import * as styles from "../../styles"; // Assuming common styles are here
import { HomeStackParamList } from "../../navigation/HomeStackNavigator"; // <-- Import Param List type
import { BlurView } from "expo-blur"; // For blurred back button background

// Placeholder types - replace with actual types later
interface SupplierInfo {
  id: string;
  name: string;
  imageUrl?: ImageSourcePropType;
  rating: number;
  reviewCount: number;
  description: string;
  status: string; // e.g., 'Opened'
}

interface ProductInfo {
  id: string;
  name: string;
  imageUrl?: ImageSourcePropType;
  description: string;
  pricePerUnit: number;
  currencySymbol: string;
  unit: string;
}

// Define navigation prop type
type NegotiationRequestScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'NegotiationRequest' // Current screen name
>;

// --- Dummy Data ---
// Use the downloaded Ballerina Farm image as fallback since placeholder is missing
const FALLBACK_SUPPLIER_IMAGE: ImageSourcePropType = require("../../assets/images/supplier_ballerina_farm.png");
// const FALLBACK_SUPPLIER_IMAGE: ImageSourcePropType = require('../assets/images/supplier_placeholder.png'); // Add a placeholder image
// const FALLBACK_PRODUCT_IMAGE: ImageSourcePropType = require('../assets/images/rice_basmati.png'); // Reuse or add another placeholder
// Use the newly downloaded image as fallback/default for product
const FALLBACK_PRODUCT_IMAGE: ImageSourcePropType = require("../../assets/images/product_basmati_rice.png");

const dummySupplier: SupplierInfo = {
  id: "supplier1",
  name: "Ballerina Farm",
  imageUrl: require("../../assets/images/supplier_ballerina_farm.png"), // Replace with actual path if exists
  rating: 4.9,
  reviewCount: 21,
  description:
    "Ballerina Farm offers premium, pasture-raised meats, including beef, pork, and lamb...", // Truncated for brevity
  status: "Opened",
};

const dummyProduct: ProductInfo = {
  id: "product1",
  name: "Basmati Rice",
  imageUrl: FALLBACK_PRODUCT_IMAGE, // Use the fallback which now points to the downloaded image
  description:
    "Basmati rice is a long-grain, aromatic rice known for its fluffy texture...", // Truncated
  pricePerUnit: 16.0,
  currencySymbol: "₾",
  unit: "Kg",
};
// --- End Dummy Data ---

const NegotiationRequestScreen: React.FC = () => {
  const { t } = useTranslation();
  // Use the defined type for navigation
  const navigation = useNavigation<NegotiationRequestScreenNavigationProp>();
  // TODO: Get actual product/supplier data from route params or state management
  const [supplier, setSupplier] = useState<SupplierInfo>(dummySupplier);
  const [product, setProduct] = useState<ProductInfo>(dummyProduct);
  const [dealPrice, setDealPrice] = useState("");
  const [dealQuantity, setDealQuantity] = useState("");
  const [repeatPurchase, setRepeatPurchase] = useState(false); // Example state for the toggle/check

  const handleRequestDeal = () => {
    // TODO: Implement deal request logic
    console.log("Requesting deal:", {
      supplierId: supplier.id,
      productId: product.id,
      price: dealPrice,
      quantity: dealQuantity,
      repeat: repeatPurchase,
    });
    // Potentially navigate back or show success message
    // Navigate to success screen instead of going back
    navigation.navigate('NegotiationSuccess');
    /*
    if (navigation.canGoBack()) {
       navigation.goBack();
    }
    */
  };

  return (
    <SafeAreaView style={s.safeArea}>
      {/* Header Section */}
      <View style={s.headerContainer}>
        {/* Back Button */}
        <BlurView
          intensity={90}
          tint="dark"
          style={s.headerButtonBlurContainer}
        >
          <TouchableOpacity
            style={s.headerButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={styles.COLORS.accent}
            />
          </TouchableOpacity>
        </BlurView>

        {/* Title */}
        <View style={s.titleContainer}>
          <Text style={s.title}>
            {t("negotiationScreen.title", "Negotiation Deal")}
          </Text>
        </View>

        {/* Details Button */}
        <BlurView
          intensity={90}
          tint="dark"
          style={s.headerButtonBlurContainer}
        >
          <TouchableOpacity
            style={s.headerButton}
            onPress={() => {
              /* TODO: Implement details action */
            }}
          >
            <Ionicons
              name="alert-circle-outline"
              size={24}
              color={styles.COLORS.accent}
            />
          </TouchableOpacity>
        </BlurView>
      </View>

      {/* Scrollable Content */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={s.scrollContainer}>
        {/* Chosen Supplier */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>
            {t("negotiationScreen.chosenSupplier", "Chosen Supplier")}
          </Text>
          <View style={s.supplierCard}>
            <Image
              source={supplier.imageUrl || FALLBACK_SUPPLIER_IMAGE}
              style={s.supplierImage}
            />
            <View style={s.supplierInfo}>
              <View style={s.supplierHeader}>
                <Text style={s.supplierName}>{supplier.name}</Text>
                {/* Placeholder for dots icon */}
                <Ionicons
                  name="ellipsis-vertical"
                  size={18}
                  color={styles.COLORS.accent}
                />
              </View>
              {/* <Text style={s.supplierStatus}>{supplier.status}</Text> */}
              <View style={s.ratingContainer}>
                <Text style={s.ratingText}>{supplier.rating.toFixed(1)}</Text>
                <Ionicons name="star" size={12} color={styles.COLORS.rating} />
                <Text style={s.ratingText}>({supplier.reviewCount})</Text>
              </View>
              <Text style={s.supplierDescription} numberOfLines={3}>
                {supplier.description}
              </Text>
            </View>
          </View>
        </View>

        <View style={s.separator} />

        {/* Chosen Product */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>
            {t("negotiationScreen.chosenProduct", "Chosen Product")}
          </Text>
          <View style={s.productCard}>
            <Image
              source={product.imageUrl || FALLBACK_PRODUCT_IMAGE}
              style={s.productImage}
            />
            <View style={s.productInfo}>
              <Text style={s.productName}>{product.name}</Text>
              <Text style={s.productDescription} numberOfLines={3}>
                {product.description}
              </Text>
            </View>
            <View style={s.productPriceContainer}>
              <Text style={s.productPrice}>
                {product.pricePerUnit.toFixed(2)}
                {product.currencySymbol} / {product.unit}
              </Text>
            </View>
          </View>
        </View>

        <View style={s.separator} />

        {/* Price Negotiation */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>
            {t("negotiationScreen.priceDeal", "Price Negotiation Deal")}
          </Text>
          <View style={s.inputContainer}>
            <TextInput
              style={s.input}
              placeholder={t(
                "negotiationScreen.pricePlaceholder",
                "Type your deal price"
              )}
              placeholderTextColor={styles.COLORS.placeholder} // Adjust color
              keyboardType="numeric"
              value={dealPrice}
              onChangeText={setDealPrice}
            />
            <View style={s.inputUnitContainer}>
              <Text style={s.inputUnitText}>
                {product.currencySymbol || "₾"}
              </Text>
              <Text style={s.inputUnitText}>/</Text>
              <Text style={s.inputUnitText}>{product.unit || "Kg"}</Text>
            </View>
          </View>
        </View>

        <View style={s.separator} />

        {/* Quantity Negotiation */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>
            {t("negotiationScreen.quantityDeal", "Quantity Negotiation Deal")}
          </Text>
          <View style={s.inputContainer}>
            <TextInput
              style={s.input}
              placeholder={t(
                "negotiationScreen.quantityPlaceholder",
                "Type your deal amount"
              )}
              placeholderTextColor={styles.COLORS.placeholder} // Adjust color
              keyboardType="numeric"
              value={dealQuantity}
              onChangeText={setDealQuantity}
            />
            <View style={s.inputUnitContainer}>
              <Text style={s.inputUnitText}>{product.unit || "Kg"}</Text>
            </View>
          </View>
        </View>

        <View style={s.separator} />

        {/* Repeat Purchase */}
        {/* Based on Figma, this looks like a toggle or selection, implementing as a toggle for now */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>
            {t(
              "negotiationScreen.repeatPurchase",
              "You Have To Repeat The Purchase"
            )}
          </Text>
          <TouchableOpacity
            style={s.repeatContainer}
            onPress={() => setRepeatPurchase(!repeatPurchase)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={repeatPurchase ? "checkmark-circle" : "ellipse-outline"} // Using different icons for state
              size={24}
              color={
                repeatPurchase
                  ? styles.COLORS.secondary
                  : styles.COLORS.placeholder
              } // Adjust colors
              style={s.repeatIcon}
            />
            <Text style={s.repeatText}>
              {t("negotiationScreen.repeatFrequency", "Every Month")}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Footer Button */}
      <View style={s.footer}>
        <TouchableOpacity style={s.requestButton} onPress={handleRequestDeal}>
          <Text style={s.requestButtonText}>
            {t("negotiationScreen.requestButton", "Request Deal")}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: styles.COLORS.primary,
  },
  outerContainer: {
    flex: 1,
    backgroundColor: styles.COLORS.primary, // Use common background color
  },
  scrollContainer: {
    paddingBottom: 120, // Space for the sticky footer button
    paddingHorizontal: styles.SPACING.l,
    paddingTop: styles.SPACING.l, // Add some padding below the header
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: styles.SPACING.l,
    paddingBottom: styles.SPACING.m, // Space below header items
    backgroundColor: styles.COLORS.primary, // Match background
  },
  headerButtonBlurContainer: {
    borderRadius: styles.COMPONENT_STYLES.cardBorderRadius, // 12
    overflow: "hidden",
  },
  headerButton: {
    padding: styles.SPACING.s,
    alignItems: "center", // Center title horizontally in the available space
    marginHorizontal: styles.SPACING.s, // Add some space between buttons and title
  },
  titleContainer: {
    flex: 1,
    alignItems: "center", // Center title horizontally in the available space
    marginHorizontal: styles.SPACING.s, // Add some space between buttons and title
  },
  title: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.h3, // 18
    color: styles.COLORS.accent,
  },
  section: {
    marginBottom: styles.SPACING.l,
  },
  sectionTitle: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.h4, // 16
    color: styles.COLORS.accent,
    marginBottom: styles.SPACING.m,
  },
  supplierCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: styles.COLORS.cardBackground, // Use an appropriate color from styles
    borderRadius: styles.COMPONENT_STYLES.headerBorderRadius, // 20
    padding: styles.SPACING.m,
    // Add backdrop blur if needed and available/configured
  },
  supplierImage: {
    width: 60,
    height: 60,
    borderRadius: styles.COMPONENT_STYLES.borderRadius, // 8
    marginRight: styles.SPACING.m,
  },
  supplierInfo: {
    flex: 1,
  },
  supplierHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: styles.SPACING.xs,
  },
  supplierName: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.h4, // 16
    color: styles.COLORS.accent,
  },
  supplierStatus: {
    // Style based on Figma 'Opened' text
    fontFamily: styles.FONT_FAMILY.regular, // Assuming light weight
    fontSize: styles.FONT_SIZES.bodyXS, // 12
    color: styles.COLORS.secondaryDisabled, // Use the greenish color from Figma
    marginBottom: styles.SPACING.xs,
  },
  ratingContainer: {
    // Style based on Figma rating
    flexDirection: "row",
    alignItems: "center",
    marginBottom: styles.SPACING.xs,
  },
  ratingText: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyXS, // 12
    color: styles.COLORS.accent,
    marginRight: styles.SPACING.xs,
  },
  supplierDescription: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyXS, // 12
    color: styles.COLORS.accent,
    lineHeight: styles.FONT_SIZES.bodyXS * 1.35,
  },
  separator: {
    height: 1,
    backgroundColor: styles.COLORS.separator, // Use an appropriate color
    marginVertical: styles.SPACING.m, // Adjust spacing
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: styles.SPACING.xs,
  },
  productImage: {
    width: 64,
    height: 64,
    borderRadius: styles.COMPONENT_STYLES.cardBorderRadius, // 12
    marginRight: styles.SPACING.m,
  },
  productInfo: {
    flex: 1,
    marginRight: styles.SPACING.m,
  },
  productName: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.h4, // 16
    color: styles.COLORS.accent,
    marginBottom: styles.SPACING.xs,
  },
  productDescription: {
    fontFamily: styles.FONT_FAMILY.regular, // Matches Figma 'Basmati rice...' style
    fontSize: styles.FONT_SIZES.bodyXS, // 12
    color: styles.COLORS.accent,
    lineHeight: styles.FONT_SIZES.bodyXS * 1.35,
  },
  productPriceContainer: {
    // Aligns price to the right based on Figma
  },
  productPrice: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.h4, // Matches Figma '16.00' style (16)
    color: styles.COLORS.accent,
    textAlign: "right",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: styles.COLORS.inputBackground, // Use appropriate color
    borderRadius: styles.COMPONENT_STYLES.inputBorderRadius, // 8
    paddingHorizontal: styles.SPACING.m,
    paddingVertical: styles.SPACING.s, // Adjust for height
  },
  input: {
    flex: 1,
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.h4, // 16
    color: styles.COLORS.accent,
    paddingVertical: styles.SPACING.s, // Adjust vertical padding if needed
  },
  inputUnitContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: styles.SPACING.s,
  },
  inputUnitText: {
    fontFamily: styles.FONT_FAMILY.medium, // Matches Figma '₾ / Kg' style
    fontSize: styles.FONT_SIZES.h4, // 16
    color: styles.COLORS.accent,
    marginLeft: styles.SPACING.xs, // Spacing between units
  },
  repeatContainer: {
    flexDirection: "row",
    alignItems: "center",
    // No background/border needed per Figma
  },
  repeatIcon: {
    marginRight: styles.SPACING.m,
  },
  repeatText: {
    fontFamily: styles.FONT_FAMILY.regular, // Matches Figma 'Every Month' style
    fontSize: styles.FONT_SIZES.h4, // 16
    color: styles.COLORS.placeholder, // Use the slightly dimmed white
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: styles.SPACING.l,
    backgroundColor: "rgba(20, 20, 20, 0.8)", // Matches Figma footer background
    // Add backdrop blur if possible and desired
  },
  requestButton: {
    backgroundColor: styles.COLORS.secondary, // Green button
    borderRadius: styles.COMPONENT_STYLES.borderRadius, // 8
    paddingHorizontal: styles.SPACING.l,
    alignItems: "center",
    justifyContent: "center",
    height: 50, // Match common button height if applicable
  },
  requestButtonText: {
    fontFamily: styles.FONT_FAMILY.regular, // Match Figma 'Request Deal' text style
    fontSize: styles.FONT_SIZES.h3, // 18
    color: styles.COLORS.primary, // Black text on green button
    fontWeight: "500", // Figma shows medium/500 weight
  },
});

export default NegotiationRequestScreen;
