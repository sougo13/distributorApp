import React from "react";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { useTranslation } from "react-i18next";

import HomeScreen from "../screens/HomeScreen";
import SupplierDetailScreen from "../screens/SupplierDetailScreen";
import * as styles from "../styles";
import SupplierAboutScreen from "../screens/SupplierAboutScreen";

export type HomeStackParamList = {
  HomeList: undefined;
  SupplierDetail: { supplierId: string };
  SupplierAbout: { supplierId: string };
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
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
