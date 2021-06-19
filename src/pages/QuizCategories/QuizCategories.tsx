import { useEffect, useState } from "react";
import { CategoryItem } from "../../components/Category/CategoryItem";
import { Quiz, ErrorMessage } from "./QuizCategories.types";
import { getQuizList } from "../../services/QuizCategories/getQuizList";
import { APIStatus } from "../../constants";
import { Loader } from "../../components/Loader";

import Error from "../../assets/error.svg";

export const QuizCategories = (): JSX.Element => {
  const [quizzes, setQuizzes] = useState<Quiz[] | null>(null);
  const [status, setStatus] = useState<APIStatus>(APIStatus.IDLE);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage | null>(null);

  useEffect(() => {
    (async function () {
      setStatus(APIStatus.LOADING);
      const quiz = await getQuizList();
      if (Array.isArray(quiz)) {
        setStatus(APIStatus.SUCCESS);
        return setQuizzes(quiz);
      }
      setStatus(APIStatus.ERROR);
      setErrorMessage(quiz);
    })();
  }, []);

  if (status === APIStatus.LOADING || status === APIStatus.IDLE) {
    return <Loader />;
  }

  if (status === APIStatus.ERROR) {
    return (
      <div className="flex items-center justify-center h-screen m-5">
        <div className="flex-col relative">
          <div className="">Something went wrong</div>
          <img
            className="relative"
            src={Error}
            alt="error"
            width="500"
            height="400"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-flow-col grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1 md-grid-flow-row gap-10 m-12 mt-20">
      {quizzes &&
        quizzes.map((item) => {
          return <CategoryItem key={item._id} item={item} />;
        })}
    </div>
  );
};
