import { useNavigate } from "react-router-dom";
import { Progress } from "../../pages/ProgressList/ProgressList.types";

export const ProgressListItem = ({ _id, numberOfAttempts, quiz }: Progress) => {
  const navigate = useNavigate();

  return (
    <div className="md:shadow-lg">
      <img
        src={quiz.thumbnail}
        className="object-cover h-full w-full md:w-70 md:h-60 "
      />
      <div className="flex items-center justify-between py-3 px-1">
        <div>
          <div className="font-semibold">{quiz.name}</div>
          <div className="text-gray-600">
            Number of Attempts {numberOfAttempts}
          </div>
        </div>

        <button
          className="bg-primary-color text-white px-2 py-1 rounded"
          onClick={() => {
            navigate(`/progress/${_id}`);
          }}
        >
          View Progress
        </button>
      </div>
    </div>
  );
};
