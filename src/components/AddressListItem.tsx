
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as styles from "../styles";

interface AddressListItemProps {
  id: string; 
  addressText: string;
  onPress: (id: string) => void; 
}

const AddressListItem: React.FC<AddressListItemProps> = ({
  id,
  addressText,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={s.container}
      onPress={() => onPress(id)}
      activeOpacity={0.7}
    >
      <Ionicons
        name="location-outline"
        size={24}
        color={styles.COLORS.iconGrey}
        style={s.icon}
      />
      <Text style={s.addressText} numberOfLines={1} ellipsizeMode="tail">
        {addressText}
      </Text>
      <Ionicons
        name="pencil-outline" 
        size={20}
        color={styles.COLORS.iconGrey}
        style={s.editIcon}
      />
    </TouchableOpacity>
  );
};

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: styles.COLORS.inputBackground, 
    borderRadius: styles.COMPONENT_STYLES.borderRadius,
    paddingVertical: styles.SPACING.m,
    paddingHorizontal: styles.SPACING.m,
    marginBottom: styles.SPACING.m, 
  },
  icon: {
    marginRight: styles.SPACING.m,
  },
  addressText: {
    flex: 1, 
    color: styles.COLORS.accent,
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyM,
    marginRight: styles.SPACING.s, 
  },
  editIcon: {},
});

export default AddressListItem;
