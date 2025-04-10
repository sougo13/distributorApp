
import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as styles from "../../styles";
import AccordionItem from "../../components/AccordionItem";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5"];

const FaqScreen = () => {
  const { t } = useTranslation();

  const faqItems = useMemo(() => {
    return FAQ_KEYS.map((key) => ({
      id: key,
      question: t(`faq.items.${key}.question`),
      answer: t(`faq.items.${key}.answer`),
    }));
  }, [t]);

  return (
    <SafeAreaView style={s.safeArea}>
      <ScrollView
        style={s.scrollView}
        contentContainerStyle={s.scrollContentContainer}
      >
        {faqItems.map((faqItem) => (
          <AccordionItem
            key={faqItem.id}
            title={faqItem.question}
            content={faqItem.answer}
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
    paddingBottom: styles.SPACING.xl,
  },
});

export default FaqScreen;
