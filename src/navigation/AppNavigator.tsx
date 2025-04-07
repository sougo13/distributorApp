// src/navigation/AppNavigator.tsx
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";

// Import Screens (and the new Stack Navigator)
import HomeScreen from "../screens/HomeScreen";
// import ProfileScreen from '../screens/ProfileScreen'; // Remove this line
import ProfileStackNavigator from "./ProfileStackNavigator"; // Import the stack
import FavouritesScreen from "../screens/FavouritesScreen";
import OrdersScreen from "../screens/OrdersScreen";
import CartScreen from "../screens/CartScreen";

// Import Styles
import * as styles from "../styles";
import { Platform } from "react-native";

// Define Param List for Tab Navigator (useful for potential future deeplinking)
export type TabParamList = {
  Home: undefined;
  Profile: undefined; // Points to the Profile Stack now
  Favourites: undefined;
  Orders: undefined;
  Cart: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Keep headers hidden for Tab navigator
        tabBarActiveTintColor: styles.COLORS.secondary,
        tabBarInactiveTintColor: styles.COLORS.grey,
        tabBarStyle: {
          backgroundColor: styles.COLORS.primary,
          borderTopWidth: 0, // Remove top border
          paddingBottom:
            Platform.OS === "ios" ? styles.SPACING.l : styles.SPACING.s, // Adjust padding for safe area / Android
          paddingTop: styles.SPACING.s,
          height: Platform.OS === "ios" ? 90 : 70, // Adjust height if needed
        },
        tabBarLabelStyle: {
          fontFamily: styles.FONT_FAMILY.medium,
          fontSize: styles.FONT_SIZES.tabLabel,
          marginTop: styles.SPACING.xs,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName: any; // Use 'any' or find specific types if preferred
          const iconSize = focused ? size + 2 : size; // Slightly larger when active

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
            iconName = "file-text1"; // AntDesign name for file/document like icon
            return (
              <FontAwesome5 name={"receipt"} size={size - 2} color={color} />
            ); // Using receipt icon from FontAwesome5
          } else if (route.name === "Cart") {
            iconName = focused ? "cart" : "cart-outline";
            return <Ionicons name={iconName} size={iconSize} color={color} />;
          }

          // Fallback icon (optional)
          return <MaterialIcons name="error" size={iconSize} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      {/* Use ProfileStackNavigator here */}
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
      <Tab.Screen name="Favourites" component={FavouritesScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
