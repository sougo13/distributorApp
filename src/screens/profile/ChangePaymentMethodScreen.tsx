import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import * as styles from "../../styles";
import PaymentCardListItem from "../../components/PaymentCardListItem";
import { ProfileStackParamList, ChangePaymentMethodParams } from "../../navigation/ProfileStackNavigator";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { PaymentMethod } from "../../types";
import { MOCK_PAYMENT_METHODS } from "../../mockData";

interface PaymentCard {
  id: string;
  maskedNumber: string;
  cardType?: string;
}

type ChangePaymentMethodRouteProp = RouteProp<{ ChangePaymentMethod: ChangePaymentMethodParams }, "ChangePaymentMethod">;

type ChangePaymentMethodNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "ChangePaymentMethod"
>;

const ChangePaymentMethodScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<ChangePaymentMethodNavigationProp>();
  const route = useRoute<ChangePaymentMethodRouteProp>();
  const canSelect = route.params?.canSelect;
  const originRoute = route.params?.originRoute;

  const [cards, setCards] = useState<PaymentMethod[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCards(MOCK_PAYMENT_METHODS);
      const primaryCard = MOCK_PAYMENT_METHODS.find((card) => card.isPrimary);
      if (primaryCard) {
        setSelectedCardId(primaryCard.id);
      }
      setIsLoading(false);
    }, 500);
  }, []);

  const handleSelectCard = useCallback(
    (card: PaymentMethod) => {
      setSelectedCardId(card.id);
      if (canSelect && originRoute) {
        console.log(
          `Returning selected payment method to ${originRoute}:`,
          card
        );
        navigation.navigate(originRoute as any, {
          selectedPaymentMethod: card,
        });
      } else {
        console.log("Selected card (no return):", card.id);
      }
    },
    [navigation, canSelect, originRoute]
  );

  const handleAddNewCard = useCallback(() => {
    navigation.navigate("AddNewCard");
  }, [navigation]);

  const renderCardItem = ({ item }: { item: PaymentMethod }) => (
    <PaymentCardListItem
      id={item.id}
      maskedNumber={t("paymentMethods.cardEndingIn", { last4: item.last4 })}
      isSelected={item.id === selectedCardId}
      onPress={() => handleSelectCard(item)}
      cardTypeIcon={item.cardType}
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
          <Text style={s.emptyText}>{t("paymentMethods.emptyList")}</Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={s.safeArea}>
      <FlatList
        data={cards}
        renderItem={renderCardItem}
        keyExtractor={(item) => item.id}
        style={s.list}
        contentContainerStyle={
          cards.length === 0 ? s.listContentEmpty : s.listContent
        }
        ListEmptyComponent={renderListEmptyComponent}
      />

      {!canSelect && (
        <TouchableOpacity
          style={s.addButton}
          onPress={handleAddNewCard}
          activeOpacity={0.8}
        >
          <Ionicons
            name="add-outline"
            size={28}
            color={styles.COLORS.accent}
            style={s.addIcon}
          />
          <Text style={s.addButtonText}>{t("paymentMethods.addButton")}</Text>
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

export default ChangePaymentMethodScreen;
