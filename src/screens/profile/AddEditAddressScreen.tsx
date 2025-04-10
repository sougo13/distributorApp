import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
  Text,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import * as styles from "../../styles";
import PrimaryButton from "../../components/PrimaryButton";
import FormInput from "../../components/FormInput";
import { ProfileStackParamList } from "../../navigation/ProfileStackNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

type AddEditAddressRouteProp = RouteProp<
  ProfileStackParamList,
  "AddEditAddress"
>;

type AddEditAddressNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "AddEditAddress"
>;

const AddEditAddressScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<AddEditAddressNavigationProp>();
  const route = useRoute<AddEditAddressRouteProp>();
  const addressId = route.params?.addressId;
  const isEditing = !!addressId;

  const [fullAddress, setFullAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing) {
      console.log("Editing address with ID:", addressId);
      setIsFetching(true);
      setTimeout(() => {
        setFullAddress(`Fetched Address for ID ${addressId}`);
        setIsFetching(false);
      }, 500);
    } else {
      console.log("Adding new address");
      setFullAddress("");
    }
  }, [addressId, isEditing]);

  const handleSaveAddress = () => {
    setError(null);
    if (!fullAddress) {
      setError(t("addEditAddress.errorMessages.required"));
      return;
    }

    console.log("Saving address:", { id: addressId, fullAddress });
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      Alert.alert(
        t("addEditAddress.successAlertTitle"),
        isEditing
          ? t("addEditAddress.updateSuccessMessage")
          : t("addEditAddress.saveSuccessMessage")
      );
      navigation.goBack();
    }, 1500);
  };

  const getButtonTitle = () => {
    if (isLoading) {
      return isEditing
        ? t("addEditAddress.updatingButton")
        : t("addEditAddress.savingButton");
    }

    return isEditing
      ? t("addEditAddress.updateButton")
      : t("addEditAddress.saveButton");
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
            label={t("addEditAddress.label")}
            value={fullAddress}
            onChangeText={setFullAddress}
            placeholder={t("addEditAddress.placeholder")}
            editable={!isFetching}
          />

          {error && <Text style={s.errorText}>{error}</Text>}

          {isFetching && (
            <ActivityIndicator
              style={{ marginTop: styles.SPACING.m }}
              color={styles.COLORS.secondary}
            />
          )}
        </ScrollView>

        <View style={s.buttonContainer}>
          <PrimaryButton
            title={getButtonTitle()}
            onPress={handleSaveAddress}
            loading={isLoading}
            disabled={isLoading || isFetching}
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

export default AddEditAddressScreen;
