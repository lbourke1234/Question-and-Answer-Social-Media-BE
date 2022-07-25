import mongoose from 'mongoose'

const { Schema, model } = mongoose

const CommentsSchema = new Schema(
  {
    post: { type: mongoose.Types.ObjectId, required: true, ref: 'Question' },
    author: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    comment: { type: String, required: true },
    likes: { type: Number, default: 0 },
    likesList: [{ type: mongoose.Types.ObjectId, ref: 'User' }]
  },
  { timestamps: true }
)
export default model('Comments', CommentsSchema)
