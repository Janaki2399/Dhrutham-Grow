import { createContext, useContext, useState } from "react";
import { ChildrenProps, Token, ContextType } from "./auth-context.types";
const AuthContext = createContext<ContextType>({} as ContextType);

export const AuthProvider = ({ children }: ChildrenProps) => {
  const tokenString: string | null = localStorage?.getItem("login");
  let savedToken:
    | Token
    | {
        token: null;
      };
  if (typeof tokenString === "string") {
    savedToken = JSON.parse(tokenString);
  } else {
    savedToken = {
      token: null,
    };
  }

  const [token, setToken] = useState<string | null>(savedToken?.token);

  return (
    <AuthContext.Provider
      value={{
        setToken,

        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
