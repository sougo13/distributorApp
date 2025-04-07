// src/context/AuthContext.tsx
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Ключ для хранения токена/информации о сессии
const AUTH_STORAGE_KEY = "userToken"; // Или 'authState', если храним больше инфо

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean; // Indicates if checking initial auth state
  login: (userData?: any) => Promise<void>; // Make login async if needed
  logout: () => Promise<void>; // Make logout async
}

// Создаем контекст с начальными значениями
const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLoading: true,
  login: async () => {},
  logout: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Проверка состояния при запуске
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        // Пытаемся получить токен/флаг из хранилища
        const storedToken = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        console.log("Auth check, stored token:", storedToken);
        // Если что-то есть, считаем пользователя вошедшим
        setIsLoggedIn(!!storedToken);
      } catch (e) {
        console.error("Failed to load auth state:", e);
        setIsLoggedIn(false); // На всякий случай
      } finally {
        setIsLoading(false); // Завершили проверку
      }
    };

    checkAuthState();
  }, []);

  const login = async (userData?: any) => {
    setIsLoading(true); // Можно добавить индикатор на время "логина"
    try {
      // Здесь может быть логика API запроса для получения токена
      // Для простоты сейчас просто сохраняем флаг/токен
      const tokenToStore = userData?.token || "dummy-token"; // Используем заглушку
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, tokenToStore);
      setIsLoggedIn(true);
      console.log("User logged in, token stored.");
    } catch (e) {
      console.error("Failed to login:", e);
      setIsLoggedIn(false); // Убедимся, что не вошли в систему
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Очищаем токен/флаг из хранилища
      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
      setIsLoggedIn(false);
      console.log("User logged out, token removed.");
    } catch (e) {
      console.error("Failed to logout:", e);
      // Можно оставить пользователя в системе, если очистка не удалась?
      // setIsLoggedIn(true); // ? Решай сам
    } finally {
      setIsLoading(false);
    }
  };

  // Используем useMemo для предотвращения ненужных ререндеров потребителей контекста
  const authContextValue = useMemo(
    () => ({
      isLoggedIn,
      isLoading,
      login,
      logout,
    }),
    [isLoggedIn, isLoading] // Зависимости useMemo
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Хук для удобного использования контекста
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
