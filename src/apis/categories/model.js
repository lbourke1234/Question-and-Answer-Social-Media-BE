import mongoose from 'mongoose'

const { Schema, model } = mongoose

const categoriesSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, default: 'https://cdn.onlinewebfonts.com/svg/img_98811.png' },
  description: { type: String, required: true },
  followers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  questions: [{ type: mongoose.Types.ObjectId, ref: 'Question' }]
})

export default model('Category', categoriesSchema)
