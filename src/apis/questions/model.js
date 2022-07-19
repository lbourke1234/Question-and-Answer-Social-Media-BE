import mongoose from 'mongoose'

const { Schema, model } = mongoose

const questionsSchema = new Schema(
  {
    author: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    content: {
      heading: { type: String, required: true },
      image: { type: String },
      question: { type: String, required: true }
    },
    likes: { type: Number, default: 0 }
  },
  { timestamps: true }
)

export default model('Question', questionsSchema)
