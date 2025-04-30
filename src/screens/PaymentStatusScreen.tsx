import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute, RouteProp } from "@react-navigation/native";
import { CartStackParamList } from "../navigation/CartStackNavigator";
import * as styles from "../styles";
import { Ionicons } from "@expo/vector-icons";
import PrimaryButton from "../components/common/PrimaryButton";

type PaymentStatusRouteProp = RouteProp<CartStackParamList, "PaymentStatus">;

const PaymentStatusScreen: React.FC = () => {
  const route = useRoute<PaymentStatusRouteProp>();
  const { success, orderId } = route.params;

  return (
    <SafeAreaView style={s.safeArea}>
      <View style={s.container}>
        <Text style={s.text}>Payment Status Screen (Placeholder)</Text>
        <Text style={s.statusText}>
          Status: {success ? "Successful" : "Failed"}
        </Text>
        {success && orderId && (
          <Text style={s.statusText}>Order ID: {orderId}</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: styles.COLORS.primary,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: styles.SPACING.containerPadding,
  },
  text: {
    color: styles.COLORS.accent,
    fontSize: styles.FONT_SIZES.h3,
    fontFamily: styles.FONT_FAMILY.medium,
    marginBottom: styles.SPACING.l,
  },
  statusText: {
    color: styles.COLORS.grey,
    fontSize: styles.FONT_SIZES.bodyL,
    fontFamily: styles.FONT_FAMILY.regular,
    marginBottom: styles.SPACING.m,
  },
});

export default PaymentStatusScreen;
