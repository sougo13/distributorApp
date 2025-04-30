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
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileStackParamList } from "../../navigation/ProfileStackNavigator";
import PrimaryButton from "../../components/common/PrimaryButton";
import FormInput from "../../components/common/FormInput";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import * as styles from "../../styles";

type AddNewCardNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "AddNewCard"
>;

const AddNewCardScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<AddNewCardNavigationProp>();

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [ccv, setCcv] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatCardNumber = (text: string) => {};
  const formatExpiryDate = (text: string) => {};
  const formatCcv = (text: string) => {};

  const handleSaveCard = () => {
    setError(null);

    if (!cardNumber || !expiryDate || !ccv || !cardHolder) {
      setError(t("addCard.errorMessages.fillFields"));
      return;
    }
    const rawCardNumber = cardNumber.replace(/\s/g, "");
    if (rawCardNumber.length < 15 || rawCardNumber.length > 16) {
      setError(t("addCard.errorMessages.invalidNumber"));
      return;
    }
    if (expiryDate.length !== 5 || !expiryDate.includes("/")) {
      setError(t("addCard.errorMessages.invalidExpiry"));
      return;
    }
    if (ccv.length < 3 || ccv.length > 4) {
      setError(t("addCard.errorMessages.invalidCcv"));
      return;
    }

    console.log("Saving card:", {});
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      Alert.alert(
        t("addCard.successAlertTitle"),
        t("addCard.successAlertMessage")
      );
      navigation.goBack();
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
            label={t("addCard.numberLabel")}
            value={cardNumber}
            onChangeText={formatCardNumber}
            placeholder={t("addCard.numberPlaceholder")}
            keyboardType="numeric"
            maxLength={19}
          />
          <View style={s.row}>
            <FormInput
              label={t("addCard.expiryLabel")}
              value={expiryDate}
              onChangeText={formatExpiryDate}
              placeholder={t("addCard.expiryPlaceholder")}
              keyboardType="numeric"
              maxLength={5}
              containerStyle={s.expiryInput}
            />
            <FormInput
              label={t("addCard.ccvLabel")}
              value={ccv}
              onChangeText={formatCcv}
              placeholder={t("addCard.ccvPlaceholder")}
              keyboardType="numeric"
              maxLength={4}
              secureTextEntry={true}
              containerStyle={s.ccvInput}
            />
          </View>
          <FormInput
            label={t("addCard.holderLabel")}
            value={cardHolder}
            onChangeText={setCardHolder}
            placeholder={t("addCard.holderPlaceholder")}
            autoCapitalize="words"
          />

          {error && <Text style={s.errorText}>{error}</Text>}
        </ScrollView>

        <View style={s.buttonContainer}>
          <PrimaryButton
            title={isLoading ? t("common.saving") : t("addCard.saveButton")}
            onPress={handleSaveCard}
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  expiryInput: {
    flex: 1,
    marginRight: styles.SPACING.s,
  },
  ccvInput: {
    flex: 1,
    marginLeft: styles.SPACING.s,
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

export default AddNewCardScreen;
