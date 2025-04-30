import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from "react-native";

import * as styles from "../../styles";
import PrimaryButton from "../../components/common/PrimaryButton";
import FormInput from "../../components/common/FormInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

// Import SVG icons
import PersonIcon from "../../assets/icons/person.svg";
import MailIcon from "../../assets/icons/mail.svg";
import CallIcon from "../../assets/icons/call.svg";

const PersonalInformationScreen = () => {
  const { t } = useTranslation();
  // Remove navigation initialization
  // const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setName("Awesome Business LLC");
    setEmail("business@name.com");
    setPhone("+995 555 111 222");
  }, []);

  const handleSaveChanges = () => {
    console.log("Saving data:", { name, email, phone });
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        t("personalInfo.successAlertTitle"),
        t("personalInfo.successAlertMessage")
      );
    }, 1500);
  };

  return (
    <SafeAreaView style={s.safeArea}>
      <KeyboardAvoidingView
        style={s.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView
          style={s.scrollView}
          contentContainerStyle={s.scrollContentContainer}
          keyboardShouldPersistTaps="handled"
        >
          <FormInput
            label={t("personalInfo.nameLabel")}
            IconComponent={PersonIcon}
            value={name}
            onChangeText={setName}
            placeholder={t("personalInfo.namePlaceholder")}
            autoCapitalize="words"
          />
          <FormInput
            label={t("personalInfo.emailLabel")}
            IconComponent={MailIcon}
            value={email}
            onChangeText={setEmail}
            placeholder={t("personalInfo.emailPlaceholder")}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <FormInput
            label={t("personalInfo.phoneLabel")}
            IconComponent={CallIcon}
            value={phone}
            onChangeText={setPhone}
            placeholder={t("personalInfo.phonePlaceholder")}
            keyboardType="phone-pad"
          />
        </ScrollView>

        <View style={s.buttonContainer}>
          <PrimaryButton
            title={isLoading ? t("common.saving") : t("common.save")}
            onPress={handleSaveChanges}
            loading={isLoading}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: styles.COLORS.primary,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: styles.SPACING.m,
    paddingVertical: styles.SPACING.s,
  },
  backButton: {
    padding: styles.SPACING.xs,
  },
  headerTitle: {
    fontSize: styles.FONT_SIZES.h4,
    fontFamily: styles.FONT_FAMILY.medium,
    fontWeight: styles.FONT_WEIGHTS.medium,
    color: styles.COLORS.accent,
    textAlign: "center",
  },
  headerPlaceholder: {
    width: 24 + styles.SPACING.xs * 2,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: styles.SPACING.l,
    paddingTop: styles.SPACING.l,
    paddingBottom: styles.SPACING.xl,
    gap: styles.SPACING.l,
  },
  buttonContainer: {
    paddingHorizontal: styles.SPACING.l,
    paddingVertical: styles.SPACING.l,
    backgroundColor: styles.COLORS.primary,
  },
});

export default PersonalInformationScreen;
