import mongoose from 'mongoose'

const { Schema, model } = mongoose

const categoriesSchema = new Schema({
  name: { type: String, required: true },
  image: { type: String, default: 'https://cdn.onlinewebfonts.com/svg/img_98811.png' },
  description: { type: String, required: true },
  text: {
    paragraph1: { type: String, required: true },
    paragraph2: { type: String, required: true },
    paragraph3: { type: String, required: true },
    picture: { type: String, required: true }
  },
  followers: [{ type: mongoose.Types.ObjectId, default: [], ref: 'User' }],
  questions: [{ type: mongoose.Types.ObjectId, default: [], ref: 'Question' }]
})

export default model('Category', categoriesSchema)
