import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
} from "react-native";
import { useTranslation } from "react-i18next";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";

import FormInput from "../../components/common/FormInput";
import PrimaryButton from "../../components/common/PrimaryButton";
import { useAuth } from "../../context/AuthContext";
import * as styles from "../../styles";
import { AuthStackParamList } from "../../navigation/AuthStackNavigator";

import MailIcon from "../../assets/icons/mail.svg"; // Import actual icon
import LockIcon from "../../assets/icons/lock.svg"; // Import actual icon
import SupplierIcon from "../../assets/icons/supplier_icon.svg";
import BuyerIcon from "../../assets/icons/buyer_icon.svg";

type LoginScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Login"
>;

type Role = "supplier" | "buyer";

const LoginScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login, isLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>("buyer");
  const [localError, setLocalError] = useState<string | null>(null);

  const error = localError;

  const handleSubmit = () => {
    setLocalError(null);
    if (!email || !password) {
      setLocalError(t("validation.emailPasswordRequired"));
      return;
    }
    console.log("Attempting login with:", {
      email,
      rememberMe,
      role: selectedRole,
    });

    login({ email, password });
  };

  const handleSignUp = () => {
    navigation.navigate("RoleSelection");
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const handleContinueWithoutSignIn = () => {
    console.log("Continue without sign in");
    Alert.alert(
      t("common.action"),
      t("login.continueWithoutSignInNotImplemented")
    );
  };

  const roleOptions = [
    { label: t("login.roleSupplier"), value: "supplier", Icon: SupplierIcon },
    { label: t("login.roleBuyer"), value: "buyer", Icon: BuyerIcon },
  ];

  return (
    <SafeAreaView style={s.safeArea}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={styles.COLORS.primary}
      />
      <KeyboardAvoidingView
        style={s.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <ScrollView
          contentContainerStyle={s.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={s.welcomeContainer}>
            <Text style={s.title}>{t("login.welcomeTitle")}</Text>
            <Text style={s.subtitle}>{t("login.welcomeSubtitle")}</Text>
          </View>

          <View style={s.inputSection}>
            <FormInput
              value={email}
              onChangeText={setEmail}
              placeholder={t("login.emailPlaceholder")}
              keyboardType="email-address"
              autoCapitalize="none"
              IconComponent={MailIcon}
              containerStyle={s.inputContainer}
            />
            <FormInput
              value={password}
              onChangeText={setPassword}
              placeholder={t("login.passwordPlaceholder")}
              secureTextEntry
              IconComponent={LockIcon}
              containerStyle={s.inputContainer}
            />
          </View>

          <View style={s.optionsRow}>
            <View style={s.rememberMeContainer}>
              <Checkbox
                style={s.checkbox}
                value={rememberMe}
                onValueChange={setRememberMe}
                color={
                  rememberMe ? styles.COLORS.secondary : styles.COLORS.grey
                }
              />
              <Text style={s.rememberMeText}>{t("login.rememberMe")}</Text>
            </View>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={s.linkText}>{t("login.forgotPassword")}</Text>
            </TouchableOpacity>
          </View>

          <View style={s.roleSelectionContainer}>
            {roleOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  s.roleOptionBox,
                  selectedRole === option.value && s.roleOptionBoxSelected,
                ]}
                onPress={() => setSelectedRole(option.value as Role)}
                activeOpacity={0.7}
              >
                <View style={s.radioButton}>
                  {selectedRole === option.value && (
                    <View style={s.radioButtonSelected} />
                  )}
                </View>
                <option.Icon />
                <Text style={s.roleOptionText}>{option.label as string}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {error && <Text style={s.errorText}>{error}</Text>}

          <View style={s.buttonContainer}>
            <PrimaryButton
              title={isLoading ? t("login.loggingIn") : t("common.submit")}
              onPress={handleSubmit}
              loading={isLoading}
              disabled={isLoading}
              style={s.submitButton}
            />
            <TouchableOpacity
              style={s.secondaryButton}
              onPress={handleContinueWithoutSignIn}
              disabled={isLoading}
            >
              <Text style={s.secondaryButtonText}>
                {t("login.continueWithoutSignIn")}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={s.footerContainer}>
            <Text style={s.footerText}>{t("login.noAccount")} </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={s.linkTextFooter}>{t("login.signUpLink")}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingHorizontal: styles.SPACING.l,
    paddingVertical: styles.SPACING.xl,
  },
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 38,
  },
  title: {
    fontSize: styles.FONT_SIZES.h3,
    fontFamily: styles.FONT_FAMILY.medium,
    fontWeight: styles.FONT_WEIGHTS.medium,
    color: styles.COLORS.accent,
    textAlign: "center",
    marginBottom: styles.SPACING.m,
  },
  subtitle: {
    fontSize: styles.FONT_SIZES.bodyM,
    fontFamily: styles.FONT_FAMILY.regular,
    fontWeight: styles.FONT_WEIGHTS.regular,
    color: styles.COLORS.grey,
    textAlign: "center",
    lineHeight: styles.FONT_SIZES.bodyM * 1.35,
    maxWidth: 345,
  },
  inputSection: {
    marginBottom: styles.SPACING.sm,
  },
  inputContainer: {
    marginBottom: styles.SPACING.l,
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: styles.SPACING.l,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: styles.SPACING.s,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
  },
  rememberMeText: {
    color: styles.COLORS.grey,
    fontSize: styles.FONT_SIZES.bodyM,
    fontFamily: styles.FONT_FAMILY.regular,
    fontWeight: styles.FONT_WEIGHTS.regular,
  },
  linkText: {
    color: styles.COLORS.grey,
    fontSize: styles.FONT_SIZES.bodyM,
    fontFamily: styles.FONT_FAMILY.regular,
    fontWeight: styles.FONT_WEIGHTS.regular,
    textAlign: "right",
  },
  errorText: {
    color: styles.COLORS.error,
    textAlign: "center",
    marginBottom: styles.SPACING.m,
    fontSize: styles.FONT_SIZES.bodyS,
    fontFamily: styles.FONT_FAMILY.regular,
  },
  buttonContainer: {
    marginTop: styles.SPACING.m,
    gap: styles.SPACING.l,
  },
  submitButton: {
    // Potentially add default button styles if defined globally
  },
  secondaryButton: {
    backgroundColor: styles.COLORS.inputBackground,
    paddingVertical: styles.SPACING.m,
    paddingHorizontal: styles.SPACING.m,
    borderRadius: styles.COMPONENT_STYLES.borderRadius,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 45,
  },
  secondaryButtonText: {
    color: styles.COLORS.accent,
    fontSize: styles.FONT_SIZES.bodyL,
    fontFamily: styles.FONT_FAMILY.regular,
    fontWeight: styles.FONT_WEIGHTS.regular,
    lineHeight: styles.FONT_SIZES.bodyL * 1.35,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: styles.SPACING.l,
    paddingBottom: styles.SPACING.s,
    gap: styles.SPACING.l,
  },
  footerText: {
    color: styles.COLORS.accent,
    fontSize: styles.FONT_SIZES.bodyL,
    fontFamily: styles.FONT_FAMILY.regular,
    fontWeight: styles.FONT_WEIGHTS.regular,
    lineHeight: styles.FONT_SIZES.bodyL * 1.35,
  },
  linkTextFooter: {
    color: styles.COLORS.secondary,
    fontSize: styles.FONT_SIZES.bodyL,
    fontFamily: styles.FONT_FAMILY.medium,
    fontWeight: styles.FONT_WEIGHTS.medium,
    lineHeight: styles.FONT_SIZES.bodyL * 1.35,
  },
  roleSelectionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: styles.SPACING.l,
    gap: styles.SPACING.m,
  },
  roleOptionBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: styles.COLORS.searchBackground,
    paddingVertical: styles.SPACING.s,
    paddingHorizontal: styles.SPACING.s,
    borderRadius: styles.COMPONENT_STYLES.cardBorderRadius,
    height: 48,
    gap: styles.SPACING.xs,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  roleOptionBoxSelected: {
    borderColor: styles.COLORS.secondary,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: styles.COMPONENT_STYLES.borderRadiusS,
    borderWidth: 1,
    borderColor: styles.COLORS.radioBorder,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: styles.SPACING.xs,
  },
  radioButtonSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: styles.COLORS.secondary,
  },
  roleOptionText: {
    color: styles.COLORS.accent,
    fontSize: styles.FONT_SIZES.bodyM,
    fontFamily: styles.FONT_FAMILY.medium,
    fontWeight: styles.FONT_WEIGHTS.medium,
  },
});

export default LoginScreen;
