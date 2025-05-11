import React, { useState, useCallback, useMemo } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  useWindowDimensions,
  ViewStyle,
} from "react-native";
import { useTranslation } from "react-i18next";
import { COLORS, SPACING } from "../styles";
import { ActiveTab, Category, Supplier } from "../types";
import HomeHeader from "../components/HomeHeader";
import HomeTabs from "../components/HomeTabs";
import FilterChip from "../components/FilterChip";
import CategoryCard from "../components/CategoryCard";
import SupplierCard from "../components/SupplierCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../navigation/HomeStackNavigator";
import { useNavigation } from "@react-navigation/native";
import { CATEGORIES_DATA, SUPPLIERS_DATA } from "../mockData";

const CARD_MARGIN = SPACING.s;

type HomeScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "HomeList"
>;

const HomeScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<ActiveTab>("Categories");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { width: screenWidth } = useWindowDimensions();

  const categoryNumColumns = useMemo(() => {
    const contentWidth = screenWidth - SPACING.containerPadding * 2;
    if (contentWidth < 120 * 3) return 2;
    return 3;
  }, [screenWidth]);

  const handleSupplierPress = useCallback(
    (supplierId: string) => {
      navigation.navigate("SupplierDetail", { supplierId: supplierId });
    },
    [navigation]
  );

  const handleFavoriteToggle = useCallback((supplierId: string) => {
    console.log("Toggle favorite for supplier:", supplierId);
  }, []);

  const handleCategoryPress = useCallback((categoryTitle: string) => {
    setSelectedCategory(categoryTitle);
    setActiveTab("Suppliers");
  }, []);

  const handleTabPress = useCallback((tab: ActiveTab) => {
    setActiveTab(tab);
  }, []);

  const filteredSuppliers = useMemo(() => {
    if (!selectedCategory) {
      return SUPPLIERS_DATA.filter((s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return SUPPLIERS_DATA.filter(
      (supplier) =>
        supplier.tags.some(
          (tag) => tag.toLowerCase() === selectedCategory.toLowerCase()
        ) && supplier.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [selectedCategory, searchQuery]);

  const handleClearCategoryFilter = () => {
    setSelectedCategory(null);
  };

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
        onPress={() => handleSupplierPress(item.id)}
        onFavoriteToggle={handleFavoriteToggle}
      />
    ),
    [selectedCategory, handleSupplierPress, handleFavoriteToggle]
  );

  const categoryRowStyle = useMemo<ViewStyle>(
    () => ({
      justifyContent: "space-between",
      marginBottom: CARD_MARGIN,
    }),
    [categoryNumColumns]
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <HomeHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        locationText={t("home.locationDefault")}
      />
      <View style={styles.container}>
        <HomeTabs activeTab={activeTab} onTabPress={handleTabPress} />

        {activeTab === "Suppliers" && selectedCategory && (
          <FilterChip
            categoryName={selectedCategory}
            onClear={handleClearCategoryFilter}
          />
        )}

        {activeTab === "Categories" && (
          <FlatList
            data={CATEGORIES_DATA}
            renderItem={renderCategory}
            keyExtractor={(item) => `cat-${item.id}`}
            numColumns={categoryNumColumns}
            key={`categories-${categoryNumColumns}`}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={categoryRowStyle}
          />
        )}

        {activeTab === "Suppliers" && (
          <FlatList
            data={filteredSuppliers}
            renderItem={renderSupplier}
            keyExtractor={(item) => `sup-${item.id}`}
            key={"suppliers"}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    flex: 1,
    paddingHorizontal: SPACING.containerPadding,
  },
  listContent: {
    paddingBottom: SPACING.m,
  },
});

export default HomeScreen;
