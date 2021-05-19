import React from "react";
import { BindingOrAssignmentElementRestIndicator } from "typescript";

export type Game = {
  _id: React.Key;
  game: {
    questions: Question[];
    totalScore: Number;
  };
};

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
