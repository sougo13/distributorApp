// src/types/index.ts
import { ImageSourcePropType } from "react-native";

// Тип для элемента категории
export interface Category {
  id: string;
  title: string;
  // Используем стандартный тип React Native для источников изображений
  // Он подходит и для require(), и для { uri: '...' }
  image: ImageSourcePropType;
}

// Тип для элемента поставщика
export interface Supplier {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  tags: string[];
  image: ImageSourcePropType;
  isFavorite: boolean;
}

// Тип для активной вкладки (если используется в нескольких местах)
export type ActiveTab = "Categories" | "Suppliers";

// Можно добавлять другие общие типы по мере необходимости
// export interface User { ... }
// export interface Order { ... }
