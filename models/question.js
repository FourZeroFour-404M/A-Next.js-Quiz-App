import mongoose, { models, Schema } from "mongoose";

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  options: [String],
});

const Question = models.Question || mongoose.model("Question", questionSchema);

export default Question;