import axios, { AxiosError } from "axios";
import { ErrorMessage, Game } from "../../pages/GameArea/GameArea.types";

export const getGameQuestions = async (quizId: String) => {
  try {
    const { data } = await axios.get<Game>(
      `https://QuizApp.janaki23.repl.co/quiz/${quizId}/play`
    );
    return data.game;
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
