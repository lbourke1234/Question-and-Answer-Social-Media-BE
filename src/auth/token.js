import createHttpError from 'http-errors'
import { verifyJwtToken } from './tools.js'

export const JwtAuthMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    next(createHttpError(401, 'Please provide a Bearer Token'))
  } else {
    try {
      const token = req.headers.authorization.replace('Bearer ', '')

      const payload = await verifyJwtToken(token)

      req.user = {
        _id: payload._id
      }

      next()
    } catch (error) {
      console.log(error)
      next(createHttpError(401, 'Token is not valid!'))
    }
  }
}
