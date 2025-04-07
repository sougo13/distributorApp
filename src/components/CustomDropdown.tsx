// src/components/CustomLanguagePicker.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  SafeAreaView, // Use SafeAreaView inside Modal for better layout
  TouchableWithoutFeedback, // To close modal on background press
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as styles from "../styles";

interface LanguageOption {
  label: string;
  value: string;
}

interface CustomLanguagePickerProps {
  options: LanguageOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  label?: string; // Optional label similar to FormInput
  iconName?: keyof typeof Ionicons.glyphMap; // Optional label icon
}

const CustomDropdown: React.FC<CustomLanguagePickerProps> = ({
  options,
  selectedValue,
  onValueChange,
  label,
  iconName,
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentLabel, setCurrentLabel] = useState("");

  // Update displayed label when selectedValue changes externally or initially
  useEffect(() => {
    const selectedOption = options.find((opt) => opt.value === selectedValue);
    setCurrentLabel(selectedOption?.label || "");
  }, [selectedValue, options]);

  const handleSelect = (value: string) => {
    onValueChange(value);
    setModalVisible(false);
  };

  const renderOption = ({ item }: { item: LanguageOption }) => (
    <TouchableOpacity
      style={s.optionButton}
      onPress={() => handleSelect(item.value)}
    >
      <Text
        style={[
          s.optionText,
          item.value === selectedValue ? s.selectedOptionText : {},
        ]}
      >
        {item.label}
      </Text>
      {item.value === selectedValue && (
        <Ionicons
          name="checkmark-outline"
          size={20}
          color={styles.COLORS.secondary}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={s.outerContainer}>
      {/* Optional Label */}
      {label && (
        <View style={s.pickerLabelContainer}>
          {iconName && (
            <Ionicons
              name={iconName}
              size={20}
              color={styles.COLORS.iconGrey}
              style={s.labelIcon}
            />
          )}
          <Text style={s.label}>{label}</Text>
        </View>
      )}

      {/* Trigger Button */}
      <TouchableOpacity
        style={s.pickerTrigger}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={s.selectedValueText}>{currentLabel}</Text>
        <Ionicons
          name="chevron-down-outline"
          size={20}
          color={styles.COLORS.iconGrey}
        />
      </TouchableOpacity>

      {/* Modal for Options */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade" // Or "slide"
        onRequestClose={() => setModalVisible(false)} // For Android back button
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={s.modalOverlay}>
            <TouchableWithoutFeedback>
              {/* Prevent closing modal when clicking inside content */}
              <View style={s.modalContent}>
                <FlatList
                  data={options}
                  renderItem={renderOption}
                  keyExtractor={(item) => item.value}
                  style={s.optionsList}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const s = StyleSheet.create({
  outerContainer: {
    marginBottom: styles.SPACING.m,
  },
  pickerLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: styles.SPACING.s,
  },
  labelIcon: {
    marginRight: styles.SPACING.s,
  },
  label: {
    color: styles.COLORS.accent,
    fontSize: styles.FONT_SIZES.bodyS,
    fontFamily: styles.FONT_FAMILY.regular,
  },
  pickerTrigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: styles.COLORS.inputBackground,
    borderRadius: styles.COMPONENT_STYLES.borderRadius,
    height: styles.COMPONENT_STYLES.inputHeight,
    paddingHorizontal: styles.SPACING.m,
  },
  selectedValueText: {
    color: styles.COLORS.accent,
    fontSize: styles.FONT_SIZES.bodyM,
    fontFamily: styles.FONT_FAMILY.regular,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent background
    padding: styles.SPACING.xl, // Padding around the modal content
  },
  modalContent: {
    width: "100%", // Take full width within padding
    maxHeight: "50%", // Limit height if many options
    backgroundColor: styles.COLORS.inputBackground, // Dark background for modal
    borderRadius: styles.COMPONENT_STYLES.borderRadius,
    padding: styles.SPACING.s, // Inner padding for list
    overflow: "hidden", // Ensure content respects border radius
  },
  optionsList: {
    // No specific styles needed for FlatList itself now
  },
  optionButton: {
    paddingVertical: styles.SPACING.m,
    paddingHorizontal: styles.SPACING.m,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: styles.COLORS.primary, // Subtle separator
  },
  optionText: {
    color: styles.COLORS.accent,
    fontSize: styles.FONT_SIZES.bodyM,
    fontFamily: styles.FONT_FAMILY.regular,
  },
  selectedOptionText: {
    fontFamily: styles.FONT_FAMILY.medium, // Make selected bolder
    color: styles.COLORS.secondary, // Highlight selected text
  },
});

export default CustomDropdown;
