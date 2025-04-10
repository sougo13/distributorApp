
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
import PrimaryButton from "../../components/PrimaryButton"; 
import FormInput from "../../components/FormInput"; 
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

const PersonalInformationScreen = () => {
  const { t } = useTranslation();

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
            iconName="person-outline"
            value={name}
            onChangeText={setName}
            placeholder={t("personalInfo.namePlaceholder")}
            autoCapitalize="words"
          />
          <FormInput
            label={t("personalInfo.emailLabel")}
            iconName="mail-outline"
            value={email}
            onChangeText={setEmail}
            placeholder={t("personalInfo.emailPlaceholder")}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <FormInput
            label={t("personalInfo.phoneLabel")}
            iconName="call-outline"
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
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: styles.SPACING.containerPadding,
    paddingBottom: styles.SPACING.xl,
  },
  buttonContainer: {
    paddingHorizontal: styles.SPACING.containerPadding,
    paddingBottom: Platform.OS === "ios" ? styles.SPACING.l : styles.SPACING.m,
    paddingTop: styles.SPACING.s,
    backgroundColor: styles.COLORS.primary,
  },
});

export default PersonalInformationScreen;
