import { API_STATUS } from "../../constants";
import {
  ACTIONTYPE,
  State,
} from "../../context/category/category-context.types";
import { categoryReducer } from "./categoryReducer";

describe("testing data reducer", () => {
  it("initializes the category fetch", () => {
    const initialState: State = {
      status: API_STATUS.IDLE,
      errorMessage: "",
      quizList: [],
    };

    const action: ACTIONTYPE = {
      type: "INITIALIZE_CATEGORIES_FETCH",
    };
    const state = categoryReducer(initialState, action);
    expect(state).toEqual({
      status: API_STATUS.LOADING,
      errorMessage: "",
      quizList: [],
    });
  });
  it("sets the category fetch error", () => {
    const initialState: State = {
      status: API_STATUS.IDLE,
      errorMessage: "",
      quizList: [],
    };

    const action: ACTIONTYPE = {
      type: "SET_ERROR_MESSAGE",
      payload: { errorMessage: "Something went wrong" },
    };

    const state = categoryReducer(initialState, action);
    expect(state).toEqual({
      status: API_STATUS.ERROR,
      errorMessage: "Something went wrong",
      quizList: [],
    });
  });
  it("sets the categories", () => {
    const initialState: State = {
      status: API_STATUS.IDLE,
      errorMessage: "",
      quizList: [],
    };

    const action: ACTIONTYPE = {
      type: "SET_CATEGORIES",
      payload: {
        quizList: [
          {
            _id: "12eewe34",
            name: "Carnatic Music",
            thumbnail: "https://img.png",
            numOfQuestions: 3,
          },
        ],
      },
    };

    const state = categoryReducer(initialState, action);
    expect(state).toEqual({
      status: API_STATUS.SUCCESS,
      errorMessage: "",
      quizList: [
        {
          _id: "12eewe34",
          name: "Carnatic Music",
          thumbnail: "https://img.png",
          numOfQuestions: 3,
        },
      ],
    });
  });
});
