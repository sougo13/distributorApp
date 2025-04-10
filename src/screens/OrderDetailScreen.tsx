import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
} from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import Clipboard from "expo-clipboard";

import { OrdersStackParamList } from "../navigation/OrdersStackNavigator";
import { getMockOrderDetailById } from "../data/mockData";
import { OrderDetail, OrderDetailStatusType } from "../types";
import * as styles from "../styles";
import { hexToRgba } from "../utils/colors";

type OrderDetailScreenRouteProp = RouteProp<
  OrdersStackParamList,
  "OrderDetail"
>;
type OrderDetailScreenNavigationProp = StackNavigationProp<
  OrdersStackParamList,
  "OrderDetail"
>;

const formatDate = (dateString: string, t: Function): string => {
  try {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };

    const formattedDate = date.toLocaleDateString("en-US", options);
    const formattedTime = date.toLocaleTimeString("en-US", timeOptions);
    return `${formattedDate} | ${formattedTime}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
};

const getBannerStyle = (
  statusType: OrderDetailStatusType
): { backgroundColor: string; textColor: string } => {
  switch (statusType) {
    case "AcceptedAndRated":
      return {
        backgroundColor: hexToRgba(styles.COLORS.statusDelivered, 0.1),
        textColor: styles.COLORS.statusDelivered,
      };
    case "DeclinedRefund":
      return {
        backgroundColor: hexToRgba(styles.COLORS.statusCanceled, 0.1),
        textColor: styles.COLORS.statusCanceled,
      };
    case "UnsatisfiedSupport":
      return {
        backgroundColor: hexToRgba(styles.COLORS.statusWarningIcon, 0.1),
        textColor: styles.COLORS.statusWarningIcon,
      };
    default:
      return { backgroundColor: "transparent", textColor: "transparent" };
  }
};

const OrderDetailScreen = () => {
  const route = useRoute<OrderDetailScreenRouteProp>();
  const navigation = useNavigation<OrderDetailScreenNavigationProp>();
  const { t } = useTranslation();
  const { orderId } = route.params;

  const orderDetail = getMockOrderDetailById(orderId);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleMoreOptions = () => {
    console.log("More options pressed for order:", orderId);
  };

  const handleCopyInvoice = async (invoiceNumber: string) => {
    try {
      await Clipboard.setStringAsync(invoiceNumber);

      console.log("Invoice number copied:", invoiceNumber);
      alert(t("orderDetails.invoiceCopied"));
    } catch (e) {
      console.error("Failed to copy invoice number:", e);
      alert(t("orderDetails.invoiceCopyError"));
    }
  };

  if (!orderDetail) {
    return (
      <View style={componentStyles.centered}>
        <Text style={componentStyles.errorText}>
          {t("orderDetails.notFound")}
        </Text>
        <TouchableOpacity onPress={handleGoBack}>
          <Text style={componentStyles.backLink}>{t("common.goBack")}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const bannerStyle = getBannerStyle(orderDetail.detailedStatusType);
  const showBanner =
    orderDetail.statusBannerKey &&
    bannerStyle.backgroundColor !== "transparent";

  return (
    <ScrollView
      style={componentStyles.screen}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={
          orderDetail.headerImageUrl ||
          require("../assets/images/mock_order_header.png")
        }
        style={componentStyles.headerBackground}
      >
        <View style={componentStyles.headerOverlay} />

        <View style={componentStyles.headerControls}>
          <TouchableOpacity
            onPress={handleGoBack}
            style={componentStyles.headerButton}
          >
            <Ionicons name="arrow-back" size={28} color={styles.COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleMoreOptions}
            style={componentStyles.headerButton}
          >
            <Ionicons
              name="ellipsis-vertical"
              size={24}
              color={styles.COLORS.white}
            />
          </TouchableOpacity>
        </View>

        <View style={componentStyles.supplierInfoContainer}>
          <Image
            source={orderDetail.supplier.logoUrl}
            style={componentStyles.supplierLogo}
          />
          <View style={componentStyles.supplierTextContainer}>
            <Text style={componentStyles.supplierName}>
              {orderDetail.supplier.name}
            </Text>
            <Text style={componentStyles.orderIdText}>
              {t("orderDetails.orderIdLabel")} {orderDetail.orderNumber}
            </Text>
          </View>
        </View>
      </ImageBackground>

      <View style={componentStyles.contentContainer}>
        {showBanner && (
          <View
            style={[
              componentStyles.statusBanner,
              { backgroundColor: bannerStyle.backgroundColor },
            ]}
          >
            <Text
              style={[
                componentStyles.statusBannerText,
                { color: bannerStyle.textColor },
              ]}
            >
              {t(orderDetail.statusBannerKey!)}
            </Text>
          </View>
        )}

        <Text style={componentStyles.statusTextMain}>
          {t(orderDetail.statusTextKey)}
        </Text>
        <Text style={componentStyles.dateTimeText}>
          {formatDate(orderDetail.orderDate, t)}
        </Text>

        <View style={componentStyles.invoiceContainer}>
          <Text style={componentStyles.sectionTitle}>
            {t("orderDetails.taxInvoiceTitle")}
          </Text>
          <View style={componentStyles.invoiceRow}>
            <Text style={componentStyles.invoiceNumber}>
              # {orderDetail.taxInvoiceNumber}
            </Text>
            <TouchableOpacity
              onPress={() => handleCopyInvoice(orderDetail.taxInvoiceNumber)}
            >
              <Ionicons
                name="copy-outline"
                size={24}
                color={styles.COLORS.grey}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={componentStyles.separator} />

        <View style={componentStyles.orderItemsContainer}>
          <Text style={componentStyles.sectionTitle}>
            {t("orderDetails.yourOrderTitle")}
          </Text>
          {orderDetail.items.map((item) => (
            <View key={item.id} style={componentStyles.summaryRow}>
              <Text style={componentStyles.summaryLabel}>{item.name}</Text>
              <Text style={componentStyles.summaryAmount}>
                {item.price.toFixed(2)} {orderDetail.currencySymbol}
              </Text>
            </View>
          ))}

          {orderDetail.discount !== undefined && (
            <View style={componentStyles.summaryRow}>
              <Text style={componentStyles.summaryLabel}>
                {t("common.discount")}
              </Text>
              <Text style={componentStyles.summaryAmount}>
                - {orderDetail.discount.toFixed(2)} {orderDetail.currencySymbol}
              </Text>
            </View>
          )}
          {orderDetail.specialDiscount !== undefined && (
            <View style={componentStyles.summaryRow}>
              <Text style={componentStyles.summaryLabel}>
                {t("common.specialDiscount")}
              </Text>
              <Text style={componentStyles.summaryAmount}>
                - {orderDetail.specialDiscount.toFixed(2)}
                {orderDetail.currencySymbol}
              </Text>
            </View>
          )}
          <View style={componentStyles.summaryRow}>
            <Text style={componentStyles.summaryLabel}>
              {t("common.deliveryFee")}
            </Text>
            <Text style={componentStyles.summaryAmount}>
              {orderDetail.deliveryFee.toFixed(2)} {orderDetail.currencySymbol}
            </Text>
          </View>
        </View>

        <View style={componentStyles.separator} />

        <View style={componentStyles.summaryRow}>
          <Text style={componentStyles.totalLabel}>{t("common.total")}</Text>
          <Text style={componentStyles.totalAmount}>
            {orderDetail.totalAmount.toFixed(2)} {orderDetail.currencySymbol}
          </Text>
        </View>

        <View style={componentStyles.separator} />

        <View style={componentStyles.paymentContainer}>
          <Ionicons
            name="card-outline"
            size={22}
            color={styles.COLORS.grey}
            style={{ marginRight: styles.SPACING.s }}
          />
          <Text style={componentStyles.paymentText}>
            {t("orderDetails.paymentPrefix")} {orderDetail.paymentMethodSummary}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const componentStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: styles.COLORS.primary,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: styles.SPACING.l,
    backgroundColor: styles.COLORS.primary,
  },
  errorText: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.h3,
    color: styles.COLORS.accent,
    textAlign: "center",
    marginBottom: styles.SPACING.m,
  },
  backLink: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.bodyM,
    color: styles.COLORS.secondary,
    marginTop: styles.SPACING.l,
  },
  headerBackground: {
    height: 220,
    width: "100%",
    justifyContent: "space-between",
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  headerControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: styles.SPACING.containerPadding,
    paddingTop:
      Platform.OS === "android"
        ? StatusBar.currentHeight || styles.SPACING.l
        : styles.SPACING.xl + styles.SPACING.s,
  },
  headerButton: {
    padding: styles.SPACING.xs,
  },
  supplierInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: styles.SPACING.containerPadding,
    paddingBottom: styles.SPACING.l,
  },
  supplierLogo: {
    width: 50,
    height: 50,
    borderRadius: styles.COMPONENT_STYLES.borderRadius,
    marginRight: styles.SPACING.m,
    borderWidth: 1,
    borderColor: styles.COLORS.white,
  },
  supplierTextContainer: {
    flex: 1,
  },
  supplierName: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.h2,
    color: styles.COLORS.white,
    marginBottom: styles.SPACING.xs / 2,
  },
  orderIdText: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyS,
    color: styles.COLORS.white,
    opacity: 0.8,
  },
  contentContainer: {
    paddingHorizontal: styles.SPACING.containerPadding,
    paddingTop: styles.SPACING.l,
  },
  statusBanner: {
    paddingVertical: styles.SPACING.m,
    paddingHorizontal: styles.SPACING.m,
    borderRadius: styles.COMPONENT_STYLES.borderRadius,
    marginBottom: styles.SPACING.l,
    alignItems: "center",
  },
  statusBannerText: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.bodyM,
    textAlign: "center",
  },
  statusTextMain: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.h3,
    color: styles.COLORS.accent,
    marginBottom: styles.SPACING.xs,
  },
  dateTimeText: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyS,
    color: styles.COLORS.grey,
    marginBottom: styles.SPACING.xl,
  },
  invoiceContainer: {
    marginBottom: styles.SPACING.l,
  },
  invoiceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: styles.SPACING.s,
  },
  invoiceNumber: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.h2,
    color: styles.COLORS.accent,
  },
  sectionTitle: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.bodyL,
    color: styles.COLORS.accent,
    marginBottom: styles.SPACING.m,
  },
  separator: {
    height: 1,
    backgroundColor: styles.COLORS.inputBackground,
    marginVertical: styles.SPACING.l,
  },
  orderItemsContainer: {
    marginBottom: styles.SPACING.xs,
  },

  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: styles.SPACING.m,
  },
  summaryLabel: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyM,
    color: styles.COLORS.grey,
  },
  summaryAmount: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.bodyM,
    color: styles.COLORS.accent,
  },
  totalLabel: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.bodyL,
    color: styles.COLORS.accent,
  },
  totalAmount: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.bodyL,
    color: styles.COLORS.accent,
  },
  paymentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: styles.SPACING.xs,
  },
  paymentText: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyS,
    color: styles.COLORS.grey,
  },
});

export default OrderDetailScreen;
