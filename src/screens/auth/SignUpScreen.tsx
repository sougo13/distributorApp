import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import PrimaryButton from "../../components/common/PrimaryButton";
import FormInput from "../../components/common/FormInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/AuthStackNavigator";

// Import SVG icons
import PersonIcon from "../../assets/icons/person.svg";
import CallIcon from "../../assets/icons/call.svg";
import MailIcon from "../../assets/icons/mail.svg";
import LockIcon from "../../assets/icons/lock.svg";

import * as styles from "../../styles";

type SignUpScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "SignUp"
>;
type SignUpScreenRouteProp = RouteProp<AuthStackParamList, "SignUp">;

const SignUpScreen: React.FC = () => {
  const { t } = useTranslation();

  const navigation = useNavigation<SignUpScreenNavigationProp>();
  const route = useRoute<SignUpScreenRouteProp>();
  const selectedRole = route.params?.role;

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = () => {
    if (error) return;

    console.log("Signing up with:", { phone, email, role: selectedRole });
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      console.log("Sign up successful");

      navigation.navigate("EmailVerification", { email: email });
    }, 1500);
  };

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={s.safeArea}>
      <View style={s.headerNavContainer}>
        <TouchableOpacity style={s.backButton} onPress={handleGoBack}>
          <Ionicons
            name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
            size={24}
            color={styles.COLORS.accent}
          />
        </TouchableOpacity>
        <View style={{ width: 24 + styles.SPACING.xs * 2 }} />
      </View>

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
          <View style={s.headerContainer}>
            <Text style={s.title}>{t("signUp.title")}</Text>
            <Text style={s.subtitle}>{t("signUp.subtitle")}</Text>
          </View>

          <View style={s.formContainer}>
            <FormInput
              value={fullName}
              onChangeText={setFullName}
              placeholder={t("signUp.fullNamePlaceholder")}
              IconComponent={PersonIcon}
              containerStyle={s.inputContainer}
            />
            <FormInput
              value={phone}
              onChangeText={setPhone}
              placeholder={t("signUp.phonePlaceholder")}
              keyboardType="phone-pad"
              IconComponent={CallIcon}
              containerStyle={s.inputContainer}
            />
            <FormInput
              value={email}
              onChangeText={setEmail}
              placeholder={t("signUp.emailPlaceholder")}
              keyboardType="email-address"
              autoCapitalize="none"
              IconComponent={MailIcon}
              containerStyle={s.inputContainer}
            />
            <FormInput
              value={password}
              onChangeText={setPassword}
              placeholder={t("signUp.passwordPlaceholder")}
              secureTextEntry
              IconComponent={LockIcon}
              containerStyle={s.inputContainer}
            />
            <FormInput
              value={repeatPassword}
              onChangeText={setRepeatPassword}
              placeholder={t("signUp.repeatPasswordPlaceholder")}
              secureTextEntry
              IconComponent={LockIcon}
              containerStyle={s.inputContainer}
            />

            {error && <Text style={s.errorText}>{error}</Text>}
          </View>

          <View style={s.bottomContainer}>
            <PrimaryButton
              title={isLoading ? t("signUp.submitting") : t("common.submit")}
              onPress={handleSignUp}
              loading={isLoading}
              disabled={isLoading}
              style={s.submitButton}
            />

            <View style={s.loginContainer}>
              <Text style={s.loginText}>{t("roleSelection.haveAccount")} </Text>
              <TouchableOpacity onPress={handleLogin}>
                <Text style={s.loginLink}>{t("roleSelection.loginLink")}</Text>
              </TouchableOpacity>
            </View>
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
  headerNavContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: styles.SPACING.m,
    paddingTop: Platform.OS === "ios" ? 0 : styles.SPACING.m,
    paddingBottom: styles.SPACING.xs,
  },
  backButton: {
    padding: styles.SPACING.xs,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: styles.SPACING.l,
    paddingTop: styles.SPACING.m,
    paddingBottom: styles.SPACING.l,
  },
  headerContainer: {
    marginBottom: styles.SPACING.xl,
    alignItems: "center",
  },
  title: {
    fontSize: styles.FONT_SIZES.h3,
    fontFamily: styles.FONT_FAMILY.medium,
    color: styles.COLORS.accent,
    textAlign: "center",
    marginBottom: styles.SPACING.s,
  },
  subtitle: {
    fontSize: styles.FONT_SIZES.bodyM,
    fontFamily: styles.FONT_FAMILY.regular,
    color: styles.COLORS.grey,
    textAlign: "center",
    lineHeight: styles.FONT_SIZES.bodyM * 1.5,
    maxWidth: 300,
  },
  formContainer: {
    flex: 1,
    marginBottom: styles.SPACING.xl,
  },
  inputContainer: {
    marginBottom: styles.SPACING.l,
  },
  errorText: {
    color: styles.COLORS.error,
    textAlign: "center",
    marginTop: styles.SPACING.xs,
    marginBottom: styles.SPACING.m,
    fontSize: styles.FONT_SIZES.bodyS,
    fontFamily: styles.FONT_FAMILY.regular,
  },
  bottomContainer: {
    gap: styles.SPACING.l,
  },
  submitButton: {
    marginBottom: styles.SPACING.m,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: styles.SPACING.l,
  },
  loginText: {
    color: styles.COLORS.accent,
    fontSize: styles.FONT_SIZES.bodyL,
    fontFamily: styles.FONT_FAMILY.regular,
  },
  loginLink: {
    color: styles.COLORS.secondary,
    fontSize: styles.FONT_SIZES.bodyL,
    fontFamily: styles.FONT_FAMILY.medium,
  },
});

export default SignUpScreen;
