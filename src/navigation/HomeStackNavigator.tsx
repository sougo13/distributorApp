import React from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { useTranslation } from "react-i18next";

import HomeScreen from "../screens/HomeScreen";
import SupplierDetailScreen from "../screens/supplier/SupplierDetailScreen";
import * as styles from "../styles";
import SupplierAboutScreen from "../screens/supplier/SupplierAboutScreen";
import NegotiationRequestScreen from "../screens/supplier/NegotiationRequestScreen";
import NegotiationSuccessScreen from "../screens/supplier/NegotiationSuccessScreen";

export type HomeStackParamList = {
  HomeList: undefined;
  SupplierDetail: { supplierId: string };
  SupplierAbout: { supplierId: string };
  NegotiationRequest: { productId: string };
  NegotiationSuccess: undefined;
};

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  const { t } = useTranslation();

  const screenOptions: StackNavigationOptions = {
    headerShown: false,
  };

  return (
    <Stack.Navigator initialRouteName="HomeList" screenOptions={screenOptions}>
      <Stack.Screen name="HomeList" component={HomeScreen} />
      <Stack.Screen name="SupplierDetail" component={SupplierDetailScreen} />
      <Stack.Screen name="SupplierAbout" component={SupplierAboutScreen} />
      <Stack.Screen
        name="NegotiationRequest"
        component={NegotiationRequestScreen}
        options={{ presentation: "modal" }}
      />
      <Stack.Screen
        name="NegotiationSuccess"
        component={NegotiationSuccessScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
