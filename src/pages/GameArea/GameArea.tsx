import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ErrorMessage } from "../QuizCategories/QuizCategories.types";
import { useGameContext } from "../../context/game-context";
import { Game, Option } from "./GameArea.types";

import axios, { AxiosError } from "axios";

export const GameArea = () => {
  const { quizId } = useParams();
  const [error, setError] = useState<ErrorMessage>();
  const [isCorrectAnswer, setAnswerFlag] = useState<Boolean | null>(null);
  //   const [loading, isLoading] = useState(true);
  const {
    state: { questions, currentQuestionIndex, score },
    dispatch,
  } = useGameContext();
  useEffect(() => {
    (async function () {
      try {
        // isLoading(true);
        const { data, status } = await axios.get<Game>(
          `https://QuizApp.janaki23.repl.co/quiz/${quizId}/play`
        );

        if (status === 200) {
          // console.log(data.game.questions[0]);

          dispatch({
            type: "SET_GAME",
            payload: data.game.questions,
          });
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

  const checkAnswer = (item: Option) => {
    if (item.isRight) {
      return setAnswerFlag(true);
    }
    setAnswerFlag(false);
  };
  return (
    <>
      <div className="flex items-center justify-center h-screen ">
        <div className="max-w-2xl border p-10 bg-gray-200">
          <div className="flex justify-between">
            <div>Question {currentQuestionIndex + 1}</div>
            <div>Score : {score}</div>
          </div>
          <div>
            {questions.length > 0 && questions[currentQuestionIndex].question}
          </div>
          <div>
            {questions.length > 0 &&
              questions[currentQuestionIndex].options.map((item) => (
                <div
                  className={
                    isCorrectAnswer
                      ? "bg-green-700 border"
                      : "bg-red-600 border"
                  }
                  onClick={() => {
                    checkAnswer(item);
                  }}
                >
                  {item.text}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
