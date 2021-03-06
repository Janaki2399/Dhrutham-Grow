import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailItem } from "./Details.types";
import { useAuth } from "../../context/Auth/auth-context";
import { API_STATUS } from "../../constants";
import { Loader } from "../../components/Loader";
import { Error } from "../../components/Error";
import { getGameRules } from "../../services/Details/getGameRules";

export const Details = (): JSX.Element => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [details, setDetails] = useState<DetailItem | null>(null);
  const [status, setStatus] = useState<API_STATUS>(API_STATUS.IDLE);

  useEffect(() => {
    (async function () {
      setStatus(API_STATUS.LOADING);
      const details = await getGameRules(quizId, token);

      if ("rules" in details) {
        setStatus(API_STATUS.SUCCESS);
        return setDetails(details);
      }
      setStatus(API_STATUS.ERROR);
    })();
  }, [token, quizId]);

  if (status === API_STATUS.LOADING || status === API_STATUS.IDLE) {
    return (
      <div className="center-page">
        <Loader />
      </div>
    );
  }
  if (status === API_STATUS.ERROR) {
    return <Error />;
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
