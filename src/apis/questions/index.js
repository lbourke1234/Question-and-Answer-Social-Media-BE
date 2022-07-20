import express from 'express'
import QuestionsModel from './model.js'
import UsersModel from '../users/model.js'
import createHttpError from 'http-errors'
import { JwtAuthMiddleware } from '../../auth/token.js'

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

router.post('/:id/like', JwtAuthMiddleware, async (req, res, next) => {
  try {
    const post = await QuestionsModel.findById(req.params.id)
    if (!post) {
      next(createHttpError(404, 'Post not found!'))
    } else {
      const doesUserLikePost = post.likeList.find(
        (user) => user.toString() === req.user._id
      )
      if (!doesUserLikePost) {
        const postAuthor = await UsersModel.findById(post.author.toString())
        postAuthor.kudos = postAuthor.kudos++
        await postAuthor.save()
        console.log('post author', postAuthor)

        post.likeList.push(req.user._id)
        post.likes++
        await post.save()

        res.send({ post, postAuthor })
      } else {
        res.send({ message: 'User already likes post!' })
      }
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.post('/:id/unlike', JwtAuthMiddleware, async (req, res, next) => {
  try {
    const post = await QuestionsModel.findById(req.params.id)
    if (!post) {
      next(createHttpError(404, 'Post not found!'))
    } else {
      const userLikesPost = post.likeList.find((user) => user.toString() === req.user._id)
      if (userLikesPost) {
        const index = post.likeList.findIndex((user) => user.toString() === req.user._id)
        post.likeList.splice(index, 1)
        post.likes--
        await post.save()

        res.send(post)
      } else {
        res.send({ message: 'User does not like post yet!' })
      }
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

export default router
