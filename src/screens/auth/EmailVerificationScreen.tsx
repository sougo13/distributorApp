import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";

import * as styles from "../../styles";
import PrimaryButton from "../../components/common/PrimaryButton";
import { AuthStackParamList } from "../../navigation/AuthStackNavigator";
import CheckCircleIcon from '../../assets/icons/check-circle.svg';

type EmailVerificationNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "EmailVerification"
>;

const EmailVerificationScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<EmailVerificationNavigationProp>();

  const handleDone = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={s.safeArea}>
      <View style={s.container}>
        <View style={s.contentGroup}>
          <CheckCircleIcon
            width={styles.SIZES.iconLarge}
            height={styles.SIZES.iconLarge}
            fill={styles.COLORS.secondaryTransparent}
          />
          <Text style={s.title}>{t("emailVerification.title")}</Text>
          <Text style={s.message}>{t("emailVerification.message")}</Text>
        </View>

        <PrimaryButton
          title={t("emailVerification.doneButton")}
          onPress={handleDone}
          style={s.doneButton}
        />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: styles.SPACING.l,
    paddingVertical: styles.SPACING.xl,
  },
  contentGroup: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 36,
    paddingTop: styles.SPACING.xl,
  },
  title: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontWeight: styles.FONT_WEIGHTS.medium,
    fontSize: styles.FONT_SIZES.h3,
    color: styles.COLORS.accent,
    textAlign: 'center',
  },
  message: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyM,
    color: styles.COLORS.grey,
    textAlign: 'center',
    lineHeight: styles.FONT_SIZES.bodyM * 1.35,
    maxWidth: 300,
  },
  doneButton: {
    width: '100%',
  },
});

export default EmailVerificationScreen;
