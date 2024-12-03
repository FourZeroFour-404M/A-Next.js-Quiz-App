"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Confirm from "@components/Confirm";
import { useGlobalState } from "@GlobalStateProvider";
import { useSession } from "next-auth/react";

const Quiz = () => {
    const router = useRouter();
    const { status, data: session } = useSession();
    const {
        confirmSubmission,
        openConfirmSubmission,
        setOpenConfirmSubmission,
        simpleQArray,
        questionDetails,
        pageNumber,
        setPageNumber,
        qNumber,
        setQNumber,
        selectedAnswers,
        setSelectedAnswers,
        timeLeft,
        setTimeLeft,
        completed,
        answeredQuestionsNum,
        setAnsweredQuestionsNum,
        handleAnswerSelect,
        censorWord,
        handleSubmit,
        formatTime,
    } = useGlobalState();

    // Load time left and answers from localStorage for persistence
    useEffect(() => {
        const savedTime = localStorage.getItem('timeLeft');
        if (savedTime) setTimeLeft(parseInt(savedTime));
        const savedAnswers = JSON.parse(localStorage.getItem('selectedAnswers'));
        if (savedAnswers) setSelectedAnswers(savedAnswers);
    }, []);

    // Countdown timer logic
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft(time => time - 1), 1000);
            return () => clearInterval(timer);
        } else {
            handleSubmit();
            setTimeLeft(0);
            setSelectedAnswers({});
            router.push("/"); // Auto-submit and redirect when time reaches zero
        }
    }, [timeLeft, router, handleSubmit]);

    // Update the question number based on page number
    useEffect(() => {
        const questionIndex = simpleQArray.indexOf(simpleQArray[pageNumber]);
        setQNumber(questionIndex + 1);
    }, [pageNumber, simpleQArray]);

    // Save time and answers to localStorage for persistence
    useEffect(() => {
        localStorage.setItem('timeLeft', timeLeft);
        localStorage.setItem('selectedAnswers', JSON.stringify(selectedAnswers));
    }, [timeLeft, selectedAnswers]);

    // Redirect if user is unauthenticated
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/sign-in");
        }
    }, [status, router]);

    // Render loading or authenticated quiz content
    if (status === "loading") return <p>Loading...</p>;

    if (status === "authenticated") {
        return (
            <section className="quiz-page">
                <div className="countdown">{formatTime()}</div>
                <div className="quiz-container">
                    <div className="question-section">
                        <div className="q-and-a">
                            <p className="question">{qNumber}. {simpleQArray[pageNumber].Question}</p>
                            {simpleQArray[pageNumber].Answers.map((answer, i) => (
                                <div className="options" key={i}>
                                    <input
                                        type="radio"
                                        name={`question-${pageNumber}`}
                                        checked={selectedAnswers[pageNumber] === i}
                                        onChange={() => handleAnswerSelect(i)}
                                    />
                                    <label>{censorWord(answer, "--true")}</label>
                                </div>
                            ))}
                        </div>
                        <div className="buttons">
                            <button disabled={pageNumber === 0} onClick={() => setPageNumber(pageNumber - 1)}>
                                &lt;- Previous
                            </button>
                            <div>Question: {pageNumber + 1} of {simpleQArray.length}</div>
                            <button disabled={pageNumber === simpleQArray.length - 1} onClick={() => setPageNumber(pageNumber + 1)}>
                                Next -&gt;
                            </button>
                        </div>
                    </div>
                    <div className="quiz-details">
                        <Image
                            src="/assets/images/Logo_Light.png"
                            className="navLogoImg"
                            alt="BSG Logo"
                            width={100}
                            height={100}
                        />
                        <p>Oparemi Muhammed</p>
                        <p className="testName">{questionDetails[0].testName}</p>
                        <p>Questions:</p>
                        <div className="question-num-btns">
                            {simpleQArray.map((_, index) => (
                                <div
                                    key={index}
                                    className="question-num-btn"
                                    style={{
                                        backgroundColor: completed[index] ? '#fbab24' : '#fff',
                                        border: pageNumber === index ? '2px solid #fbab24' : ''
                                    }}
                                    onClick={() => setPageNumber(index)}
                                >
                                    {index + 1}
                                </div>
                            ))}
                        </div>
                        <button className="end-exam-btn" type="button" onClick={() => {
                            setOpenConfirmSubmission(true);
                            const savedAnswers = JSON.parse(localStorage.getItem('selectedAnswers'));
                            setAnsweredQuestionsNum(savedAnswers[0].length);

                            if (confirmSubmission) {
                                handleSubmit();
                            }
                        }}>
                            End Exam
                        </button>
                    </div>
                </div>
                {openConfirmSubmission && <Confirm />}
            </section>
        );
    }

    return null;
};

export default Quiz;