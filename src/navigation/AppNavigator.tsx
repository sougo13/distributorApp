import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { getFocusedRouteNameFromRoute, RouteProp } from '@react-navigation/native';

import HomeScreen from "../screens/HomeScreen";
import ProfileStackNavigator from "./ProfileStackNavigator";
import FavouritesScreen from "../screens/FavouritesScreen";
import OrdersScreen from "../screens/OrdersScreen";

import CartStackNavigator from "./CartStackNavigator";

import * as styles from "../styles";
import { Platform } from "react-native";
import OrdersStackNavigator from "./OrdersStackNavigator";
import HomeStackNavigator from "./HomeStackNavigator";

export type TabParamList = {
  Home: undefined;
  Profile: undefined;
  Favourites: undefined;
  Orders: undefined;
  Cart: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const AppNavigator = () => {

  const getTabBarVisibility = (route: RouteProp<TabParamList, keyof TabParamList>): boolean => {
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeList';
    const hideOnScreens = ['SupplierDetail'];
    return !hideOnScreens.includes(routeName);
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: styles.COLORS.secondary,
        tabBarInactiveTintColor: styles.COLORS.grey,
        tabBarStyle: {
          display: getTabBarVisibility(route) ? 'flex' : 'none',
          backgroundColor: styles.COLORS.primary,
          borderTopWidth: 0,
          paddingBottom:
            Platform.OS === "ios" ? styles.SPACING.l : styles.SPACING.s,
          paddingTop: styles.SPACING.s,
          height: Platform.OS === "ios" ? 90 : 70,
        },
        tabBarLabelStyle: {
          fontFamily: styles.FONT_FAMILY.medium,
          fontSize: styles.FONT_SIZES.tabLabel,
          marginTop: styles.SPACING.xs,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: any;
          const iconSize = focused ? size + 2 : size;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
            return <Ionicons name={iconName} size={iconSize} color={color} />;
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
            return <Ionicons name={iconName} size={iconSize} color={color} />;
          } else if (route.name === "Favourites") {
            iconName = focused ? "heart" : "heart-outline";
            return <Ionicons name={iconName} size={iconSize} color={color} />;
          } else if (route.name === "Orders") {
            return (
              <FontAwesome5 name={"receipt"} size={size - 2} color={color} />
            );
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
            return <Ionicons name={iconName} size={iconSize} color={color} />;
          }

          return <MaterialIcons name="error" size={iconSize} color={color} />;
        },

        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={({ route }) => ({
          tabBarStyle: {
            display: getTabBarVisibility(route) ? 'flex' : 'none',
            backgroundColor: styles.COLORS.primary,
            borderTopWidth: 0,
            paddingBottom:
              Platform.OS === "ios" ? styles.SPACING.l : styles.SPACING.s,
            paddingTop: styles.SPACING.s,
            height: Platform.OS === "ios" ? 90 : 70,
          },
        })}
      />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
      <Tab.Screen name="Favourites" component={FavouritesScreen} />
      <Tab.Screen name="Orders" component={OrdersStackNavigator} />

      <Tab.Screen name="Cart" component={CartStackNavigator} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
