import React, { useState, useMemo } from "react";
import { View, StyleSheet, Platform, Alert } from "react-native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";

import * as styles from "../../styles";
import PrimaryButton from "../../components/PrimaryButton";
import CustomDropdown from "../../components/CustomDropdown";
import { SafeAreaView } from "react-native-safe-area-context";

const ChangeLanguageScreen = () => {
  const { t, i18n } = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState<string>(
    i18n.language
  );
  const [isLoading, setIsLoading] = useState(false);

  const languageOptions = useMemo(() => {
    return Object.keys(i18n.options.resources || {}).map((langCode) => ({
      label: t(`languages.${langCode}`),
      value: langCode,
    }));
  }, [t, i18n.options.resources]);

  const handleSaveChanges = async () => {
    if (selectedLanguage === i18n.language) {
      return;
    }
    console.log("Saving language:", selectedLanguage);
    setIsLoading(true);
    try {
      await i18n.changeLanguage(selectedLanguage);

      Alert.alert(
        t("changeLanguage.successTitle"),
        t("changeLanguage.successMessage", {
          language: t(`languages.${selectedLanguage}`),
        })
      );
    } catch (error) {
      console.error("Failed to change language:", error);

      Alert.alert(t("common.error"), "Failed to save language preference.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={s.safeArea}>
      <View style={s.container}>
        <CustomDropdown
          label={t("changeLanguage.selectLanguage")}
          iconName="language-outline"
          options={languageOptions}
          selectedValue={selectedLanguage}
          onValueChange={setSelectedLanguage}
        />

        <View style={s.spacer} />

        <View style={s.buttonContainer}>
          <PrimaryButton
            title={
              isLoading
                ? t("changeLanguage.saving")
                : t("changeLanguage.button")
            }
            onPress={handleSaveChanges}
            loading={isLoading}
            disabled={isLoading || selectedLanguage === i18n.language}
          />
        </View>
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
    padding: styles.SPACING.containerPadding,
  },
  spacer: {
    flex: 1,
  },
  buttonContainer: {
    paddingBottom: Platform.OS === "ios" ? styles.SPACING.l : styles.SPACING.m,
  },
});

export default ChangeLanguageScreen;
