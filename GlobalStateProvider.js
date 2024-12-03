import { createContext, useContext, useState } from "react";
import { redirect } from "next/navigation";

// Create Context
const GlobalStateContext = createContext();

// Create the provider component
export const GlobalStateProvider = ({ children }) => {
  const questions = [
    [
      {
        id: 1,
        Question: "What is the capital of Nigeria?",
        Answers: ["Lagos", "Ibadan", "Abuja --true", "Port Harcourt"],
      },
      {
        id: 1,
        Question: "What is the capital of Nigeria?",
        Answers: ["Lagos", "Ibadan", "Abuja --true", "Port Harcourt"],
      },
      {
        id: 1,
        Question: "What is the capital of Nigeria?",
        Answers: ["Lagos", "Ibadan", "Abuja --true", "Port Harcourt"],
      },
      {
        id: 3,
        Question: "Who is the President of Nigeria?",
        Answers: [
          "Joe Biden",
          "Barack Obama",
          "Seyi Makinde",
          "Bola Ahmed Tinubu --true",
        ],
      },
      {
        id: 3,
        Question: "Who is the President of Nigeria?",
        Answers: [
          "Joe Biden",
          "Barack Obama",
          "Seyi Makinde",
          "Bola Ahmed Tinubu --true",
        ],
      },
      {
        id: 2,
        Question: "What is the capital of USA?",
        Answers: ["NY City", "Washington DC --true", "Niger", "London"],
      },
      {
        id: 1,
        Question: "What is the capital of Nigeria?",
        Answers: ["Lagos", "Ibadan", "Abuja --true", "Port Harcourt"],
      },
      {
        id: 3,
        Question: "Who is the President of Nigeria?",
        Answers: [
          "Joe Biden",
          "Barack Obama",
          "Seyi Makinde",
          "Bola Ahmed Tinubu --true",
        ],
      },
      {
        id: 3,
        Question: "Who is the President of Nigeria?",
        Answers: [
          "Joe Biden",
          "Barack Obama",
          "Seyi Makinde",
          "Bola Ahmed Tinubu --true",
        ],
      },
      {
        id: 3,
        Question: "Who is the President of Nigeria?",
        Answers: [
          "Joe Biden",
          "Barack Obama",
          "Seyi Makinde",
          "Bola Ahmed Tinubu --true",
        ],
      },
      {
        id: 3,
        Question: "Who is the President of Nigeria?",
        Answers: [
          "Joe Biden",
          "Barack Obama",
          "Seyi Makinde",
          "Bola Ahmed Tinubu --true",
        ],
      },
      {
        id: 2,
        Question: "What is the capital of USA?",
        Answers: ["NY City", "Washington DC --true", "Niger", "London"],
      },
      {
        id: 1,
        Question:
          "What is the capital of Nigeriais the capital of is the capital ofis the capital ofis the capital ofis the capital ofis the capital ofis the capital ofis the capital ofis the capital ofis the capital ofis the capital ofis the capital of?",
        Answers: ["Lagos", "Ibadan", "Abuja --true", "Port Harcourt"],
      },
      {
        id: 3,
        Question: "Who is the President of Nigeria?",
        Answers: [
          "Joe Biden",
          "Barack Obama",
          "Seyi Makinde",
          "Bola Ahmed Tinubu --true",
        ],
      },
      {
        id: 3,
        Question: "Who is the President of Nigeria?",
        Answers: [
          "Joe Biden",
          "Barack Obama",
          "Seyi Makinde",
          "Bola Ahmed Tinubu --true",
        ],
      },
      {
        id: 2,
        Question: "What is the capital of USA?",
        Answers: ["NY City", "Washington DC --true", "Niger", "London"],
      },
      {
        id: 1,
        Question:
          "What is the capital of Nigeriais the capital of is the capital ofis the capital ofis the capital ofis the capital ofis the capital ofis the capital ofis the capital ofis the capital ofis the capital ofis the capital ofis the capital of?",
        Answers: ["Lagos", "Ibadan", "Abuja --true", "Port Harcourt"],
      },
      {
        id: 3,
        Question: "Who is the President of Nigeria?",
        Answers: [
          "Joe Biden",
          "Barack Obama",
          "Seyi Makinde",
          "Bola Ahmed Tinubu --true",
        ],
      },
      {
        id: 3,
        Question: "Who is the President of Nigeria?",
        Answers: [
          "Joe Biden",
          "Barack Obama",
          "Seyi Makinde",
          "Bola Ahmed Tinubu --true",
        ],
      },
      // Add more questions as needed
    ],
    [
      {
        allocatedTime: 6000,
        testName: "Engineering Mathematics (EET 221)",
      },
    ],
  ];
  // Global variables go in here
  const [confirmSubmission, setConfirmSubmission] = useState(false);
  const [openConfirmSubmission, setOpenConfirmSubmission] = useState(false);
  const simpleQArray = questions[0];
  const questionDetails = questions[1];
  const [pageNumber, setPageNumber] = useState(0);
  const [qNumber, setQNumber] = useState();
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [answeredQuestionsNum, setAnsweredQuestionsNum] = useState(0);
  const [timeLeft, setTimeLeft] = useState(questionDetails[0].allocatedTime); // Set time in seconds
  const [completed, setCompleted] = useState(
    Array(questions.length).fill(false)
  );

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswers(prev => ({
        ...prev,
        [pageNumber]: answerIndex
    }));
    setCompleted(prev => {
        const updated = [...prev];
        updated[pageNumber] = true;
        return updated;
    });
};

const censorWord = (sentence, wordToExclude) => {
    return sentence.replace(` ${wordToExclude}`, "");
};

const checkAnswer = (index) => {
    return simpleQArray[index].Answers.some(
        (answer, i) => answer.includes("--true") && selectedAnswers[index] === i
    );
};

const handleSubmit = () => {
    // Calculate score
    const calculatedScore = simpleQArray.reduce((acc, _, index) => {
        return acc + (checkAnswer(index) ? 1 : 0);
    }, 0);
    setScore(calculatedScore);
    // console.log(calculatedScore);
    
    //confirm if candidate really wants to submit
    // alert(`Exam ended. You scored ${calculatedScore} out of ${simpleQArray.length}.`);
    localStorage.removeItem('timeLeft');
    localStorage.removeItem('selectedAnswers');
    setTimeLeft(0);
    setSelectedAnswers({});
    redirect("/");
};

// useEffect(() => {
//     handleSubmit();
// }, [confirmSubmission === true]);

const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes < 10 ? `0${minutes}` : `${minutes}`} : ${seconds < 10 ? '0' : ''}${seconds}`;
};

  return (
    <GlobalStateContext.Provider
      value={{
        confirmSubmission,
        setConfirmSubmission,
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
        score,
        setScore,
        timeLeft,
        setTimeLeft,
        completed,
        setCompleted,
        answeredQuestionsNum,
        setAnsweredQuestionsNum,
        handleAnswerSelect,
        censorWord,
        handleSubmit,
        formatTime,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
