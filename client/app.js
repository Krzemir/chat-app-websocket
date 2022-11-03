
//GLOBAL VARs
let userName = '';


//SELECTORS
const select = {
    loginForm: document.getElementById('welcome-form'),
    messagesSection: document.getElementById('messages-section'),
    messagesList: document.getElementById('messages-list'),
    addMessageForm: document.getElementById('add-messages-form'),
    userNameInput: document.getElementById('username'),
    messageContentInput: document.getElementById('message-content')
}


//SOCKET
const socket = io();
socket.on('message', ({ author, content }) => addMessage(author, content));
socket.on('join', ({name, id}) => login(name, id));
socket.on('remove', ({author, content}) => addMessage(author, content));

//FUNCTIONS
const login = (e) => {
    e.preventDefault();

    if (select.userNameInput.value) {
        userName = select.userNameInput.value;
        socket.emit('join',{name: userName, id: socket.id});
        select.loginForm.classList.remove('show');
        select.messagesSection.classList.add('show');
    } else 
    {
        alert('Fill your name');
    }
}

function addMessage(author, content) {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if(author === userName) message.classList.add('message--self');
    message.innerHTML = `
      <h3 class="message__author">${userName === author ? 'You' : author }</h3>
      <div class=${author == 'Chat Bot' ? `"message__content message--bot"` : "message__content"}>
        ${content}
      </div>
    `;
    select.messagesList.appendChild(message);
  }

const sendMessage = (e) => {
    e.preventDefault();
    let messageContent = select.messageContentInput.value;

    if (select.messageContentInput.value) {
        addMessage(userName, select.messageContentInput.value);
        socket.emit('message', { author: userName, content: messageContent })
        select.messageContentInput.value = '';

    } else {
        alert('Type your message')
    }
}

//-------

select.loginForm.addEventListener('submit', (e) => {
    login(e);
})

select.addMessageForm.addEventListener('submit', (e) => {
    sendMessage(e);
})