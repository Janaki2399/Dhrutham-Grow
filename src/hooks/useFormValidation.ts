import React, { useState } from "react";
import { ErrorPartial } from "../pages/SignUp/SignUp.types";
import { LoginDetails } from "../pages/Login/Login.types";
import { SignUpDetails } from "../pages/SignUp/SignUp.types";

export const useFormValidation = () => {
  function validateSignUp({
    firstName,
    lastName,
    email,
    password,
  }: SignUpDetails) {
    let error: ErrorPartial = {};
    if (firstName.length === 0) {
      error.firstName = "First Name cannot be empty";
    }
    if (lastName.length === 0) {
      error.lastName = "First Name cannot be empty";
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      error.email = "Please enter a valid email address";
    }
    if (password.length < 6) {
      error.password = "Password must be atleast 6 characters";
    }
    return error;
  }

  const validateLogin = (email: string, password: string) => {
    let error: ErrorPartial = {};

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      error.email = "Please enter a valid email address";
    }
    if (password.length < 6) {
      error.password = "Password must be atleast 6 characters";
    }
    return error;
  };
  const isBtnDisabled = (errors: ErrorPartial) => {
    if (Object.keys(errors).length === 0) {
      return false;
    }
    return true;
  };
  return {
    validateSignUp,
    validateLogin,
    isBtnDisabled,
  };
};
