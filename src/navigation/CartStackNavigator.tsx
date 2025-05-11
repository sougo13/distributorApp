import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import { Address } from "../types";

import CartScreen from "../screens/CartScreen";
import OrderRequestScreen from "../screens/OrderRequestScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import PaymentStatusScreen from "../screens/PaymentStatusScreen";
import ChangePaymentMethodScreen from "../screens/profile/ChangePaymentMethodScreen";
import AddNewCardScreen from "../screens/profile/AddNewCardScreen";
import * as styles from "../styles";

export type OrderRequestParams = {
  selectedAddress: Address;
};

export type CartStackParamList = {
  CartMain: undefined;
  OrderRequest: OrderRequestParams | undefined;
  Checkout: undefined;
  ChangePaymentMethod: undefined;
  AddNewCard: undefined;
  PaymentStatus: { success: boolean; orderId?: string };
};

const Stack = createStackNavigator<CartStackParamList>();

const CartStackNavigator: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      initialRouteName="CartMain"
      screenOptions={{
        headerStyle: {
          backgroundColor: styles.COLORS.primary,
          shadowOpacity: 0,
          elevation: 0,
        },
        headerTintColor: styles.COLORS.accent,
        headerTitleStyle: {
          fontFamily: styles.FONT_FAMILY.medium,
          fontSize: styles.FONT_SIZES.h3,
        },
        headerTitleAlign: "center",
        headerBackTitle: t("common.back"),
      }}
    >
      <Stack.Screen
        name="CartMain"
        component={CartScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OrderRequest"
        component={OrderRequestScreen}
        options={{ title: t("orderRequest.title") }}
      />

      <Stack.Screen
        name="Checkout"
        component={CheckoutScreen}
        options={{ title: t("cart.checkoutTitle") }}
      />
      <Stack.Screen
        name="ChangePaymentMethod"
        component={ChangePaymentMethodScreen}
        options={{ title: t("cart.changePaymentMethodTitle") }}
      />
      <Stack.Screen
        name="AddNewCard"
        component={AddNewCardScreen}
        options={{ title: t("cart.addNewCardTitle") }}
      />
      <Stack.Screen
        name="PaymentStatus"
        component={PaymentStatusScreen}
        options={{
          title: t("cart.paymentStatusTitle"),
          headerLeft: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

export default CartStackNavigator;
