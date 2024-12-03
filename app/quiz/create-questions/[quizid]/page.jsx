"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { BsPencil } from "react-icons/bs";

const CreateQuestions = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { quizid } = useParams();

    const [quizQuestion, setQuizQuestion] = useState({
        question: '',
        option_1: '',
        option_2: '',
        option_3: '',
        option_4: '',
    });

    // const [toBeEdited, setToBeEdited] = useState({});
    const [questionDetails, setQuestionDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openCreateQuestion, setOpenCreateuestion] = useState(false);
    const [inEditMode, setInEditMode] = useState(false);
    const [toEditId, setToEditId] = useState(null);

    const initiateQuiz = () => {
        setOpenCreateuestion((prevValue) => !prevValue);
    };

    useEffect(() => {
        // Redirect a user that's not authenticated
        if (status === "unauthenticated") {
            router.push('/sign-in');
        }

        // Fetch a particular qustion according to its quiz ID
        const fetchQuestions = async () => {
            try {
                setLoading(true); // Start loading state
                const response = await fetch(`/api/question/${quizid}`);
                if (!response.ok) throw new Error("Failed to fetch questions");

                const data = await response.json();
                setQuestionDetails(data); // Set fetched questions
            } catch (error) {
                console.error("Error fetching available questions:", error);
            } finally {
                setLoading(false); // End loading state
            }
        };

        fetchQuestions();
    }, [status, router, quizid]);

    // Handle Question Edit
    const handleQuestionEdit = async (event, id) => {
        event.preventDefault();

        setInEditMode(true);
        setToEditId(id); // Set the question ID being edited

        try {
            const response = await fetch(`/api/${id}`);
            if (!response.ok) throw new Error('Failed to fetch the question');

            const data = await response.json();
            setQuizQuestion({
                question: data.question,
                option_1: data.options[0],
                option_2: data.options[1],
                option_3: data.options[2],
                option_4: data.options[3],
            });
        } catch (error) {
            console.error("Error fetching the particular question to be updated:", error);
        } finally {
            setOpenCreateuestion(true); // Open the form for editing
        }
    };

    const handleEditSubmission = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`api/${toEditId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify( quizQuestion ),
            });

            if (response.ok) {
                console.log("Question updated successfully");
                setQuizQuestion({
                    question: '',
                    option_1: '',
                    option_2: '',
                    option_3: '',
                    option_4: '',
                });
                setInEditMode(false);
                setToEditId(null);
            }
        } catch (error) {
            console.log(error);
        }
        // finally {
        //     setOpenCreateuestion(false); // Open the form for editing
        // }
    }

    // Handle Question Submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/question', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...quizQuestion, quizId: quizid }),
            });

            if (response.ok) {
                console.log("Question created successfully");
                setQuizQuestion({
                    question: '',
                    option_1: '',
                    option_2: '',
                    option_3: '',
                    option_4: '',
                });
            }
        } catch (error) {
            console.log('Error creating question:', error);
        }
    };

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuizQuestion((prevValues) => ({ ...prevValues, [name]: value }));
    };

    if (status === "loading") return <p>Loading...</p>;

    return (
        <div className="admin-question-section">
            <div className="init-question-tools">
                <button className='init-question-btn' onClick={initiateQuiz} type="button">Create New Question <BsPencil /></button>
                <small style={{ color: "red", fontFamily: "MontserratBold" }}>*Kindly note that the correct option should include "--true" at its end</small>
                {
                    openCreateQuestion && (
                        <form className="init-question-form" onSubmit={handleSubmit}>
                            <label htmlFor="question">
                                Question:
                            </label>
                            <textarea
                                name="question"
                                placeholder="Type a question here..."
                                value={quizQuestion.question}
                                onChange={handleChange}
                                id="question"
                                required />
                            <label htmlFor="option_1">
                                Option 1:
                            </label>
                            <input
                                name="option_1"
                                placeholder="Type the first option here"
                                value={quizQuestion.option_1}
                                onChange={handleChange}
                                id="option_1"
                                required />
                            <label htmlFor="option_2">
                                Option 2:
                            </label>
                            <input
                                name="option_2"
                                placeholder="Type the second option here"
                                value={quizQuestion.option_2}
                                onChange={handleChange}
                                id="option_2"
                                required />
                            <label htmlFor="option_3">
                                Option 3:
                            </label>
                            <input
                                name="option_3"
                                placeholder="Type the third option here"
                                value={quizQuestion.option_3}
                                onChange={handleChange}
                                id="option_3"
                                required />
                            <label htmlFor="option_4">
                                Option 4:
                            </label>
                            <input
                                name="option_4"
                                placeholder="Type the fourth option here"
                                value={quizQuestion.option_4}
                                onChange={handleChange}
                                id="option_4"
                                required />
                            {
                                !inEditMode
                                    ?
                                    <button onClick={handleSubmit} type="submit">
                                        Submit
                                    </button>
                                    :
                                    <button onClick={handleEditSubmission} type="submit">
                                        Save Changes
                                    </button>
                            }
                        </form>
                    )
                }
            </div>
            <div className="available-questions-display">
                {loading ? (
                    <p style={{ fontFamily: "MontserratBold" }}>Loading questions...</p>
                ) : questionDetails && questionDetails.length > 0 ? (
                    questionDetails.map((questionDetail) => (
                        <div className="available-question-display" key={questionDetail._id}>
                            <BsPencil onClick={(event) => handleQuestionEdit(event, questionDetail._id)} style={{ alignSelf: "end" }} />
                            <h2>{questionDetail.question}</h2>
                            <div>
                                <p>{questionDetail.options[0]}</p>
                                <p>{questionDetail.options[1]}</p>
                                <p>{questionDetail.options[2]}</p>
                                <p>{questionDetail.options[3]}</p>
                            </div>
                            {/* <button onClick={() => { handleQuestionEdit(questionDetail._id) }}>Edit</button> */}
                        </div>
                    ))
                ) : (
                    <h1 style={{ fontFamily: "MontserratBold" }}>No Questions have been added yet</h1>
                )}
            </div>
        </div>
    );
};

export default CreateQuestions;