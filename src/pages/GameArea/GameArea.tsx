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
import { useAuth } from "../../context/Auth/auth-context";
import axios from "axios";

export const GameArea = (): JSX.Element => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
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
      const response = await getGameQuestions(quizId, token);
      if ("questions" in response) {
        return dataDispatch({
          type: "SET_DATA",
          payload: response.questions,
        });
      }
      setError(response);
    })();
  }, [token]);

  const swipeToNextQuestion = () => {
    setTimeout(() => {
      dispatch({ type: "INCREMENT_QUESTION_NUMBER" });
    }, 500);
  };

  const navigateToScorePage = async () => {
    const { data, status } = await axios.post(
      `https://QuizApp.janaki23.repl.co/progress_list/${quizId}`,
      {
        score: state.score,
        numberOfCorrectAnswers: state.numberOfCorrectAnswers,
        numberOfWrongAnswers: state.numberOfWrongAnswers,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
    if (status === 200) {
      navigate(`/quiz/${quizId}/score`, {
        state: {
          score: state.score,
          numberOfCorrectAnswers: state.numberOfCorrectAnswers,
          numberOfWrongAnswers: state.numberOfWrongAnswers,
        },
      });
    }
  };

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-200 ">
        <div className="max-w-3xl border p-10 shadow-lg bg-white">
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
