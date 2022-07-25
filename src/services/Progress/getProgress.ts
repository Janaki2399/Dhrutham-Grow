import axios, { AxiosError } from "axios";
import { Progress, ErrorMessage } from "../../pages/Progress/Progress.types";
import { API_URL } from "../../constants";

export const getProgress = async (progessId: string, token: string | null) => {
  try {
    const { data } = await axios.get<Progress>(
      `${API_URL}/progress/${progessId}`,
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
    return { success: false, errorMessage: "Something went wrong" };
  }
};
