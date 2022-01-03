// Section 17 Video 13 Minute 8
// const generateMessage = (text) => { //for now (value) Message (of)'TEXT' is the FIRST and ONLY PARAMETERS!
// Edits^^^^^into:Section 17 Video 21 Minute 9: [Solutions to exercises challanges]
const generateMessage = (username, text) => { //NOT ANYMORE:for now (value) Message (of)'TEXT' is the FIRST and ONLY PARAMETERS!
  return {
    // Section 17 Video 21 Minute 9: [Solutions to exercises challanges]
    username,
    text,
    createdAtAnyNameMustMatchChatJSMessagesJS: new Date().getTime()
  }
}

// Section 17 Video 14 Minute 0 [exercises challenges]
// const generateLocationMessage = (urlOrAnyNameDoesntNeedTOMatchChatJS) => {
// Edits^^^^^into:Section 17 Video 21 Minute 5:
const generateLocationMessage = (username, urlOrAnyNameDoesntNeedTOMatchChatJS) => {
  return {
    // Section 17 Video 21 Minute 5:
    username,
    //
    // url: `https://www.google.com/maps?q=${myCoords.latitude},${myCoords.longitude}`,
    urlOrAnyNameDoesntNeedTOMatchChatJS,
    createdAtAnyNameMustMatchChatJSMessagesJSMaps: new Date().getTime()
  }
}

module.exports = {
  generateMessage,
  generateLocationMessage
}