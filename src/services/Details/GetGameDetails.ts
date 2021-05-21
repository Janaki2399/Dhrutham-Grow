import { Detail, ErrorMessage } from "../../pages/Details/Details.types";
import axios, { AxiosError } from "axios";

export const getGameDetails = async (quizId: String) => {
  try {
    const { data } = await axios.get<Detail>(
      `https://QuizApp.janaki23.repl.co/quiz/${quizId}/rules`
    );

    return data.details;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ErrorMessage>;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
    return { success: false, errorMessage: error.message as String };
  }
};