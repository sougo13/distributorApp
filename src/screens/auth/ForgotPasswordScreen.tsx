import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import PrimaryButton from '../../components/common/PrimaryButton';
import FormInput from '../../components/common/FormInput';
import { AuthStackParamList } from '../../navigation/AuthStackNavigator';
import * as styles from '../../styles';
import MailIcon from '../../assets/icons/mail.svg';

type ForgotPasswordNavigationProp = StackNavigationProp<
  AuthStackParamList,
  'ForgotPassword'
>;

const ForgotPasswordScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<ForgotPasswordNavigationProp>();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendResetLink = () => {
    // Basic email validation (optional but recommended)
    if (!email) {
      Alert.alert(t('common.error'), t('forgotPassword.emailPlaceholder'));
      return;
    }
    console.log('Proceeding with password reset for:', email);
    setIsLoading(true);
    // TODO: Implement actual API call to send reset link
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to PasswordResetSent screen on success
      navigation.navigate('PasswordResetSent', { email });
    }, 1500); // Simulate API delay
  };

  const handleGoBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={s.safeArea}>
      <View style={s.headerContainer}>
        <TouchableOpacity style={s.backButton} onPress={handleGoBack}>
          <Ionicons
            name={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'}
            size={24}
            color={styles.COLORS.accent}
          />
        </TouchableOpacity>
        {/* Placeholder view to help center title if needed */}
        <View style={{ width: 24 + styles.SPACING.s * 2 }} />
      </View>

      <KeyboardAvoidingView
        style={s.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView
          contentContainerStyle={s.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={s.textContainer}>
            <Text style={s.title}>{t('forgotPassword.title')}</Text>
            <Text style={s.subtitle}>{t('forgotPassword.subtitle')}</Text>
          </View>

          <FormInput
            label={t('forgotPassword.emailLabel')}
            IconComponent={MailIcon}
            value={email}
            onChangeText={setEmail}
            placeholder={t('forgotPassword.emailPlaceholder')}
            keyboardType="email-address"
            autoCapitalize="none"
            containerStyle={s.inputContainer}
          />

          <View style={{ flex: 1 }} />{/* Spacer */}

          <PrimaryButton
            title={isLoading ? t('forgotPassword.sending') : t('common.continue')}
            onPress={handleSendResetLink}
            loading={isLoading}
            disabled={isLoading}
            style={s.submitButton}
          />
        </ScrollView>
      </KeyboardAvoidingView>
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
    paddingTop: Platform.OS === 'ios' ? 0 : styles.SPACING.m, // Adjust top padding for Android StatusBar
    paddingBottom: styles.SPACING.xs,
  },
  backButton: {
    padding: styles.SPACING.s,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingHorizontal: styles.SPACING.l,
    paddingBottom: styles.SPACING.xl,
  },
  textContainer: {
    alignItems: 'center',
    gap: styles.SPACING.m, // Gap between title and subtitle
    marginBottom: 38, // Margin below subtitle, matching Figma structure
  },
  title: {
    fontSize: styles.FONT_SIZES.h3,
    fontFamily: styles.FONT_FAMILY.medium,
    fontWeight: '700',
    color: styles.COLORS.accent,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: styles.FONT_SIZES.bodyM,
    fontFamily: styles.FONT_FAMILY.regular,
    color: styles.COLORS.grey,
    textAlign: 'center',
    lineHeight: styles.FONT_SIZES.bodyM * 1.35,
    maxWidth: 320, // Limit width
  },
  inputContainer: {
    marginBottom: styles.SPACING.l,
  },
  submitButton: {
    marginTop: styles.SPACING.l,
  },
});

export default ForgotPasswordScreen; 