

import { StyleSheet } from "react-native";
import * as styles from "./index";

export const summaryStyles = StyleSheet.create({
  container: {
    marginTop: styles.SPACING.xl,
    marginBottom: styles.SPACING.m,
  },
  title: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.h3,
    color: styles.COLORS.accent,
    marginBottom: styles.SPACING.m,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: styles.SPACING.s,
  },
  label: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyM,
    color: styles.COLORS.grey,
  },
  amount: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.bodyM,
    color: styles.COLORS.accent,
  },
  totalLabel: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.bodyL,
    color: styles.COLORS.accent,
  },
  totalAmount: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.bodyL,
    color: styles.COLORS.accent,
  },
  separator: {
    height: 1,
    backgroundColor: styles.COLORS.inputBackground,
    marginVertical: styles.SPACING.m,
  },
});

export const warningStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: styles.COLORS.inputBackground,
    borderRadius: styles.COMPONENT_STYLES.borderRadius,
    padding: styles.SPACING.m,
    marginTop: styles.SPACING.l,
    marginBottom: styles.SPACING.m,
  },
  containerTransparent: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: styles.SPACING.m,
    marginBottom: styles.SPACING.m,
  },
  icon: {
    marginRight: styles.SPACING.s,
  },
  text: {
    flex: 1,
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyS,
    color: styles.COLORS.grey,
  },
});
