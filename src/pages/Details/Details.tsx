import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ErrorMessage } from "../QuizCategories/QuizCategories.types";
import { Detail, DetailItem } from "./Details.types";
import { useAuth } from "../../context/Auth/auth-context";
import { APIStatus } from "../../constants";
import { Loader } from "../../components/Loader";
import { getGameDetails } from "../../services/Details/getGameDetails";

export const Details = (): JSX.Element => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [details, setDetails] = useState<DetailItem | null>(null);
  const [status, setStatus] = useState<APIStatus>(APIStatus.IDLE);
  const [error, setError] = useState<ErrorMessage | null>(null);

  useEffect(() => {
    (async function () {
      setStatus(APIStatus.LOADING);
      const details = await getGameDetails(quizId, token);

      if ("rules" in details) {
        setStatus(APIStatus.SUCCESS);
        return setDetails(details);
      }
      setStatus(APIStatus.ERROR);
      setError(details);
    })();
  }, [token, quizId]);

  if (status === APIStatus.LOADING || status === APIStatus.IDLE) {
    return <Loader />;
  }

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
