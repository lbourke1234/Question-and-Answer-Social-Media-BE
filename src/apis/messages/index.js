import express from 'express'
import { JwtAuthMiddleware } from '../../auth/token.js'
import MessagesModel from './model.js'

const router = express.Router()

router.get('/', JwtAuthMiddleware, async (req, res, next) => {
  try {
    const messages = await MessagesModel.find({ sender: req.user._id })
    res.send(messages)
  } catch (error) {
    console.log(error)
    next(error)
  }
})
router.get('/:room', JwtAuthMiddleware, async (req, res, next) => {
  try {
    const messages = await MessagesModel.find({ room: req.params.room })
    res.send(messages)
  } catch (error) {
    console.log(error)
    next(error)
  }
})
router.post('/', JwtAuthMiddleware, async (req, res, next) => {
  try {
    const newMessage = new MessagesModel({ sender: req.user._id, ...req.body })
    const { _id } = await newMessage.save()
    res.send({ _id })
  } catch (error) {
    console.log(error)
    next(error)
  }
})

export default router
