import { useState, useEffect } from "react";
import { Game } from "../GameArea/GameArea.types";
import { ErrorMessage, Question, Option, state } from "./Score.types";
import axios, { AxiosError } from "axios";
import { useLocation, useParams } from "react-router";
import { useGameContext } from "../../context/game-context";

export const Score = () => {
  const { quizId } = useParams();
  const { state } = useLocation();
  const { dataState, dataDispatch } = useGameContext();
  //   const [questions, setQuestions] = useState<Question[] | null>(null);
  const [error, setError] = useState<ErrorMessage>();
  //   useEffect(() => {
  //     (async function () {
  //       try {
  //         // isLoading(true);
  //         const { data, status } = await axios.get<Game>(
  //           `https://QuizApp.janaki23.repl.co/quiz/${quizId}/play`
  //         );

  //         if (status === 200) {
  //           setQuestions(data.game.questions);
  //         }
  //       } catch (error) {
  //         if (axios.isAxiosError(error)) {
  //           const serverError = error as AxiosError<ErrorMessage>;
  //           if (serverError && serverError.response) {
  //             return setError(serverError.response.data);
  //           }
  //         }
  //         setError({ success: false, errorMessage: error.message });
  //       }
  //     })();
  //   }, []);
  function setColor(item: Option): string {
    if (item.isRight) {
      return "bg-green-700 border";
    }
    if (item.isSelected && !item.isRight) {
      return "bg-red-600 border";
    }
    return "border";
  }
  return (
    <div>
      <div>
        {/* <div>Score {state?.score}</div> */}
        {dataState.questions?.map((item: Question) => {
          return (
            <div>
              <div>{item.question}</div>
              <div>
                {item.options.map((option) => {
                  return <div className={setColor(option)}>{option.text}</div>;
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
function useDataContext(): { dataState: any } {
  throw new Error("Function not implemented.");
}
