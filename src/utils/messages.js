const generateMessage = (username, text) => {
  return {
    username,
    text,
    createdAtMessagesChatMsg: new Date().getTime()
  }
}
const generateLocationMessage = (username, urlMessages) => {
  return {
    username,
    urlMessages,
    createdAtChatMessagesLoc: new Date().getTime()
  }
}

module.exports = {
  generateMessage,
  generateLocationMessage
}