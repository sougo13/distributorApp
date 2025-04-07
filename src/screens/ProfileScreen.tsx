// src/screens/ProfileScreen.tsx
import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert, // Keep Alert for confirmation
  Platform, // Keep Platform
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Import Auth Context hook
import { useAuth } from "../context/AuthContext";

import * as styles from "../styles";
import { ProfileStackParamList } from "../navigation/ProfileStackNavigator";

type ProfileScreenNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "ProfileMain"
>;

interface ProfileListItemData {
  key: keyof ProfileStackParamList | "LogOut";
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
}

// Keep PROFILE_ITEMS array as is
const PROFILE_ITEMS: ProfileListItemData[] = [
  {
    key: "PersonalInformation",
    icon: "person-outline",
    text: "Personal Information",
  },
  {
    key: "ChangePassword",
    icon: "lock-closed-outline",
    text: "Change Password",
  },
  { key: "SavedAddresses", icon: "location-outline", text: "Addresses" },
  { key: "ChangePaymentMethod", icon: "card-outline", text: "Payment Methods" },
  { key: "ChangeLanguage", icon: "language-outline", text: "Change Language" },
  { key: "FAQ", icon: "help-circle-outline", text: "FAQs" },
  { key: "AccountDeletion", icon: "trash-outline", text: "Account Deletion" },
  { key: "LogOut", icon: "log-out-outline", text: "Log Out" },
];

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  // Get logout function from context
  const { logout, isLoading } = useAuth(); // Get isLoading state if needed

  // Mock Data (Keep as is for now)
  const businessName = "Awesome Business LLC";
  const joinedDate = "Joined Since January, 2025";
  const avatarUrl = null;

  // --- Handlers ---
  const handleItemPress = useCallback(
    (key: keyof ProfileStackParamList | "LogOut") => {
      if (key === "LogOut") {
        // Show confirmation Alert first
        Alert.alert("Log Out", "Are you sure you want to log out?", [
          { text: "Cancel", style: "cancel" },
          {
            text: "Log Out",
            style: "destructive",
            onPress: async () => {
              // Make onPress async
              console.log("User logging out via context...");
              try {
                await logout(); // Call logout from context
                // Navigation will happen automatically in App.tsx based on isLoggedIn state change
              } catch (error) {
                console.error("Logout failed:", error);
                Alert.alert("Error", "Could not log out. Please try again.");
              }
            },
          },
        ]);
      } else {
        navigation.navigate(key as keyof ProfileStackParamList);
      }
    },
    [navigation, logout] // Add logout to dependencies
  );

  // handleGetHelp remains the same
  const handleGetHelp = () => {
    console.log("Get Help pressed");
  };

  // --- Render Item (Keep renderProfileItem as is) ---
  const renderProfileItem = (item: ProfileListItemData) => (
    <TouchableOpacity
      key={item.key}
      style={s.listItem}
      onPress={() => handleItemPress(item.key)}
      activeOpacity={0.7}
      disabled={isLoading && item.key === "LogOut"} // Disable logout button while context is loading
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
        {/* --- Header (Keep as is) --- */}
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
              <Text style={s.joinedDate}>{joinedDate}</Text>
            </View>
            <TouchableOpacity
              style={s.helpButton}
              onPress={handleGetHelp}
              activeOpacity={0.8}
            >
              <Text style={s.helpButtonText}>Get Help</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* --- Profile Items List --- */}
        <View style={s.listContainer}>
          {PROFILE_ITEMS.map(renderProfileItem)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Styles (Keep existing styles s) ---
const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: styles.COLORS.primary,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: styles.SPACING.xl, // Ensure space at the bottom
  },
  // Header Styles
  header: {
    // Height can be adjusted based on content and design preference
    paddingTop: styles.SPACING.xl, // Adjust as needed, consider status bar height if not using SafeAreaView properly
    paddingBottom: styles.SPACING.l,
    paddingHorizontal: styles.SPACING.containerPadding,
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
    backgroundColor: styles.COLORS.grey, // Placeholder bg
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: styles.COLORS.cardBackground, // Darker placeholder bg
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: styles.COLORS.grey,
  },
  headerTextContainer: {
    flex: 1, // Take remaining space
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
    color: styles.COLORS.grey,
  },
  helpButton: {
    backgroundColor: styles.COLORS.secondary,
    paddingHorizontal: styles.SPACING.m,
    paddingVertical: styles.SPACING.s,
    borderRadius: styles.COMPONENT_STYLES.borderRadius * 2, // More rounded?
    marginLeft: styles.SPACING.m, // Space from text
  },
  helpButtonText: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.bodyS,
    color: styles.COLORS.primary, // Dark text on green button
  },
  // List Styles
  listContainer: {
    marginTop: styles.SPACING.l, // Space between header and list
    marginHorizontal: styles.SPACING.containerPadding, // Align with header padding
    backgroundColor: styles.COLORS.primary, // Ensure background color if items have margins
    // borderRadius: styles.COMPONENT_STYLES.cardBorderRadius, // Optional: round corners for the whole list block
    // overflow: 'hidden', // Needed if using borderRadius on the container
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: styles.SPACING.m + styles.SPACING.xs, // A bit more padding vertically
    paddingHorizontal: styles.SPACING.m,
    // backgroundColor: styles.COLORS.listItemBackground, // Slightly different bg? Or same as primary?
    // Border between items
    borderBottomWidth: 1,
    borderBottomColor: styles.COLORS.inputBackground, // Use a subtle border color
  },
  listIcon: {
    marginRight: styles.SPACING.m,
    width: 24, // Ensure icons align vertically if texts wrap
    textAlign: "center",
  },
  listText: {
    flex: 1, // Take remaining space
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyM,
    color: styles.COLORS.accent,
  },
});

export default ProfileScreen;
