// src/data/mockData.ts
import { Category, Supplier } from "../types"; // Импортируем типы

// Используем тип Category[]
export const CATEGORIES_DATA: Category[] = [
  // Используем require с путем ОТНОСИТЕЛЬНО ЭТОГО ФАЙЛА (src/data/)
  {
    id: "1",
    title: "Milk",
    image: require("../assets/images/categories/milk.png"),
  },
  {
    id: "2",
    title: "Cheese",
    image: require("../assets/images/categories/cheese.png"),
  },
  {
    id: "3",
    title: "Eggs",
    image: require("../assets/images/categories/eggs.png"),
  },
  {
    id: "4",
    title: "Bread",
    image: require("../assets/images/categories/bread.png"),
  },
  {
    id: "5",
    title: "Eggs",
    image: require("../assets/images/categories/eggs.png"),
  },
  {
    id: "6",
    title: "Butter",
    image: require("../assets/images/categories/butter.png"),
  },
  {
    id: "7",
    title: "Milk",
    image: require("../assets/images/categories/milk.png"),
  },
  {
    id: "8",
    title: "Cheese",
    image: require("../assets/images/categories/cheese.png"),
  },
  {
    id: "9",
    title: "Bread",
    image: require("../assets/images/categories/bread.png"),
  },
];

// Используем тип Supplier[]
export const SUPPLIERS_DATA: Supplier[] = [
  // Используем require с путем ОТНОСИТЕЛЬНО ЭТОГО ФАЙЛА (src/data/)
  {
    id: "s1",
    name: "Ballerina Farm",
    rating: 4.9,
    reviews: 21,
    tags: ["Milk", "Butter", "Cheese", "Cream"],
    image: require("../assets/images/suppliers/BallerinaFarm.png"),
    isFavorite: true,
  },
  {
    id: "s2",
    name: "Daily Farmers",
    rating: 4.5,
    reviews: 17,
    tags: ["Milk", "Butter", "Cheese", "Cream"],
    image: require("../assets/images/suppliers/DailyFarmers.png"),
    isFavorite: false,
  },
  {
    id: "s3",
    name: "Dean Foods",
    rating: 4.5,
    reviews: 212,
    tags: ["Milk", "Butter", "Cheese", "Cream"],
    image: require("../assets/images/suppliers/DeanFoods.png"),
    isFavorite: false,
  },
  {
    id: "s4",
    name: "Champs Meat",
    rating: 4.7,
    reviews: 11,
    tags: ["Meat", "Rice", "Cheese", "Yogurt"],
    image: require("../assets/images/suppliers/ChampsMeat.png"),
    isFavorite: true,
  },
  {
    id: "s5",
    name: "Local Bakery",
    rating: 4.8,
    reviews: 55,
    tags: ["Bread", "Pastry"],
    image: require("../assets/images/categories/bread.png"),
    isFavorite: false,
  }, // Placeholder image
  {
    id: "s6",
    name: "Eggcellent Farms",
    rating: 4.6,
    reviews: 30,
    tags: ["Eggs"],
    image: require("../assets/images/categories/eggs.png"),
    isFavorite: true,
  }, // Placeholder image
];
