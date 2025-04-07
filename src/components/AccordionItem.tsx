// src/components/AccordionItem.tsx
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as styles from "../styles";

// Enable LayoutAnimation on Android
if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface AccordionItemProps {
  title: string;
  content: string;
  initiallyOpen?: boolean; // Optional prop to set initial state
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  initiallyOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  const toggleOpen = useCallback(() => {
    // Configure the animation timing and type
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <View style={s.container}>
      {/* Header (Question) */}
      <TouchableOpacity
        style={s.header}
        onPress={toggleOpen}
        activeOpacity={0.7}
      >
        <Text style={s.titleText}>{title}</Text>
        <Ionicons
          name={isOpen ? "chevron-up-outline" : "chevron-down-outline"}
          size={20}
          color={styles.COLORS.iconGrey}
        />
      </TouchableOpacity>

      {/* Content (Answer) - Rendered conditionally */}
      {isOpen && (
        <View style={s.content}>
          <Text style={s.contentText}>{content}</Text>
        </View>
      )}
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    backgroundColor: styles.COLORS.cardBackground, // Use card background color
    borderRadius: styles.COMPONENT_STYLES.cardBorderRadius, // Use card radius
    marginBottom: styles.SPACING.m,
    overflow: "hidden", // Ensure content clipped by border radius
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: styles.SPACING.m + styles.SPACING.xs, // A bit more padding
    paddingHorizontal: styles.SPACING.m,
  },
  titleText: {
    flex: 1, // Take available space
    color: styles.COLORS.accent,
    fontSize: styles.FONT_SIZES.bodyM,
    fontFamily: styles.FONT_FAMILY.medium,
    marginRight: styles.SPACING.s,
  },
  content: {
    paddingHorizontal: styles.SPACING.m,
    paddingBottom: styles.SPACING.m + styles.SPACING.xs, // Padding below text
    // Add top padding if needed, or rely on header padding
    // paddingTop: styles.SPACING.xs,
  },
  contentText: {
    color: styles.COLORS.grey, // Slightly muted color for answer
    fontSize: styles.FONT_SIZES.bodyS,
    fontFamily: styles.FONT_FAMILY.regular,
    lineHeight: styles.FONT_SIZES.bodyS * 1.5, // Improve readability
  },
});

export default AccordionItem;
