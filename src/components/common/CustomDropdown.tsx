import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  SafeAreaView, 
  TouchableWithoutFeedback, 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// Adjust the path to styles based on the new location
import * as styles from "../../styles";

interface LanguageOption {
  label: string;
  value: string;
}

interface CustomLanguagePickerProps {
  options: LanguageOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  label?: string; 
  iconName?: keyof typeof Ionicons.glyphMap; 
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
      
      {label && (
        <View style={s.pickerLabelContainer}>
          {iconName && (
            <Ionicons
              name={iconName}
              size={20}
              color={styles.COLORS.iconGrey} // Use style color
              style={s.labelIcon}
            />
          )}
          <Text style={s.label}>{label}</Text>
        </View>
      )}

      
      <TouchableOpacity
        style={s.pickerTrigger}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={s.selectedValueText}>{currentLabel}</Text>
        <Ionicons
          name="chevron-down-outline"
          size={20}
          color={styles.COLORS.iconGrey} // Use style color
        />
      </TouchableOpacity>

      
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade" 
        onRequestClose={() => setModalVisible(false)} 
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={s.modalOverlay}>
            <TouchableWithoutFeedback>
              
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

  modalOverlay: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "rgba(0, 0, 0, 0.6)", 
    padding: styles.SPACING.xl, 
  },
  modalContent: {
    width: "100%", 
    maxHeight: "50%", 
    backgroundColor: styles.COLORS.inputBackground, 
    borderRadius: styles.COMPONENT_STYLES.borderRadius,
    padding: styles.SPACING.s, 
    overflow: "hidden", 
  },
  optionsList: {},
  optionButton: {
    paddingVertical: styles.SPACING.m,
    paddingHorizontal: styles.SPACING.m,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: styles.COLORS.primary, 
  },
  optionText: {
    color: styles.COLORS.accent,
    fontSize: styles.FONT_SIZES.bodyM,
    fontFamily: styles.FONT_FAMILY.regular,
  },
  selectedOptionText: {
    fontFamily: styles.FONT_FAMILY.medium, 
    color: styles.COLORS.secondary, 
  },
});

export default CustomDropdown; 