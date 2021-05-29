import { ReactNode } from "react";

export type ChildrenProps = {
  children: ReactNode;
};

export type SignUp = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type Token = {
  token: string;
};

export type ContextType = {
  token: string | null;
  login: LoginFunction;
  setToken: SetTokenFunction;
  signUp: SignUpFunction;
};
export type RouteState = {
  from: string;
};
export type Login = {
  token: string;
};

export type LoginFunction = (
  email: string,
  password: string,
  state: RouteState
) => Promise<void>;

export type SetTokenFunction = (
  value: React.SetStateAction<string | null>
) => void;

export type SignUpFunction = ({
  firstName,
  lastName,
  email,
  password,
}: SignUp) => Promise<void>;
