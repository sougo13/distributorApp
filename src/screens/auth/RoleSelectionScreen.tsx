import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
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

type RoleSelectionNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "RoleSelection"
>;

type Role = "supplier" | "buyer";

const RoleSelectionScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<RoleSelectionNavigationProp>();

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const handleSelectRole = (role: Role) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (!selectedRole) {
      return;
    }
    console.log("Selected Role:", selectedRole);

    navigation.navigate("SignUp", { role: selectedRole });
  };

  const handleLogin = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.replace("Login");
    }
  };

  const renderRoleOption = (
    role: Role,
    iconName: keyof typeof Ionicons.glyphMap
  ) => {
    const isSelected = selectedRole === role;
    const labelKey =
      role === "supplier" ? "roleSelection.supplier" : "roleSelection.buyer";

    return (
      <TouchableOpacity
        style={[s.roleButton, isSelected && s.roleButtonSelected]}
        onPress={() => handleSelectRole(role)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={
            isSelected ? "radio-button-on-outline" : "radio-button-off-outline"
          }
          size={24}
          color={
            isSelected
              ? stylesConfig.COLORS.secondary
              : stylesConfig.COLORS.iconGrey
          }
          style={s.radioIcon}
        />
        <Text style={[s.roleText, isSelected && s.roleTextSelected]}>
          {t(labelKey)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={s.safeArea}>
      <View style={s.container}>
        <View style={s.headerContainer}>
          <Text style={s.title}>{t("roleSelection.title")}</Text>
          <Text style={s.subtitle}>{t("roleSelection.subtitle")}</Text>
        </View>

        <View style={s.optionsContainer}>
          {renderRoleOption("supplier", "business-outline")}
          {renderRoleOption("buyer", "person-outline")}
        </View>

        <View style={{ flex: 1 }} />

        <PrimaryButton
          title={t("common.continue")}
          onPress={handleContinue}
          disabled={!selectedRole}
        />

        <View style={s.footer}>
          <Text style={s.footerText}>{t("roleSelection.haveAccount")} </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={s.linkText}>{t("roleSelection.loginLink")}</Text>
          </TouchableOpacity>
        </View>
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
    paddingHorizontal: stylesConfig.SPACING.l,
    paddingTop: stylesConfig.SPACING.xl,
    paddingBottom: stylesConfig.SPACING.l,
  },
  headerContainer: {
    marginBottom: stylesConfig.SPACING.xxl,
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
  optionsContainer: {
    marginBottom: stylesConfig.SPACING.xl,
  },
  roleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: stylesConfig.COLORS.inputBackground,
    borderRadius: stylesConfig.COMPONENT_STYLES.borderRadius,
    paddingVertical: stylesConfig.SPACING.l,
    paddingHorizontal: stylesConfig.SPACING.m,
    marginBottom: stylesConfig.SPACING.m,
    borderWidth: 1,
    borderColor: "transparent",
  },
  roleButtonSelected: {
    borderColor: stylesConfig.COLORS.secondary,
    backgroundColor: Platform.select({
      ios: stylesConfig.COLORS.inputBackground,
      android: stylesConfig.COLORS.inputBackground,
    }),
  },
  radioIcon: {
    marginRight: stylesConfig.SPACING.m,
  },

  roleText: {
    color: stylesConfig.COLORS.accent,
    fontSize: stylesConfig.FONT_SIZES.bodyM,
    fontFamily: stylesConfig.FONT_FAMILY.regular,
  },
  roleTextSelected: {
    fontFamily: stylesConfig.FONT_FAMILY.medium,
    color: stylesConfig.COLORS.secondary,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: stylesConfig.SPACING.xl,
  },
  footerText: {
    color: stylesConfig.COLORS.grey,
    fontSize: stylesConfig.FONT_SIZES.bodyS,
    fontFamily: stylesConfig.FONT_FAMILY.regular,
  },
  linkText: {
    color: stylesConfig.COLORS.secondary,
    fontSize: stylesConfig.FONT_SIZES.bodyS,
    fontFamily: stylesConfig.FONT_FAMILY.medium,
  },
});

export default RoleSelectionScreen;
