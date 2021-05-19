export type Question = {
  topic: String;
  question: String;
  points: number;
  level: String;
  options: Option[];
};
export type Option = {
  text: String;
  isRight: Boolean;
  isSelected: Boolean;
};
export type ErrorMessage = {
  success: Boolean;
  errorMessage: String;
};

export type state = {
  score: number;
};
