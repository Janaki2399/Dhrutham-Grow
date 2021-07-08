import React, { createContext, Reducer, useContext, useReducer } from "react";
import { API_STATUS } from "../../constants";
import { categoryReducer } from "../../reducers/categories/categoryReducer";
import { ChildrenProps, ContextType } from "./category-context.types";

const CategoryContext = createContext<ContextType>({} as ContextType);

export const CategoryProvider = ({ children }: ChildrenProps) => {
  const [categoryState, categoryDispatch] = useReducer(categoryReducer, {
    quizList: [],
    status: API_STATUS.IDLE,
    errorMessage: "",
  });

  return (
    <CategoryContext.Provider value={{ categoryState, categoryDispatch }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategoryContext = () => {
  return useContext(CategoryContext);
};
