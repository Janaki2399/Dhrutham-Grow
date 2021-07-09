import { useEffect } from "react";
import { CategoryItem } from "../../components/Category/CategoryItem";
import { getQuizList } from "../../services/QuizCategories/getQuizList";
import { API_STATUS } from "../../constants";
import quizMcq from "../../assets/quizMcq.svg";
import { Loader } from "../../components/Loader";
import { useCategoryContext } from "../../context/category/category-context";

export const QuizCategories = (): JSX.Element => {
  const { categoryState, categoryDispatch } = useCategoryContext();

  useEffect(() => {
    (async function () {
      if (categoryState.status === API_STATUS.IDLE) {
        categoryDispatch({ type: "INITIALIZE_CATEGORIES_FETCH" });
        const quizResponse = await getQuizList();

        if (Array.isArray(quizResponse)) {
          return categoryDispatch({
            type: "SET_CATEGORIES",
            payload: { quizList: quizResponse },
          });
        }

        categoryDispatch({ type: "SET_ERROR_MESSAGE", payload: quizResponse });
      }
    })();
  }, [categoryDispatch, categoryState.status]);

  if (
    categoryState.status === API_STATUS.LOADING ||
    categoryState.status === API_STATUS.IDLE
  ) {
    return (
      <div className="center-page">
        <Loader />
      </div>
    );
  }

  // if (status === API_STATUS.ERROR) {
  //   return (
  //     <div className="flex items-center justify-center h-screen m-5">
  //       <div className="flex-col relative">
  //         <div className="">Something went wrong</div>
  //         <img
  //           className="relative"
  //           src={Error}
  //           alt="error"
  //           width="500"
  //           height="400"
  //         />
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="mt-14 bg-gray-100">
      <div className=" container mx-auto lg:h-128 lg:space-x-8 lg:flex lg:items-center">
        <div className="w-full text-center lg:text-left lg:w-1/2 lg:-mt-8">
          <div className="m-auto  md:mt-0 text-3xl lg:text-5xl font-semibold align-middle ">
            <div>Test your knowledge in Carnatic Music</div>
            <div className="text-gray-500 text-3xl lg:text-4xl">
              See your progress with each attempt
            </div>
          </div>
        </div>
        <div className="w-full mt-4 lg:w-1/2 lg:mt-0">
          <img src={quizMcq} alt="quiz mcq" />
        </div>
      </div>
      <div className="text-center text-3xl text-gray-800">
        Featured Categories
      </div>
      <div className="grid grid-flow-col grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1 md-grid-flow-row gap-2 0 m-12">
        {categoryState.quizList &&
          categoryState.quizList.map((item) => {
            return <CategoryItem key={item._id} item={item} />;
          })}
      </div>
    </div>
  );
};
