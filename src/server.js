import express from 'express'
import mongoose from 'mongoose'
import usersRouter from './apis/users/index.js'
import questionsRouter from './apis/questions/index.js'
import cors from 'cors'
import listEndpoints from 'express-list-endpoints'
import {
  badRequestHandler,
  forbiddenHandler,
  unauthorizedHandler,
  notFoundHandler,
  genericHandler
} from './errorHandlers.js'

const port = process.env.PORT || 5001

const server = express()

server.use(cors())
server.use(express.json())

server.use('/users', usersRouter)
server.use('/questions', questionsRouter)

server.use(badRequestHandler)
server.use(forbiddenHandler)
server.use(unauthorizedHandler)
server.use(notFoundHandler)
server.use(genericHandler)

// connect to mongo
mongoose.connect(process.env.MONGO_CONNECTION_URL)

mongoose.connection.on('connected', () => {
  console.log('Connected to Mongo!')
  server.listen(port, () => {
    console.table(listEndpoints(server))
  })
})
