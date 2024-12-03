"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

const AvailableQuizzes = () => {

    const [availableQuizzes, setAvailableQuizzes] = useState();

    useEffect(() => {
        const fetchAvailableQuizzes = async () => {
            try {
                const response = await fetch("/api/quiz");
                if (!response.ok) throw new Error('Failed to fetch quizzes');

                const data = await response.json();
                setAvailableQuizzes(data);
                console.log(data);
            } catch (error) {
                console.error("Error fetching available quizzes:", error);
            }
        }
        fetchAvailableQuizzes();
    }, []);


    return (
        <div className="available-quizzes">
            <h1 className="available-quiz-heading">Available Quizzes:</h1>
            {
                availableQuizzes && availableQuizzes.length > 0
                    ?
                    <div className="available-quizzes-container">
                        {
                            availableQuizzes.map((availableQuiz) => {
                                return (
                                    <div className="available-quiz">
                                        <h2>{availableQuiz.quizName}</h2>
                                        <p>{availableQuiz.authorComment}</p>
                                        <div>
                                            <p>Date created: {availableQuiz.createdAt}</p>
                                            <p>Date updated: {availableQuiz.updatedAt}</p>
                                            <p>Created by: {`${availableQuiz.author}`}</p>
                                        </div>
                                        <Link href="/">
                                            <button >Take quiz</button>
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                    :
                    <h2 style={{ fontFamily: "MontserratBold" }}>Seems no Quizzes is available. Available Quizzes would appear here. Check back later, thanks.</h2>
            }
             {/* Only admin can do this */}
            <Link href="quiz/create-quiz">
                <button className="create-quiz-btn-link">Create New Quiz</button>
            </Link>
        </div>
    )
}

export default AvailableQuizzes;