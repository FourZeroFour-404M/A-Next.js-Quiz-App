"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BsPencil } from "react-icons/bs";

const CreateQuiz = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [quizDetails, setQuizDetails] = useState();
  const [loading, setLoading] = useState(true); // Loading state for fetching
  const [openCreateQuiz, setOpenCreateQuiz] = useState(false);

  const [newQuiz, setNewQuiz] = useState({
    authorComment: '',
    quizName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewQuiz((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const initiateQuiz = () => {
    setOpenCreateQuiz((prevValue) => !prevValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userInfo: session?.user.name,
          authorComment: newQuiz.authorComment,
          quizName: newQuiz.quizName,
        }),
      });
      setNewQuiz({
        authorComment: '',
        quizName: '',
      });
      if (response.ok) {
        console.log(`${newQuiz.quizName} successfully created`);
        // router.refresh();
      }
    } catch (error) {
      console.log('Error creating quiz:', error);
    } finally {
      setOpenCreateQuiz(false);
    }
  };

  useEffect(() => {
    // Redirect to home page if user is not authenticated
    if (status === "unauthenticated") {
      router.push('/sign-in');
    }

    const fetchAvailableQuizzes = async () => {
      try {
        setLoading(true); // Start loading state
        const response = await fetch('/api/quiz');
        if (!response.ok) throw new Error('Failed to fetch quizzes');

        const data = await response.json();
        setQuizDetails(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching available quizzes:", error);
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchAvailableQuizzes();
  }, [status]);

  if (status === "loading") return <p>Loading session...</p>; // Show loading while checking session

  return (
    <div className='create-quiz'>
      <div className="init-quiz-tools">
        <button className='init-quiz-btn' onClick={initiateQuiz} type="button">Create New Quiz <BsPencil /></button>
        <small style={{color:"red", fontFamily:"MontserratBold"}}>*Note that only the lead admin can change the quiz names or delete them, kindly watch out!</small>
        {openCreateQuiz && (
          <form className="init-create-form" onSubmit={handleSubmit}>
            <label htmlFor="quizName">Quiz Name:</label>
            <input
              name="quizName"
              placeholder="Enter the new quiz's name here"
              value={newQuiz.quizName}
              onChange={handleChange}
              id="option_1"
              required />
            <label htmlFor="authorComment">Comment:</label>
            <input
              name="authorComment"
              placeholder="Leave a comment"
              value={newQuiz.authorComment}
              onChange={handleChange}
              id="option_2"
              required />
            <button type="submit">
              Create
            </button>
          </form>
        )}
      </div>
      <div className="available-quizzes-display">
        {loading ? (
          <p style={{ fontFamily: "MontserratBold" }}>Loading...</p>
        ) : quizDetails && quizDetails.length > 0 ? (
          quizDetails.map((quiz) => (
            <div className="available-quiz-display" key={quiz._id}>
              <h2>{quiz.quizName}</h2>
              <Link href={`create-questions/${quiz._id}`}>
                <button>Edit Quiz <BsPencil style={{ color: "000" }} /></button>
              </Link>
            </div>
          ))
        ) : (
          <h1 style={{ fontFamily: "MontserratBold" }}>No quizzes available. Available quizzes will appear here</h1>
        )}
      </div>
    </div>
  );
};

export default CreateQuiz;
