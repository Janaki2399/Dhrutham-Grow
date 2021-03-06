import { Detail, ErrorMessage } from "../../pages/Details/Details.types";
import axios, { AxiosError } from "axios";
import { API_URL } from "../../constants";

export const getGameRules = async (quizId: string, token: string | null) => {
  try {
    const { data } = await axios.get<Detail>(
      `${API_URL}/quiz/${quizId}/rules`,
      {
        headers: {
          authorization: token,
        },
      }
    );

    return data.details;
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
