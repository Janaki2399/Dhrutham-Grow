import { useEffect, useState } from "react";
import { CategoryItem } from "../../components/Category/CategoryItem";
import { QuizList } from "./QuizCategories.types";
import { Quiz, ErrorMessage } from "./QuizCategories.types";

import axios, { AxiosError } from "axios";

export const QuizCategories = ({ }) => {
    const [quizzes, setQuizzes] = useState<Quiz[]>();
    const [error, setError] = useState<ErrorMessage>();
    useEffect(
        () => {
            (
                async function () {
                    try {
                        const { data, status } = await axios.get<QuizList>("https://QuizApp.janaki23.repl.co/quiz");
                        if (status === 200) {
                            setQuizzes(data.quizList);
                        }
                    }
                    catch (error) {
                        if (axios.isAxiosError(error)) {
                            const serverError = error as AxiosError<ErrorMessage>
                            if (serverError && serverError.response) {
                                return setError(serverError.response.data);
                            }
                        }
                        setError({ success: false, errorMessage: error.message })
                    }
                }
            )()
        }, []
    )

    return (
        <div className="grid grid-flow-col grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1 md-grid-flow-row gap-10 m-12 mt-20">
            {quizzes &&
                quizzes.map((item) => {
                    return <CategoryItem key={item._id} item={item} />
                })
            }
        </div>
    )
}