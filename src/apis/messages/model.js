import mongoose from 'mongoose'

const { Schema, model } = mongoose

const messagesSchema = new Schema(
  {
    sender: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
    room: { type: String, required: true },
    text: { type: String, required: true },
    senderName: { type: String, required: true }
  },
  { timestamps: true }
)
export default model('Messages', messagesSchema)
