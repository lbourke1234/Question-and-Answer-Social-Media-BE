import express from 'express'
import mongoose from 'mongoose'

import usersRouter from './apis/users/index.js'
import questionsRouter from './apis/questions/index.js'
import authRouter from './apis/auth/index.js'
import categoriesRouter from './apis/categories/index.js'
import commentsRouter from './apis/comments/index.js'

import cors from 'cors'
import listEndpoints from 'express-list-endpoints'

//socket IO
import connectionHandler from './socket/index.js'
import { Server } from 'socket.io'
import { createServer } from 'http'

import {
  badRequestHandler,
  forbiddenHandler,
  unauthorizedHandler,
  notFoundHandler,
  genericHandler
} from './errorHandlers.js'

const port = process.env.PORT || 5001
const server = express()

const httpServer = createServer(server)

server.use(cors())
server.use(express.json())

server.use('/users', usersRouter)
server.use('/questions', questionsRouter)
server.use('/auth', authRouter)
server.use('/categories', categoriesRouter)
server.use('/comments', commentsRouter)

server.use(badRequestHandler)
server.use(forbiddenHandler)
server.use(unauthorizedHandler)
server.use(notFoundHandler)
server.use(genericHandler)

const io = new Server(httpServer)
// io.on('connection', connectionHandler)
io.on('connection', (socket) => {
  console.log('Connection established')
  console.log(socket)
})

// connect to mongo
mongoose.connect(process.env.MONGO_CONNECTION_URL)

mongoose.connection.on('connected', () => {
  console.log('Connected to Mongo!')
  server.listen(port, () => {
    console.table(listEndpoints(server))
    console.log(`Server running on port ${port}`)
  })
})
