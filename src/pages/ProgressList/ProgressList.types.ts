import React from "react";

export type ProgressList = {
  progressList: {
    list: Progress[];
  };
  _id: React.Key;
  success: boolean;
};

export type Progress = {
  _id: React.Key;
  numberOfAttempts: number;
  quiz: {
    _id: React.Key;
    name: string;
    thumbnail: string;
  };
};

export type ErrorMessage = {
  success: boolean;
  errorMessage: string;
};
