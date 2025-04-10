
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next"; 

import {
  COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  SPACING,
  COMPONENT_STYLES,
} from "../styles";

interface HomeHeaderProps {
  locationText?: string; 
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onLocationPress?: () => void;
  onNotificationPress?: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  locationText, 
  searchQuery,
  onSearchChange,
  onLocationPress,
  onNotificationPress,
}) => {
  const { t } = useTranslation(); 

  return (

    <View style={styles.headerOuterContainer}>
      
      <View style={styles.topBar}>
        
        
        <TouchableOpacity
          style={styles.locationContainer}
          activeOpacity={0.7}
          onPress={onLocationPress}
          disabled={!onLocationPress}
        >
          <MaterialIcons name="location-pin" size={24} color={COLORS.accent} />
          <Text style={styles.locationText} numberOfLines={1}>
            {locationText}
          </Text>
        </TouchableOpacity>

        
        <TouchableOpacity
          style={styles.notificationButton}
          activeOpacity={0.7}
          onPress={onNotificationPress}
          disabled={!onNotificationPress}
        >
          <Ionicons
            name="notifications-outline"
            size={24}
            color={COLORS.accent}
          />
        </TouchableOpacity>
      </View>

      
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={COLORS.placeholder}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}

          placeholder={t("home.searchPlaceholder")}
          placeholderTextColor={COLORS.placeholder}
          value={searchQuery}
          onChangeText={onSearchChange}
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  headerOuterContainer: {
    marginBottom: SPACING.l,
    paddingHorizontal: SPACING.containerPadding,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? SPACING.m : SPACING.s,
    paddingBottom: SPACING.m,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
    flex: 1,
    marginRight: SPACING.s,
  },
  locationText: {
    color: COLORS.accent,
    fontSize: FONT_SIZES.bodyS,
    fontFamily: FONT_FAMILY.regular,
    marginLeft: SPACING.xs,
  },
  notificationButton: {
    paddingLeft: SPACING.xs,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.searchBackground,
    borderRadius: COMPONENT_STYLES.borderRadius,
    paddingHorizontal: SPACING.m,
    height: COMPONENT_STYLES.searchBarHeight,
  },
  searchIcon: {
    marginRight: SPACING.s,
  },
  searchInput: {
    flex: 1,
    color: COLORS.accent,
    fontSize: FONT_SIZES.bodyM,
    fontFamily: FONT_FAMILY.regular,
    height: "100%",
  },
});

export default HomeHeader;
