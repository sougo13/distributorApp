import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, FONT_FAMILY, FONT_SIZES, SPACING } from "../styles";

type ActiveTab = "Categories" | "Suppliers"; // Переносим тип сюда

interface HomeTabsProps {
  activeTab: ActiveTab;
  onTabPress: (tab: ActiveTab) => void;
}

const HomeTabs: React.FC<HomeTabsProps> = ({ activeTab, onTabPress }) => {
  return (
    <View style={styles.tabsContainer}>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => onTabPress("Categories")}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "Categories" && styles.activeTabText,
          ]}
        >
          Categories
        </Text>
        {activeTab === "Categories" && (
          <View style={styles.activeTabIndicator} />
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.tabButton}
        onPress={() => onTabPress("Suppliers")}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.tabText,
            activeTab === "Suppliers" && styles.activeTabText,
          ]}
        >
          Suppliers
        </Text>
        {activeTab === "Suppliers" && (
          <View style={styles.activeTabIndicator} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",
    marginBottom: SPACING.m,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingBottom: SPACING.m,
  },
  tabText: {
    color: COLORS.grey,
    fontSize: FONT_SIZES.bodyM,
    fontFamily: FONT_FAMILY.medium, // medium
  },
  activeTabText: {
    color: COLORS.accent,
  },
  activeTabIndicator: {
    position: "absolute",
    bottom: 0,
    left: SPACING.l,
    right: SPACING.l,
    height: 3,
    backgroundColor: COLORS.secondary,
    borderRadius: 2,
  },
});

export default HomeTabs;
