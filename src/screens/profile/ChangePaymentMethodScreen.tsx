// src/screens/profile/ChangePaymentMethodScreen.tsx
import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import * as styles from "../../styles";
import PaymentCardListItem from "../../components/PaymentCardListItem";
import { ProfileStackParamList } from "../../navigation/ProfileStackNavigator";

// Mock data type
interface PaymentCard {
  id: string;
  maskedNumber: string; // e.g., "Card Ending In 1119"
  cardType?: string; // e.g., "Visa", "Mastercard" (for potential future icon logic)
}

// Mock Data (replace with actual data fetching)
const MOCK_CARDS: PaymentCard[] = [
  { id: "card1", maskedNumber: "Card Ending In 1119", cardType: "Visa" },
  { id: "card2", maskedNumber: "Card Ending In 2124", cardType: "Mastercard" },
];

// Navigation prop type
type ChangePaymentMethodNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "ChangePaymentMethod"
>;

const ChangePaymentMethodScreen = () => {
  const navigation = useNavigation<ChangePaymentMethodNavigationProp>();
  const [cards, setCards] = useState<PaymentCard[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- Effects ---
  useEffect(() => {
    // Simulate fetching cards and the currently selected card ID
    setTimeout(() => {
      setCards(MOCK_CARDS);
      // Assume the first card is initially selected (replace with actual logic)
      if (MOCK_CARDS.length > 0) {
        setSelectedCardId(MOCK_CARDS[0].id);
      }
      setIsLoading(false);
    }, 500);
  }, []);

  // --- Handlers ---
  const handleSelectCard = useCallback((id: string) => {
    setSelectedCardId(id);
    // TODO: Add API call here to save the selected card preference
    console.log("Selected card:", id);
  }, []);

  const handleAddNewCard = useCallback(() => {
    navigation.navigate("AddNewCard");
  }, [navigation]);

  // --- Render ---
  const renderCardItem = ({ item }: { item: PaymentCard }) => (
    <PaymentCardListItem
      id={item.id}
      maskedNumber={item.maskedNumber}
      isSelected={item.id === selectedCardId}
      onPress={handleSelectCard}
      // cardTypeIcon={getIconForCardType(item.cardType)} // Implement icon logic later
    />
  );

   // TODO: Add loading state
   // TODO: Add empty state

  return (
    <SafeAreaView style={s.safeArea}>
      <FlatList
        data={cards}
        renderItem={renderCardItem}
        keyExtractor={(item) => item.id}
        style={s.list}
        contentContainerStyle={s.listContent}
         ListEmptyComponent={
          !isLoading ? (
            <View style={s.emptyContainer}>
                <Text style={s.emptyText}>No payment methods saved yet.</Text>
            </View>
          ) : null
        }
      />

      {/* "Add New Card" Button */}
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
        <Text style={s.addButtonText}>Add New Card</Text>
      </TouchableOpacity>
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: styles.COLORS.grey,
    fontSize: styles.FONT_SIZES.bodyM,
    fontFamily: styles.FONT_FAMILY.regular,
  },
});

export default ChangePaymentMethodScreen;