import { useEffect, useState, useReducer } from "react";
import { gameReducer } from "./Reducer/gameReducer";
import { Navigate, Route, useNavigate, useParams } from "react-router-dom";
import { ErrorMessage } from "../QuizCategories/QuizCategories.types";
import { useGameContext } from "../../context/game-context";
import { Options } from "../../components/GameArea/Options";
import { Header } from "../../components/GameArea/Header";
import { ActionButton } from "../../components/GameArea/ActionButton";
import { Question } from "../../components/GameArea/Question";
import { getGameQuestions } from "../../services/GameArea/GameArea";

export const GameArea = (): JSX.Element => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<ErrorMessage | null>(null);
  const [loading, setLoading] = useState(false);
  const { dataDispatch } = useGameContext();
  const [state, dispatch] = useReducer(gameReducer, {
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    numberOfCorrectAnswers: 0,
    numberOfWrongAnswers: 0,
  });

  useEffect(() => {
    (async function () {
      const response = await getGameQuestions(quizId);
      if ("questions" in response) {
        return dataDispatch({
          type: "SET_DATA",
          payload: response.questions,
        });
      }
      setError(response);
    })();
  }, []);

  const swipeToNextQuestion = () => {
    setTimeout(() => {
      dispatch({ type: "INCREMENT_QUESTION_NUMBER" });
    }, 500);
  };

  const navigateToScorePage = () => {
    setTimeout(
      () =>
        navigate(`/quiz/${quizId}/score`, {
          state: {
            score: state.score,
            numberOfCorrectAnswers: state.numberOfCorrectAnswers,
            numberOfWrongAnswers: state.numberOfWrongAnswers,
          },
        }),
      1000
    );
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen ">
        <div className="max-w-3xl border p-10 shadow-lg">
          <Header
            score={state.score}
            currentQuestionIndex={state.currentQuestionIndex}
          />
          <Question currentQuestionIndex={state.currentQuestionIndex} />
          <Options
            state={state}
            dispatch={dispatch}
            swipeToNextQuestion={swipeToNextQuestion}
          />
          <ActionButton
            swipeToNextQuestion={swipeToNextQuestion}
            navigateToScorePage={navigateToScorePage}
            currentQuestionIndex={state.currentQuestionIndex}
          />
        </div>
      </div>
    </>
  );
};
