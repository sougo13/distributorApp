
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

interface SecondaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
  textStyle,
}) => {
  const buttonBackgroundColor =
    disabled || loading
      ? styles.COLORS.grey 
      : styles.COLORS.inputBackground; 

  return (
    <TouchableOpacity
      style={[s.button, { backgroundColor: buttonBackgroundColor }, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator size="small" color={styles.COLORS.placeholder} /> 
      ) : (
        <Text style={[s.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  button: {
    height: styles.COMPONENT_STYLES.buttonHeight, 
    borderRadius: styles.COMPONENT_STYLES.buttonBorderRadius, 
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: styles.SPACING.m,
  },
  text: {
    fontFamily: styles.FONT_FAMILY.medium, 
    fontSize: styles.FONT_SIZES.button, 
    color: styles.COLORS.accent, 
  },
});

export default SecondaryButton;
