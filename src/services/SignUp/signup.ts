import axios, { AxiosError } from "axios";
import {
  SignUpDetails,
  ErrorMessage,
  SignUpResponse,
} from "../../pages/SignUp/SignUp.types";
import { API_URL } from "../../constants";

export const signup = async (userDetails: SignUpDetails) => {
  try {
    const { data } = await axios.post<SignUpResponse>(
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
