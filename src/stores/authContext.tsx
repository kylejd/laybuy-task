import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import { CustomPageProps } from "../pages/_app";

export const AuthContext = React.createContext(
  {} as {
    authenticate: () => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
  }
);

interface AuthProviderProps {
  children: React.ReactElement;
}
export const AuthProvider: FunctionComponent<AuthProviderProps> = (props) => {
  const { children } = props;

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  const authenticate = async () => {
    localStorage.setItem("isAuthenticated", "User is authenticated.");
    setIsAuthenticated(true);
  };

  // load from localStorage in case of broswer refresh
  useEffect(() => {
    if (!localStorage.getItem("isAuthenticated")) {
      return;
    }
    authenticate();
  }, []);

  // protected routes
  useEffect(() => {
    const Component = children.type as CustomPageProps;

    if (isAuthenticated) {
      return;
    }

    if (!Component.requiresAuth) {
      return;
    }

    router.push(Component.redirectUnauthenticatedTo || "/");
  }, [isAuthenticated, children.type, router]);

  return (
    <AuthContext.Provider
      value={{
        authenticate,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
