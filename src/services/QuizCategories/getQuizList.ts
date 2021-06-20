import axios, { AxiosError } from "axios";
import { API_URL } from "../../config";
import {
  QuizList,
  ErrorMessage,
} from "../../pages/QuizCategories/QuizCategories.types";

export const getQuizList = async () => {
  try {
    const { data } = await axios.get<QuizList>(`${API_URL}/quiz`);

    return data.quizList;
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
