import mongoose, { model, models, Schema } from "mongoose";

const quizzesSchema = new Schema(
  {
    author: {
      type: String,
      ref: "User",
    },
    quizName: {
      type: String,
      required: [true, 'A name is required for creating a quiz'],
    },
    authorComment: {
      type: String,
      required: [true, 'A comment is neseccasry in creating a quiz'],
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
      },
    ],
  },
  { timestamps: true }
);

const Quiz = models.Quiz || model("Quiz", quizzesSchema);

export default Quiz;
