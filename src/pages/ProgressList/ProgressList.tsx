import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth/auth-context";
import { getProgressList } from "../../services/ProgressList/getProgressList";
import { ErrorMessage, Progress } from "./ProgressList.types";
import { API_STATUS } from "../../constants";
import { Loader } from "../../components/Loader";
import { Error } from "../../components/Error";
import { ProgressListItem } from "../../components/ProgressList/ProgressListItem";

export const ProgressList = () => {
  const [progressList, setProgressList] = useState<Progress[] | null>(null);
  const [status, setStatus] = useState<API_STATUS>(API_STATUS.IDLE);

  const { token } = useAuth();
  useEffect(() => {
    (async function () {
      setStatus(API_STATUS.LOADING);
      const progressList = await getProgressList(token);

      if (Array.isArray(progressList)) {
        setStatus(API_STATUS.SUCCESS);
        return setProgressList(progressList);
      }

      setStatus(API_STATUS.ERROR);
    })();
  }, [token]);

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
    <div>
      <div className="text-center text-3xl font-semibold text-primary-color">
        Completed Quizzes
      </div>
      <div className="grid grid-flow-row grid-cols-1 md:grid-cols-3 md:grid-rows-1 md-grid-flow-row gap-20 m-12 mt-10 md:mt-20 place-content-center">
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
