import { connectDB } from "@lib/mongodb";
import Question from "@models/question";
import Quiz from "@models/quizzes";

export const POST = async (request) => {
  try {
    // Parse request body
    const { question, option_1, option_2, option_3, option_4, quizId } = await request.json();

    // Connect to the database
    await connectDB();

    // Create the question
    const newQuestion = new Question({
      question,
      options: [option_1, option_2, option_3, option_4],
    });

    await newQuestion.save();

    // Find the quiz and update it
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return new Response(JSON.stringify({ error: "Quiz not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    quiz.questions.push(newQuestion._id);
    await quiz.save();

    // Respond with the created question
    return new Response(JSON.stringify(newQuestion), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating question:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create a new Question" }),
      { status: 500 }
    );
  }
};
