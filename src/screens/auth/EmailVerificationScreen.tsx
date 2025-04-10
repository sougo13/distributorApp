import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import * as stylesConfig from "../../styles";
import PrimaryButton from "../../components/PrimaryButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/AuthStackNavigator";

type EmailVerificationNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "EmailVerification"
>;

const EmailVerificationScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<EmailVerificationNavigationProp>();

  const handleDone = () => {
    console.log("Done button pressed on verification screen.");

    navigation.navigate("Login");
  };

  const handleResendLink = () => {
    console.log("Resend verification link requested.");
    Alert.alert("Action", "Resend verification link (Not Implemented)");
  };

  return (
    <SafeAreaView style={s.safeArea}>
      <View style={s.container}>
        <TouchableOpacity onPress={handleResendLink} activeOpacity={0.7}>
          <Ionicons
            name="checkmark-circle-outline"
            size={80}
            color={stylesConfig.COLORS.secondary}
            style={s.icon}
          />

          <Text style={s.hiddenAccessibilityLabel}>
            Resend Verification Link
          </Text>
        </TouchableOpacity>

        <Text style={s.title}>{t("emailVerification.title")}</Text>
        <Text style={s.message}>{t("emailVerification.message")}</Text>

        <View style={{ flex: 1 }} />

        <PrimaryButton
          title={t("emailVerification.doneButton")}
          onPress={handleDone}
        />
      </View>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: stylesConfig.COLORS.primary,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: stylesConfig.SPACING.l,
    paddingBottom: stylesConfig.SPACING.xl,
    paddingTop: stylesConfig.SPACING.xl,
  },
  icon: {
    marginBottom: stylesConfig.SPACING.xl,
  },
  title: {
    fontSize: stylesConfig.FONT_SIZES.h1,
    fontFamily: stylesConfig.FONT_FAMILY.medium,
    color: stylesConfig.COLORS.accent,
    textAlign: "center",
    marginBottom: stylesConfig.SPACING.m,
  },
  message: {
    fontSize: stylesConfig.FONT_SIZES.bodyM,
    fontFamily: stylesConfig.FONT_FAMILY.regular,
    color: stylesConfig.COLORS.grey,
    textAlign: "center",
    lineHeight: stylesConfig.FONT_SIZES.bodyM * 1.5,
    marginBottom: stylesConfig.SPACING.xl,
  },

  hiddenAccessibilityLabel: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    borderWidth: 0,
  },
});

export default EmailVerificationScreen;
