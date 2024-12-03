import { connectDB } from "@lib/mongodb";
import Quiz from "@models/quizzes";
import Question from "@models/question";

export const GET = async (request, { params }) => {
  try {
    // Connect to the database
    await connectDB();

    const { quizid } = await params;

    // Find the quiz and populate the questions field
    const quiz = await Quiz.findById(quizid).populate("questions").lean();

    if (!quiz) {
      return new Response(JSON.stringify({ error: "Quiz not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Respond with the populated questions
    return new Response(JSON.stringify(quiz.questions), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching quiz questions:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch questions" }),
      { status: 500 }
    );
  }
};