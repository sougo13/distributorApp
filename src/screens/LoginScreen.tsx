import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";
import Checkbox from "expo-checkbox";
import { useNavigation } from "@react-navigation/native";

import FormInput from "../components/FormInput";
import PrimaryButton from "../components/PrimaryButton";

import { useAuth } from "../context/AuthContext";
import * as stylesConfig from "../styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../navigation/AuthStackNavigator";

type LoginScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Login"
>;

const LoginScreen: React.FC = () => {
  const { t } = useTranslation();

  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { login, isLoading, error: authError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const error = authError || localError;

  const handleSubmit = () => {
    setLocalError(null);
    if (!email || !password) {
      setLocalError("Email and password are required.");
      return;
    }
    console.log("Attempting login with:", { email, rememberMe });

    login(email, password);
  };

  const handleSignUp = () => {
    navigation.navigate("RoleSelection");
  };

  const handleForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  const handleContinueWithoutSignIn = () => {
    console.log("Continue without sign in");
    Alert.alert("Action", "Continue without sign in (Not Implemented)");
  };

  return (
    <SafeAreaView style={s.safeArea}>
      <KeyboardAvoidingView
        style={s.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
      >
        <ScrollView
          contentContainerStyle={s.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={s.title}>{t("login.welcomeTitle")}</Text>
          <Text style={s.subtitle}>{t("login.welcomeSubtitle")}</Text>

          <FormInput
            value={email}
            onChangeText={setEmail}
            placeholder={t("login.emailPlaceholder")}
            keyboardType="email-address"
            autoCapitalize="none"
            iconName="mail-outline"
            containerStyle={s.inputContainer}
          />
          <FormInput
            value={password}
            onChangeText={setPassword}
            placeholder={t("login.passwordPlaceholder")}
            secureTextEntry
            iconName="lock-closed-outline"
            containerStyle={s.inputContainer}
          />

          <View style={s.optionsRow}>
            <View style={s.rememberMeContainer}>
              <Checkbox
                style={s.checkbox}
                value={rememberMe}
                onValueChange={setRememberMe}
                color={
                  rememberMe
                    ? stylesConfig.COLORS.secondary
                    : stylesConfig.COLORS.grey
                }
              />
              <Text style={s.rememberMeText}>{t("login.rememberMe")}</Text>
            </View>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={s.linkText}>{t("login.forgotPassword")}</Text>
            </TouchableOpacity>
          </View>

          {error && <Text style={s.errorText}>{error}</Text>}

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

          <View style={s.footer}>
            <Text style={s.footerText}>{t("login.noAccount")} </Text>
            <TouchableOpacity onPress={handleSignUp}>
              <Text style={s.linkText}>{t("login.signUpLink")}</Text>
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
    backgroundColor: stylesConfig.COLORS.primary,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: stylesConfig.SPACING.l,
    paddingVertical: stylesConfig.SPACING.xl,
  },
  title: {
    fontSize: stylesConfig.FONT_SIZES.h1,
    fontFamily: stylesConfig.FONT_FAMILY.medium,
    color: stylesConfig.COLORS.accent,
    textAlign: "center",
    marginBottom: stylesConfig.SPACING.s,
  },
  subtitle: {
    fontSize: stylesConfig.FONT_SIZES.bodyM,
    fontFamily: stylesConfig.FONT_FAMILY.regular,
    color: stylesConfig.COLORS.grey,
    textAlign: "center",
    marginBottom: stylesConfig.SPACING.xl,
    lineHeight: stylesConfig.FONT_SIZES.bodyM * 1.5,
  },
  inputContainer: {
    marginBottom: stylesConfig.SPACING.m,
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: stylesConfig.SPACING.l,
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  rememberMeText: {
    marginLeft: stylesConfig.SPACING.s,
    color: stylesConfig.COLORS.accent,
    fontSize: stylesConfig.FONT_SIZES.bodyS,
    fontFamily: stylesConfig.FONT_FAMILY.regular,
  },
  linkText: {
    color: stylesConfig.COLORS.secondary,
    fontSize: stylesConfig.FONT_SIZES.bodyS,
    fontFamily: stylesConfig.FONT_FAMILY.medium,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: stylesConfig.SPACING.m,
    fontSize: stylesConfig.FONT_SIZES.bodyS,
    fontFamily: stylesConfig.FONT_FAMILY.regular,
  },
  submitButton: {
    marginBottom: stylesConfig.SPACING.m,
  },

  secondaryButton: {
    height: stylesConfig.COMPONENT_STYLES.buttonHeight,
    borderRadius: stylesConfig.COMPONENT_STYLES.borderRadius,
    borderWidth: 1,
    borderColor: stylesConfig.COLORS.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: stylesConfig.SPACING.xl,
  },
  secondaryButtonText: {
    color: stylesConfig.COLORS.secondary,
    fontSize: stylesConfig.FONT_SIZES.button,
    fontFamily: stylesConfig.FONT_FAMILY.medium,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: stylesConfig.SPACING.m,
    paddingBottom: stylesConfig.SPACING.m,
  },
  footerText: {
    color: stylesConfig.COLORS.grey,
    fontSize: stylesConfig.FONT_SIZES.bodyS,
    fontFamily: stylesConfig.FONT_FAMILY.regular,
  },
  checkbox: {
    marginRight: stylesConfig.SPACING.s,
  },
});

export default LoginScreen;
