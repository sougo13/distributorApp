// src/screens/profile/FaqScreen.tsx
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView, // Use ScrollView for a potentially long list
} from "react-native";
import * as styles from "../../styles";
import AccordionItem from "../../components/AccordionItem"; // Import the new component

// Mock FAQ Data (replace with actual data fetching or configuration)
const FAQ_DATA = [
  {
    id: "1",
    question: "How does the app work?",
    answer:
      "Choose your desired products, place an order, and wait for a supplier to accept it. Pay securely and receive your order as soon as possible or schedule it at your convenience.",
  },
  {
    id: "2",
    question: "How do I place an order?",
    answer:
      "Navigate to the Home screen, select a category or supplier, browse products, add them to your cart, and proceed to checkout. Follow the on-screen instructions to complete the order.",
  },
  {
    id: "3",
    question: "What payment methods do you accept?",
    answer:
      "We currently accept major credit and debit cards. You can manage your saved payment methods in the Profile section.",
  },
  {
    id: "4",
    question: "Can I schedule a delivery in advance?",
    answer:
      "Yes, during the checkout process, you may have the option to select a preferred delivery date and time slot, depending on the supplier's availability.",
  },
  {
    id: "5",
    question: "How do I use a promo code or discount?",
    answer:
      'If you have a valid promo code, you can usually enter it during the checkout process before completing your payment. Look for a field labeled "Promo Code" or "Discount Code".',
  },
  // Add more FAQs as needed
];

const FaqScreen = () => {
  return (
    <SafeAreaView style={s.safeArea}>
      <ScrollView
        style={s.scrollView}
        contentContainerStyle={s.scrollContentContainer}
      >
        {FAQ_DATA.map((faqItem) => (
          <AccordionItem
            key={faqItem.id}
            title={faqItem.question}
            content={faqItem.answer}
            // You could make the first item initially open if desired:
            // initiallyOpen={faqItem.id === '1'}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: styles.COLORS.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: styles.SPACING.containerPadding,
    paddingBottom: styles.SPACING.xl, // Ensure space at the bottom
  },
});

export default FaqScreen;
