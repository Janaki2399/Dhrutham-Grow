import axios, { AxiosError } from "axios";
import {
  LoginResponse,
  ErrorMessage,
  LoginDetails,
} from "../../pages/Login/Login.types";
import { API_URL } from "../../constants";

export const login = async (userDetails: LoginDetails) => {
  try {
    const { data } = await axios.post<LoginResponse>(
      `${API_URL}/login`,
      userDetails
    );

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ErrorMessage>;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
    return { success: false, errorMessage: "Something went wrong" };
  }
};
