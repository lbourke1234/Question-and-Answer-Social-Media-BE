import mongoose from 'mongoose'

const {Schema, model} = mongoose

const questionsSchema = new Schema({
    author: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    content: {
        heading: {type: String, required: true},
        question: {type: String, required: true}
    }
}, {timestamps: true})

export default model('Question', questionsSchema)