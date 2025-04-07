// src/components/ProfileListItem.tsx
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Используем Ionicons, как обсуждали
import { COLORS, FONT_FAMILY, SPACING,  } from "../styles";

interface ProfileListItemProps {
  iconName: keyof typeof Ionicons.glyphMap; // Тип для имен иконок Ionicons
  text: string;
  onPress: () => void;
  isLogout?: boolean; // Флаг для стилизации кнопки выхода
}

const ProfileListItem: React.FC<ProfileListItemProps> = ({
  iconName,
  text,
  onPress,
  isLogout = false,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftContainer}>
        <Ionicons
          name={iconName}
          size={22} // Немного уменьшим размер иконки
          color={isLogout ? COLORS.secondary : COLORS.textPlaceholder} // Цвет иконки
          style={styles.icon}
        />
        <Text style={[styles.text, isLogout && styles.logoutText]}>{text}</Text>
      </View>
      {!isLogout && ( // Не показываем стрелку для кнопки выхода
        <Ionicons
          name="chevron-forward-outline"
          size={20}
          color={COLORS.textPlaceholder}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SPACING.m, // Вертикальный отступ
    // Можно добавить нижнюю границу, если нужно разделение
    // borderBottomWidth: 1,
    // borderBottomColor: colors.cardBackground, // Или другой цвет границы
    marginHorizontal: SPACING.containerPadding, // Горизонтальные отступы как у контейнера
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: SPACING.m, // Отступ между иконкой и текстом
  },
  text: {
    ...typography.bodyM, // Используем основной размер текста
    fontFamily: FONT_FAMILY.regular, // Используем Regular
    color: COLORS.accent, // Основной цвет текста (Ghost White)
  },
  logoutText: {
    color: COLORS.secondary, // Цвет текста для кнопки выхода
    fontFamily: FONT_FAMILY.medium, // Делаем текст выхода чуть жирнее
  },
});

export default ProfileListItem;
