import {Manager, Socket} from 'socket.io-client'

export const connectToServer = (token: string) =>{
   const manager = new Manager('http://localhost:3000/socket.io/socket.io.js',{
    extraHeaders:{
      authentication: token
    }
   });
   const socket = manager.socket('/')
    addListeners(socket)
}
const addListeners = (socket:Socket) => {
  const serverStatus = document.querySelector('#status')!
  const clientsUl = document.querySelector('#clients-ul')!
  const messageForm = document.querySelector<HTMLFormElement>('#message-form')!
  const messageInput = document.querySelector<HTMLInputElement>('#message-input')!
  const messagesUl = document.querySelector('#messages-ul')!
  socket.on('connect', () => {
    serverStatus.innerHTML = 'Connected'
  })
  socket.on('disconnect', () => {
    serverStatus.innerHTML = 'Disconnect'
  })
  socket.on('clients-updated', (clients: string[]) => {
    let clientsHtml = ''
    clients.forEach(clientId => {
      clientsHtml += `<li>${clientId}</li>`
    })
    clientsUl.innerHTML = clientsHtml
  })
  messageForm.addEventListener('submit', (event) => {
    event.preventDefault()
    if(messageInput.value.trim().length <= 0) return
    socket.emit('message-from-client', {
      id: 'yo',
      message: messageInput.value
    })
    messageInput.value = ''
  })
  socket.on('message-from-server', (payload: {fullName: string, message: string}) => {
    const newMessage = `<li>${payload.fullName}: ${payload.message}</li>`
    const li = document.createElement('li')
    li.innerHTML = newMessage
    messagesUl.append(li)
  })
}