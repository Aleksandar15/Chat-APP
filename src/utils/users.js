// Section 17 Video 18 Minute 1

const users = []

// addUser, removeUser, getUser, getUsersInRoom // HIS COMMENTS S17,V18,M1

// Section 17 VIdeo 18 Minute 2
const addUser = ({ id, username, room }) => {
  // Clean the data //HIS COMMENTS
  username = username.trim().toLowerCase()
  room = room.trim().toLowerCase()

  // Validate the data //HIS COMMENTS
  if (!username || !room) {
    return {
      error: 'Username and room are required!'
    }
  }
  // Check for existing user //HIS COMMENTS
  const existingUser = users.find((user) => {
    return user.room === room && user.username === username //We can have same USERNAME but in DIFFERENT ROOMS!
  })
  // Validate username //HIS COMMENTS
  if (existingUser) {
    return {
      error: 'Username is already taken!'
    }
  }
  // Store user //HIS COMMENTS
  const user = { id, username, room }
  users.push(user)
  return {
    user
  }
}

// Section 17 Video 18 Minute 12
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id)
  // {
  //   return user.id === id
  // })
  if (index !== -1) {
    return users.splice(index, 1)[0] //We are hardcoding hard coding it
  }
}

// Section 17 Video 19 Minute 1 [exercises ~ challenges]
const getUser = (id) => {
  return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
  room = room.trim().toLowerCase() //This was Optional he says (s17,V19,M5.5)=>ITS SO CONFUSING I dont understand anything yet;advanced tips;senior developer;bragging on interviews once i LEARN this
  return users.filter((user) => user.room === room)
}
//

// Section 17 Video 19 Minute 7
module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
}
//

// // Test user //ALL BELOW IS DELETED+++^^^Above is EXPORTeD functions to be IMPORTeD
// addUser({ 
//   id: 22,
//   username: 'Alex',
//   room: 'EUROPEAN Room'
// })
// addUser({ 
//   id: 32,
//   username: 'Jess',
//   room: 'EUROPEAN Room2'
// })
// addUser({ 
//   id: 42,
//   username: 'Alex',
//   room: 'EUROPEAN Room2'
// })

// const user = getUser(42)
// // console.log(user)

// const userList = getUsersInRoom('european room2')
// console.log(userList)

// // console.log(users)

// // // S17 V18 M10 [same VIDEO (as creation of this file-written on top) but testing 2nd user]
// // const res = addUser({
// //   id: 33,
// //   username:'Alex',
// //   room: 'european room' //Fails if in same ROOM=SAME USERNAMES :)
// // })

// // // S17 V18 M16 //hardcoding testing hard coding
// // const removedUser = removeUser(22)
// // console.log(removedUser)
// // console.log(removeUser)
// // console.log(users)
// // // console.log(res)
