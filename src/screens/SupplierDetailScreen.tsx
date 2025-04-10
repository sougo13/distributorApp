
import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
  TextInput,
  FlatList,
} from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { HomeStackParamList } from "../navigation/HomeStackNavigator";
import { getMockSupplierDetailById } from "../data/mockData";
import {
  ProductListItemData,
  SupplierCategoryTag,
} from "../types";
import * as styles from "../styles";
import ProductListItem from "../components/ProductListItem";
import ProductDetailModal from "../components/ProductDetailModal";

type SupplierDetailScreenRouteProp = RouteProp<
  HomeStackParamList,
  "SupplierDetail"
>;
type SupplierDetailScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "SupplierDetail"
>;

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT =
  Platform.OS === "ios" ? 100 : 80 + (StatusBar.currentHeight || 0);
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const FILTER_HEADER_HEIGHT = 50;

const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList<ProductListItemData>
);

const SupplierDetailScreen = () => {
  const route = useRoute<SupplierDetailScreenRouteProp>();
  const navigation = useNavigation<SupplierDetailScreenNavigationProp>();
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

  const renderProductItem = ({ item }: { item: ProductListItemData }) => (
    <ProductListItem
      item={item}
      onAddToCartPress={() => handleOpenProductDetail(item)}
      onPress={() => handleOpenProductDetail(item)}
    />
  );

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      [1, 0.5, 0],
      Extrapolate.CLAMP
    );
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [0, -HEADER_SCROLL_DISTANCE * 0.5],
      Extrapolate.CLAMP
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
      Extrapolate.CLAMP
    );
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [-HEADER_MIN_HEIGHT, 0],
      Extrapolate.CLAMP
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
      Extrapolate.CLAMP
    );
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      Extrapolate.CLAMP
    );
    return {
      opacity: opacity,
      transform: [{ translateY: translateY }],
    };
  });

  const handleGoBack = () => navigation.goBack();
  const handleMoreOptions = () => console.log("More options pressed");
  const handleToggleFavorite = () => console.log("Toggle favorite");
  const handleSearch = (text: string) => setSearchQuery(text);
  const handleAddToCart = (item: ProductListItemData) => {
    console.log("Add to cart:", item.name);
  };

  const handleCategorySelect = useCallback((categoryId: string) => {
    setSelectedCategoryTag(categoryId);

  }, []);

  if (!supplierDetail) {
    return (
      <SafeAreaView style={componentStyles.safeArea} edges={["left", "right"]}>
        <StatusBar barStyle="light-content" />
        <View style={componentStyles.centered}>
          <TouchableOpacity
            onPress={handleGoBack}
            style={componentStyles.fallbackBackButton}
          >
            <Ionicons
              name="arrow-back"
              size={28}
              color={styles.COLORS.accent}
            />
          </TouchableOpacity>
          <Text style={componentStyles.errorText}>
            {t("supplierDetail.notFound", "Supplier not found.")}
          </Text>
        </View>
      </SafeAreaView>
    );
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

  const renderFilterCategory = useCallback(
    ({ item }: { item: SupplierCategoryTag }) => {
      const isActive = selectedCategoryTag === item.id;
      return (
        <TouchableOpacity
          style={[filterStyles.chip, isActive && filterStyles.chipActive]}
          onPress={() => handleCategorySelect(item.id)}
        >
          <Text
            style={[
              filterStyles.chipText,
              isActive && filterStyles.chipTextActive,
            ]}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    },
    [selectedCategoryTag, handleCategorySelect]
  );

  return (
    <SafeAreaView
      style={componentStyles.safeArea}
      edges={["top", "left", "right"]}
    >
      <StatusBar barStyle="light-content" />

      <Animated.View
        style={[componentStyles.stickyHeader1, stickyHeader1AnimatedStyle]}
      >
        <TouchableOpacity
          onPress={handleGoBack}
          style={componentStyles.headerButton}
        >
          <Ionicons name="arrow-back" size={28} color={styles.COLORS.accent} />
        </TouchableOpacity>
        <Text style={componentStyles.stickyHeaderTitle} numberOfLines={1}>
          {supplierDetail.name}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={handleToggleFavorite}
            style={componentStyles.headerButton}
          >
            <Ionicons
              name={supplierDetail.isFavorite ? "heart" : "heart-outline"}
              size={24}
              color={styles.COLORS.accent}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("Search icon pressed")}
            style={componentStyles.headerButton}
          >
            <Ionicons name="search" size={24} color={styles.COLORS.accent} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleMoreOptions}
            style={componentStyles.headerButton}
          >
            <Ionicons
              name="ellipsis-vertical"
              size={24}
              color={styles.COLORS.accent}
            />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <Animated.View
        style={[componentStyles.stickyHeader2, stickyHeader2AnimatedStyle]}
      >
        <FlatList
          data={supplierDetail.categories}
          renderItem={renderFilterCategory}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={filterStyles.listContainer}
        />
      </Animated.View>

      <AnimatedFlatList
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        ListHeaderComponent={
          <>
            <Animated.View style={headerAnimatedStyle}>
              <ImageBackground
                source={supplierDetail.headerImageUrl}
                style={componentStyles.headerBackground}
              >
                <View style={componentStyles.headerOverlay} />
                <View
                  style={[
                    componentStyles.headerControls,
                    {
                      top: StatusBar.currentHeight || styles.SPACING.l,
                      opacity: 0,
                    },
                  ]}
                >
                  <View style={componentStyles.headerButton} />
                  <View style={{ flexDirection: "row" }}>
                    <View style={componentStyles.headerButton} />
                    <View style={componentStyles.headerButton} />
                    <View style={componentStyles.headerButton} />
                  </View>
                </View>
                <View style={componentStyles.supplierInfoContainer}>
                  <Image
                    source={supplierDetail.logoUrl}
                    style={componentStyles.supplierLogo}
                  />
                  <View>
                    <Text style={componentStyles.supplierName}>
                      {supplierDetail.name}
                    </Text>
                    <View style={componentStyles.ratingContainer}>
                      <MaterialIcons
                        name="star"
                        size={16}
                        color={styles.COLORS.secondary}
                      />
                      <Text style={componentStyles.ratingText}>
                        {supplierDetail.rating.toFixed(1)}
                      </Text>
                      <Text style={componentStyles.reviewsText}>
                        ({supplierDetail.reviews})
                      </Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </Animated.View>
            <View style={componentStyles.contentContainer}>
              {supplierDetail.infoBannerTextKey && (
                <View style={componentStyles.infoBanner}>
                  <Ionicons
                    name="information-circle-outline"
                    size={20}
                    color={styles.COLORS.grey}
                    style={{ marginRight: styles.SPACING.s }}
                  />
                  <Text style={componentStyles.infoBannerText}>
                    {t(supplierDetail.infoBannerTextKey)}
                  </Text>
                </View>
              )}
              <View style={componentStyles.searchContainer}>
                <Ionicons
                  name="search"
                  size={20}
                  color={styles.COLORS.grey}
                  style={componentStyles.searchIcon}
                />
                <TextInput
                  style={componentStyles.searchInput}
                  placeholder={t("supplierDetail.searchPlaceholder")}
                  placeholderTextColor={styles.COLORS.placeholder}
                  value={searchQuery}
                  onChangeText={handleSearch}
                />
              </View>
              <Text style={componentStyles.sectionTitle}>
                {supplierDetail.categories.find(
                  (c) => c.id === selectedCategoryTag
                )?.name ?? t("supplierDetail.allProducts", "All Products")}
              </Text>
            </View>
          </>
        }
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: styles.SPACING.containerPadding,
          paddingBottom: styles.SPACING.l,
        }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={componentStyles.emptyListContainer}>
            <Text style={componentStyles.emptyListText}>
              {t("common.noItemsFound", "No products found.")}
            </Text>
          </View>
        }
      />

      <View style={{ zIndex: 100, position: "absolute" }}>
        <ProductDetailModal
          product={selectedProduct}
          isVisible={isModalVisible}
          onClose={handleCloseModal}
          onAddToCart={handleAddToCartFromModal}
          onRequestNegotiation={handleRequestNegotiationFromModal}
        />
      </View>
    </SafeAreaView>
  );
};

const componentStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: styles.COLORS.primary,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: styles.SPACING.l,
  },
  fallbackBackButton: {
    position: "absolute",
    top: StatusBar.currentHeight || styles.SPACING.l,
    left: styles.SPACING.m,
    padding: styles.SPACING.s,
  },
  errorText: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.h3,
    color: styles.COLORS.accent,
    textAlign: "center",
  },
  headerBackground: {
    height: HEADER_MAX_HEIGHT,
    width: "100%",
    justifyContent: "space-between",
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  headerControls: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: styles.SPACING.m,
  },
  headerButton: {
    padding: styles.SPACING.s,
  },
  supplierInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: styles.SPACING.containerPadding,
    paddingBottom: styles.SPACING.m,
  },
  supplierLogo: {
    width: 50,
    height: 50,
    borderRadius: styles.COMPONENT_STYLES.borderRadius,
    marginRight: styles.SPACING.m,
    borderWidth: 1,
    borderColor: styles.COLORS.white,
  },
  supplierName: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.h2,
    color: styles.COLORS.white,
    marginBottom: styles.SPACING.xs,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    color: styles.COLORS.white,
    opacity: 0.9,
    fontSize: styles.FONT_SIZES.bodyS,
    fontFamily: styles.FONT_FAMILY.regular,
    marginLeft: styles.SPACING.xs,
    marginRight: styles.SPACING.xs,
  },
  reviewsText: {
    color: styles.COLORS.white,
    opacity: 0.7,
    fontSize: styles.FONT_SIZES.bodyS,
    fontFamily: styles.FONT_FAMILY.regular,
  },
  stickyHeader1: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_MIN_HEIGHT,
    backgroundColor: styles.COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: styles.SPACING.m,
    paddingTop: StatusBar.currentHeight || styles.SPACING.m,
    zIndex: 10,
    borderBottomWidth: 1,
    borderBottomColor: styles.COLORS.inputBackground,
  },
  stickyHeaderTitle: {
    flex: 1,
    textAlign: "center",
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.h3,
    color: styles.COLORS.accent,
    marginHorizontal: styles.SPACING.s,
  },
  stickyHeader2: {
    position: "absolute",
    left: 0,
    right: 0,
    height: FILTER_HEADER_HEIGHT,
    backgroundColor: styles.COLORS.primary,
    zIndex: 9,
    justifyContent: "center",
  },
  contentContainer: {
    paddingHorizontal: styles.SPACING.containerPadding,
  },
  infoBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: styles.COLORS.inputBackground,
    borderRadius: styles.COMPONENT_STYLES.borderRadius,
    paddingVertical: styles.SPACING.s,
    paddingHorizontal: styles.SPACING.m,
    marginTop: styles.SPACING.l,
    marginBottom: styles.SPACING.m,
  },
  infoBannerText: {
    flex: 1,
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyS,
    color: styles.COLORS.grey,
    lineHeight: styles.FONT_SIZES.bodyS * 1.4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: styles.COLORS.inputBackground,
    borderRadius: styles.COMPONENT_STYLES.inputBorderRadius,
    paddingHorizontal: styles.SPACING.m,
    height: styles.COMPONENT_STYLES.searchBarHeight,
    marginBottom: styles.SPACING.l,
  },
  searchIcon: {
    marginRight: styles.SPACING.s,
  },
  searchInput: {
    flex: 1,
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyM,
    color: styles.COLORS.accent,
    height: "100%",
  },
  sectionTitle: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.h3,
    color: styles.COLORS.accent,
    marginBottom: styles.SPACING.m,
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

const filterStyles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: styles.SPACING.containerPadding,
    alignItems: "center",
  },
  chip: {
    paddingVertical: styles.SPACING.s,
    paddingHorizontal: styles.SPACING.l,
    marginRight: styles.SPACING.s,
    borderRadius: styles.COMPONENT_STYLES.buttonBorderRadius,
    backgroundColor: styles.COLORS.inputBackground,
    borderWidth: 1,
    borderColor: "transparent",
  },
  chipActive: {
    backgroundColor: styles.COLORS.secondary,
    borderColor: styles.COLORS.secondary,
  },
  chipText: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.bodyS,
    color: styles.COLORS.grey,
  },
  chipTextActive: {
    color: styles.COLORS.primary,
  },
});

export default SupplierDetailScreen;
