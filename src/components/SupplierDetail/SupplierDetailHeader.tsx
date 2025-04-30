import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
  TextInput,
  ImageSourcePropType,
} from "react-native";
import Animated, { AnimatedStyle } from "react-native-reanimated";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { TFunction } from "i18next";

import * as styles from "../../styles";
import { SupplierDetail } from "../../types"; // Assuming SupplierDetail type exists

interface SupplierDetailHeaderProps {
  headerAnimatedStyle: AnimatedStyle;
  supplierDetail: SupplierDetail; // Pass the whole object
  searchQuery: string;
  onGoBack: () => void;
  onMoreOptions: () => void;
  onSearchChange: (text: string) => void;
  t: TFunction<"translation", undefined>; // Pass translation function
}

const SupplierDetailHeader: React.FC<SupplierDetailHeaderProps> = ({
  headerAnimatedStyle,
  supplierDetail,
  searchQuery,
  onGoBack,
  onMoreOptions,
  onSearchChange,
  t,
}) => {
  return (
    <Animated.View style={headerAnimatedStyle}>
      <ImageBackground
        source={supplierDetail.headerImageUrl as ImageSourcePropType} // Cast might be needed
        style={componentStyles.headerBackground}
      >
        <View style={componentStyles.headerOverlay} />
        <View
          style={[
            componentStyles.headerControls,
            {
              top:
                Platform.OS === "ios"
                  ? (StatusBar.currentHeight || 0) + styles.SPACING.s
                  : StatusBar.currentHeight || styles.SPACING.m,
              justifyContent: "flex-start", // Only show back button here
            },
          ]}
        >
          <TouchableOpacity
            onPress={onGoBack}
            style={[
              componentStyles.headerButton,
              componentStyles.backButtonBackground,
            ]}
          >
            <Ionicons name="arrow-back" size={28} color={styles.COLORS.white} />
          </TouchableOpacity>
        </View>
        <View style={componentStyles.supplierInfoContainer}>
          <BlurView
            intensity={30}
            tint="regular"
            style={componentStyles.supplierInfoBlur}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={supplierDetail.logoUrl as ImageSourcePropType} // Cast might be needed
                style={componentStyles.supplierLogo}
              />
              <View style={componentStyles.supplierInfoTextContainer}>
                <View style={componentStyles.supplierNameRow}>
                  <Text style={componentStyles.supplierName} numberOfLines={1}>
                    {supplierDetail.name}
                  </Text>
                  {/* More options button inside the blur view */}
                  <TouchableOpacity
                    onPress={onMoreOptions}
                    style={componentStyles.headerButton}
                  >
                    <Ionicons
                      name="ellipsis-vertical"
                      size={20}
                      color={styles.COLORS.white}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={componentStyles.supplierStatusText}>
                  {t("supplierDetail.statusOpened", "Opened")}
                </Text>
                <View style={componentStyles.ratingContainer}>
                  <MaterialIcons
                    name="star"
                    size={16}
                    color={styles.COLORS.secondary}
                  />
                  <Text style={componentStyles.ratingText}>
                    {supplierDetail.rating.toFixed(1)}
                  </Text>
                  <Text style={componentStyles.reviewsText}>
                    ({supplierDetail.reviews})
                  </Text>
                </View>
              </View>
            </View>
            {supplierDetail.infoBannerTextKey && (
              <View style={componentStyles.infoBanner}>
                <Ionicons
                  name="information-circle-outline"
                  size={20}
                  color={styles.COLORS.white}
                  style={{ marginRight: styles.SPACING.s }}
                />
                <Text style={componentStyles.infoBannerText}>
                  {t(supplierDetail.infoBannerTextKey as any, {
                    defaultValue: supplierDetail.infoBannerTextKey,
                  })}
                </Text>
              </View>
            )}
          </BlurView>
        </View>
      </ImageBackground>

      {/* Search container placed here, AFTER ImageBackground */}
      <View style={componentStyles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={styles.COLORS.grey}
          style={componentStyles.searchIcon}
        />
        <TextInput
          style={componentStyles.searchInput}
          placeholder={t("supplierDetail.searchPlaceholder")}
          placeholderTextColor={styles.COLORS.placeholder}
          value={searchQuery}
          onChangeText={onSearchChange}
        />
      </View>
    </Animated.View>
  );
};

// --- Styles --- //
const componentStyles = StyleSheet.create({
  headerBackground: {
    // height is determined by parent container in SupplierDetailScreen
    width: "100%",
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  headerControls: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
    // justifyContent is set dynamically in JSX
    alignItems: "center",
    paddingHorizontal: styles.SPACING.m,
    // top is set dynamically in JSX
  },
  headerButton: { // Keep this style if potentially shared or move if specific
    padding: styles.SPACING.s,
  },
  backButtonBackground: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
  },
  supplierInfoContainer: {
    marginTop:
      (StatusBar.currentHeight || 0) + styles.SPACING.xl + styles.SPACING.m,
    borderRadius: 20,
    marginHorizontal: styles.SPACING.m,
    overflow: "hidden",
  },
  supplierInfoBlur: {
    flexDirection: "column",
    alignItems: "stretch",
    padding: styles.SPACING.m,
  },
  supplierLogo: {
    width: 50,
    height: 50,
    borderRadius: styles.COMPONENT_STYLES.borderRadius,
    marginRight: styles.SPACING.m,
    borderWidth: 1,
    borderColor: styles.COLORS.white,
  },
  supplierInfoTextContainer: {
    flex: 1,
    justifyContent: "center",
    marginLeft: styles.SPACING.m, // Added margin back
  },
  supplierNameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: styles.SPACING.xs,
  },
  supplierName: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.h2,
    color: styles.COLORS.white,
    flex: 1, // Allow text to take space before ellipsis icon
    marginRight: styles.SPACING.s,
  },
  supplierStatusText: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyS,
    color: "rgba(89, 255, 160, 0.7)",
    marginBottom: styles.SPACING.xs,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    color: styles.COLORS.white,
    opacity: 0.9,
    fontSize: styles.FONT_SIZES.bodyS,
    fontFamily: styles.FONT_FAMILY.regular,
    marginLeft: styles.SPACING.xs,
    marginRight: styles.SPACING.xs,
  },
  reviewsText: {
    color: styles.COLORS.white,
    opacity: 0.7,
    fontSize: styles.FONT_SIZES.bodyS,
    fontFamily: styles.FONT_FAMILY.regular,
  },
  infoBanner: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: styles.SPACING.m,
  },
  infoBannerText: {
    flex: 1,
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyS,
    color: styles.COLORS.white,
    lineHeight: styles.FONT_SIZES.bodyS * 1.4,
    opacity: 0.8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: styles.COLORS.inputBackground,
    borderRadius: styles.COMPONENT_STYLES.inputBorderRadius,
    paddingHorizontal: styles.SPACING.m,
    height: styles.COMPONENT_STYLES.searchBarHeight,
    marginHorizontal: styles.SPACING.containerPadding,
    marginTop: styles.SPACING.l, // Keep margin relative to ImageBackground bottom
    marginBottom: styles.SPACING.l, // Keep margin to separate from list
  },
  searchIcon: {
    marginRight: styles.SPACING.s,
  },
  searchInput: {
    flex: 1,
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyM,
    color: styles.COLORS.accent,
    height: "100%",
  },
});

export default SupplierDetailHeader; 