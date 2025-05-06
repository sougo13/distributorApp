import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  // Modal, // No longer needed
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as styles from '../../styles';
import { BlurView } from 'expo-blur';
import { HomeStackParamList } from '../../navigation/HomeStackNavigator'; // Import Param List type

// Define navigation prop type
type NegotiationSuccessScreenNavigationProp = StackNavigationProp<
  HomeStackParamList,
  'NegotiationSuccess' // Current screen name
>;

const NegotiationSuccessScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NegotiationSuccessScreenNavigationProp>();

  const handleClose = () => {
    // Navigate back to the HomeList screen after success
    navigation.navigate('HomeList'); // Or popToTop if more appropriate
  };

  return (
    <SafeAreaView style={s.safeArea}>
       {/* Header Section - Only Close Button */} 
       <View style={s.headerContainer}>
          {/* Spacer to push button to the right */}
          <View style={{ flex: 1 }} /> 
          {/* Close Button */} 
          <BlurView intensity={90} tint="dark" style={s.headerButtonBlurContainer}>
            <TouchableOpacity style={s.headerButton} onPress={handleClose}>
                <Ionicons name="close" size={24} color={styles.COLORS.accent} />
            </TouchableOpacity>
          </BlurView>
       </View>

      {/* Centered Content Area */} 
      <View style={s.contentContainer}>
          <Ionicons 
            name="checkmark-circle-outline" 
            size={64} // Large checkmark icon
            color={styles.COLORS.secondary} // Use secondary green color
            style={s.icon}
          />
          <Text style={s.titleText}>
            {t('negotiationSuccess.title', 'Your Deal Request Is Sent')}
          </Text>
          <Text style={s.subtitleText}>
            {t('negotiationSuccess.subtitle', 'Check your notifications for supplier responses')}
          </Text>
      </View>

      {/* Optional Footer Button Area - Can be added here if needed */}
      {/* <View style={s.footer}> ... </View> */}

    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: styles.COLORS.primary,
  },
  /* Remove overlay style
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dimmed background
    justifyContent: 'flex-end', // Position container at the bottom
  },
  */
 /* Remove old container style
  container: {
    backgroundColor: styles.COLORS.primary, // Dark background
    borderTopLeftRadius: styles.COMPONENT_STYLES.headerBorderRadius, // 20px from Figma (using existing style)
    borderTopRightRadius: styles.COMPONENT_STYLES.headerBorderRadius, // 20px from Figma
    padding: styles.SPACING.l,
    borderTopWidth: 1, // Match Figma stroke
    borderColor: 'rgba(255, 250, 255, 0.05)', // Match Figma stroke color
    paddingBottom: styles.SPACING.xl, // Extra padding at the bottom
  },
  */
 /* Remove old close button style
  closeButtonBlurContainer: {
    position: 'absolute',
    top: styles.SPACING.m, // Position close button
    right: styles.SPACING.m,
    borderRadius: styles.COMPONENT_STYLES.cardBorderRadius, // 12px
    overflow: 'hidden',
    zIndex: 10,
  },
  closeButton: {
    padding: styles.SPACING.s,
  },
  */

  // New Header Styles
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', // Align button to the right
    alignItems: 'center',
    paddingHorizontal: styles.SPACING.l,
    paddingBottom: styles.SPACING.m, // Space below header items
    paddingTop: styles.SPACING.s, // Minimal padding top, SafeArea handles inset
    backgroundColor: styles.COLORS.primary, // Match background
  },
  headerButtonBlurContainer: {
    borderRadius: styles.COMPONENT_STYLES.cardBorderRadius, // 12px
    overflow: 'hidden',
  },
  headerButton: {
    padding: styles.SPACING.s,
  },

  // Updated Content Container Styles
  contentContainer: {
    flex: 1, // Take up remaining space
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    paddingHorizontal: styles.SPACING.l, // Horizontal padding
    paddingBottom: styles.SPACING.xxl, // Add some padding at the bottom
  },
  icon: {
    marginBottom: styles.SPACING.xl, // Space below icon (36px in Figma)
  },
  titleText: {
    fontFamily: styles.FONT_FAMILY.medium, // Figma: Satoshi Bold (700), using Medium(500) as available
    fontWeight: '700', // Explicitly set bold if Medium isn't enough
    fontSize: styles.FONT_SIZES.h3, // 18px
    color: styles.COLORS.accent,
    textAlign: 'center',
    marginBottom: styles.SPACING.s, // Space between title and subtitle
  },
  subtitleText: {
    fontFamily: styles.FONT_FAMILY.regular, // Figma: Satoshi Regular (400)
    fontSize: styles.FONT_SIZES.bodyS, // 14px
    color: styles.COLORS.accent,
    textAlign: 'center',
  },
  // Optional Footer Style (if needed)
  /*
  footer: {
    padding: styles.SPACING.l,
  },
  */
});

export default NegotiationSuccessScreen; 