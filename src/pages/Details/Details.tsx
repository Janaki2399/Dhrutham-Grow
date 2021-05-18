import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ErrorMessage } from "../QuizCategories/QuizCategories.types";
import { Detail, DetailItem } from "./Details.types";
import axios, { AxiosError } from "axios";
export const Details = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState<DetailItem>();
  const [error, setError] = useState<ErrorMessage>();
  useEffect(() => {
    (async function () {
      try {
        const { data, status } = await axios.get<Detail>(
          `https://QuizApp.janaki23.repl.co/quiz/${quizId}/rules`
        );

        if (status === 200) {
          setDetails(data.details);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const serverError = error as AxiosError<ErrorMessage>;
          if (serverError && serverError.response) {
            return setError(serverError.response.data);
          }
        }
        setError({ success: false, errorMessage: error.message });
      }
    })();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-full ">
      <div className="max-w-2xl border p-10 bg-gray-200">
        <div>
          <div className="text-center font-bold mb-3 text-lg">RULES</div>
          <div className="">{details?.rules}</div>
          <div className="flex justify-between mt-4">
            <div className="text-primary-color font-semibold">
              Playtime : {details?.playtime}
            </div>
            <div>
              <button
                className="py-2 px-8 font-semibold md:text-white rounded-md bg-primary-color text-white"
                onClick={() => navigate(`/quiz/${quizId}/play`)}
              >
                Start
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
