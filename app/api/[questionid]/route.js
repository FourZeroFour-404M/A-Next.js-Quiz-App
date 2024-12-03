import { connectDB } from "@lib/mongodb";
import Question from "@models/question";

export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const { questionid } = await params; // Correct destructuring
    const foundQuestion = await Question.findById(questionid);

    if (!foundQuestion) {
      return new Response(JSON.stringify({ error: "Question not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(foundQuestion), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching a question:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch question" }), {
      status: 500,
    });
  }
};

export const PATCH = async (request, { params }) => {
  try {
    await connectDB();

    const { questionid } = params; // Correct destructuring
    const { question, option_1, option_2, option_3, option_4 } = await request.json();

    const existingQuestion = await Question.findById(questionid);

    if (!existingQuestion) {
      return new Response("Question not found", { status: 404 });
    }

    // Update the question fields
    existingQuestion.question = question;
    existingQuestion.options = [option_1, option_2, option_3, option_4];

    await existingQuestion.save();

    return new Response(JSON.stringify(existingQuestion), { status: 200 });
  } catch (error) {
    console.error("Error updating question:", error);
    return new Response("Failed to update Question", { status: 500 });
  }
};
