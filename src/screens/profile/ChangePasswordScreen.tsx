import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  Text,
} from "react-native";
import * as styles from "../../styles";
import PrimaryButton from "../../components/PrimaryButton";
import FormInput from "../../components/FormInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

const MIN_PASSWORD_LENGTH = 6;

const ChangePasswordScreen = () => {
  const { t } = useTranslation();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSaveChanges = () => {
    setError(null);

    if (!currentPassword || !newPassword || !repeatNewPassword) {
      setError(t("changePassword.errorMessages.fillFields"));
      return;
    }
    if (newPassword !== repeatNewPassword) {
      setError(t("changePassword.errorMessages.mismatch"));
      return;
    }
    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      setError(
        t("changePassword.errorMessages.tooShort", {
          count: MIN_PASSWORD_LENGTH,
        })
      );
      return;
    }

    console.log("Changing password...");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const isSuccess = Math.random() > 0.2;

      if (isSuccess) {
        Alert.alert(
          t("changePassword.successAlertTitle"),
          t("changePassword.successAlertMessage")
        );
        setCurrentPassword("");
        setNewPassword("");
        setRepeatNewPassword("");
      } else {
        setError(t("changePassword.errorMessages.apiError"));
      }
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
            label={t("changePassword.currentPasswordLabel")}
            iconName="lock-closed-outline"
            value={currentPassword}
            onChangeText={setCurrentPassword}
            placeholder={t("changePassword.currentPasswordPlaceholder")}
            secureTextEntry={true}
            autoCapitalize="none"
          />
          <FormInput
            label={t("changePassword.newPasswordLabel")}
            iconName="lock-closed-outline"
            value={newPassword}
            onChangeText={setNewPassword}
            placeholder={t("changePassword.newPasswordPlaceholder")}
            secureTextEntry={true}
            autoCapitalize="none"
            containerStyle={{ marginTop: styles.SPACING.s }}
          />
          <FormInput
            label={t("changePassword.repeatPasswordLabel")}
            iconName="lock-closed-outline"
            value={repeatNewPassword}
            onChangeText={setRepeatNewPassword}
            placeholder={t("changePassword.repeatPasswordPlaceholder")}
            secureTextEntry={true}
            autoCapitalize="none"
            containerStyle={{ marginTop: styles.SPACING.s }}
          />

          {error && <Text style={s.errorText}>{error}</Text>}
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
  errorText: {
    color: "red",
    fontSize: styles.FONT_SIZES.bodyS,
    fontFamily: styles.FONT_FAMILY.regular,
    textAlign: "center",
    marginTop: styles.SPACING.s,
    marginBottom: styles.SPACING.xs,
  },
});

export default ChangePasswordScreen;
