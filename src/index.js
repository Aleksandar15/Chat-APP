// Section 17 Video 2 Minute 3.3: starts off with a challenge time exercises:
const express = require('express')
const app = express()
// Section 17 Video 4 Minute 3 [WebSockets SOCKET.io] (possible issues: SHOULD http be declared BEFORE app=express()===iDK==i Think is Best PRACTICES-that he has PATH+HTTP above APP=express())
const http = require('http')
const server = http.createServer(app)
const socketio = require('socket.io')
const io = socketio(server)
// Section 17 Video 2 Minute 5: STUPID ME-BEginner-my WEAKNESS (cant connect HTML to JS)
const path = require('path')
// ^^^^^he says PATH comes with EXPRESSjs so NO NEED TO INSTALL ANY NPM PACKAGES
// Section 17 Video 13 Minute 9
const { generateMessage, generateLocationMessage } = require('./utils/messages')
//
// Section 17 Video 20 Minute 
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')
//
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(publicDirectoryPath))
//
// Section 17 Video 9 Minute 6:
const Filter = require('bad-words')
//

// Section 17 Video 4 Minute 6:
// io.on('connection', () => {
// Section 17 Video 5 Minute 2:
// let count = 0 //Removed Section 17 Video 6 Minute 0
// const messageReceived = messageTyped.value // me trying unsucessfuly to solve S17-V6-M5-challenge
io.on('connection', (socket) => {
  console.log('New WebSocket connection')

  // Se

  // Section 17 Video 6 Minute 2: Challenge time exercises:
  // socket.emit('messageOrAnyNameWeSetToMatchChatJsAndIndexJs', 'Welcome!')
  // ^^^^^^EDITS in Section 17 VIdeo 13 Minute 6^^^^^:into:
  // socket.emit('messageOrAnyNameWeSetToMatchChatJsAndIndexJs', { //We created this all in MESSAGE.js (utils>SRC) ===Section 17 Video 13 Minute 9
  //   text: 'Welcome!',
  //   cretedAt: new Date().getTime()
  // })
  // Section 17 Video 13 Minute 10
  // Section 17 Video 17 Minute 8 Moves the BELOW codes to the CALLBACK FUNCTION (of the SAME VIDEO S17,V17,M5):
  // socket.emit('messageOrAnyNameWeSetToMatchChatJsAndIndexJs', generateMessage('Welcome!'))
  // Section 17 Video 7 Minute 1:
  // socket.broadcast.emit('messageOrAnyNameDidntWork', 'A new user has joined!') //This doesnt work unless FIRST ARguments NAME-matches all the REST!!!
  // socket.broadcast.emit('messageOrAnyNameWeSetToMatchChatJsAndIndexJs', 'A new user has joined!')
  // Edits^^^^^into: Section 17 Video 13 Minute 12
  // Section 17 Video 17 Minute 8 Moves the BELOW codes to the CALLBACK FUNCTION (of the SAME VIDEO S17,V17,M5):
  // socket.broadcast.emit('messageOrAnyNameWeSetToMatchChatJsAndIndexJs', generateMessage('A new user has joined!'))

  // Section 17 Video 17 Minute 5
  // socket.on('join', ({ username, room }, callbackFromChatJS) => { //===S17V20M7 [in the same Video he gives the SPREADing OPERATORS-REST operators-3Dots-3 Dots-Three DOTS]
  socket.on('join', (options, callbackFromChatJS) => {
    //Section 17 Video 20 Minute 1
    // const { error, user } = addUser({ id: socket.id , username, room }) //===S17V20M7 [in the same Video he gives the SPREADing OPERATORS-REST operators-3Dots-3 Dots-Three DOTS]
    const { error, user } = addUser({ id: socket.id , ...options })

    if (error) {
      return callbackFromChatJS(error)
    }
    //
    // socket.join(room) //Edits in S17V20M6-as to add USER. [before ROOM and USERNAME]!!!!!:
    socket.join(user.room)

    // socket.emit('messageOrAnyNameWeSetToMatchChatJsAndIndexJs', generateMessage('Welcome!'))
    // Edits^^^^^:into:Section 17 Video 21 Minute 10 [Solutions to exercises challanges]
    socket.emit('messageOrAnyNameWeSetToMatchChatJsAndIndexJs', generateMessage('Chat App by Aleksandar15', 'Welcome!'))
    // socket.broadcast.to(room).emit('messageOrAnyNameWeSetToMatchChatJsAndIndexJs', generateMessage(`${username} has joined!`)) //Edits in S17V20M6-as to add USER. [before ROOM and USERNAME]:
    // socket.broadcast.to(user.room).emit('messageOrAnyNameWeSetToMatchChatJsAndIndexJs', generateMessage(`${user.username} has joined!`))
    // Edits^^^^^:into:Section 17 Video 21 Minute 10 [Solutions to exercises challanges]
    socket.broadcast.to(user.room).emit('messageOrAnyNameWeSetToMatchChatJsAndIndexJs', generateMessage('Chat App by Aleksandar15', `${user.username} has joined!`))
    // Section 17 Video 22 Minute 1
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getUsersInRoom(user.room)
    })
    // Section 17 Video 20 Minute 5:
    callbackFromChatJS()

    // socket.emit [sends event to specific client], io.emit [sends event to every connected client], socket.broadcast.emit [sends event to every connected client EXCEPT IO.EMIT'ed-USER-himself(thyself)] //HIS COMMENTS
    // io.emit [in one specific room], socket.broadcast.to.emit[options variation to the other^^^variety===sending EVENTs to ALL Members of a SPECIFIC RooM except The Client HIMSELF(thyself)] //HIS COMMENTS
  })
  //

  // Minute 4 me GAVE UP trying to solve the Challenges:+=I GIVE UP+SOLUTIONS:
  socket.on('messageTyped', (messageReceivedButCanBeDifferentThanChatJs, callbackCanItBeAnyName) => {
    // Section 17 Video 21 Minute 2
    const user = getUser(socket.id)
    // Section 17 Video 9 Minute 7 [use NPM bad words Library]
    const filter = new Filter()

    if(filter.isProfane(messageReceivedButCanBeDifferentThanChatJs)) {
      return callbackCanItBeAnyName('Profanity is not allowed!')
    }
    //

    // io.emit('messageOrAnyNameWeSetToMatchChatJsAndIndexJs', messageReceivedButCanBeDifferentThanChatJs)
    // Edits ^^^^^into: Section 17 Video 13 Minute 12:
    // io.emit('messageOrAnyNameWeSetToMatchChatJsAndIndexJs', generateMessage(messageReceivedButCanBeDifferentThanChatJs))
    // Edits ^^^^^into: Section 17 Video 17 Minute 13:
    // io.to('a').emit('messageOrAnyNameWeSetToMatchChatJsAndIndexJs', generateMessage(messageReceivedButCanBeDifferentThanChatJs))
    // Edits ^^^^^into: Section 17 Video 21 Minute 2:
    // io.to(user.room).emit('messageOrAnyNameWeSetToMatchChatJsAndIndexJs', generateMessage(messageReceivedButCanBeDifferentThanChatJs))
    // Edits^^^^^:into:Section 17 Video 21 Minute 10 [Solutions to exercises challanges]
    io.to(user.room).emit('messageOrAnyNameWeSetToMatchChatJsAndIndexJs', generateMessage(user.username, messageReceivedButCanBeDifferentThanChatJs))
    // callbackCanItBeAnyName('Delivered!')
    callbackCanItBeAnyName()
  })
  // // Section 17 VIdeo 6 MInute 10 SOLUTIONS -> I GIVE UP=my WEAKNESS is ARGUMENTS=i Know im 90% there
  // // Minute 4 me trying to solve the Challenges:
  // socket.emit('message', messageReceived) // Funny, how I didnt need to include 2nd argument of a Variable here, but a Welcome message can be left+it is NESTED-by ME-bad Practices for DSA-Data Structures and Algorithms 
  // socket.on('newMessage', (messageReceived) => {
  //   io.emit('newMessage', messageReceived)
  // })
  //
// Section 17 Video 8 Minute 10:
  socket.on('sendLocation', (myCoords, callbackAnyName) => {
    // Section 17 Video 21 Minute 2:
    const user = getUser(socket.id)
    // io.emit('messageOrAnyNameWeSetToMatchChatJsAndIndexJs', `Location: https://www.google.com/maps?q=${myCoords.latitude},${myCoords.longitude}`)
    // ^^^ABOVE is edited in SECTION 17 Video 12 Minute 2: ===> SOLUTIONS to a Challenges Exercises:
    // io.emit('locationMessageMustMatchIndexJsAndChatJs', `Location: https://www.google.com/maps?q=${myCoords.latitude},${myCoords.longitude}`)
    // io.emit('locationMessageMustMatchIndexJsAndChatJs', `https://www.google.com/maps?q=${myCoords.latitude},${myCoords.longitude}`)
    // Section 17 Video 14 Minute 2^^^^^: [exercises - challenges edits]
    // io.emit('locationMessageMustMatchIndexJsAndChatJs', generateLocationMessage(`https://www.google.com/maps?q=${myCoords.latitude},${myCoords.longitude}`))
    // Edits^^^^^into:Section 17 Video 21 Minute 2:
    // io.to(user.room).emit('locationMessageMustMatchIndexJsAndChatJs', generateLocationMessage(`https://www.google.com/maps?q=${myCoords.latitude},${myCoords.longitude}`))
    // Edits^^^^^into:Section 17 Video 21 Minute 6:
    io.to(user.room).emit('locationMessageMustMatchIndexJsAndChatJs', generateLocationMessage(user.username, `https://www.google.com/maps?q=${myCoords.latitude},${myCoords.longitude}`))
    // Section 17 Video 9 Minute 11: [solutions to a challenge exercises]
    callbackAnyName()
  })
// Section 17 Video 7 Minute 5:
  socket.on('disconnect', () => {
    // Section 17 Video 20 Minute 7
    const user = removeUser(socket.id)

    if (user) {
      // io.to(user.room).emit('messageOrAnyNameWeSetToMatchChatJsAndIndexJs', generateMessage(`${user.username} has left!`))
      // Edits^^^^^:into:Section 17 Video 21 Minute 10 [Solutions to exercises challanges]
      io.to(user.room).emit('messageOrAnyNameWeSetToMatchChatJsAndIndexJs', generateMessage('Chat App by Aleksandar15', `${user.username} has left!`))
      // Section 17 VIdeo 22 Minute 2
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getUsersInRoom(user.room)
      })
    }
    //
    // io.emit('messageOrAnyNameWeSetToMatchChatJsAndIndexJs', generateMessage('A user has left')) //[S17V20M8]+This is Put in the ABOVE if ELSE Statements^^^^^
  })
//

// // Section 17 Video 5 Minute 2: //Removed Section 17 Video 6 Minute 0
//   socket.emit('countUpdated', count)

// // Section 17 Video 5 Minute 10: 
//   socket.on('increment', () => {
//     count++
//     // socket.emit('countUpdated', count)
//     // The above socket.emit EVENT ^^^ Doesn't update when 2 users are(only single not multiple), so we will update with a different one
//     io.emit('countUpdated', count)
//   })
//
})

const PORT = process.env.PORT || 3000

// app.listen(PORT, () => {
// Section 17 Video 4 minute 4:^^^APP=SERVER.listen
server.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`)
})
