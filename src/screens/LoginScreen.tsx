// src/screens/LoginScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert, // Keep Alert for error messages
} from "react-native";
// Import useAuth hook
import { useAuth } from "../context/AuthContext";
import * as styles from "../styles";
import PrimaryButton from "../components/PrimaryButton"; // Assuming you have this button

// Remove the onLoginSuccess prop type if it was defined
// interface LoginScreenProps {
//   onLoginSuccess: () => void;
// }

// Remove the prop from the component definition
const LoginScreen /*: React.FC<LoginScreenProps>*/ =
  (/*{ onLoginSuccess }*/) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false); // Local loading state for button press
    const [error, setError] = useState<string | null>(null);

    // Get the login function from context
    const { login } = useAuth();

    const handleLogin = async () => {
      // Make handleLogin async
      setError(null);
      setLoading(true);

      // Basic Validation (Keep or enhance)
      if (!email || !password) {
        setError("Please enter both email and password.");
        setLoading(false);
        return;
      }

      // Use test credentials
      if (email.toLowerCase() === "test@test.com" && password === "password") {
        try {
          // Call the login function from context
          await login({ email }); // Pass user data if needed by login logic
          // No need to call onLoginSuccess anymore, context handles the state change
        } catch (apiError) {
          // Handle potential errors from the context login function
          setError("Login failed. Please try again.");
          console.error("Login context error:", apiError);
        } finally {
          setLoading(false); // Ensure loading stops even if context login throws
        }
      } else {
        setError("Invalid email or password.");
        setLoading(false);
      }
    };

    return (
      <SafeAreaView style={s.safeArea}>
        <KeyboardAvoidingView
          style={s.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Text style={s.title}>Login</Text>

          {error && <Text style={s.errorText}>{error}</Text>}

          <TextInput
            style={[
              s.input,
              error && (email === "" || error.includes("email"))
                ? s.inputError
                : {},
            ]}
            placeholder="Email"
            placeholderTextColor={styles.COLORS.placeholder}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            textContentType="emailAddress"
          />
          <TextInput
            style={[
              s.input,
              error && (password === "" || error.includes("password"))
                ? s.inputError
                : {},
            ]}
            placeholder="Password"
            placeholderTextColor={styles.COLORS.placeholder}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            textContentType="password"
          />

          <View style={s.buttonContainer}>
            <PrimaryButton
              title="Войти"
              onPress={handleLogin}
              loading={loading} // Use local loading state for button
              disabled={loading}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };

// --- Styles (Keep existing styles, ensure s.inputError and s.errorText exist) ---
const s = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: styles.COLORS.primary,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: styles.SPACING.l,
  },
  title: {
    fontSize: styles.FONT_SIZES.h1,
    fontFamily: styles.FONT_FAMILY.medium,
    color: styles.COLORS.accent,
    textAlign: "center",
    marginBottom: styles.SPACING.xl,
  },
  input: {
    backgroundColor: styles.COLORS.inputBackground,
    color: styles.COLORS.accent,
    height: styles.COMPONENT_STYLES.inputHeight,
    borderRadius: styles.COMPONENT_STYLES.borderRadius,
    paddingHorizontal: styles.SPACING.m,
    fontSize: styles.FONT_SIZES.bodyM,
    fontFamily: styles.FONT_FAMILY.regular,
    marginBottom: styles.SPACING.m,
    borderWidth: 1,
    borderColor: "transparent",
  },
  inputError: {
    borderColor: "red",
  },
  buttonContainer: {
    marginTop: styles.SPACING.m,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: styles.SPACING.m,
    fontSize: styles.FONT_SIZES.bodyS,
  },
});

export default LoginScreen;
