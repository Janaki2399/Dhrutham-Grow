import { useGameContext } from "../../context/game-context";
import { OptionItemProps } from "../../pages/GameArea/GameArea.types";

export const OptionItem = ({
  isRight,
  isSelected,
  text,
  index,
  currentQuestionIndex,
  dispatch,
  swipeToNextQuestion,
}: OptionItemProps): JSX.Element => {
  const {
    dataState: { questions },
    dataDispatch,
  } = useGameContext();

  function setOptionStyle(
    isOptionSelected: Boolean,
    isOptionRight: Boolean
  ): string {
    if (isOptionSelected && isOptionRight) {
      return "option-btn option-correct";
    } else if (isOptionSelected && !isOptionRight) {
      return "option-btn option-wrong";
    }
    return "option-btn option-unselected";
  }

  function updateScore(isRight: Boolean) {
    if (isRight) {
      dispatch({
        type: "INCREMENT_SCORE",
        payload: {
          points: questions[currentQuestionIndex].points,
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

  return (
    <div>
      <button
        disabled={questions[currentQuestionIndex]?.isAttempted}
        className={setOptionStyle(isSelected, isRight)}
        onClick={() => {
          dataDispatch({
            type: "UPDATE_OPTION_STATE",
            payload: {
              optionIndex: index,
              questionIndex: currentQuestionIndex,
            },
          });

          updateScore(isRight);
          if (currentQuestionIndex < questions.length - 1) {
            swipeToNextQuestion();
          }
        }}
      >
        {text}
      </button>
    </div>
  );
};
