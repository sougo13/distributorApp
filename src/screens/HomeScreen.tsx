// src/screens/HomeScreen.tsx
import React, { useState, useCallback, useMemo } from "react";
import {
  StyleSheet,
  View, // Убрали лишние импорты Text, TextInput, etc.
  SafeAreaView,
  FlatList,
  Platform, // Platform нужен для безопасной зоны
} from "react-native";

// --- Импорт стилей и типов ---
import { COLORS, SPACING } from "../styles"; // Импортируем только нужные здесь
import { ActiveTab, Category, Supplier } from "../types"; // Предполагаем, что типы вынесены

// --- Импорт НОВЫХ компонентов ---
import HomeHeader from "../components/HomeHeader";
import HomeTabs from "../components/HomeTabs";
import FilterChip from "../components/FilterChip";
import CategoryCard from "../components/CategoryCard";
import SupplierCard from "../components/SupplierCard";
import { CATEGORIES_DATA, SUPPLIERS_DATA } from "../data/mockData";

const CARD_MARGIN = SPACING.s;
const NUM_COLUMNS = 3;

const HomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<ActiveTab>("Categories");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryPress = useCallback((categoryTitle: string) => {
    setSelectedCategory(categoryTitle);
    setActiveTab("Suppliers");
  }, []);

  const handleTabPress = useCallback((tab: ActiveTab) => {
    setActiveTab(tab);
    // Опционально: Сбрасывать фильтр при переключении на Categories?
    if (tab === "Categories") {
      // setSelectedCategory(null); // Раскомментировать, если нужно
    }
  }, []);

  const filteredSuppliers = useMemo(() => {
    // Логика фильтрации остается здесь
    if (!selectedCategory) {
      // Добавить фильтрацию по searchQuery, если нужно
      return SUPPLIERS_DATA.filter((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return SUPPLIERS_DATA.filter(
      (supplier) =>
        supplier.tags.some(
          (tag) => tag.toLowerCase() === selectedCategory.toLowerCase()
        ) && supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) // Добавим фильтр по имени
    );
  }, [selectedCategory, searchQuery]); // Добавили searchQuery в зависимости

  const handleClearCategoryFilter = () => {
    setSelectedCategory(null);
  };

  // --- Коллбэки для рендера элементов ---
  const renderCategory = useCallback(
    ({ item }: { item: Category }) => (
      <CategoryCard
        item={item}
        onPress={() => handleCategoryPress(item.title)}
      />
    ),
    [handleCategoryPress]
  );

  const renderSupplier = useCallback(
    ({ item }: { item: Supplier }) => (
      <SupplierCard
        item={item}
        selectedCategory={selectedCategory}
        // onPress={() => navigateToSupplierDetails(item.id)} // Для будущей навигации
        // onFavoriteToggle={handleToggleFavorite} // Для будущего избранного
      />
    ),
    [selectedCategory]
  ); // Добавили selectedCategory в зависимости

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Используем новый компонент хедера */}
      <HomeHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        locationText="38 Kote and Soso Tsereteli St..." // Пример
        // onLocationPress={() => {}} // Обработчики пока не нужны
        // onNotificationPress={() => {}}
      />
      <View style={styles.container}>
        {/* Используем новый компонент табов */}
        <HomeTabs activeTab={activeTab} onTabPress={handleTabPress} />

        {/* Используем новый компонент чипа */}
        {activeTab === "Suppliers" && selectedCategory && (
          <FilterChip
            categoryName={selectedCategory}
            onClear={handleClearCategoryFilter}
          />
        )}

        {/* Content Area */}
        {activeTab === "Categories" && (
          <FlatList
            data={CATEGORIES_DATA}
            renderItem={renderCategory} // Используем новый рендер
            keyExtractor={(item) => `cat-${item.id}`} // Добавил префикс
            numColumns={NUM_COLUMNS}
            key={"categories"}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.categoryRow} // Стиль для отступов в ряду
          />
        )}

        {activeTab === "Suppliers" && (
          <FlatList
            data={filteredSuppliers}
            renderItem={renderSupplier} // Используем новый рендер
            keyExtractor={(item) => `sup-${item.id}`} // Добавил префикс
            key={"suppliers"}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

// Оставляем только стили, специфичные для HomeScreen (контейнер, отступы)
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  // Контейнер теперь не нужен? Хедер вне его
  // container: {
  //     flex: 1,
  //     paddingHorizontal: SPACING.containerPadding,
  // },
  // --- НОВЫЙ КОНТЕЙНЕР ДЛЯ КОНТЕНТА ПОД ХЕДЕРОМ ---
  container: {
    flex: 1, // Занимает место под хедером
    paddingHorizontal: SPACING.containerPadding,
  },
  listContent: {
    paddingBottom: SPACING.m, // Отступ снизу для списков
  },
  categoryRow: {
    justifyContent: "space-between",
    marginBottom: CARD_MARGIN,
  },
});
export default HomeScreen;
