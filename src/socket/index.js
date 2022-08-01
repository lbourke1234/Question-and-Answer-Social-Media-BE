import UserModel from '../apis/users/model.js'
import MessageModel from '../apis/messages/model.js'

const onlineUsers = []

const connectionHandler = (socket) => {
  console.log('connection established!')
  socket.emit('welcome', { message: `Hello ${socket.id}!` })

  socket.on('connect_error', (err) => {
    console.log(`connect_error due to ${err.message}`)
  })

  socket.on('setUsername', async (payload) => {
    onlineUsers.push({
      userId: payload.userId,
      name: payload.name,
      socketId: socket.id,
      room: payload.room
    })
    const updatedUserSocket = await UserModel.findByIdAndUpdate(
      payload.userId,
      { userSocketId: socket.id },
      { new: true, runValidators: true }
    )

    console.log('ONLINE USERS: ', onlineUsers)

    socket.join(payload.room)

    console.log('ROOMS ', socket.rooms)

    socket.emit('loggedin', onlineUsers)

    socket.broadcast.emit('newConnection', onlineUsers)
  })

  socket.on('sendmessage', async ({ message, room }) => {
    try {
      const newMessage = new MessageModel({ text: message, room })
    } catch (error) {
      console.log(error)
    }

    socket.to(room).emit('message', message)
  })

  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id)
    socket.broadcast.emit('newConnection', onlineUsers)
  })
}
export default connectionHandler
