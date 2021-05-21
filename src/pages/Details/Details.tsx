import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ErrorMessage } from "../QuizCategories/QuizCategories.types";
import { Detail, DetailItem } from "./Details.types";
import { getGameDetails } from "../../services/Details/GetGameDetails";

export const Details = (): JSX.Element => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState<DetailItem | null>(null);
  const [error, setError] = useState<ErrorMessage | null>(null);

  useEffect(() => {
    (async function () {
      const details = await getGameDetails(quizId);

      if ("rules" in details) {
        return setDetails(details);
      }
      setError(details);
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
                className="action-btn"
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
