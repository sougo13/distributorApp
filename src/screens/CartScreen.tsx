import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { CartStackParamList } from "../navigation/CartStackNavigator";
import { summaryStyles, warningStyles } from "../styles/sharedStyles";
import * as styles from "../styles";
import { CartItem } from "../types";
import PrimaryButton from "../components/common/PrimaryButton";
import CartListItem from "../components/CartListItem";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  MOCK_CART_ITEMS,
  MOCK_DELIVERY_FEE,
  MOCK_DISCOUNT,
  MOCK_SPECIAL_DISCOUNT,
} from "../mockData";

type CartScreenNavigationProp = StackNavigationProp<
  CartStackParamList,
  "CartMain"
>;

const CartScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<CartScreenNavigationProp>();
  const [cartItems, setCartItems] = useState<CartItem[]>(MOCK_CART_ITEMS);

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  const summaryCalculations = useMemo(() => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.product.pricePerUnit * item.quantity,
      0
    );
    const total =
      subtotal - MOCK_DISCOUNT - MOCK_SPECIAL_DISCOUNT + MOCK_DELIVERY_FEE;
    return {
      subtotal,
      discount: MOCK_DISCOUNT,
      specialDiscount: MOCK_SPECIAL_DISCOUNT,
      deliveryFee: MOCK_DELIVERY_FEE,
      total: Math.max(0, total),
    };
  }, [cartItems]);

  const handleRequestOrder = () => {
    console.log("Navigating to Order Request...");

    navigation.navigate("OrderRequest");
  };

  const handleNavigateToSavedAddresses = () => {
    console.log("Navigating to Saved Addresses in Profile stack");
    navigation.navigate("Cart", {
      screen: "OrderRequest",
      params: { canSelect: true, originRoute: "Cart" },
    });
  };

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <CartListItem
      item={item}
      onQuantityChange={handleQuantityChange}
      onRemove={handleRemoveItem}
    />
  );

  const renderEmptyCart = () => (
    <View style={s.emptyContainer}>
      <Text style={s.emptyText}>{t("cart.emptyMessage")}</Text>
    </View>
  );

  const renderFooter = () => (
    <>
      <View style={summaryStyles.container}>
        <Text style={summaryStyles.title}>{t("cart.summaryTitle")}</Text>

        {/* {cartItems.map(item => (
                <View key={item.id} style={s.row}>
                    <Text style={s.label}>{t('cart.itemSubtotal', { count: item.quantity, name: item.product.name })}</Text>
                    <Text style={s.amount}>{(item.product.pricePerUnit * item.quantity).toFixed(2)} ₾</Text>
                </View>
            ))}
             <View style={s.separator} /> */}
        <View style={summaryStyles.row}>
          <Text style={summaryStyles.label}>{t("cart.discount")}</Text>
          <Text style={summaryStyles.amount}>
            - {summaryCalculations.discount.toFixed(2)} ₾
          </Text>
        </View>
        <View style={summaryStyles.row}>
          <Text style={summaryStyles.label}>{t("cart.specialDiscount")}</Text>
          <Text style={summaryStyles.amount}>
            - {summaryCalculations.specialDiscount.toFixed(2)} ₾
          </Text>
        </View>
        <View style={summaryStyles.row}>
          <Text style={summaryStyles.label}>{t("cart.deliveryFee")}</Text>
          <Text style={summaryStyles.amount}>
            {summaryCalculations.deliveryFee.toFixed(2)} ₾
          </Text>
        </View>
        <View style={s.separator} />
        <View style={summaryStyles.row}>
          <Text style={summaryStyles.totalLabel}>{t("cart.total")}</Text>
          <Text style={summaryStyles.totalAmount}>
            {summaryCalculations.total.toFixed(2)} ₾
          </Text>
        </View>
      </View>

      <View style={s.warningContainer}>
        <Ionicons
          name="information-outline"
          size={20}
          color={styles.COLORS.grey}
          style={warningStyles.icon}
        />
        <Text style={warningStyles.text}>{t("cart.priceWarning")}</Text>
      </View>

      <PrimaryButton
        title={t("cart.requestOrderButton")}
        onPress={handleRequestOrder}
        style={s.requestButton}
        disabled={cartItems.length === 0}
      />
    </>
  );

  return (
    <SafeAreaView style={s.safeArea}>
      <View style={s.header}>
        <Text style={s.headerTitle}>{t("cart.title")}</Text>
      </View>
      {cartItems.length === 0 ? (
        renderEmptyCart()
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={s.listContentContainer}
          ListFooterComponent={renderFooter}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: styles.COLORS.primary,
  },
  header: {
    paddingHorizontal: styles.SPACING.containerPadding,
    paddingTop: styles.SPACING.m,
    paddingBottom: styles.SPACING.s,
  },
  headerTitle: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.h2,
    color: styles.COLORS.accent,
  },
  listContentContainer: {
    paddingHorizontal: styles.SPACING.containerPadding,
    paddingBottom: styles.SPACING.l,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyL,
    color: styles.COLORS.grey,
  },
  separator: {
    height: 1,
    backgroundColor: styles.COLORS.inputBackground,
    marginVertical: styles.SPACING.m,
  },
  warningContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: styles.COLORS.inputBackground,
    borderRadius: styles.COMPONENT_STYLES.borderRadius,
    padding: styles.SPACING.m,
    marginTop: styles.SPACING.l,
    marginBottom: styles.SPACING.m,
  },
  requestButton: {
    marginTop: styles.SPACING.m,
  },
});

export default CartScreen;
