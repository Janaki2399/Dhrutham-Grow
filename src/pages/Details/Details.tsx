import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ErrorMessage } from "../QuizCategories/QuizCategories.types";
import { Detail, DetailItem } from "./Details.types";
import axios, { AxiosError } from "axios";
export const Details = () => {
    const { quizId } = useParams();
    console.log(quizId);
    const [details, setDetails] = useState<DetailItem>();
    const [error, setError] = useState<ErrorMessage>();
    useEffect(
        () => {
            (
                async function () {
                    try {
                        const { data, status } = await axios.get<Detail>(`https://QuizApp.janaki23.repl.co/quiz/${quizId}/rules`);
                        console.log(data);
                        if (status === 200) {
                            setDetails(data.details);
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
    console.log(details);
    return (
        <div>

        </div>
    )
}