const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

const messages = [];
const users =[]

app.use(express.static(path.join(__dirname, '/client')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html'));
  });

const server = app.listen(8000, ()=> {
    console.log('Server running on port: 8000')
})

const io = socket(server);

io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);
    socket.on('join', payload => {
        users.push(payload);
        socket.broadcast.emit('message', {author: 'Chat Bot', content: payload.name + ' has joined the conversation!'})
        console.log('User is logged in. User name is ' + payload.name);
    })
    
    socket.on('message', (message) => {
        console.log('Oh, I\'ve got something from ' + socket.id);
        messages.push(message);
        socket.broadcast.emit('message', message);
      });

    socket.on('disconnect', () => { 
        const removedUser = users.find(e => e.id == socket.id);
        const indexOfUser = users.indexOf(removedUser);
        users.splice(indexOfUser, 1);
        socket.broadcast.emit('remove', {author: 'Chat Bot', content: removedUser.name + ' has left the conversation!'})
        console.log('Oh, socket ' + socket.id + ' has left'); 
    });

    
    console.log('I\'ve added a listener on message and disconnect events \n');
  });