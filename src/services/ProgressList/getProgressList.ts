import axios, { AxiosError } from "axios";
import {
  ProgressList,
  ErrorMessage,
} from "../../pages/ProgressList/ProgressList.types";

export const getProgressList = async (token: string | null) => {
  try {
    const { data } = await axios.get<ProgressList>(
      "https://QuizApp.janaki23.repl.co/progress_list",
      {
        headers: {
          authorization: token,
        },
      }
    );

    return data.progressList.list;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverError = error as AxiosError<ErrorMessage>;
      if (serverError && serverError.response) {
        return serverError.response.data;
      }
    }
    return { success: false, errorMessage: error?.message as string };
  }
};
