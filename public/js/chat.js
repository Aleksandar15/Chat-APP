// io()
const socket = io()

// Elements
const $messageForm = document.querySelector('#message-form') 
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButton = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML //Script tag must MATCH with index.HTML's
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML

// Options 
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

const autoscroll = () => {
  // New message element
  const $newMessage = $messages.lastElementChild
  // Height of the new message
  const newMessageStyles = getComputedStyle($newMessage)
  const newMessageMargin = parseInt(newMessageStyles.marginBottom)
  const newMessageHeight = $newMessage.offsetHeight + newMessageMargin
  // console.log(newMessageMargin)
  // Visible height
  const visibleHeight = $messages.offsetHeight
  // Height of message container (that I can't see)
  const containerHeight = $messages.scrollHeight

  // How far have I scrolled? [from down-BoTToM]
  const scrollOffset = $messages.scrollTop + visibleHeight
      if (containerHeight - newMessageHeight <= scrollOffset+1) {
    $messages.scrollTop = $messages.scrollHeight
  }
}

socket.on('messageIndexChat', (messageChat) => {
  console.log(messageChat)
  const html = Mustache.render(messageTemplate, {
    usernameForMessage: messageChat.username,
    message: messageChat.text, // or .textChat to differentiate from messages.js
    createdAtMustMatchChatJSIndexHtml: moment(messageChat.createdAtMessagesChatMsg).format('MMM-DD-YY (ddd) h:mm A') // for USA. EUROPE: ('DD-MMM-YY...')
  })
  $messages.insertAdjacentHTML('beforeend', html)
  autoscroll()

})

socket.on('locationIndexChat', (urlForGoogleMaps) => {
  console.log('1:', urlForGoogleMaps)
  const html = Mustache.render(locationMessageTemplate, {
    usernameLocationChat: urlForGoogleMaps.username,
    url: urlForGoogleMaps.urlChat, 
    createdAtChatHtml: moment(urlForGoogleMaps.createdAtChatMessagesLoc).format('MMM-DD-YY (ddd) h:mm A') // for USA. EUROPE: ('DD-MMM-YY...')
  })
  $messages.insertAdjacentHTML('beforeend', html)
  autoscroll()

})

socket.on('roomUsers', ({ room, users }) => {
  const html = Mustache.render(sidebarTemplate, {
    room,
    users
  })
  document.querySelector('#sidebar').innerHTML = html
})
$messageForm.addEventListener('submit', (e) => { 
  e.preventDefault()
  // dissable: 
  $messageFormButton.setAttribute('disabled', 'disabledAnyName') //2nd Second argument can be named anything

  const messageReceived = e.target.elements.messageInput.value

  socket.emit('messageTyped', messageReceived, (messageFromIndexJsCallback) => {
    // enable: 
    $messageFormButton.removeAttribute('disabled') 
    $messageFormInput.value = ''
    $messageFormInput.focus()
    if (messageFromIndexJsCallback) {
      return console.log(messageFromIndexJsCallback)
    }
    console.log('Message delivered!')
  })
})

$sendLocationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocation is not supported by your browser.')
  }

  $sendLocationButton.setAttribute('disabled', 'disabledAnyName2')

  navigator.geolocation.getCurrentPosition((position) => {
    socket.emit('sendLocation', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    }
  , () => {
    $sendLocationButton.removeAttribute('disabled')
    console.log('Location shared successfuly!')
  })
  })
})

socket.emit('join', { username, room },
  (error) => {
    if (error) {
      alert(error)
      location.href = '/'
    }
  }
)