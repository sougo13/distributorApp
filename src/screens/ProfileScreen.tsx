
import React, { useCallback, useMemo } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";

import { useAuth } from "../context/AuthContext";

import * as styles from "../styles";
import { ProfileStackParamList } from "../navigation/ProfileStackNavigator";
import { SafeAreaView } from "react-native-safe-area-context";

type ProfileScreenNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "ProfileMain"
>;

interface ProfileItemData {
  key: keyof ProfileStackParamList | "LogOut";
  icon: keyof typeof Ionicons.glyphMap;
}

const PROFILE_ITEM_DATA: ProfileItemData[] = [
  { key: "PersonalInformation", icon: "person-outline" },
  { key: "ChangePassword", icon: "lock-closed-outline" },
  { key: "SavedAddresses", icon: "location-outline" },
  { key: "ChangePaymentMethod", icon: "card-outline" },
  { key: "ChangeLanguage", icon: "language-outline" },
  { key: "FAQ", icon: "help-circle-outline" },
  { key: "AccountDeletion", icon: "trash-outline" },
  { key: "LogOut", icon: "log-out-outline" },
];

const ProfileScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { logout, isLoading } = useAuth();

  const businessName = "Awesome Business LLC"; 
  const joinedDateDisplay = "Joined Since January, 2025";

  const avatarUrl = null;

  const profileItems = useMemo(() => {
    const itemTexts: { [key in ProfileItemData["key"]]: string } = {
      PersonalInformation: t("profile.options.personalInfo"),
      ChangePassword: t("profile.options.changePassword"),
      SavedAddresses: t("profile.options.savedAddresses"),
      ChangePaymentMethod: t("profile.options.paymentMethods"),
      ChangeLanguage: t("profile.options.changeLanguage"),
      FAQ: t("profile.options.faq"),
      AccountDeletion: t("profile.options.deleteAccount"),
      LogOut: t("profile.logout"),
    };
    return PROFILE_ITEM_DATA.map((item) => ({
      ...item,
      text: itemTexts[item.key] || item.key,
    }));
  }, [t]);

  const handleItemPress = useCallback(
    (key: ProfileItemData["key"]) => {
      if (key === "LogOut") {
        Alert.alert(
          t("profile.logoutConfirmTitle"),
          t("profile.logoutConfirmMessage"),
          [
            { text: t("common.cancel"), style: "cancel" },
            {
              text: t("profile.logout"),
              style: "destructive",
              onPress: async () => {
                console.log("User logging out via context...");
                try {
                  await logout();
                } catch (error) {
                  console.error("Logout failed:", error);
                  Alert.alert(t("common.error"), t("profile.logoutError"));
                }
              },
            },
          ]
        );
      } else {
        navigation.navigate(key as keyof ProfileStackParamList);
      }
    },
    [navigation, logout, t]
  );

  const handleGetHelp = () => {
    console.log("Get Help pressed");

  };

  const renderProfileItem = (
    item: ProfileItemData & { text: string }
  ) => (
    <TouchableOpacity
      key={item.key}
      style={s.listItem}
      onPress={() => handleItemPress(item.key)}
      activeOpacity={0.7}
      disabled={isLoading && item.key === "LogOut"}
    >
      <Ionicons
        name={item.icon}
        size={24}
        color={
          item.key === "LogOut" || item.key === "AccountDeletion"
            ? styles.COLORS.grey
            : styles.COLORS.iconGrey
        }
        style={s.listIcon}
      />
      <Text style={s.listText}>{item.text}</Text>
      {item.key !== "LogOut" && (
        <Ionicons
          name="chevron-forward-outline"
          size={20}
          color={styles.COLORS.grey}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={s.safeArea}>
      <ScrollView style={s.container} contentContainerStyle={s.scrollContent}>
        <LinearGradient
          colors={[
            styles.COLORS.profileHeaderGradientStart,
            styles.COLORS.profileHeaderGradientEnd,
          ]}
          style={s.header}
        >
          <View style={s.headerContent}>
            <View style={s.avatarContainer}>
              {avatarUrl ? (
                <Image source={{ uri: avatarUrl }} style={s.avatar} />
              ) : (
                <View style={s.avatarPlaceholder}>
                  <Ionicons
                    name="business"
                    size={40}
                    color={styles.COLORS.grey}
                  />
                </View>
              )}
            </View>
            <View style={s.headerTextContainer}>
              <Text style={s.businessName}>{businessName}</Text>
              <Text style={s.joinedDate}>{joinedDateDisplay}</Text>
            </View>
            <TouchableOpacity
              style={s.helpButton}
              onPress={handleGetHelp}
              activeOpacity={0.8}
            >
              <Text style={s.helpButtonText}>{t("profile.getHelp")}</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <View style={s.listContainer}>
          {profileItems.map(renderProfileItem)}
        </View>
      </ScrollView>
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
  },
  scrollContent: {
    paddingBottom: styles.SPACING.xl,
  },
  header: {
    paddingTop: styles.SPACING.xl,
    paddingBottom: styles.SPACING.l,
    paddingHorizontal: styles.SPACING.containerPadding,
    borderBottomLeftRadius: styles.COMPONENT_STYLES.headerBorderRadius,
    borderBottomRightRadius: styles.COMPONENT_STYLES.headerBorderRadius,
    backgroundColor: styles.COLORS.secondary,
    overflow: "hidden",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    marginRight: styles.SPACING.m,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: styles.COLORS.grey,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: styles.COLORS.cardBackground,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: styles.COLORS.grey,
  },
  headerTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  businessName: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.h3,
    color: styles.COLORS.accent,
    marginBottom: styles.SPACING.xs,
  },
  joinedDate: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyS,
    color: styles.COLORS.white,
  },
  helpButton: {
    backgroundColor: styles.COLORS.secondary,
    paddingHorizontal: styles.SPACING.m,
    paddingVertical: styles.SPACING.s,
    borderRadius: styles.COMPONENT_STYLES.borderRadius * 2,
    marginLeft: styles.SPACING.m,
  },
  helpButtonText: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.bodyS,
    color: styles.COLORS.primary,
  },
  listContainer: {
    marginTop: styles.SPACING.l,
    marginHorizontal: styles.SPACING.containerPadding,
    backgroundColor: styles.COLORS.primary,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: styles.SPACING.m + styles.SPACING.xs,
    paddingHorizontal: styles.SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: styles.COLORS.inputBackground,
  },
  listIcon: {
    marginRight: styles.SPACING.m,
    width: 24,
    textAlign: "center",
  },
  listText: {
    flex: 1,
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyM,
    color: styles.COLORS.accent,
  },
});

export default ProfileScreen;
