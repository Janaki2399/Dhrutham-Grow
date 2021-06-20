import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth/auth-context";
import { getProgressList } from "../../services/ProgressList/getProgressList";
import { ErrorMessage, Progress } from "./ProgressList.types";
import { APIStatus } from "../../constants";
import { Loader } from "../../components/Loader";
import { ProgressListItem } from "../../components/ProgressList/ProgressListItem";

export const ProgressList = () => {
  const [progressList, setProgressList] = useState<Progress[] | null>(null);
  const [status, setStatus] = useState<APIStatus>(APIStatus.IDLE);
  const [error, setError] = useState<ErrorMessage | null>(null);

  const { token } = useAuth();
  useEffect(() => {
    (async function () {
      setStatus(APIStatus.LOADING);
      const progressList = await getProgressList(token);
      if (Array.isArray(progressList)) {
        setStatus(APIStatus.SUCCESS);
        return setProgressList(progressList);
      }
      setStatus(APIStatus.ERROR);
      setError(progressList);
    })();
  }, [token]);

  if (status === APIStatus.LOADING || status === APIStatus.IDLE) {
    return <Loader />;
  }
  return (
    <div>
      <div className="text-center text-3xl font-semibold text-primary-color">
        Completed Quizzes
      </div>
      <div className="grid grid-flow-col grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1 md-grid-flow-row gap-10 m-12 mt-20 place-content-center">
        {progressList?.map(({ _id, numberOfAttempts, quiz }) => {
          return (
            <ProgressListItem
              key={_id}
              _id={_id}
              numberOfAttempts={numberOfAttempts}
              quiz={quiz}
            />
          );
        })}
      </div>
    </div>
  );
};
