import { useEffect, useState, useReducer } from "react";
import { gameReducer } from "./gameReducer";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ErrorMessage } from "../QuizCategories/QuizCategories.types";
import { useGameContext } from "../../context/game-context";
import { Game, Option } from "./GameArea.types";

import axios, { AxiosError } from "axios";
import { type } from "os";

export const GameArea = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState<ErrorMessage>();
  const [selectedIndex, setSelectedIndex] = useState<Number | null>(null);
  const { dataState, dataDispatch } = useGameContext();
  const [state, dispatch] = useReducer(gameReducer, {
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    numberOfCorrectAnswers: 0,
    numberOfWrongAnswers: 0,
  });
  //   const [isCorrectAnswer, setAnswerFlag] = useState<Boolean | null>(null);
  //   const [loading, isLoading] = useState(true);
  //   const {
  //     state: { questions, currentQuestionIndex, score },
  //     dispatch,
  //   } = useGameContext();
  useEffect(() => {
    (async function () {
      try {
        // isLoading(true);
        const { data, status } = await axios.get<Game>(
          `https://QuizApp.janaki23.repl.co/quiz/${quizId}/play`
        );

        if (status === 200) {
          dataDispatch({
            type: "SET_DATA",
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

  function setColor(item: Option): string {
    if (item.isSelected && item.isRight) {
      return "bg-green-700 border";
    } else if (item.isSelected && !item.isRight) {
      return "bg-red-600 border";
    }
    return "border";
  }

  function updateScore(item: Option) {
    if (item.isRight) {
      dispatch({
        type: "INCREMENT_SCORE",
        payload: {
          points: dataState.questions[state.currentQuestionIndex].points,
        },
      });
      dispatch({
        type: "INCREMENT_CORRECT_ANSWER_COUNT",
      });
    } else {
      dispatch({
        type: "INCREMENT_WRONG_ANSWER_COUNT",
      });
    }
  }

  function swipeToNextQuestion() {
    setTimeout(() => {
      dispatch({ type: "INCREMENT_QUESTION_NUMBER" });
      setSelectedIndex(null);
    }, 500);
  }

  function navigateToScorePage() {
    setTimeout(() => {
      navigate(`/quiz/${quizId}/score`, {
        state: { score: state.score, isDone: true },
      });
    }, 500);
  }
  return (
    <>
      <div className="flex items-center justify-center h-screen ">
        <div className="max-w-2xl border p-10 bg-gray-200">
          <div className="flex justify-between">
            <div>Question {state.currentQuestionIndex + 1}</div>
            <div>Score : {state.score}</div>
          </div>
          <div>
            {dataState.questions.length > 0 &&
              dataState.questions[state.currentQuestionIndex].question}
          </div>
          <div>
            {dataState.questions.length > 0 &&
              dataState.questions[state.currentQuestionIndex].options.map(
                (item, index) => (
                  <div
                    className={setColor(item)}
                    onClick={() => {
                      //   setSelectedIndex(index);
                      dataDispatch({
                        type: "UPDATE_OPTION_STATE",
                        payload: {
                          optionIndex: index,
                          questionIndex: state.currentQuestionIndex,
                        },
                      });
                      updateScore(item);

                      if (
                        state.currentQuestionIndex <
                        dataState.questions.length - 1
                      ) {
                        swipeToNextQuestion();
                      } else {
                        navigateToScorePage();
                      }
                    }}
                  >
                    {item.text}
                  </div>
                )
              )}
          </div>
          <div
            onClick={() => {
              swipeToNextQuestion();
            }}
          >
            Skip
          </div>
        </div>
      </div>
    </>
  );
};
