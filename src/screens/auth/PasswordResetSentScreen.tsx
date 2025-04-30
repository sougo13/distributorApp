import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import * as styles from '../../styles';
import PrimaryButton from '../../components/common/PrimaryButton';
import { AuthStackParamList } from '../../navigation/AuthStackNavigator';
import MailIcon from '../../assets/icons/mail.svg'; // Using Mail icon as per design

type PasswordResetSentNavProp = StackNavigationProp<
  AuthStackParamList,
  'PasswordResetSent'
>;
type PasswordResetSentRouteProp = RouteProp<
  AuthStackParamList,
  'PasswordResetSent'
>;

const PasswordResetSentScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<PasswordResetSentNavProp>();
  const route = useRoute<PasswordResetSentRouteProp>();
  const email = route.params?.email;

  const handleDone = () => {
    // Navigate back to Login screen
    navigation.navigate('Login');
  };

  const handleGoBack = () => {
    // Navigate back (usually to ForgotPasswordScreen or Login)
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={s.safeArea}>
      {/* Header with Back Button */}
      <View style={s.headerContainer}>
        <TouchableOpacity style={s.backButton} onPress={handleGoBack}>
          <Ionicons
            name={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'}
            size={24}
            color={styles.COLORS.accent}
          />
        </TouchableOpacity>
        {/* Placeholder to balance the header */}
        <View style={{ width: 24 + styles.SPACING.s * 2 }} />
      </View>

      {/* Main Content Area */}
      <View style={s.container}>
        <View style={s.contentGroup}>
          <MailIcon
            width={styles.SIZES.iconLarge}
            height={styles.SIZES.iconLarge}
            fill={styles.COLORS.secondaryTransparent} // Or another appropriate color
          />
          <Text style={s.title}>{t('passwordResetSent.title')}</Text>
          <Text style={s.message}>{t('passwordResetSent.message')}</Text>
        </View>

        <PrimaryButton
          title={t('passwordResetSent.doneButton')}
          onPress={handleDone}
          style={s.doneButton}
        />
      </View>
    </SafeAreaView>
  );
};

const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: styles.COLORS.primary,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: styles.SPACING.m,
    paddingTop: Platform.OS === 'ios' ? 0 : styles.SPACING.m,
    paddingBottom: styles.SPACING.xs,
  },
  backButton: {
    padding: styles.SPACING.s,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: styles.SPACING.l,
    paddingBottom: styles.SPACING.xl,
  },
  contentGroup: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 36, // Gap from Figma
    paddingTop: styles.SPACING.l, // Adjust top padding if needed
  },
  title: {
    fontFamily: styles.FONT_FAMILY.medium,
    fontWeight: '700', // Weight 700 from Figma
    fontSize: styles.FONT_SIZES.h3,
    color: styles.COLORS.accent,
    textAlign: 'center',
  },
  message: {
    fontFamily: styles.FONT_FAMILY.regular,
    fontSize: styles.FONT_SIZES.bodyM,
    color: styles.COLORS.grey,
    textAlign: 'center',
    lineHeight: styles.FONT_SIZES.bodyM * 1.35,
    maxWidth: 300,
  },
  doneButton: {
    width: '100%',
  },
});

export default PasswordResetSentScreen; 