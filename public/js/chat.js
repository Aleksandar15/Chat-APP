// Section 17 Video 4:
// io()
// Section 17 Video 5 Minute 4: [socket or any name]
const socket = io()

// Elements //His comments Section 17 Video 10 Minute 1:
const $messageForm = document.querySelector('#message-form') //so down below we change the document.querySelector...=for This Variable
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
// Continuous Solutions of Section 17 Video 10 Minute 9 [exercises challenges]
const $sendLocationButton = document.querySelector('#send-location')
// Section 17 Video 11 Minute 5
const $messages = document.querySelector('#messages')


// Templates //His comments Section 17 Video 11 Minute 5
const messageTemplate = document.querySelector('#message-template').innerHTML //Script tag must MATCH with index.HTML's
// Section 17 Video 12 MInute 7
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML
// Section 17 Video 22 Minute 8 //LOL im WRiting SECTIONS NUMBERS and this main projects is only in 1 one SECTIONS
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML


// Options //His comments Section 17 Video 17 Minute 2
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

// Video 23 Minute 3:
const autoscroll = () => {
// const autoscroll = async() => {
  // Auto Scrolls doesnt work What i Tried : the below cant be OUTSIDE bcuz getCOmputedStyle on Window
  // I also tried to not have IF statements=>it works, but ALWAYS works,doesnt care if u stand somewhere

  // New message element
  const $newMessage = $messages.lastElementChild

  // Height of the new message
  const newMessageStyles = getComputedStyle($newMessage)
  const newMessageMargin = parseInt(newMessageStyles.marginBottom)
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin

  // console.log(newMessageMargin)

  // Visible height // Video 23 Minute 9
  const visibleHeight = $messages.offsetHeight
  // const visibleHeight = $messages.offsetHeight+1 // WORKS when its +1
  // const visibleHeight = $messages.offsetHeight++ //Doesnt Work (only in scrollTop it works=BCUZ GOOGLE CHROME Problems in 100% zoom FUll Page VIEWpointS)

  // Height of message container (that I cant see)
  const containerHeight = $messages.scrollHeight

  // How far have I scrolled? [from down-BoTToMs]
  // const scrollOffset = $messages.scrollTop + visibleHeight
  // const scrollOffset = $messages.scrollTop + visibleHeight++ // doesNt WORKS its a CONST (visibleHeight) it needs ++ when its DECLARED to its VALUE++ =>...if not put BELOW +1 (in IF statement)
  const scrollOffset = $messages.scrollTop + visibleHeight // [It works with the +1 instead of ++ ; WORKS [not it doesnt!] if not put BELOW +1 (in the IF statement)
// // console.log('1 ',scrollTop)
// console.log('2 ',$messages.scrollTop)
// Issue to him and all his students: its scrolling 3 times and stops on 4th, 5yh, and 3 times again scrolls to bottom in circle WHEN in 100% ZOOM (normal) if Zoomed OUT=(99%/50%)=WORKS, if zoomed OUT=100%/125%(doesnt)
// if (containerHeight - newMessageHeight <= scrollOffset) {
  // if (Math.floor(containerHeight - newMessageHeight) <= scrollOffset) {
    // if (scrollTop < 0 && containerHeight - newMessageHeight <= scrollOffset) { //no Math.floor nor Math.ceil works
    // if ($messagess.scrollTop < 0 && containerHeight - newMessageHeight <= scrollOffset) { //no $messages.scrollTop < 1 NOR < 0 WORKS.DOESNT WORK.
    // if ($messages.scrollHeight > 0 && containerHeight - newMessageHeight <= scrollOffset) { //the $messages.scrollHeight > 0 ===works THE SAME (it doesnt fix the ZOOMED in 100%+ issues)
    // if (visibleHeight > 16 && containerHeight - newMessageHeight <= scrollOffset) {
      if (containerHeight - newMessageHeight <= scrollOffset+1) {
  // console logs: 328 - 61 <= 267.6
  // console logs: 450 - 61 <= 388.8 //This is when it fails+: 389 <= 388.8 ===FALSE,Failed,Wrong.
    // // console.log('3 ',scrollTop)
    // console.log('4 ',$messages.scrollTop)
    // Test: 69420:
    // return $messages.scrollTop = $messages.scrollHeight //Return didn't matter, its when 100% (NORMAL) or more zoomed it doesnt work=it only works in less than 99%+++Some google results say to use Math.floor()
    // return keepScrolling
    //
    // return $messages.scrollTop = $messages.scrollHeight
    $messages.scrollTop = $messages.scrollHeight
    // // console.log('5 ',scrollTop)
    // console.log('6 ',$messages.scrollTop)
  }
  // // return $messages.scrollTop
  // // $messages.scrollTop //SAME BROKEN RESULTS= good console.logs but DOESNT WORK
  // // $messages.scrollHeight = $messages.scrollTop
  // // console.log('7 ',scrollTop)
  // console.log('8 ',$messages.scrollTop)
  // console.log('newMessageStyles:',newMessageStyles)
  // console.log('newMessageStyles.marginBottom:(should be same as newMessageMargin)',newMessageStyles.marginBottom)
  // console.log('newMessageMargin:',newMessageMargin)
  // console.log('newMessageHeight:',newMessageHeight)
  // console.log('visibleHeight:',visibleHeight)
  // console.log('containerHeight: ',containerHeight)
  // console.log('scrollOffset: ',scrollOffset)

}

// autoscroll() //Failed to execute 'getComputedStyle' on 'Window': parameter 1 is not of type 'Element'
// console.log('after 8.autoscroll: ',autoscroll())


// Section 17 Video 9 Minute 1 (HIS COMMENTS-slikovito)
// server (emit) -> client (receive) --acknowledgement--> server
// client (emit) -> server (receive) --acknowledgement--> client

// Section 17 Video 6 Minute 3:
socket.on('messageOrAnyNameWeSetToMatchChatJsAndIndexJs', (messageOrAnyName) => {
  console.log(messageOrAnyName)
  // Section 17 Video 11 Minute 7:
  const html = Mustache.render(messageTemplate, {
    // Section 17 Video 21 Minute 11:
    usernameForMessage: messageOrAnyName.username,
    // Section 17 Video 11 Minute 10:
    // message //same as===> message: message [possible ISSUE(it HAPPENED!):VALUE comes from the VARIABLE of the SAME name in our FUNCTIONs PARAMETERs (mine is messageOrAnyName ===which is different than his 'message'-ONLY!!)]
    // message: messageOrAnyName //for me only 'message' doesnt work bcuz ^^^^^ My VALUE has different name of VARIABLE from the Function-PARAMETERs===name is different than 'message'
    // Section 17 Video 13 Minute 11 Edits ^^^^^into:
    message: messageOrAnyName.text, //for me only 'message' doesnt work bcuz ^^^^^ My VALUE has different name of VARIABLE from the Function-PARAMETERs===name is different than 'message'
    // Section 17 Video 13 Minute 14
    // createdAtMustMatchChatJSIndexHtml: messageOrAnyName.createdAtAnyNameMustMatchChatJSMessagesJS
    // Section 17 Video 13 Minute 17
    // createdAtMustMatchChatJSIndexHtml: moment(messageOrAnyName.createdAtAnyNameMustMatchChatJSMessagesJS).format('(ddd) DD-MMM-YYYY h:mm a') //for EUROPE
    createdAtMustMatchChatJSIndexHtml: moment(messageOrAnyName.createdAtAnyNameMustMatchChatJSMessagesJS).format('MMM-DD-YY (ddd) h:mm A') //for USA
  })
  $messages.insertAdjacentHTML('beforeend', html)
  // Video 23 Minute 3:
  // // console.log('newMessageStyles:',newMessageStyles)
  // // console.log('newMessageMargin:',newMessageMargin)
  // // console.log('newMessageHeight:',newMessageHeight)
  // // console.log('visibleHeight:',visibleHeight)
  // // console.log('containerHeight: ',containerHeight)
  // // console.log('scrollOffset: ',scrollOffset)
  // console.log('9.scrolltop ',$messages.scrollTop)
  // console.log('9.scrollheight ',$messages.scrollHeight)
  // console.log('9.autoscroll() ',autoscroll())
  // // return autoscroll()
  autoscroll()

})

// Section 17 Video 12 Minute 2 [Solutions to exercises challenges]:
socket.on('locationMessageMustMatchIndexJsAndChatJs', (urlAnyNameForGoogleMaps) => {
  console.log('1:', urlAnyNameForGoogleMaps) //this shows
  // console.log('2:', url) //they dont show
  // console.log('3:', urlOrAnyNameDoesntNeedToMatchMessageJS) //they dont show
  // Section 17 Video 12 Minute 8
  const html = Mustache.render(locationMessageTemplate, {
    // Section 17 Video 21 Minute 6:
    // username: message.username, //possible issues as my MESSAGE. has different name
    // Edits^^^^^by me INTO:      //+MESSAGE of course didNt worked.
    usernameForLocation: urlAnyNameForGoogleMaps.username,
    // url //Im pretty sure it will fail since my URL name is different 'URL' (index.html): 'urlAanyNameForGoogleMaps'=chat.js VALUE must be provided  of VARIABLE from the FUNCTION-Parameter
    // url: urlAnyNameForGoogleMaps // YEP bcuz it fails^^^^^
    // Section 17 Video 14 Minute 2 [challenge - exercises]
    url: urlAnyNameForGoogleMaps.urlOrAnyNameDoesntNeedToMatchMessageJS, // YEP bcuz it fails^^^^^
    // createdAtMustMatchChatJSIndexHtmlMaps: moment(urlAnyNameForGoogleMaps.createdAtAnyNameMustMatchChatJSMessagesJSMaps).format('h:mm a')
    // createdAtMustMatchChatJSIndexHtmlMaps: moment(urlAnyNameForGoogleMaps.createdAtAnyNameMustMatchChatJSMessagesJSMaps).format('(ddd) DD MMM YYYY h:mm a') // for EUROPE
    createdAtMustMatchChatJSIndexHtmlMaps: moment(urlAnyNameForGoogleMaps.createdAtAnyNameMustMatchChatJSMessagesJSMaps).format('MMM-DD-YY (ddd) h:mm A') // for USA
  })
  $messages.insertAdjacentHTML('beforeend', html)
  // Video 23 Minute 3:
  // console.log('10 ',$messages.scrollTop)
  // console.log('10.autoscroll() ',autoscroll())
  // // return autoscroll()
  autoscroll()

})

// Section 17 Video 22 Minute 3
socket.on('roomUsers', ({ room, users }) => {
  // console.log(room)
  // console.log(users)
  // Video 22 Minute 8 //There is no other SECTIONs for this PROJECTs
  const html = Mustache.render(sidebarTemplate, {
    room,
    users
  })
  document.querySelector('#sidebar').innerHTML = html
})

// Section 17 Video 6 Minute 5: [same but me trying on my own]
// I GIVE UP - I GAVE UP ->SOLUTIONS:= Even Though the 1st solution was closer having ID in INDEX.HTML FORM tag
// document.querySelector('#message-form').addEventListener('submit', (e) => {
$messageForm.addEventListener('submit', (e) => { // Section 17 Video 10 Minute 2 edits===using new Variable declared above
  e.preventDefault()
  // dissable: //HIS COMMENTS Section 17 Video 10 Minute 1
  // Section 17 Video 10 Minute 4:
  $messageFormButton.setAttribute('disabled', 'disabledAnyName') //2nd Second argument can be anything

  // const messageReceived = document.querySelector('input').value
  // Section 16 Video 6 Minute 14 ^^^^^ ABOVE is EDITEd-modified: ADVANCED HTML5 Accessing ;Connecting HTML and JS; Connect HTML to JS
  // const messageReceived = e.target.elements.message-input.value // .target === ('#message-form') =>The TARGET we are Listening for the EVENT-ON (i dont understand)
  const messageReceived = e.target.elements.messageInput.value
  // Its good EDITS in HTML5 = but is FAILING in here if "NAME" has spaces OR "-" (hyphen) [ex. "name input" or "name-input"===FAILS]

  // socket.emit('messageTyped', messageReceived)
  // Section 17 Video 9 Minute 2:
  socket.emit('messageTyped', messageReceived, (messageFromIndexJsCallback) => {
    // enable: //HIS COMMENTS Section 17 Video 10 Minute 1
    //Section 17 Video 10 Minute 5:
    $messageFormButton.removeAttribute('disabled') 
    $messageFormInput.value = ''
    $messageFormInput.focus()

    // console.log('The message was delivered!', messageFromIndexJsCallback)
    // Section 17 Video 9 Minute 8.8:
    if (messageFromIndexJsCallback) {
      // return console.log(error)
      // // Console.logs = ERROR is not DEFINED
      return console.log(messageFromIndexJsCallback)
    }
    console.log('Message delivered!')
  })
})
// // // 1ST TRY:
// // document.querySelector('#newMessage').addEventListener('click'), (e) => {
// //   e.prevenentDefault()
// //   console.log('New message sent')
// //   socket.emit('newMessage')
// // }
// // // 2ND TRY: [i MEAN i KNOW i DIDNT NEED to declare a variable for them, i was close I JUST STILL have difficulties with ARGUMENTS]
// const messageForm = document.querySelector('form')
// const messageTyped = document.querySelector('input')
// messageForm.addEventListener('submit', (e) => {
//   e.preventDefault()
//   const messageReceived = messageTyped.value
//   socket.emit(messageReceived)
// })
//

// Section 17 Video 6 Minute 3 COMMENTS out/deletes the below:
// socket.on('countUpdated', (countOrAnyName) => {
//   console.log('The count has been updated', countOrAnyName)
// })

// // Section 17 Video 5 Minute 8:
// document.querySelector('#increment').addEventListener('click', () => {
//   console.log('CLICKED')
// // Section 17 Video 5 Minute 9:
//   socket.emit('increment')
// })


// Section 17 Video 8 Minute 2.2:
$sendLocationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser.')
  }

  // Section 17 Video 10 Minute 9:
  $sendLocationButton.setAttribute('disabled', 'disabledAnyName2')

  navigator.geolocation.getCurrentPosition((position) => {
    // console.log(position)
    // Section 17 Video 8 Minute 8: challenge exercise HIS SOLUTIONS [i GIVE UP]
    socket.emit('sendLocation', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }
    // Section 17 Video 9 Minute 11: [Solutions to Challenges exercises]
  , () => {
    // Section 17 Video 10 Minute 10: [Solutions to challenges exercises]
    $sendLocationButton.removeAttribute('disabled')
    //
    console.log('Location shared successfuly!')
  })
  //
  })
  // // Section 17 VIdeo 8 Minute 8 Challenge time exercises: [ME TRYING]===i Give UP
  // const locationSend = navigator.geolocation.getCurrentPosition().latitude

  // socket.emit('send-location', locationSend)

})

// Section 17 Video 17 Minute 4
socket.emit('join', { username, room },
// Section 17 Video 20 Minute 4 //This will be called as callBackFromChatJS ->INSIDE of a INDEX.JS
  (error) => {
// Section 17 Video 20 Minute 12
    if (error) {
      alert(error)
      location.href = '/'
    }
  }
)