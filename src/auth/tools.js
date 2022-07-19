import jwt from 'jsonwebtoken'

export const generateJwtToken = (payload) =>
  new Promise((res, rej) => {
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1 week' }, (err, token) => {
      if (err) rej(err)
      else res(token)
    })
  })

export const verifyJwtToken = (token) =>
  new Promise((res, rej) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) rej(err)
      else res(payload)
    })
  })
