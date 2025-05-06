import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons, MaterialIcons } from "@expo/vector-icons"; // Import icons if needed
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

import { HomeStackParamList } from "../../navigation/HomeStackNavigator";
import { getMockSupplierDetailById } from "../../data/mockData";
import * as styles from "../../styles";

// Define Prop and Route types for this screen
type SupplierAboutScreenRouteProp = RouteProp<
  HomeStackParamList,
  "SupplierAbout"
>;
type SupplierAboutScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "SupplierAbout"
>;

const SupplierAboutScreen: React.FC = () => {
  const route = useRoute<SupplierAboutScreenRouteProp>();
  const navigation = useNavigation<SupplierAboutScreenNavigationProp>();
  const { t } = useTranslation();
  const { supplierId } = route.params;

  const supplierDetail = getMockSupplierDetailById(supplierId);

  const handleGoBack = () => navigation.goBack();

  if (!supplierDetail) {
    // Optional: Render a specific not found view or reuse SupplierNotFound
    return (
      <SafeAreaView style={s.safeArea} edges={["top", "left", "right"]}>
        <View style={s.header}>
          <TouchableOpacity onPress={handleGoBack} style={s.backButton}>
            <Ionicons
              name="arrow-back"
              size={28}
              color={styles.COLORS.accent}
            />
          </TouchableOpacity>
          {/* Header title could be generic or empty */}
        </View>
        <View style={s.centered}>
          <Text style={s.errorText}>Supplier details not available.</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Placeholder: Mock data based on Figma structure - Replace with actual data access later
  // Assuming these fields might be added to SupplierDetail type or fetched separately
  const aboutData = {
    // address: supplierDetail.address || "A. Kazbegi 26, Tbilisi, Georgia", // Use mock
    address: "A. Kazbegi 26, Tbilisi, Georgia",
    // openingHours: supplierDetail.openingHours || [
    openingHours: [
      { day: "Monday", hours: "10:00 - 22:00" },
      { day: "Tuesday", hours: "10:00 - 22:00" },
      { day: "Wednesday", hours: "10:00 - 22:00" },
      { day: "Thursday", hours: "10:00 - 22:00" },
      { day: "Friday", hours: "10:00 - 22:00" },
      { day: "Saturday", hours: "10:00 - 19:00" },
      { day: "Sunday", hours: "10:00 - 19:00" },
    ],
    // about: supplierDetail.about || "Ballerina Farm offers premium, pasture-raised meats...",
    about:
      "Ballerina Farm offers premium, pasture-raised meats, including beef, pork, and lamb, all sourced from animals raised humanely on nutrient-rich land. Their handcrafted sourdough products, like artisanal loaves and sourdough starter kits, highlight traditional baking techniques.",
    // phone: supplierDetail.phone || "+995 541 11 22 33",
    phone: "+995 541 11 22 33",
    // email: supplierDetail.email || "Ballerina@farm.com",
    email: "Ballerina@farm.com",
  };

  return (
    <SafeAreaView style={s.safeArea} edges={["top", "left", "right"]}>
      <StatusBar barStyle="light-content" />
      {/* Simple Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={handleGoBack} style={s.backButton}>
          <Ionicons name="arrow-back" size={28} color={styles.COLORS.accent} />
        </TouchableOpacity>
        <Text style={s.headerTitle}>{supplierDetail.name}</Text>
        {/* Placeholder for potential right-side header icons if needed */}
        <View style={{ width: 28 }} />
      </View>

      <ScrollView contentContainerStyle={s.scrollContainer}>
        {/* Address Section */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>
            {t("supplierAbout.address", "Address:")}
          </Text>
          <Text style={s.sectionText}>{aboutData.address}</Text>
        </View>

        <View style={s.separator} />

        {/* Opening Hours Section */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>
            {t("supplierAbout.openingHours", "Opening Hours")}
          </Text>
          {/* Add explicit types for item and index */}
          {aboutData.openingHours.map(
            (item: { day: string; hours: string }, index: number) => (
              <View key={index} style={s.hoursRow}>
                <Text style={[s.sectionText, s.dayText]}>{item.day}:</Text>
                <Text style={s.sectionText}>{item.hours}</Text>
              </View>
            )
          )}
        </View>

        <View style={s.separator} />

        {/* About Company Section */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>
            {t("supplierAbout.aboutCompany", "About Company")}
          </Text>
          <Text style={s.sectionText}>{aboutData.about}</Text>
        </View>

        <View style={s.separator} />

        {/* Contact Information Section */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>
            {t("supplierAbout.contactInfo", "Contact Information")}
          </Text>
          <View style={s.contactRow}>
            <Ionicons
              name="call-outline"
              size={20}
              color={styles.COLORS.grey}
              style={s.contactIcon}
            />
            <Text style={s.sectionText}>{aboutData.phone}</Text>
          </View>
          <View style={s.contactRow}>
            <Ionicons
              name="mail-outline"
              size={20}
              color={styles.COLORS.grey}
              style={s.contactIcon}
            />
            <Text style={s.sectionText}>{aboutData.email}</Text>
          </View>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: styles.SPACING.m,
    paddingVertical: styles.SPACING.s,
    borderBottomWidth: 1,
    borderBottomColor: styles.COLORS.inputBackground,
    paddingTop:
      Platform.OS === "ios"
        ? styles.SPACING.s
        : StatusBar.currentHeight || styles.SPACING.m,
  },
  backButton: {
    padding: styles.SPACING.s, // Add padding for easier touch
  },
  headerTitle: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.h3,
    color: styles.COLORS.accent,
  },
  scrollContainer: {
    padding: styles.SPACING.l,
  },
  section: {
    marginBottom: styles.SPACING.l,
  },
  sectionTitle: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.h3,
    color: styles.COLORS.accent,
    marginBottom: styles.SPACING.m,
  },
  sectionText: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyM,
    color: styles.COLORS.white,
    opacity: 0.9,
    lineHeight: styles.FONT_SIZES.bodyM * 1.5,
  },
  separator: {
    height: 1,
    backgroundColor: styles.COLORS.inputBackground,
    marginVertical: styles.SPACING.m,
  },
  hoursRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: styles.SPACING.xs,
  },
  dayText: {
    opacity: 0.7, // Slightly dimmer text for day
    marginRight: styles.SPACING.m,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: styles.SPACING.s,
  },
  contactIcon: {
    marginRight: styles.SPACING.m,
    opacity: 0.6,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: styles.SPACING.l,
  },
  errorText: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.h3,
    color: styles.COLORS.accent,
    textAlign: "center",
  },
});

export default SupplierAboutScreen;
