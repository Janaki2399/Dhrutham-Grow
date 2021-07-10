import { useAuth } from "../context/Auth/auth-context";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFormValidation } from "../hooks/useFormValidation";
import { login } from "../services/Login/login";
import { LoginDetails } from "../pages/Login/Login.types";
import { API_STATUS } from "../constants";

export type RouteState = {
  from: string;
};
export const useLogin = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as RouteState;

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [touchedFields, setTouchedFields] = useState<Partial<LoginDetails>>({});

  const { validateLogin, isBtnDisabled } = useFormValidation();

  const [status, setStatus] = useState<API_STATUS>(API_STATUS.IDLE);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus(API_STATUS.LOADING);
    const loginResponse = await login(userDetails);

    if ("token" in loginResponse) {
      setStatus(API_STATUS.SUCCESS);
      setToken(loginResponse.token);
      localStorage?.setItem(
        "login",
        JSON.stringify({ token: loginResponse.token })
      );
      return navigate(state?.from ? state.from : "/");
    }

    setStatus(API_STATUS.ERROR);
    setErrorMessage(loginResponse.errorMessage);
  };

  const handleOnChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserDetails((prevState) => ({
        ...prevState,
        [field]: e.target.value,
      }));
    };

  const handleOnBlur = (field: string) => {
    setTouchedFields((prevState) => ({
      ...prevState,
      [field]: true,
    }));
  };
  const errors = validateLogin(userDetails.email, userDetails.password);

  const shouldShowErrors = (field: keyof LoginDetails) => {
    return errors[field] ? touchedFields[field] : false;
  };

  const getInputClassName = (field: keyof LoginDetails) => {
    return shouldShowErrors(field) ? "error-input-box" : "generic-input-box";
  };

  return {
    handleSubmit,
    handleOnChange,
    handleOnBlur,
    getInputClassName,
    status,
    shouldShowErrors,
    errorMessage,
    errors,
    isBtnDisabled,
  };
};
