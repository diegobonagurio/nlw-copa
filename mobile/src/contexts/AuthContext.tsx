import React, {
  createContext,
  ReactNode,
  useCallback,
  useState,
  useEffect,
} from "react";
import * as Google from "expo-auth-session/providers/google";
import * as AuthSessions from "expo-auth-session";
import * as WebBrower from "expo-web-browser";
import { Alert } from "react-native";
import { api } from "../services/api";

WebBrower.maybeCompleteAuthSession();

interface UserProps {
  name: string;
  // email: string;
  avatarUrl: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

export interface AuthContextDataProps {
  signIn: () => Promise<void>;
  isUserLoading: boolean;
  user: UserProps;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "857801676312-0ui7100eu7jhtqu6dlabu0imqtae1gch.apps.googleusercontent.com",
    redirectUri: "https://auth.expo.io/@appsplix/mobile",
    scopes: ["profile", "email"],
  });

  async function signIn(): Promise<void> {
    try {
      setIsUserLoading(true);

      await promptAsync();
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsUserLoading(false);
    }
  }

  async function signWithGoogle(access_token: string) {
    try {
      setIsUserLoading(true);

      const response = await api.post("users", {
        access_token,
      });

      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      const userInfoResponse = await api.get("/me");

      setUser(userInfoResponse.data.user);
    } catch (error) {
      Alert.alert("Erro " + error);
    } finally {
      setIsUserLoading(false);
    }
  }

  useEffect(() => {
    if (response?.type === "success" && response.authentication?.accessToken) {
      signWithGoogle(response.authentication.accessToken);
    }
  }, [response]);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isUserLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
