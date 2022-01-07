const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const socketio = require('socket.io')
const io = socketio(server)
const path = require('path')
const { generateMessage, generateLocationMessage } = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))
const Filter = require('bad-words')

io.on('connection', (socket) => {
  console.log('New WebSocket connection')
  socket.on('join', (options, callbackFromChatJS) => {
    const { error, user } = addUser({ id: socket.id , ...options })

    if (error) {
      return callbackFromChatJS(error)
    }
    socket.join(user.room)
    socket.emit('messageIndexChat', generateMessage('Chat App by Aleksandar15', 'Welcome!'))
    socket.broadcast.to(user.room).emit('messageIndexChat', generateMessage('Chat App by Aleksandar15', `${user.username} has joined!`))
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getUsersInRoom(user.room)
    })
    callbackFromChatJS()
  })
  socket.on('messageTyped', (messageReceived, callbackIndex) => {
    const user = getUser(socket.id)
    const filter = new Filter()

    if(filter.isProfane(messageReceived)) {
      return callbackIndex('Profanity is not allowed!')
    }
    io.to(user.room).emit('messageIndexChat', generateMessage(user.username, messageReceived))
    callbackIndex()
  })
  socket.on('sendLocation', (myCoords, callbackAnyName) => {
    const user = getUser(socket.id)
    io.to(user.room).emit('locationIndexChat', generateLocationMessage(user.username, `https://www.google.com/maps?q=${myCoords.latitude},${myCoords.longitude}`))
    callbackAnyName()
  })
  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('messageIndexChat', generateMessage('Chat App by Aleksandar15', `${user.username} has left!`))
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getUsersInRoom(user.room)
      })
    }
  })
})

const PORT = process.env.PORT || 3000
// app.listen(PORT, () => {
server.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`)
})