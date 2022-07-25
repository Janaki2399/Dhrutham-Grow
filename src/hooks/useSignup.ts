import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/auth-context";
import { useFormValidation } from "../hooks/useFormValidation";
import { SignUpDetails } from "../pages/SignUp/SignUp.types";
import { API_STATUS } from "../constants";
import { signup } from "../services/SignUp/signup";

export const useSignup = () => {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [status, setStatus] = useState(API_STATUS.IDLE);
  const [errorMessage, setErrorMessage] = useState("");
  const [touchedFields, setTouchedFields] = useState<Partial<SignUpDetails>>(
    {}
  );

  const { validateSignUp, isBtnDisabled } = useFormValidation();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus(API_STATUS.LOADING);
    const signUpResponse = await signup(userDetails);

    if ("token" in signUpResponse) {
      setStatus(API_STATUS.SUCCESS);
      setToken(signUpResponse.token);
      localStorage?.setItem(
        "login",
        JSON.stringify({ token: signUpResponse.token })
      );
      return navigate("/");
    }

    setStatus(API_STATUS.ERROR);
    setErrorMessage(signUpResponse.errorMessage);
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

  const errors = validateSignUp(userDetails);

  const shouldShowErrors = (field: keyof SignUpDetails) => {
    return errors[field] ? touchedFields[field] : false;
  };

  const getInputClassName = (field: keyof SignUpDetails) => {
    return shouldShowErrors(field) ? "error-input-box" : "generic-input-box";
  };

  return {
    handleSignUp,
    handleOnChange,
    handleOnBlur,
    errors,
    shouldShowErrors,
    getInputClassName,
    status,
    isBtnDisabled,
    errorMessage,
  };
};
