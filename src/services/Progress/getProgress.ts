import axios, { AxiosError } from "axios";
import { Progress, ErrorMessage } from "../../pages/Progress/Progress.types";

export const getProgress = async (progessId: string, token: string | null) => {
  try {
    const { data } = await axios.get<Progress>(
      `https://QuizApp.janaki23.repl.co/progress/${progessId}`,
      {
        headers: {
          authorization: token,
        },
      }
    );

    return data.progress;
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
