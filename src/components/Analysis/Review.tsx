import { useGameContext } from "../../context/data/data-context";
import { Options } from "./Options";

export const Review = () => {
  const {
    dataState: { questions },
  } = useGameContext();

  return (
    <div className="grid grid-cols-1 grid-flow-row">
      {questions?.map(({ _id, question, options, isAttempted }, index) => {
        return (
          <div className="border mt-10" key={_id}>
            <div className="question">
              Q{index + 1} {question}{" "}
              <span className="text-black text-base float-right mr-4 bg-red-100 px-2 rounded-lg">
                {!isAttempted && "Skipped"}
              </span>
            </div>
            <Options options={options} />
          </div>
        );
      })}
    </div>
  );
};
