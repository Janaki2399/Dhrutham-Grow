import { API_STATUS } from "../../constants";
import {
  State,
  ACTIONTYPE,
} from "../../context/category/category-context.types";

export function categoryReducer(state: State, action: ACTIONTYPE) {
  switch (action.type) {
    case "INITIALIZE_CATEGORIES_FETCH":
      return {
        ...state,
        status: API_STATUS.LOADING,
      };

    case "SET_CATEGORIES":
      return {
        ...state,
        status: API_STATUS.SUCCESS,
        quizList: action.payload.quizList,
      };

    case "SET_ERROR_MESSAGE":
      return {
        ...state,
        status: API_STATUS.ERROR,
        errorMessage: action.payload.errorMessage,
      };

    default:
      return state;
  }
}
