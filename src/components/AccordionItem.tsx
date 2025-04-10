
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

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface AccordionItemProps {
  title: string;
  content: string;
  initiallyOpen?: boolean;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  initiallyOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  const toggleOpen = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  }, [isOpen]);

  return (
    <View style={s.container}>
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
    backgroundColor: styles.COLORS.cardBackground,
    borderRadius: styles.COMPONENT_STYLES.cardBorderRadius,
    marginBottom: styles.SPACING.m,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: styles.SPACING.m + styles.SPACING.xs,
    paddingHorizontal: styles.SPACING.m,
  },
  titleText: {
    flex: 1,
    color: styles.COLORS.accent,
    fontSize: styles.FONT_SIZES.bodyM,
    fontFamily: styles.FONT_FAMILY.medium,
    marginRight: styles.SPACING.s,
  },
  content: {
    paddingHorizontal: styles.SPACING.m,
    paddingBottom: styles.SPACING.m + styles.SPACING.xs,
  },
  contentText: {
    color: styles.COLORS.grey,
    fontSize: styles.FONT_SIZES.bodyS,
    fontFamily: styles.FONT_FAMILY.regular,
    lineHeight: styles.FONT_SIZES.bodyS * 1.5,
  },
});

export default AccordionItem;
