import { Question } from "../../context/data/data-context.types";
export type State = {
  questions: Question[];
};

export type ACTIONTYPE =
  | { type: "SET_DATA"; payload: { questions: Question[] } }
  | {
      type: "UPDATE_OPTION_STATE";
      payload: { optionIndex: number; questionIndex: number };
    };
