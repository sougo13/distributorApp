// src/components/FormInput.tsx
import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as styles from "../styles";

interface FormInputProps extends TextInputProps {
  label: string;
  iconName?: keyof typeof Ionicons.glyphMap; // Optional icon name
  containerStyle?: ViewStyle; // Optional style for the outer container
  error?: string | null; // Optional error message
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  iconName,
  containerStyle,
  error = null,
  style, // Existing TextInput style prop
  ...textInputProps // Rest of TextInput props (value, onChangeText, etc.)
}) => {
  return (
    <View style={[s.outerContainer, containerStyle]}>
      <Text style={s.label}>{label}</Text>
      <View style={[s.inputContainer, error ? s.errorBorder : {}]}>
        {iconName && (
          <Ionicons
            name={iconName}
            size={20}
            color={styles.COLORS.iconGrey}
            style={s.icon}
          />
        )}
        <TextInput
          style={[s.input, style]} // Combine default and passed styles
          placeholderTextColor={styles.COLORS.placeholder}
          {...textInputProps}
        />
      </View>
      {error && <Text style={s.errorText}>{error}</Text>}
    </View>
  );
};

const s = StyleSheet.create({
  outerContainer: {
    marginBottom: styles.SPACING.m, // Default bottom margin
  },
  label: {
    color: styles.COLORS.accent,
    fontSize: styles.FONT_SIZES.bodyS,
    fontFamily: styles.FONT_FAMILY.regular,
    marginBottom: styles.SPACING.s,
    // textTransform: 'uppercase', // Uncomment if labels should be uppercase like in design
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: styles.COLORS.inputBackground,
    borderRadius: styles.COMPONENT_STYLES.borderRadius,
    height: styles.COMPONENT_STYLES.inputHeight,
    paddingHorizontal: styles.SPACING.m,
    borderWidth: 1,
    borderColor: "transparent", // Default no border
  },
  errorBorder: {
    borderColor: "red", // Or use a specific error color if defined
  },
  icon: {
    marginRight: styles.SPACING.s,
  },
  input: {
    flex: 1,
    color: styles.COLORS.accent,
    fontSize: styles.FONT_SIZES.bodyM,
    fontFamily: styles.FONT_FAMILY.regular,
    height: "100%", // Ensure TextInput fills the container height
  },
  errorText: {
    color: "red", // Or use a specific error color
    fontSize: styles.FONT_SIZES.bodyXS,
    fontFamily: styles.FONT_FAMILY.regular,
    marginTop: styles.SPACING.xs,
    marginLeft: styles.SPACING.xs, // Small indent
  },
});

export default FormInput;
