import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { OrdersStackParamList } from "../navigation/OrdersStackNavigator";
import { Order, OrderStatus } from "../types";
import GenericTabs from "../components/common/GenericTabs";
import OrderListItem from "../components/OrderListItem";
import * as styles from "../styles";
import { MOCK_ORDERS } from "../data/mockData";

type OrdersScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<OrdersStackParamList, "OrdersList">,
  StackNavigationProp<OrdersStackParamList, "OrderDetail">
>;

type OrderTabId = "current" | "history";

const ORDER_TABS = [
  { id: "current" as OrderTabId, translationKey: "orders.currentTab" },
  { id: "history" as OrderTabId, translationKey: "orders.historyTab" },
];

const OrdersScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<OrdersScreenNavigationProp>();
  const [activeTab, setActiveTab] = useState<OrderTabId>(ORDER_TABS[0].id);

  const filteredOrders = useMemo(() => {
    const isCurrent = activeTab === "current";
    return MOCK_ORDERS.filter((order) => order.isCurrent === isCurrent);
  }, [activeTab]);

  const handleNotificationPress = () => {
    console.log("Notification bell pressed");
  };

  const handleOrderPress = (orderId: string) => {
    console.log("Order pressed:", orderId);

    navigation.navigate("OrderDetail", { orderId: orderId });
  };

  const handleOrderActionsPress = (orderId: string) => {
    console.log("Order actions pressed:", orderId);
  };

  return (
    <SafeAreaView
      style={componentStyles.safeArea}
      edges={["top", "left", "right"]}
    >
      <View style={componentStyles.container}>
        <View style={componentStyles.header}>
          <Text style={componentStyles.headerTitle}>{t("orders.title")}</Text>
          <TouchableOpacity onPress={handleNotificationPress}>
            <Ionicons
              name="notifications-outline"
              size={26}
              color={styles.COLORS.accent}
            />
          </TouchableOpacity>
        </View>

        <GenericTabs
          tabs={ORDER_TABS}
          activeTab={activeTab}
          onTabPress={(tabId) => setActiveTab(tabId)}
          containerStyle={componentStyles.tabsContainer}
        />

        <FlatList
          data={filteredOrders}
          renderItem={({ item }) => (
            <OrderListItem
              order={item}
              onPress={() => handleOrderPress(item.id)}
              onActionsPress={() => handleOrderActionsPress(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={componentStyles.listContentContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={componentStyles.emptyListContainer}>
              <Text style={componentStyles.emptyListText}>
                {t("common.noItemsFound")}
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const componentStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: styles.COLORS.primary,
  },
  container: {
    flex: 1,
    paddingHorizontal: styles.SPACING.containerPadding,
    backgroundColor: styles.COLORS.primary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: styles.SPACING.m,
  },
  headerTitle: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.h1,
    color: styles.COLORS.accent,
  },
  notificationBadge: {
    position: "absolute",
    right: -3,
    top: -3,
    backgroundColor: styles.COLORS.error,
    borderRadius: 6,
    width: 12,
    height: 12,
    borderWidth: 2,
    borderColor: styles.COLORS.primary,
  },
  tabsContainer: {
    marginTop: styles.SPACING.s,
    marginBottom: styles.SPACING.l,
  },
  listContentContainer: {
    paddingBottom: styles.SPACING.l,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyListText: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyM,
    color: styles.COLORS.grey,
  },
});

export default OrdersScreen;
