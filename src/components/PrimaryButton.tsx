
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from "react-native";
import * as styles from "../styles"; 

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle; 
  textStyle?: TextStyle; 
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      style={[
        s.button,
        isDisabled ? s.disabledButton : {},
        style, 
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator size="small" color={styles.COLORS.primary} />
      ) : (
        <Text
          style={[
            s.text,
            textStyle, 
          ]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  button: {
    backgroundColor: styles.COLORS.secondary,
    height: styles.COMPONENT_STYLES.buttonHeight,
    borderRadius: styles.COMPONENT_STYLES.borderRadius,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: styles.SPACING.m,
  },
  disabledButton: {
    opacity: 0.6, 
  },
  text: {
    color: styles.COLORS.primary, 
    fontSize: styles.FONT_SIZES.button,
    fontFamily: styles.FONT_FAMILY.medium,
  },
});

export default PrimaryButton;
