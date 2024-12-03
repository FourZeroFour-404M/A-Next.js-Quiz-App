import { connectDB } from "@lib/mongodb";
import Quiz from "@models/quizzes";

export const POST = async (request) => {
  try {
    // Parse request data
    const { userInfo, authorComment, quizName } = await request.json(); // Add 'await' here

    // Connect to the database
    await connectDB();

    // Create and save a new quiz
    const newQuiz = new Quiz({
      author: userInfo,
      quizName,
      authorComment,
    });

    await newQuiz.save();

    // Respond with the new quiz data
    return new Response(JSON.stringify(newQuiz), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating quiz:", error); // Log error for debugging
    return new Response("Failed to create a new Quiz", { status: 500 });
  }
};

export const GET = async () => {
  try {
    await connectDB();

    // Fetch all quizzes and convert them to plain JavaScript objects
    const availableQuizzes = await Quiz.find().lean();

    return new Response(JSON.stringify(availableQuizzes), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching available quizzes:", error); // Log error for debugging
    return new Response("Failed to get Available Quizzes", { status: 500 });
  }
};
