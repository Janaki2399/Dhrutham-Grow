import { useNavigate } from "react-router-dom";
import { QuizItemProps } from "../../pages/QuizCategories/QuizCategories.types";

export const CategoryItem = ({ item }: QuizItemProps): JSX.Element => {
  const navigate = useNavigate();
  return (
    <div
      className="md:shadow-lg cursor-pointer"
      onClick={() => {
        navigate(`/quiz/${item._id}/rules`);
      }}
    >
      <img
        src={item.thumbnail}
        className="object-cover h-full w-full md:w-70 md:h-60 "
        alt="thumbnail"
      />
      <div className="flex justify-between py-3 px-1">
        <div className="font-semibold">{item.name}</div>
        <div className="text-gray-600">{item.numOfQuestions} questions</div>
      </div>
    </div>
  );
};
