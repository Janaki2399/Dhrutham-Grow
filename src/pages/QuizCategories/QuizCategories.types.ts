import React from "react"

export type QuizList = {
    quizList: Quiz[];
    success: Boolean;
}

export type Quiz = {
    _id: React.Key;
    name: String;
    thumbnail: string;
    numOfQuestions: Number;
}
export type QuizItemProps = {
    key: React.Key;
    item: Quiz

}

export type ErrorMessage = {
    success: Boolean,
    errorMessage: String
}