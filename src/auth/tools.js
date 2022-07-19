import jwt from 'jsonwebtoken'

export const generateJwtToken = (payload) => {
  new Promise((res, rej) => {
    jwt.sign(payload, process.env.JWT.SECRET, { expiresIn: '1 week' }, (err, token) => {
      if (eff) rej(err)
      else res(token)
    })
  })
}

export const verifyJwtToken = (token) => {
  new Promise((res, rej) => {
    jwt.verify(token, process.env.JWT.SECRET, (err, payload) => {
      if (err) rej(err)
      else res(payload)
    })
  })
}
