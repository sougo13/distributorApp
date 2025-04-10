import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import * as styles from "../../styles";
import PrimaryButton from "../../components/PrimaryButton";
import { ProfileStackParamList } from "../../navigation/ProfileStackNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

type AccountDeletionNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "AccountDeletion"
>;

const AccountDeletionScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<AccountDeletionNavigationProp>();
  const [isLoading, setIsLoading] = useState(false);

  const deletionConsequences = useMemo(() => {
    const consequences = t("deleteAccount.consequences", {
      returnObjects: true,
    });

    return Array.isArray(consequences) ? consequences : [];
  }, [t]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      t("deleteAccount.confirmTitle"),
      t("deleteAccount.confirmMessage"),
      [
        { text: t("common.cancel"), style: "cancel" },
        {
          text: t("deleteAccount.confirmDeleteButton"),
          style: "destructive",
          onPress: () => performDeletion(),
        },
      ]
    );
  };

  const performDeletion = () => {
    console.log("Performing account deletion...");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      console.log("Account deleted successfully.");

      Alert.alert(
        t("deleteAccount.successAlertTitle"),
        t("deleteAccount.successAlertMessage")
      );
    }, 2000);
  };

  const renderConsequenceItem = (text: string, index: number) => (
    <View key={index} style={s.consequenceItem}>
      <View style={s.bulletPoint} />
      <Text style={s.consequenceText}>{text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={s.safeArea}>
      <ScrollView
        style={s.scrollView}
        contentContainerStyle={s.scrollContentContainer}
      >
        <Text style={s.mainText}>{t("deleteAccount.mainText")}</Text>
        <Text style={s.subHeaderText}>{t("deleteAccount.subHeader")}</Text>

        {deletionConsequences.map(renderConsequenceItem)}
      </ScrollView>

      <View style={s.buttonContainer}>
        <TouchableOpacity
          style={s.backButton}
          onPress={handleGoBack}
          disabled={isLoading}
          activeOpacity={0.8}
        >
          <Text style={s.backButtonText}>{t("deleteAccount.backButton")}</Text>
        </TouchableOpacity>

        <View style={s.deleteButtonWrapper}>
          <PrimaryButton
            title={t("deleteAccount.deleteButton")}
            onPress={handleDeleteAccount}
            loading={isLoading}
            disabled={isLoading}
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
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: styles.SPACING.containerPadding,
    paddingBottom: styles.SPACING.xl,
  },
  mainText: {
    color: styles.COLORS.accent,
    fontSize: styles.FONT_SIZES.bodyM,
    fontFamily: styles.FONT_FAMILY.regular,
    lineHeight: styles.FONT_SIZES.bodyM * 1.5,
    marginBottom: styles.SPACING.xl,
  },
  subHeaderText: {
    color: styles.COLORS.accent,
    fontSize: styles.FONT_SIZES.bodyM,
    fontFamily: styles.FONT_FAMILY.medium,
    marginBottom: styles.SPACING.m,
  },
  consequenceItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: styles.SPACING.m,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: styles.COLORS.grey,
    marginRight: styles.SPACING.m,
    marginTop: Platform.OS === "ios" ? 5 : 6,
  },
  consequenceText: {
    flex: 1,
    color: styles.COLORS.grey,
    fontSize: styles.FONT_SIZES.bodyM,
    fontFamily: styles.FONT_FAMILY.regular,
    lineHeight: styles.FONT_SIZES.bodyM * 1.5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: styles.SPACING.containerPadding,
    paddingBottom: Platform.OS === "ios" ? styles.SPACING.l : styles.SPACING.m,
    paddingTop: styles.SPACING.s,
    backgroundColor: styles.COLORS.primary,
  },
  backButton: {
    backgroundColor: styles.COLORS.deleteButtonBackBackground,
    height: styles.COMPONENT_STYLES.buttonHeight,
    borderRadius: styles.COMPONENT_STYLES.borderRadius,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: styles.SPACING.l,
    marginRight: styles.SPACING.s,
    flex: 1,
  },
  backButtonText: {
    color: styles.COLORS.accent,
    fontSize: styles.FONT_SIZES.button,
    fontFamily: styles.FONT_FAMILY.medium,
  },
  deleteButtonWrapper: {
    flex: 1,
    marginLeft: styles.SPACING.s,
  },
});

export default AccountDeletionScreen;
