import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useNavigation,
  useRoute,
  RouteProp,
  useFocusEffect,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { summaryStyles, warningStyles } from "../styles/sharedStyles";
import * as styles from "../styles";
import { CartItem, Address } from "../types";
import RadioButton from "../components/common/RadioButton";
import PrimaryButton from "../components/common/PrimaryButton";
import { CartStackParamList } from "../navigation/CartStackNavigator";
import { ProfileStackParamList } from "../navigation/ProfileStackNavigator";
import {
  MOCK_ADDRESSES,
  MOCK_DELIVERY_FEE,
  MOCK_DISCOUNT,
  MOCK_SPECIAL_DISCOUNT,
} from "../data/mockData";
import Checkbox from "expo-checkbox";

const MOCK_CART_ITEMS: CartItem[] = [
  {
    id: "cart_item_1",
    product: {
      id: "prod_1",
      name: "Basmati rice",
      imageUrl: "",
      pricePerUnit: 9.0,
      unit: "Kg",
    },
    quantity: 1,
  },
  {
    id: "cart_item_2",
    product: {
      id: "prod_2",
      name: "Brown rice",
      imageUrl: "",
      pricePerUnit: 11.0,
      unit: "Kg",
    },
    quantity: 1,
  },
];

const MOCK_MAP_IMAGE = require("../assets/images/mock_map.png");

type DeliveryOption = "delivery" | "pickup";
type TimeOption = "asap" | "scheduled";
type BusinessStatus = "registered" | "not_registered";

type OrderRequestNavigationProp = StackNavigationProp<
  CartStackParamList,
  "OrderRequest"
>;

type OrderRequestRouteProp = RouteProp<
  ProfileStackParamList & CartStackParamList,
  "OrderRequest"
>;

const OrderRequestScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<OrderRequestNavigationProp>();
  const route = useRoute<OrderRequestRouteProp>();

  const [deliveryOption, setDeliveryOption] =
    useState<DeliveryOption>("delivery");

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(
    MOCK_ADDRESSES.find((a) => a.isPrimary) || MOCK_ADDRESSES[0] || null
  );
  const [timeOption, setTimeOption] = useState<TimeOption>("asap");
  const [businessStatus, setBusinessStatus] =
    useState<BusinessStatus>("not_registered");

  useEffect(() => {
    if (route.params?.selectedAddress) {
      setSelectedAddress(route.params.selectedAddress);
      navigation.setParams({ selectedAddress: undefined });
    }
  }, [route.params?.selectedAddress, navigation]);

  console.log("route.params: ", route.params);

  useFocusEffect(
    useCallback(() => {
      if (route.params?.selectedAddress) {
        setSelectedAddress(route.params.selectedAddress);
      }
    }, [route.params])
  );

  const summaryCalculations = useMemo(() => {
    const subtotal = MOCK_CART_ITEMS.reduce(
      (sum, item) => sum + item.product.pricePerUnit * item.quantity,
      0
    );

    const currentDeliveryFee =
      deliveryOption === "delivery" ? MOCK_DELIVERY_FEE : 0;
    const total =
      subtotal - MOCK_DISCOUNT - MOCK_SPECIAL_DISCOUNT + currentDeliveryFee;
    return {
      discount: MOCK_DISCOUNT,
      specialDiscount: MOCK_SPECIAL_DISCOUNT,
      deliveryFee: currentDeliveryFee,
      total: Math.max(0, total),
    };
  }, [deliveryOption]);

  const handleNavigateToSavedAddresses = () => {
    console.log("Navigating to Saved Addresses in Profile stack");
    navigation.navigate("Profile", {
      screen: "SavedAddresses",
      params: { canSelect: true, originRoute: "Cart" },
    });
  };

  const handleNavigateToSchedule = () => {
    setTimeOption("scheduled");

    console.log("Open Schedule Picker");
    Alert.alert("Coming Soon", "Date/Time scheduling is not yet implemented.");
  };

  const handleRequestOrder = () => {
    if (deliveryOption === "delivery" && !selectedAddress) {
      Alert.alert(t("common.error"), t("orderRequest.addressRequiredError"));
      return;
    }
    console.log("Navigating to Checkout...");
    navigation.navigate("Checkout");
  };

  return (
    <SafeAreaView style={s.safeArea}>
      <ScrollView
        style={s.scrollView}
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={s.sectionContainer}>
          <TouchableOpacity style={s.cartHeader} onPress={() => {}}>
            <Text style={s.sectionTitle}>
              {t("orderRequest.yourCart", { count: MOCK_CART_ITEMS.length })}
            </Text>
            <Ionicons
              name="chevron-down-outline"
              size={24}
              color={styles.COLORS.accent}
            />
          </TouchableOpacity>
        </View>

        <View style={s.sectionContainer}>
          <Text style={s.sectionTitle}>
            {t("orderRequest.deliveryDetailsTitle")}
          </Text>
          <RadioButton
            label={t("orderRequest.deliverToAddress")}
            selected={deliveryOption === "delivery"}
            onPress={() => setDeliveryOption("delivery")}
          />
          <RadioButton
            label={t("orderRequest.pickUpMyself")}
            selected={deliveryOption === "pickup"}
            onPress={() => setDeliveryOption("pickup")}
          />

          {deliveryOption === "delivery" && (
            <View style={s.addressContainer}>
              <TouchableOpacity
                style={s.addressTouchable}
                onPress={handleNavigateToSavedAddresses}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons
                  name="map-marker-outline"
                  size={24}
                  color={styles.COLORS.grey}
                  style={s.addressIcon}
                />
                <Text style={s.addressText} numberOfLines={1}>
                  {selectedAddress
                    ? selectedAddress.fullAddress
                    : t("orderRequest.selectAddressPlaceholder")}
                </Text>
                <Ionicons
                  name="chevron-forward-outline"
                  size={24}
                  color={styles.COLORS.grey}
                />
              </TouchableOpacity>

              {selectedAddress && (
                <Image source={MOCK_MAP_IMAGE} style={s.mapImage} />
              )}
            </View>
          )}
        </View>

        <View style={s.sectionContainer}>
          <Text style={s.sectionTitle}>
            {t("orderRequest.deliveryTimeTitle")}
          </Text>

          <TouchableOpacity
            style={[
              s.timeOptionBox,
              timeOption === "asap" && s.selectedTimeOptionBox,
            ]}
            onPress={() => setTimeOption("asap")}
            activeOpacity={0.7}
          >
            <Text
              style={[
                s.timeOptionTitle,
                timeOption === "asap" && s.selectedTimeOptionText,
              ]}
            >
              {t("orderRequest.asap")}
            </Text>
            <Text
              style={[
                s.timeOptionSubtitle,
                timeOption === "asap" && s.selectedTimeOptionText,
              ]}
            >
              {t("orderRequest.asapTime")}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              s.timeOptionBox,
              timeOption === "scheduled" && s.selectedTimeOptionBox,
            ]}
            onPress={handleNavigateToSchedule}
            activeOpacity={0.7}
          >
            <Text
              style={[
                s.timeOptionTitle,
                timeOption === "scheduled" && s.selectedTimeOptionText,
              ]}
            >
              {t("orderRequest.scheduleDelivery")}
            </Text>
            <Text style={[s.timeOptionSubtitle]}>
              {t("orderRequest.scheduleDelivery")}
            </Text>
            <Text
              style={[
                s.timeOptionSubtitle,
                timeOption === "scheduled" && s.selectedTimeOptionText,
              ]}
            >
              {t("orderRequest.scheduleTimePlaceholder")}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={s.sectionContainer}>
          <Text style={s.sectionTitle}>
            {t("orderRequest.businessStatusTitle")}
          </Text>
          <RadioButton
            label={t("orderRequest.registered")}
            selected={businessStatus === "registered"}
            onPress={() => setBusinessStatus("registered")}
          />
          <RadioButton
            label={t("orderRequest.notRegistered")}
            selected={businessStatus === "not_registered"}
            onPress={() => setBusinessStatus("not_registered")}
          />
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
      </ScrollView>

      <View style={s.buttonContainer}>
        <PrimaryButton
          title={t("orderRequest.requestOrderButton")}
          onPress={handleRequestOrder}
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
    paddingBottom: 100,
    padding: styles.SPACING.containerPadding,
  },
  sectionContainer: {
    marginBottom: styles.SPACING.xl,
  },
  sectionTitle: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.h3,
    color: styles.COLORS.accent,
    marginBottom: styles.SPACING.m,
  },
  cartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: styles.SPACING.m,
  },

  addressContainer: {
    marginTop: styles.SPACING.m,
  },
  addressTouchable: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: styles.COLORS.inputBackground,
    borderRadius: styles.COMPONENT_STYLES.borderRadius,
    padding: styles.SPACING.m,
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
  mapImage: {
    width: "100%",
    height: 150,
    borderRadius: styles.COMPONENT_STYLES.borderRadius,
    backgroundColor: styles.COLORS.grey,
    resizeMode: "cover",
    marginBottom: styles.SPACING.m,
  },

  timeOptionBox: {
    backgroundColor: styles.COLORS.inputBackground,
    borderRadius: styles.COMPONENT_STYLES.borderRadius,
    padding: styles.SPACING.m,
    marginBottom: styles.SPACING.m,
    borderWidth: 1,
    borderColor: "transparent",
  },
  selectedTimeOptionBox: {
    borderColor: styles.COLORS.secondary,
    backgroundColor: styles.COLORS.cardBackground,
  },
  timeOptionTitle: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.bodyM,
    color: styles.COLORS.accent,
    marginBottom: styles.SPACING.xs,
  },
  timeOptionSubtitle: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyS,
    color: styles.COLORS.grey,
  },
  selectedTimeOptionText: {
    color: styles.COLORS.secondary,
  },

  buttonContainer: {
    padding: styles.SPACING.containerPadding,
    backgroundColor: styles.COLORS.primary,
    borderTopWidth: 1,
    borderTopColor: styles.COLORS.inputBackground,
  },
});

export default OrderRequestScreen;
