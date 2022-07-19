export const badRequestHandler = (err, req, res, next) => {
  if (err.status === 400) {
    console.log({ message: err.message })
    next(err)
  }
}

export const unauthorizedHandler = (err, req, res, next) => {
  if (err.status === 401) {
    console.log({ message: err.message })
    next(err)
  }
}

export const forbiddenHandler = (err, req, res, next) => {
  if (err.status === 403) {
    console.log({ message: err.message })
    next(err)
  }
}

export const notFoundHandler = (err, req, res, next) => {
  if (err.status === 404) {
    console.log({ message: err.message })
    next(err)
  }
}

export const genericHandler = (err, req, res, next) => {
  if (err.status === 500) {
    console.log('Something went wrong on our end!')
  }
}
