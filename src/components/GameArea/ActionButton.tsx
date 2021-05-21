import { useGameContext } from "../../context/game-context";
import { SkipButtonProps } from "../../pages/GameArea/GameArea.types";

export const ActionButton = ({
  swipeToNextQuestion,
  navigateToScorePage,
  currentQuestionIndex,
}: SkipButtonProps): JSX.Element => {
  const {
    dataState: { questions },
  } = useGameContext();

  return (
    <>
      <button
        className="action-btn"
        onClick={() => {
          currentQuestionIndex < questions.length - 1
            ? swipeToNextQuestion()
            : navigateToScorePage();
        }}
      >
        {currentQuestionIndex < questions.length - 1 ? "Skip" : "Finish"}
      </button>
    </>
  );
};
