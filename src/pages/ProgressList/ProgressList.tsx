import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth/auth-context";
import { getProgressList } from "../../services/ProgressList/getProgressList";
import { ErrorMessage, Progress } from "./ProgressList.types";
import { ProgressListItem } from "../../components/ProgressList/ProgressListItem";

export const ProgressList = () => {
  const [progressList, setProgressList] = useState<Progress[] | null>(null);
  console.log(progressList);
  const [error, setError] = useState<ErrorMessage | null>(null);

  const { token } = useAuth();
  useEffect(() => {
    (async function () {
      const progressList = await getProgressList(token);
      if (Array.isArray(progressList)) {
        return setProgressList(progressList);
      }
      setError(progressList);
    })();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen m-5">
      <div>
        <div className="text-center text-3xl font-semibold text-primary-color">
          Completed Quizzes
        </div>
        <div className="grid grid-flow-col grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1 md-grid-flow-row gap-10 m-12 mt-20 place-content-center">
          {progressList?.map((item) => {
            return (
              <ProgressListItem
                key={item._id}
                _id={item._id}
                numberOfAttempts={item.numberOfAttempts}
                quiz={item.quiz}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
