import React, { useState, useMemo, useCallback } from "react";
import { View, StyleSheet, Platform, StatusBar, FlatList } from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
} from "react-native-reanimated";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamList } from "../../navigation/HomeStackNavigator";
import { ProductListItemData } from "../../types";
import * as styles from "../../styles";
import ProductDetailModal from "../../components/SupplierDetail/ProductDetailModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomCartButton from "../../components/SupplierDetail/BottomCartButton";
import StickyHeader from "../../components/SupplierDetail/StickyHeader";
import SupplierDetailHeader from "../../components/SupplierDetail/SupplierDetailHeader";
import {
  keyExtractor,
  renderItemSeparator,
  renderListEmptyComponent,
  createRenderProductItem,
} from "../../components/SupplierDetail/ProductListComponents";
import SupplierNotFound from "../../components/SupplierDetail/SupplierNotFound";
import { getMockSupplierDetailById } from "../../mockData";

type SupplierDetailScreenRouteProp = RouteProp<
  HomeStackParamList,
  "SupplierDetail"
>;

type SupplierDetailNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "SupplierDetail"
>;

// Increase header height further
const HEADER_MAX_HEIGHT = 200 + styles.SPACING.xl + styles.SPACING.l;
const HEADER_MIN_HEIGHT =
  Platform.OS === "ios" ? 100 : 80 + (StatusBar.currentHeight || 0);
// Recalculate scroll distance
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const FILTER_HEADER_HEIGHT = 50;

// Recalculate total initial header height with new search margin
const LIST_HEADER_TOTAL_HEIGHT =
  HEADER_MAX_HEIGHT +
  styles.COMPONENT_STYLES.searchBarHeight +
  styles.SPACING.l +
  styles.SPACING.l;

const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList<ProductListItemData>
);

const SupplierDetailScreen = () => {
  const route = useRoute<SupplierDetailScreenRouteProp>();
  const navigation = useNavigation<SupplierDetailNavigationProp>();
  const { t } = useTranslation();
  const { supplierId } = route.params;

  const supplierDetail = getMockSupplierDetailById(supplierId);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategoryTag, setSelectedCategoryTag] = useState<string | null>(
    supplierDetail?.categories[0]?.id ?? null
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ProductListItemData | null>(null);
  const [cartItemsCount, setCartItemsCount] = useState(2);
  const [cartTotal, setCartTotal] = useState(9.0);

  const insets = useSafeAreaInsets();

  const handleOpenProductDetail = (item: ProductListItemData) => {
    console.log("handleOpenProductDetail called with item:", item?.id);
    try {
      setSelectedProduct(item);
      console.log("selectedProduct state updated.");
      setIsModalVisible(true);
      console.log("isModalVisible state updated to true.");
    } catch (error) {
      console.error("Error updating state in handleOpenProductDetail:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  const handleAddToCartFromModal = (productId: string, quantity: number) => {
    console.log(`Add ${quantity} of product ${productId} to cart`);
  };

  const handleRequestNegotiationFromModal = (productId: string) => {
    console.log(`Request negotiation for product ${productId}`);
  };

  const renderProductItem = createRenderProductItem(handleOpenProductDetail);

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      [1, 0.5, 0],
      "clamp"
    );
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [0, -HEADER_SCROLL_DISTANCE * 0.5],
      "clamp"
    );

    return {
      opacity: opacity,
      transform: [{ translateY: translateY }],
    };
  });

  const stickyHeader1AnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [HEADER_SCROLL_DISTANCE / 1.5, HEADER_SCROLL_DISTANCE],
      [0, 1],
      "clamp"
    );
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [-HEADER_MIN_HEIGHT, 0],
      "clamp"
    );
    return {
      opacity: opacity,
      transform: [{ translateY: translateY }],
    };
  });

  const stickyHeader2AnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [HEADER_SCROLL_DISTANCE / 1.5, HEADER_SCROLL_DISTANCE],
      [0, 1],
      "clamp"
    );
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      "clamp"
    );
    return {
      opacity: opacity,
      transform: [{ translateY: translateY }],
    };
  });

  const handleGoBack = () => navigation.goBack();
  const handleMoreOptions = () => {
    if (supplierDetail) {
      navigation.navigate("SupplierAbout", { supplierId: supplierDetail.id });
    } else {
      console.error("Cannot navigate to SupplierAbout: supplierDetail is null");
    }
  };
  const handleToggleFavorite = () => console.log("Toggle favorite");
  const handleSearch = (text: string) => setSearchQuery(text);

  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategoryTag(categoryId);
  }, []);

  if (!supplierDetail) {
    return <SupplierNotFound onGoBack={handleGoBack} t={t} />;
  }

  const filteredProducts = useMemo(() => {
    let products = supplierDetail.products;

    if (selectedCategoryTag) {
      const selectedTagName = supplierDetail.categories
        .find((c) => c.id === selectedCategoryTag)
        ?.name.toLowerCase();
      if (selectedTagName) {
        products = products.filter(
          (product) =>
            product.name.toLowerCase().includes(selectedTagName) ||
            product.description.toLowerCase().includes(selectedTagName)
        );
      }
    }

    if (searchQuery) {
      products = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return products;
  }, [
    searchQuery,
    supplierDetail.products,
    selectedCategoryTag,
    supplierDetail.categories,
  ]);

  return (
    <SafeAreaView
      style={componentStyles.safeArea}
      edges={["top", "left", "right"]}
    >
      <StatusBar barStyle="light-content" />

      {/* Render Sticky Header */}
      <StickyHeader
        stickyHeader1AnimatedStyle={stickyHeader1AnimatedStyle}
        stickyHeader2AnimatedStyle={stickyHeader2AnimatedStyle}
        headerMinHeight={HEADER_MIN_HEIGHT}
        filterHeaderHeight={FILTER_HEADER_HEIGHT}
        supplierName={supplierDetail.name}
        isFavorite={supplierDetail.isFavorite}
        categories={supplierDetail.categories}
        selectedCategoryTag={selectedCategoryTag}
        onGoBack={handleGoBack}
        onToggleFavorite={handleToggleFavorite}
        onSearchPress={() => console.log("Search icon pressed")}
        onMoreOptions={handleMoreOptions}
        onCategorySelect={handleCategorySelect}
      />

      <AnimatedFlatList
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        ListHeaderComponent={
          // Outer View to reserve space
          <View style={{ height: LIST_HEADER_TOTAL_HEIGHT }}>
            {/* Render SupplierDetailHeader here */}
            <SupplierDetailHeader
              headerAnimatedStyle={headerAnimatedStyle}
              supplierDetail={supplierDetail}
              searchQuery={searchQuery}
              onGoBack={handleGoBack}
              onMoreOptions={handleMoreOptions}
              onSearchChange={handleSearch}
              t={t}
            />
          </View>
        }
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={() =>
          renderItemSeparator(componentStyles.separator)
        }
        contentContainerStyle={{
          paddingBottom:
            cartItemsCount > 0
              ? styles.SPACING.xxl + styles.SPACING.xxl
              : styles.SPACING.l,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() =>
          renderListEmptyComponent(
            t,
            componentStyles.emptyListContainer,
            componentStyles.emptyListText
          )
        }
      />

      <View style={{ zIndex: 100, position: "absolute" }}>
        <ProductDetailModal
          product={selectedProduct}
          isVisible={isModalVisible}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCartFromModal}
        />
      </View>

      {/* Conditional Bottom Cart View */}
      {cartItemsCount > 0 && (
        <BottomCartButton cartTotal={cartTotal} insets={insets} />
      )}
    </SafeAreaView>
  );
};

const componentStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: styles.COLORS.primary,
  },
  headerButton: {
    padding: styles.SPACING.s,
  },
  contentContainer: {
    paddingHorizontal: styles.SPACING.containerPadding,
  },
  sectionTitle: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.h3,
    color: styles.COLORS.accent,
    marginBottom: styles.SPACING.m,
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(255, 250, 255, 0.1)",
    marginHorizontal: styles.SPACING.containerPadding,
    marginVertical: styles.SPACING.m,
  },
  emptyListContainer: {
    paddingVertical: styles.SPACING.xl,
    alignItems: "center",
  },
  emptyListText: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyM,
    color: styles.COLORS.grey,
  },
});

export default SupplierDetailScreen;
