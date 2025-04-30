import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import * as styles from "../styles";
import { summaryStyles, warningStyles } from "../styles/sharedStyles";
import { CartStackParamList } from "../navigation/CartStackNavigator";

import { ProfileStackParamList } from "../navigation/ProfileStackNavigator";
import { Address, CartItem, PaymentMethod } from "../types";
import PrimaryButton from "../components/common/PrimaryButton";
import SecondaryButton from "../components/common/SecondaryButton";
import CartListItem from "../components/CartListItem";
import RadioButton from "../components/common/RadioButton";

import {
  MOCK_CART_ITEMS,
  MOCK_CHECKOUT_SUMMARY,
  MOCK_ORDER_DETAILS,
  MOCK_PAYMENT_METHODS,
} from "../data/mockData";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type CheckoutRouteProp = RouteProp<
  CartStackParamList & ProfileStackParamList,
  "Checkout"
>;

type CheckoutNavigationProp = StackNavigationProp<
  CartStackParamList,
  "Checkout"
>;

const CheckoutScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<CheckoutNavigationProp>();

  const route = useRoute<CheckoutRouteProp>();

  const [isCartExpanded, setIsCartExpanded] = useState(false);
  const [messageToStore, setMessageToStore] = useState("");
  const [messageToAccountant, setMessageToAccountant] = useState("");

  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(
      MOCK_PAYMENT_METHODS.find((p) => p.isPrimary) ||
        MOCK_PAYMENT_METHODS[0] ||
        null
    );

  useEffect(() => {
    if (route.params?.selectedPaymentMethod) {
      setSelectedPaymentMethod(route.params.selectedPaymentMethod);

      navigation.setParams({ selectedPaymentMethod: undefined });
    }
  }, [route.params?.selectedPaymentMethod, navigation]);

  const availableItems = useMemo(
    () => MOCK_CART_ITEMS.filter((item) => !item.product.unavailable),
    [MOCK_CART_ITEMS]
  );
  const unavailableItems = useMemo(
    () => MOCK_CART_ITEMS.filter((item) => item.product.unavailable),
    [MOCK_CART_ITEMS]
  );

  const cartHeaderCount = availableItems.length;
  const hasUnavailableItems = unavailableItems.length > 0;

  const summaryCalculations = useMemo(() => {
    const subtotal = availableItems.reduce(
      (sum, item) => sum + item.product.pricePerUnit * item.quantity,
      0
    );
    const currentDeliveryFee =
      MOCK_ORDER_DETAILS.deliveryOption === "delivery"
        ? MOCK_CHECKOUT_SUMMARY.deliveryFee
        : 0;
    const total =
      subtotal -
      MOCK_CHECKOUT_SUMMARY.discount -
      MOCK_CHECKOUT_SUMMARY.specialDiscount +
      currentDeliveryFee;
    return {
      discount: MOCK_CHECKOUT_SUMMARY.discount,
      specialDiscount: MOCK_CHECKOUT_SUMMARY.specialDiscount,
      deliveryFee: currentDeliveryFee,
      total: Math.max(0, total),
    };
  }, [availableItems, MOCK_ORDER_DETAILS.deliveryOption]);

  const toggleCartExpansion = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsCartExpanded(!isCartExpanded);
  };

  const handleNavigateToChangePayment = () => {
    console.log("Navigating to Change Payment Method");

    navigation.navigate("ChangePaymentMethod" as any, {
      screen: "ChangePaymentMethod",
      params: { canSelect: true, originRoute: "Checkout" },
    });
  };

  const handlePay = () => {
    console.log("Pay button pressed");

    const paymentSuccess = Math.random() > 0.3;
    navigation.navigate("PaymentStatus", {
      success: paymentSuccess,
      orderId: paymentSuccess ? "ORD-12345" : undefined,
    });
  };

  const handleCancelOrder = () => {
    console.log("Cancel Order pressed");

    navigation.goBack();
  };

  const renderCartItems = () => (
    <>
      {unavailableItems.map((item) => (
        <CartListItem
          key={item.id}
          item={item}
          isCheckout={true}
          isAvailable={false}
        />
      ))}
      {availableItems.map((item) => (
        <CartListItem
          key={item.id}
          item={item}
          isCheckout={true}
          isAvailable={true}
        />
      ))}
    </>
  );

  return (
    <SafeAreaView style={s.safeArea}>
      <ScrollView
        style={s.scrollView}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={s.sectionContainer}>
          <TouchableOpacity
            style={s.cartHeaderTouchable}
            onPress={toggleCartExpansion}
            activeOpacity={0.7}
          >
            <Text style={s.sectionTitle}>
              {t("checkout.yourCart", { count: cartHeaderCount })}
            </Text>
            <Ionicons
              name={
                isCartExpanded ? "chevron-up-outline" : "chevron-down-outline"
              }
              size={24}
              color={styles.COLORS.accent}
            />
          </TouchableOpacity>

          {hasUnavailableItems && (
            <View style={[warningStyles.container, s.warningContainer]}>
              <Ionicons
                name="information-circle-outline"
                size={20}
                color={styles.COLORS.warning}
                style={warningStyles.icon}
              />
              <Text style={warningStyles.text}>
                {t("checkout.unavailableWarning", {
                  count: unavailableItems.length,
                })}
              </Text>
            </View>
          )}

          {isCartExpanded && (
            <View style={s.cartItemsContainer}>{renderCartItems()}</View>
          )}
        </View>

        <View style={s.sectionContainer}>
          <Text style={s.sectionTitle}>
            {t("checkout.deliveryDetailsTitle")}
          </Text>

          <View style={s.staticDetailRow}>
            <MaterialCommunityIcons
              name={
                MOCK_ORDER_DETAILS.deliveryOption === "delivery"
                  ? "check-circle-outline"
                  : "circle-outline"
              }
              size={20}
              color={
                MOCK_ORDER_DETAILS.deliveryOption === "delivery"
                  ? styles.COLORS.secondary
                  : styles.COLORS.grey
              }
              style={s.staticDetailIcon}
            />
            <Text style={s.detailText}>
              {t("orderRequest.deliverToAddress")}
            </Text>
          </View>
          <View style={s.staticDetailRow}>
            <MaterialCommunityIcons
              name={
                MOCK_ORDER_DETAILS.deliveryOption === "pickup"
                  ? "check-circle-outline"
                  : "circle-outline"
              }
              size={20}
              color={
                MOCK_ORDER_DETAILS.deliveryOption === "pickup"
                  ? styles.COLORS.secondary
                  : styles.COLORS.grey
              }
              style={s.staticDetailIcon}
            />
            <Text style={s.detailText}>{t("orderRequest.pickUpMyself")}</Text>
          </View>

          {MOCK_ORDER_DETAILS.deliveryOption === "delivery" &&
            MOCK_ORDER_DETAILS.address && (
              <TouchableOpacity
                style={s.addressTouchable}
                activeOpacity={0.7}
                disabled={true}
              >
                <MaterialCommunityIcons
                  name="map-marker-outline"
                  size={24}
                  color={styles.COLORS.grey}
                  style={s.addressIcon}
                />
                <Text style={s.addressText} numberOfLines={1}>
                  {MOCK_ORDER_DETAILS.address.fullAddress}
                </Text>
              </TouchableOpacity>
            )}
        </View>

        <View style={s.sectionContainer}>
          <Text style={s.sectionTitle}>{t("checkout.deliveryTimeTitle")}</Text>

          <View style={s.staticDetailRow}>
            <Ionicons
              name="time-outline"
              size={20}
              color={styles.COLORS.grey}
              style={s.staticDetailIcon}
            />

            <Text style={s.detailText}>
              {MOCK_ORDER_DETAILS.timeOption === "asap"
                ? t("orderRequest.asap") + ` (${t("orderRequest.asapTime")})`
                : MOCK_ORDER_DETAILS.scheduledTime ||
                  t("orderRequest.scheduleTimePlaceholder")}
            </Text>
          </View>
        </View>

        <View style={s.sectionContainer}>
          <Text style={s.sectionTitle}>
            {t("checkout.businessStatusTitle")}
          </Text>

          <View style={s.staticDetailRow}>
            <MaterialCommunityIcons
              name={
                MOCK_ORDER_DETAILS.businessStatus === "registered"
                  ? "check-circle-outline"
                  : "circle-outline"
              }
              size={20}
              color={
                MOCK_ORDER_DETAILS.businessStatus === "registered"
                  ? styles.COLORS.secondary
                  : styles.COLORS.grey
              }
              style={s.staticDetailIcon}
            />
            <Text style={s.detailText}>{t("orderRequest.registered")}</Text>
          </View>
          <View style={s.staticDetailRow}>
            <MaterialCommunityIcons
              name={
                MOCK_ORDER_DETAILS.businessStatus === "not_registered"
                  ? "check-circle-outline"
                  : "circle-outline"
              }
              size={20}
              color={
                MOCK_ORDER_DETAILS.businessStatus === "not_registered"
                  ? styles.COLORS.secondary
                  : styles.COLORS.grey
              }
              style={s.staticDetailIcon}
            />
            <Text style={s.detailText}>{t("orderRequest.notRegistered")}</Text>
          </View>
        </View>

        <View style={[s.sectionContainer, summaryStyles.container]}>
          <Text style={summaryStyles.title}>{t("cart.summaryTitle")}</Text>

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
          <View style={summaryStyles.separator} />
          <View style={summaryStyles.row}>
            <Text style={summaryStyles.totalLabel}>{t("cart.total")}</Text>
            <Text style={summaryStyles.totalAmount}>
              {summaryCalculations.total.toFixed(2)} ₾
            </Text>
          </View>
        </View>

        <View style={warningStyles.containerTransparent}>
          <MaterialCommunityIcons
            name="information-outline"
            size={20}
            color={styles.COLORS.grey}
            style={warningStyles.icon}
          />
          <Text style={warningStyles.text}>{t("cart.priceWarning")}</Text>
        </View>

        <View style={s.sectionContainer}>
          <Text style={s.messageLabel}>{t("checkout.messageToStore")}</Text>
          <TextInput
            style={s.textInput}
            placeholder={t("checkout.messagePlaceholder")}
            placeholderTextColor={styles.COLORS.placeholder}
            value={messageToStore}
            onChangeText={setMessageToStore}
            multiline
          />
        </View>
        <View style={s.sectionContainer}>
          <Text style={s.messageLabel}>
            {t("checkout.messageToAccountant")}
          </Text>
          <TextInput
            style={s.textInput}
            placeholder={t("checkout.messagePlaceholder")}
            placeholderTextColor={styles.COLORS.placeholder}
            value={messageToAccountant}
            onChangeText={setMessageToAccountant}
            multiline
          />
        </View>

        <View style={s.sectionContainer}>
          <Text style={s.sectionTitle}>
            {t("checkout.choosePaymentMethod")}
          </Text>
          {selectedPaymentMethod ? (
            <TouchableOpacity
              style={s.paymentMethodTouchable}
              onPress={handleNavigateToChangePayment}
              activeOpacity={0.7}
            >
              <Feather
                name="credit-card"
                size={24}
                color={styles.COLORS.grey}
                style={s.paymentIcon}
              />
              <View style={s.paymentDetails}>
                <Text style={s.paymentText}>
                  {t("checkout.cardEndingIn", {
                    last4: selectedPaymentMethod.last4,
                  })}
                </Text>
                <Text style={s.changePaymentText}>
                  {t("checkout.changePayment")}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={styles.COLORS.grey}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={s.paymentMethodTouchable}
              onPress={handleNavigateToChangePayment}
              activeOpacity={0.7}
            >
              <Feather
                name="credit-card"
                size={24}
                color={styles.COLORS.grey}
                style={s.paymentIcon}
              />
              <Text style={[s.paymentText, { flex: 1 }]}>
                {t("checkout.selectPaymentMethod")}
              </Text>
              <Ionicons
                name="chevron-forward-outline"
                size={24}
                color={styles.COLORS.grey}
              />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      <View style={s.buttonContainer}>
        <PrimaryButton
          title={t("checkout.payButton")}
          onPress={handlePay}
          disabled={!selectedPaymentMethod || availableItems.length === 0}
        />
        <SecondaryButton
          title={t("checkout.cancelButton")}
          onPress={handleCancelOrder}
          style={s.cancelButton}
        />
      </View>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: styles.COLORS.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 150,
    padding: styles.SPACING.containerPadding,
  },
  sectionContainer: {
    marginBottom: styles.SPACING.l,
  },
  sectionTitle: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.h3,
    color: styles.COLORS.accent,
    marginBottom: styles.SPACING.m,
  },
  cartHeaderTouchable: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: styles.SPACING.s,
  },
  cartItemsContainer: {
    marginTop: styles.SPACING.s,
  },
  warningContainer: {
    marginTop: styles.SPACING.s,
    marginBottom: styles.SPACING.m,
    backgroundColor: styles.COLORS.inputBackground,
    borderColor: styles.COLORS.warning,
    borderWidth: 1,
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: styles.SPACING.m,
  },
  addressIcon: {
    marginRight: styles.SPACING.m,
  },
  addressText: {
    flex: 1,
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyM,
    color: styles.COLORS.accent,
    marginRight: styles.SPACING.s,
  },

  messageLabel: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyS,
    color: styles.COLORS.grey,
    marginBottom: styles.SPACING.s,
  },
  textInput: {
    backgroundColor: styles.COLORS.inputBackground,
    borderRadius: styles.COMPONENT_STYLES.inputBorderRadius,
    paddingVertical: styles.SPACING.m,
    paddingHorizontal: styles.SPACING.m,
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyM,
    color: styles.COLORS.accent,
    minHeight: 80,
    textAlignVertical: "top",
  },

  paymentMethodTouchable: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: styles.COLORS.inputBackground,
    borderRadius: styles.COMPONENT_STYLES.borderRadius,
    padding: styles.SPACING.m,
  },
  paymentIcon: {
    marginRight: styles.SPACING.m,
  },
  paymentDetails: {
    flex: 1,
    marginRight: styles.SPACING.s,
  },
  paymentText: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyM,
    color: styles.COLORS.accent,
  },
  changePaymentText: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyS,
    color: styles.COLORS.secondary,
    marginTop: styles.SPACING.xs,
  },

  buttonContainer: {
    paddingHorizontal: styles.SPACING.containerPadding,
    paddingTop: styles.SPACING.m,
    paddingBottom: styles.SPACING.l,
    backgroundColor: styles.COLORS.primary,
    borderTopWidth: 1,
    borderTopColor: styles.COLORS.inputBackground,
  },
  cancelButton: {
    marginTop: styles.SPACING.m,
  },
  staticDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: styles.SPACING.s,
  },
  staticDetailIcon: {
    marginRight: styles.SPACING.m,
    width: 24,
    textAlign: "center",
  },
  detailText: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyM,
    color: styles.COLORS.accent,

    flexShrink: 1,
  },
  addressTouchable: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: styles.COLORS.inputBackground,
    borderRadius: styles.COMPONENT_STYLES.borderRadius,
    padding: styles.SPACING.m,
    marginTop: styles.SPACING.m,
  },
});

export default CheckoutScreen;
