import { strict } from "assert";
import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import {
  SignUp,
  ChildrenProps,
  Token,
  ContextType,
  RouteState,
  Login,
} from "./auth-context.types";
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
  const navigate = useNavigate();

  //   function setupAuthHeaderForServiceCalls(token) {
  //     if (token) {
  //       return (axios.defaults.headers.common["Authorization"] = token);
  //     }
  //     delete axios.defaults.headers.common["Authorization"];
  //   }
  const login = async (email: string, password: string, state: RouteState) => {
    try {
      const { data, status } = await axios.post<Login>(`${API_URL}/login`, {
        email: email,
        password: password,
      });

      if (status === 200) {
        setToken(data.token);
        navigate(state?.from ? state.from : "/");
        // setupAuthHeaderForServiceCalls(data.token);
        localStorage?.setItem("login", JSON.stringify({ token: data.token }));
      }
    } catch (error) {
      alert(error);
    }
  };

  const signUp = async ({ firstName, lastName, email, password }: SignUp) => {
    try {
      const { data, status } = await axios.post(`${API_URL}/signup`, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
      if (status === 200) {
        setToken(data.token);
        navigate("/"); //check redirecting to called page
        // setupAuthHeaderForServiceCalls(data.token);
        localStorage?.setItem("login", JSON.stringify({ token: data.token }));
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        setToken,
        login,
        token,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
