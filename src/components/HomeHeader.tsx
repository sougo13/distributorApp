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
import {
  COLORS,
  FONT_FAMILY,
  FONT_SIZES,
  SPACING,
  COMPONENT_STYLES,
} from "../styles";

interface HomeHeaderProps {
  locationText?: string; // Сделаем опциональным
  searchQuery: string;
  onSearchChange: (text: string) => void;
  onLocationPress?: () => void;
  onNotificationPress?: () => void;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  locationText = "Default Location...", // Текст по умолчанию
  searchQuery,
  onSearchChange,
  onLocationPress,
  onNotificationPress,
}) => {
  return (
    <View style={styles.headerOuterContainer}>
      {/* Top Bar */}
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
          activeOpacity={0.7}
          onPress={onNotificationPress}
          disabled={!onNotificationPress}
        >
          <Ionicons
            name="notifications-outline"
            size={24}
            color={COLORS.accent}
          />
          {/* Индикатор уведомлений можно добавить здесь */}
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color={COLORS.placeholder}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
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
    marginBottom: SPACING.l, // Отступ после всего хедера
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? SPACING.m : SPACING.s, // Разный отступ для статус бара
    paddingBottom: SPACING.m,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
    marginRight: SPACING.s,
  },
  locationText: {
    color: COLORS.accent,
    fontSize: FONT_SIZES.bodyS,
    fontFamily: FONT_FAMILY.regular,
    marginLeft: SPACING.xs,
    flexShrink: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.searchBackground,
    borderRadius: COMPONENT_STYLES.borderRadius,
    paddingHorizontal: SPACING.m,
    height: COMPONENT_STYLES.searchBarHeight,
    // marginBottom убран, т.к. он теперь у headerOuterContainer
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
