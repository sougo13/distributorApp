import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { Order, OrderStatus } from "../types"; 
import * as styles from "../styles"; 
import { hexToRgba } from "../utils/colors";

interface OrderListItemProps {
  order: Order;
  onPress?: () => void; 
  onActionsPress?: () => void; 
}


const getStatusColor = (status: OrderStatus): string => {
  switch (status) {
    case "Delivered":
      return styles.COLORS.statusDelivered;
    case "Negotiating":
      return styles.COLORS.statusNegotiating;
    case "Pending":
      return styles.COLORS.statusPending;
    case "InProgress":
      return styles.COLORS.statusInProgress;
    case "Accepted":
      return styles.COLORS.secondary; 
    case "Canceled":
      return styles.COLORS.statusCanceled;
    case "Declined":
      return styles.COLORS.statusDeclined;
    default:
      return styles.COLORS.grey; 
  }
};

const OrderListItem: React.FC<OrderListItemProps> = ({
  order,
  onPress,
  onActionsPress,
}) => {
  const { t } = useTranslation();
  const statusColor = getStatusColor(order.status);

  const statusBackgroundColor = hexToRgba(statusColor, 0.1);

  const statusTranslationKey = `orderStatus.${order.status}` as const;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={componentStyles.card}
      activeOpacity={0.8}
    >
      <Image source={order.supplier.logoUrl} style={componentStyles.logo} />
      <View style={componentStyles.infoContainer}>
        <Text style={componentStyles.supplierName}>{order.supplier.name}</Text>

        
        
        <View
          style={[
            componentStyles.statusBadge,
            { backgroundColor: statusBackgroundColor },
          ]}
        >
          <Text style={[componentStyles.statusText, { color: statusColor }]}>
            {t(statusTranslationKey)}
          </Text>
        </View>

        
        {order.status === "Delivered" && order.requiresResponse && (
          <View style={componentStyles.warningContainer}>
            <Ionicons
              name="alert-circle-outline"
              size={16}
              color={styles.COLORS.statusWarningIcon}
              style={componentStyles.warningIcon}
            />
            <Text style={componentStyles.warningText}>
              {t("orders.requiresResponse")}
            </Text>
          </View>
        )}

        
        {!(order.status === "Delivered" && order.requiresResponse) && (
          <Text style={componentStyles.itemsSummary}>{order.itemsSummary}</Text>
        )}
      </View>
      <TouchableOpacity
        onPress={onActionsPress}
        style={componentStyles.actionsButton}
      >
        <Ionicons
          name="ellipsis-vertical"
          size={24}
          color={styles.COLORS.grey}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const componentStyles = StyleSheet.create({

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: styles.COLORS.cardBackground,
    borderRadius: styles.COMPONENT_STYLES.cardBorderRadius,
    padding: styles.SPACING.m,
    marginBottom: styles.SPACING.m,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: styles.COMPONENT_STYLES.borderRadius,
    marginRight: styles.SPACING.m,
    backgroundColor: styles.COLORS.inputBackground,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  supplierName: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.bodyL,
    color: styles.COLORS.accent,
    marginBottom: styles.SPACING.xs,
  },


  statusBadge: {
    alignSelf: "flex-start",
    paddingVertical: styles.SPACING.xs / 2 + 1, 
    paddingHorizontal: styles.SPACING.s,
    borderRadius: styles.COMPONENT_STYLES.borderRadius / 1.5, 
    marginBottom: styles.SPACING.xs,

  },
  statusText: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.bodyXS,

  },


  itemsSummary: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyS,
    color: styles.COLORS.grey,
    marginTop: styles.SPACING.xs,
  },
  actionsButton: {
    paddingLeft: styles.SPACING.s,
  },
  warningContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: styles.SPACING.xs,
  },
  warningIcon: {
    marginRight: styles.SPACING.xs,
  },
  warningText: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyS,
    color: styles.COLORS.statusWarningIcon,
    flexShrink: 1,
  },
});

export default OrderListItem;
