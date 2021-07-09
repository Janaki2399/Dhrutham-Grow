import React from "react";

export type Progress = {
  progress: ScoreDetails;
  success: boolean;
};

export type ScoreDetails = {
  attemptDetails: Attempts[];
  _id: React.Key;
  quiz: string;
  numberOfAttempts: number;
  highestScore: number;
};

export type Attempts = {
  _id: React.Key;
  score: number;
  numberOfCorrectAnswers: number;
  numberOfWrongAnswers: number;
};

export type ErrorMessage = {
  success: boolean;
  errorMessage: string;
};
