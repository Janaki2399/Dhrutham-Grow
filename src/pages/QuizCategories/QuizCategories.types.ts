import React from "react";

export type QuizList = {
  quizList: Quiz[];
  success: boolean;
};

export type Quiz = {
  _id: React.Key;
  name: string;
  thumbnail: string;
  numOfQuestions: number;
};

export type QuizItemProps = {
  key: React.Key;
  item: Quiz;
};

export type ErrorMessage = {
  success: boolean;
  errorMessage: string;
};
