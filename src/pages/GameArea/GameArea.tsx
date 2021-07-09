import { useEffect, useState, useReducer } from "react";
import { gameReducer, initialState } from "../../reducers/game/gameReducer";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorMessage } from "../QuizCategories/QuizCategories.types";
import { useGameContext } from "../../context/data/data-context";
import { Options } from "../../components/GameArea/Options";
import { Header } from "../../components/GameArea/Header";
import { ActionButton } from "../../components/GameArea/ActionButton";
import { Question } from "../../components/GameArea/Question";
import { getGameQuestions } from "../../services/GameArea/getQuestions";
import { useAuth } from "../../context/Auth/auth-context";
import { API_URL } from "../../constants";
import { API_STATUS } from "../../constants";
import { Error } from "../../components/Error";
import { Loader } from "../../components/Loader";
import axios from "axios";

export const GameArea = (): JSX.Element => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [status, setStatus] = useState<API_STATUS>(API_STATUS.IDLE);
  const { dataDispatch } = useGameContext();

  const [state, dispatch] = useReducer(gameReducer, initialState);

  useEffect(() => {
    (async function () {
      setStatus(API_STATUS.LOADING);
      const response = await getGameQuestions(quizId, token);

      if ("questions" in response) {
        setStatus(API_STATUS.SUCCESS);
        return dataDispatch({
          type: "SET_DATA",
          payload: { questions: response.questions },
        });
      }
      setStatus(API_STATUS.ERROR);
    })();
  }, [token, quizId, dataDispatch]);

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

  const swipeToNextQuestion = () => {
    setTimeout(() => {
      dispatch({ type: "INCREMENT_QUESTION_NUMBER" });
    }, 500);
  };

  const navigateToScorePage = async () => {
    const { status } = await axios.post(
      `${API_URL}/progress_list/${quizId}`,
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
