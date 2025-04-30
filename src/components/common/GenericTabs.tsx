import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
// Adjust the path to styles based on the new location
import * as styles from "../../styles"; 


interface TabInfo<T extends string> {
  id: T; 
  translationKey: string; 
}

interface GenericTabsProps<T extends string> {
  tabs: TabInfo<T>[]; 
  activeTab: T; 
  onTabPress: (tabId: T) => void; 
  containerStyle?: object; 
}


const GenericTabs = <T extends string>({
  tabs,
  activeTab,
  onTabPress,
  containerStyle,
}: GenericTabsProps<T>) => {
  const { t } = useTranslation();

  return (
    <View style={[componentStyles.tabsContainer, containerStyle]}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={componentStyles.tabButton}
          onPress={() => onTabPress(tab.id)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              componentStyles.tabText,
              activeTab === tab.id && componentStyles.activeTabText,
            ]}
          >
            {/* Ensure translationKey is a valid i18n key */}
            {t(tab.translationKey as any)} 
          </Text>
          {activeTab === tab.id && (
            <View style={componentStyles.activeTabIndicator} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};


const componentStyles = StyleSheet.create({
  tabsContainer: {
    flexDirection: "row",

  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingBottom: styles.SPACING.m,
  },
  tabText: {
    color: styles.COLORS.grey,
    fontSize: styles.FONT_SIZES.bodyM,
    fontFamily: styles.FONT_FAMILY.medium,
  },
  activeTabText: {
    color: styles.COLORS.accent,
  },
  activeTabIndicator: {
    position: "absolute",
    bottom: 0,
    left: styles.SPACING.l,
    right: styles.SPACING.l,
    height: 3,
    backgroundColor: styles.COLORS.secondary,
    borderRadius: 2,
  },
});

export default GenericTabs; 