export const badRequestHandler = (err, req, res, next) => {
  if (err.status === 400) {
    res.status(400).send({ message: err.message })
  } else {
    next(err)
  }
}

export const unauthorizedHandler = (err, req, res, next) => {
  if (err.status === 401) {
    res.status(401).send({ message: err.message })
  } else {
    next(err)
  }
}

export const forbiddenHandler = (err, req, res, next) => {
  if (err.status === 403) {
    res.status(403).send({ message: err.message })
  } else {
    next(err)
  }
}

export const notFoundHandler = (err, req, res, next) => {
  if (err.status === 404) {
    res.status(404).send({ message: err.message })
  } else {
    next(err)
  }
}

export const genericHandler = (err, req, res, next) => {
  if (err.status === 500) {
    res.status(500).send({ message: 'Something went wrong on our end!' })
  }
}
