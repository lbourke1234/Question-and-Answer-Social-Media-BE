import express from 'express'
import createHttpError from 'http-errors'
import { JwtAuthMiddleware } from '../../auth/token.js'
import { generateJwtToken } from '../../auth/tools.js'
import UserModel from '../users/model.js'

const router = express.Router()

router.post('/register', async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error)
    next(error)
  }
})
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await UserModel.checkCredentials(email, password)
    if (!user) {
      next(createHttpError(401, 'Invalid Credentials!'))
    } else {
      const token = await generateJwtToken({ _id: user._id })
      res.send({ token })
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

export default router
