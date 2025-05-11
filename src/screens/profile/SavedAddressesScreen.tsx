import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute, RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import * as styles from "../../styles";
import AddressListItem from "../../components/AddressListItem";
import { ProfileStackParamList } from "../../navigation/ProfileStackNavigator";
import { CartStackParamList } from "../../navigation/CartStackNavigator";
import { TabParamList } from "../../navigation/AppNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { MOCK_ADDRESSES } from "../../data/mockData";
import { Address } from "../../types";

type SavedAddressesRouteProp = RouteProp<ProfileStackParamList, "SavedAddresses">;

type SavedAddressesNavigationProp = CompositeNavigationProp<
  StackNavigationProp<ProfileStackParamList, "SavedAddresses">,
  BottomTabNavigationProp<TabParamList>
>;

const SavedAddressesScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<SavedAddressesNavigationProp>();
  const route = useRoute<SavedAddressesRouteProp>();
  const canSelect = route.params?.canSelect;
  const originRoute = route.params?.originRoute;

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAddresses(MOCK_ADDRESSES);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleEditAddress = useCallback(
    (addressId: string) => {
      navigation.navigate("AddEditAddress", { addressId });
    },
    [navigation]
  );

  const handleSelectAddress = useCallback(
    (address: Address) => {
      if (originRoute === "Cart") {
        console.log(
          `Returning selected address to OrderRequest in Cart stack:`,
          address
        );
        navigation.navigate("Cart", {
          screen: "OrderRequest",
          params: { selectedAddress: address },
        });
      } else if (originRoute) {
        navigation.navigate(originRoute as any, { selectedAddress: address });
      } else {
        console.warn("Origin route is not defined for selection.");
      }
    },
    [navigation, originRoute]
  );

  const handleAddNewAddress = useCallback(() => {
    navigation.navigate("AddEditAddress", {});
  }, [navigation]);

  const renderAddressItem = ({ item }: { item: Address }) => (
    <AddressListItem
      id={item.id}
      addressText={item.fullAddress}
      onPress={(id) => {
        const selectedAddressObject = addresses.find((addr) => addr.id === id);
        if (!selectedAddressObject) return;

        if (canSelect) {
          handleSelectAddress(selectedAddressObject);
        } else {
          handleEditAddress(id);
        }
      }}
    />
  );

  const renderListEmptyComponent = () => {
    if (isLoading) {
      return (
        <View style={s.emptyContainer}>
          <ActivityIndicator size="large" color={styles.COLORS.secondary} />
        </View>
      );
    } else {
      return (
        <View style={s.emptyContainer}>
          <Text style={s.emptyText}>{t("savedAddresses.emptyList")}</Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={s.safeArea}>
      <FlatList
        data={addresses}
        renderItem={renderAddressItem}
        keyExtractor={(item) => item.id}
        style={s.list}
        contentContainerStyle={
          addresses.length === 0 ? s.listContentEmpty : s.listContent
        }
        ListEmptyComponent={renderListEmptyComponent}
      />

      {!canSelect && (
        <TouchableOpacity
          style={s.addButton}
          onPress={handleAddNewAddress}
          activeOpacity={0.8}
        >
          <Ionicons
            name="add-outline"
            size={28}
            color={styles.COLORS.accent}
            style={s.addIcon}
          />
          <Text style={s.addButtonText}>{t("savedAddresses.addButton")}</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: styles.COLORS.primary,
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: styles.SPACING.containerPadding,
    flexGrow: 1,
  },
  listContentEmpty: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: styles.SPACING.containerPadding,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: styles.COLORS.inputBackground,
    borderRadius: styles.COMPONENT_STYLES.borderRadius,
    paddingVertical: styles.SPACING.m,
    paddingHorizontal: styles.SPACING.m,
    margin: styles.SPACING.containerPadding,
  },
  addIcon: {
    marginRight: styles.SPACING.m,
  },
  addButtonText: {
    color: styles.COLORS.accent,
    fontFamily: styles.FONT_FAMILY.medium,
    fontSize: styles.FONT_SIZES.bodyM,
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: styles.COLORS.grey,
    fontSize: styles.FONT_SIZES.bodyM,
    fontFamily: styles.FONT_FAMILY.regular,
    textAlign: "center",
  },
});
export default SavedAddressesScreen;
