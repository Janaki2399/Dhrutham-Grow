import React from "react";

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
  points: Number;
  level: String;
  options: Option[];
};
export type Option = {
  text: String;
  isRight: Boolean;
};
