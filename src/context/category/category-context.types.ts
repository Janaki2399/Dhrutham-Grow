import { ReactNode } from "react";
import { API_STATUS } from "../../constants";
import { Quiz } from "../../pages/QuizCategories/QuizCategories.types";

export type ContextType = {
  categoryState: State;
  categoryDispatch: React.Dispatch<ACTIONTYPE>;
};

export type ChildrenProps = {
  children: ReactNode;
};

export type State = {
  quizList: Quiz[];
  status: API_STATUS;
  errorMessage: string;
};

export type ACTIONTYPE =
  | { type: "SET_CATEGORIES"; payload: { quizList: Quiz[] } }
  | {
      type: "INITIALIZE_CATEGORIES_FETCH";
    }
  | {
      type: "SET_ERROR_MESSAGE";
      payload: { errorMessage: string };
    };
