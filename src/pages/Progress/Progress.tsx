import { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth/auth-context";
import { ErrorMessage, ScoreDetails } from "./Progress.types";
import { getProgress } from "../../services/Progress/getProgress";
import { useParams } from "react-router";
export const Progress = () => {
  const [progress, setProgress] = useState<ScoreDetails | null>(null);
  const { progressId } = useParams();
  const [error, setError] = useState<ErrorMessage | null>(null);

  const { token } = useAuth();
  useEffect(() => {
    (async function () {
      const progress = await getProgress(progressId, token);
      if ("highestScore" in progress) {
        return setProgress(progress);
      }
      setError(progress);
    })();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen m-5">
      <div className="max-w-6xl ">
        <div className="text-center">
          <div className="text-xl">Your Highest Score </div>
          <div className="rounded-full h-24 w-24 flex items-center justify-center m-auto border text-3xl my-5 text-primary-color bg-gray-300">
            {progress?.highestScore}
          </div>
          <div className="text-xl">
            Number Of Attempts :{" "}
            <span className="font-bold"> {progress?.numberOfAttempts}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-6 place-content-center mt-5">
          {progress?.attemptDetails.map((item, index) => {
            return (
              <div className="border border-gray-300 pr-12 pl-5 py-3 bg-gray-300">
                <div className="text-center">Attempt {index + 1}</div>
                <div className="font-semibold text-lg">
                  Score : {item.score}
                </div>
                <div>
                  Number of Correct Answers :{" "}
                  <span className="font-semibold">
                    {item.numberOfCorrectAnswers}
                  </span>{" "}
                </div>
                <div>
                  Number of Wrong Answers :{" "}
                  <span className="font-semibold">
                    {item.numberOfWrongAnswers}
                  </span>{" "}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
