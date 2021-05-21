import { useEffect, useState } from "react";
import { CategoryItem } from "../../components/Category/CategoryItem";
import { Quiz, ErrorMessage } from "./QuizCategories.types";
import { getQuizList } from "../../services/QuizCategories/getQuizList";

export const QuizCategories = ({}): JSX.Element => {
  const [quizzes, setQuizzes] = useState<Quiz[] | null>(null);
  const [error, setError] = useState<ErrorMessage | null>(null);

  useEffect(() => {
    (async function () {
      const quiz = await getQuizList();
      if (Array.isArray(quiz)) {
        return setQuizzes(quiz);
      }
      setError(quiz);
    })();
  }, []);

  return (
    <div className="grid grid-flow-col grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1 md-grid-flow-row gap-10 m-12 mt-20">
      {quizzes &&
        quizzes.map((item) => {
          return <CategoryItem key={item._id} item={item} />;
        })}
    </div>
  );
};
