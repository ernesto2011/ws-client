import { connectToServer } from './socket-client'
import './style.css'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <input id="jwtToken" placeholder=" Json web token" />
    <button id="connect">Connect</button>
    <br />
    <span id="status">OFFLINE</span>
    <ul id="clients-ul"></ul>
    <form id="message-form">
      <input placeholder="Payload" id="message-input">
    </form>
    <h3>Mensajes</h3>
    <ul id="messages-ul"></ul>
  </div>
`
//connectToServer();
const jwtToken = document.querySelector<HTMLInputElement>('#jwtToken')!
const connectBtn = document.querySelector<HTMLButtonElement>('#connect')!
connectBtn.addEventListener('click', () => {
  if(jwtToken.value.trim().length <= 0) return alert('Enter a valid JWT')
  connectToServer(jwtToken.value)
})
