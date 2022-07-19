import express from 'express'
import createHttpError from 'http-errors'
import UsersModel from './model.js'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const users = await UsersModel.find()
    res.send(users)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const foundUser = await UsersModel.findById(req.params.id)
    if (!foundUser) {
      next(createHttpError(404, 'User not found!'))
    } else {
      res.send(foundUser)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const body = new UsersModel(req.body)
    const newUser = await body.save()
    res.status(201).send(newUser)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updatedUser = await UsersModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    if (!updatedUser) {
      next(createHttpError(404, 'User not found!'))
    } else {
      res.send(updatedUser)
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  const deletedUser = await UsersModel.findByIdAndDelete(req.params.id)
  if (!deletedUser) {
    next(createHttpError(404, 'User not found!'))
  } else {
    res.status(204).send()
  }
})

export default router
