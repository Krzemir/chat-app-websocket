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


//FUNCTIONS

const login = (e) => {
    e.preventDefault();

    if (select.userNameInput.value) {
        userName = select.userNameInput.value;
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
      <div class="message__content">
        ${content}
      </div>
    `;
    select.messagesList.appendChild(message);
  }

const sendMessage = (e) => {
    e.preventDefault();
    if (select.messageContentInput.value) {
        addMessage(userName, select.messageContentInput.value);
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