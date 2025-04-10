
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


const AUTH_STORAGE_KEY = "userToken"; 

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean; 
  login: (userData?: any) => Promise<void>; 
  logout: () => Promise<void>; 
}


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


  useEffect(() => {
    const checkAuthState = async () => {
      try {

        const storedToken = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        console.log("Auth check, stored token:", storedToken);

        setIsLoggedIn(!!storedToken);
      } catch (e) {
        console.error("Failed to load auth state:", e);
        setIsLoggedIn(false); 
      } finally {
        setIsLoading(false); 
      }
    };

    checkAuthState();
  }, []);

  const login = async (userData?: any) => {
    setIsLoading(true); 
    try {


      const tokenToStore = userData?.token || "dummy-token"; 
      await AsyncStorage.setItem(AUTH_STORAGE_KEY, tokenToStore);
      setIsLoggedIn(true);
      console.log("User logged in, token stored.");
    } catch (e) {
      console.error("Failed to login:", e);
      setIsLoggedIn(false); 
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {

      await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
      setIsLoggedIn(false);
      console.log("User logged out, token removed.");
    } catch (e) {
      console.error("Failed to logout:", e);


    } finally {
      setIsLoading(false);
    }
  };


  const authContextValue = useMemo(
    () => ({
      isLoggedIn,
      isLoading,
      login,
      logout,
    }),
    [isLoggedIn, isLoading] 
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
