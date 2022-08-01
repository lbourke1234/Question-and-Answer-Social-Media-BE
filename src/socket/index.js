import UserModel from '../apis/users/model.js'
import MessageModel from '../apis/messages/model.js'

let onlineUsers = []

// let chatHistory = []

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

    // console.log('ONLINE USERS: ', onlineUsers)

    socket.join(payload.room)

    console.log('ROOMS ', socket.rooms)

    socket.emit('loggedin', onlineUsers)

    socket.broadcast.emit('newConnection', onlineUsers)
  })

  socket.on('sendMessage', async ({ text, catName, profileId, profileName }) => {
    try {
      // console.log('payload', payload)
      // console.log('name', name)
      console.log('text', text)
      console.log('room', catName)
      console.log('sender', profileId)
      console.log('senderName', profileName)
      const newMessage = new MessageModel({
        text,
        room: catName,
        sender: profileId,
        senderName: profileName
      })
      const savedMessage = await newMessage.save()
      // console.log('newMessage', savedMessage)
      // console.log('senderName', senderName)

      // console.log('chat history before emitting message', chatHistory)
      console.log('before emitting message')
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
