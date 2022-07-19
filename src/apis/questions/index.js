import express from 'express'
import QuestionsModel from './model.js'
import createHttpError from 'http-errors'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const questions = await QuestionsModel.find()
    res.send(questions)
  } catch (error) {
    console.log(error)
    next(error)
  }
})
router.get('/:id', async (req, res, next) => {
  try {
    const question = await QuestionsModel.findById(req.params.id)
    if (!question) {
      next(createHttpError(404, 'Post not found!'))
    } else {
      res.send(question)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const newQuestion = new QuestionsModel(req.body)
    const savedQ = await newQuestion.save()
    res.send(savedQ)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updatedQuestion = await QuestionsModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!updatedQuestion) {
      next(createHttpError(404, 'Question does not exist'))
    } else {
      res.send(updatedQuestion)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await QuestionsModel.findByIdAndDelete(req.params.id)
    res.status(204).send()
  } catch (error) {
    console.log(error)
    next(error)
  }
})

export default router
