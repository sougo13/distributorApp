import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import * as stylesConfig from "../../styles";
import PrimaryButton from "../../components/PrimaryButton";
import FormInput from "../../components/FormInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../navigation/AuthStackNavigator";

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

  return (
    <SafeAreaView style={s.safeArea}>
      <TouchableOpacity style={s.backButton} onPress={handleGoBack}>
        <Ionicons
          name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
          size={28}
          color={stylesConfig.COLORS.accent}
        />
      </TouchableOpacity>

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

          <FormInput
            label={t("signUp.phoneLabel")}
            value={phone}
            onChangeText={setPhone}
            placeholder={t("signUp.phonePlaceholder")}
            keyboardType="phone-pad"
            iconName="call-outline"
            containerStyle={s.inputContainer}
          />
          <FormInput
            label={t("signUp.emailLabel")}
            value={email}
            onChangeText={setEmail}
            placeholder={t("signUp.emailPlaceholder")}
            keyboardType="email-address"
            autoCapitalize="none"
            iconName="mail-outline"
            containerStyle={s.inputContainer}
          />
          <FormInput
            label={t("signUp.passwordLabel")}
            value={password}
            onChangeText={setPassword}
            placeholder={t("signUp.passwordPlaceholder")}
            secureTextEntry
            iconName="lock-closed-outline"
            containerStyle={s.inputContainer}
          />
          <FormInput
            label={t("signUp.repeatPasswordLabel")}
            value={repeatPassword}
            onChangeText={setRepeatPassword}
            placeholder={t("signUp.repeatPasswordPlaceholder")}
            secureTextEntry
            iconName="lock-closed-outline"
            containerStyle={s.inputContainer}
          />

          {error && <Text style={s.errorText}>{error}</Text>}

          <View style={{ flex: 1 }} />

          <PrimaryButton
            title={isLoading ? t("signUp.submitting") : t("common.submit")}
            onPress={handleSignUp}
            loading={isLoading}
            disabled={isLoading}
            style={s.submitButton}
          />
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
  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 20,
    left: stylesConfig.SPACING.m,
    zIndex: 10,
    padding: stylesConfig.SPACING.xs,
  },
  keyboardAvoidingView: {
    flex: 1,
    marginTop: 60,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingHorizontal: stylesConfig.SPACING.l,
    paddingTop: stylesConfig.SPACING.m,
    paddingBottom: stylesConfig.SPACING.l,
  },
  headerContainer: {
    marginBottom: stylesConfig.SPACING.xl,
    alignItems: "center",
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
    lineHeight: stylesConfig.FONT_SIZES.bodyM * 1.5,
  },
  inputContainer: {
    marginBottom: stylesConfig.SPACING.m,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: stylesConfig.SPACING.xs,
    marginBottom: stylesConfig.SPACING.m,
    fontSize: stylesConfig.FONT_SIZES.bodyS,
    fontFamily: stylesConfig.FONT_FAMILY.regular,
  },
  submitButton: {
    marginTop: stylesConfig.SPACING.l,
  },
});

export default SignUpScreen;
