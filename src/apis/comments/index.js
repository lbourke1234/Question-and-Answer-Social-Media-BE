import express from 'express'
import createHttpError from 'http-errors'
import { JwtAuthMiddleware } from '../../auth/token.js'
import CommentsModel from './model.js'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const comments = await CommentsModel.find()
    res.send(comments)
  } catch (error) {
    console.log(error)
    next(error)
  }
})
router.get('/:id', async (req, res, next) => {
  try {
    const comments = await CommentsModel.find({ post: req.params.id })
    if (!comments) {
      next(createHttpError(404, 'Post does not exist!'))
    } else {
      res.send(comments)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})
router.post('/', async (req, res, next) => {
  try {
    const newComment = new CommentsModel(req.body)
    const savedComment = await newComment.save()
    res.status(201).send(savedComment)
  } catch (error) {
    console.log(error)
    next(error)
  }
})
router.post('/like/:id', JwtAuthMiddleware, async (req, res, next) => {
  try {
    const comment = await CommentsModel.findById(req.params.id)
    if (!comment) {
      next(createHttpError(404, 'Comment does not exist'))
    } else {
      const doesUserLikeComment = comment.likesList.find(
        (c) => c.toString() === req.user._id
      )
      console.log('does user like comment', doesUserLikeComment)
      if (!doesUserLikeComment) {
        comment.likes++
        comment.likesList.push(req.user._id)
        await comment.save()
        res.send({ message: 'User now likes post' })
      } else {
        res.send({ message: 'User already likes post' })
      }
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})
router.post('/dislike/:id', JwtAuthMiddleware, async (req, res, next) => {
  try {
    const comment = await CommentsModel.findById(req.params.id)
    if (!comment) {
      next(createHttpError(404, 'Comment does not exist'))
    } else {
      const doesUserLikeComment = comment.likesList.find(
        (c) => c.toString() === req.user._id
      )
      console.log('does user like comment', doesUserLikeComment)
      if (doesUserLikeComment) {
        comment.likes--
        const indexToRemove = comment.likesList.find((c) => c.toString() === req.user._id)
        comment.likesList.splice(indexToRemove, 1)

        await comment.save()
        res.send({ message: 'User unliked post' })
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
