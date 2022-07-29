const connectionHandler = (socket) => {
  socket.emit('welcome', { message: `Hello ${socket.id}!` })
  console.log('Connection established')
}
export default connectionHandler
