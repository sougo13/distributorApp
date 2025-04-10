
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
  iconName?: keyof typeof Ionicons.glyphMap; 
  containerStyle?: ViewStyle; 
  error?: string | null; 
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  iconName,
  containerStyle,
  error = null,
  style, 
  ...textInputProps 
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
          style={[s.input, style]} 
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
    marginBottom: styles.SPACING.m, 
  },
  label: {
    color: styles.COLORS.accent,
    fontSize: styles.FONT_SIZES.bodyS,
    fontFamily: styles.FONT_FAMILY.regular,
    marginBottom: styles.SPACING.s,

  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: styles.COLORS.inputBackground,
    borderRadius: styles.COMPONENT_STYLES.borderRadius,
    height: styles.COMPONENT_STYLES.inputHeight,
    paddingHorizontal: styles.SPACING.m,
    borderWidth: 1,
    borderColor: "transparent", 
  },
  errorBorder: {
    borderColor: "red", 
  },
  icon: {
    marginRight: styles.SPACING.s,
  },
  input: {
    flex: 1,
    color: styles.COLORS.accent,
    fontSize: styles.FONT_SIZES.bodyM,
    fontFamily: styles.FONT_FAMILY.regular,
    height: "100%", 
  },
  errorText: {
    color: "red", 
    fontSize: styles.FONT_SIZES.bodyXS,
    fontFamily: styles.FONT_FAMILY.regular,
    marginTop: styles.SPACING.xs,
    marginLeft: styles.SPACING.xs, 
  },
});

export default FormInput;
