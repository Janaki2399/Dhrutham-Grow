import { Option } from "../../context/data/data-context.types";

export type ErrorMessage = {
  success: Boolean;
  errorMessage: String;
};

export type OptionsProps = {
  options: Option[];
};

export type ScoreType = {
  score: number;
  numberOfCorrectAnswers: number;
  numberOfWrongAnswers: number;
};
