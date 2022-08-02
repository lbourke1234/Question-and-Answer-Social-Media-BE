import UserModel from '../apis/users/model.js'
import MessageModel from '../apis/messages/model.js'

let onlineUsers = []

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

    socket.join(payload.room)

    console.log('ROOM ', payload.room)

    socket.emit('loggedin', onlineUsers)

    socket.broadcast.emit('newConnection', onlineUsers)
  })

  socket.on('sendMessage', async ({ text, catName, profileId, profileName }) => {
    try {
      const newMessage = new MessageModel({
        text,
        room: catName,
        sender: profileId,
        senderName: profileName
      })
      console.log('in the on.sendMessage now')
      const savedMessage = await newMessage.save()
      socket.to(catName).emit('message', { text, profileName, catName, savedMessage })
    } catch (error) {
      console.log(error)
    }
  })

  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id)
    socket.broadcast.emit('newConnection', onlineUsers)
  })
}
export default connectionHandler
