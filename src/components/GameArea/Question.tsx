import { useGameContext } from "../../context/data/data-context";
import { QuestionProps } from "../../pages/GameArea/GameArea.types";

export const Question = ({
  currentQuestionIndex,
}: QuestionProps): JSX.Element => {
  const {
    dataState: { questions },
  } = useGameContext();
  return (
    <div className="question">
      {questions.length > 0 && questions[currentQuestionIndex].question}
    </div>
  );
};
