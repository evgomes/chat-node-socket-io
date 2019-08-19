'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const id = document.querySelector('#userid').value;
    const login = document.querySelector('#username').value;
    const user = { id, login };

    const messageInput = document.querySelector('#message');
    const messagesList = document.querySelector('#messages');
    const sendButton = document.querySelector('#send');
    const logout = document.querySelector('#logout');

    const cleanHTML = function(html) {
        return sanitizeHtml(html, {
            allowedTags: ['b', 'i', 'em', 'strong', 'a'],
            allowedAttributes: {
                'a': ['href']
            }
        });
    };

    function markUser(userId, isOnline) {
        let spanUser = document.querySelector(`#user-${userId}`);

        if (!spanUser) {
            return;
        }

        if (isOnline) {
            spanUser.classList.add('text-success');
        } else {
            spanUser.classList.remove('text-success');
        }
    }

    function appendMessage(messageData) {
        const message = cleanHTML(messageData.message);
        if(message === '') {
            return;
        }

        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.innerHTML = `<strong>(${moment().format('HH:mm:ss')}) ${messageData.userLogin}:</strong> ${message}`;

        messagesList.insertBefore(li, messagesList.firstChild);
    }

    const socket = io();
    socket.emit('USER_CONNECTED', user);
    markUser(user.id, true);

    socket.on('USER_CONNECTED', function (connectedUser) {
        if (connectedUser.id === id) {
            return;
        }

        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.classList.add('text-info');

        li.innerHTML = `(${moment().format('HH:mm:ss')}) ${connectedUser.login} entrou...`;

        messagesList.appendChild(li);
        markUser(connectedUser.id, true);
    });

    socket.on('USER_DISCONNECTED', function (disconnectedUser) {
        if (disconnectedUser.id === id) {
            return;
        }

        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.classList.add('text-danger');

        li.innerHTML = `(${moment().format('HH:mm:ss')}) ${disconnectedUser.login} saiu...`;

        messagesList.appendChild(li);
        markUser(disconnectedUser.id, false);
    });

    socket.on('CONNECTED_USERS', function (onlineUsers) {
        for (const user of onlineUsers) {
            markUser(user.id, true);
        }
    });

    socket.on('PREVIOUS_MESSAGES', function (messages) {
        for (const messageData of messages) {
            appendMessage(messageData);
        }
    });

    socket.on('MESSAGE', function (messageData) {
        if (messageData.userId === user.id) {
            return;
        }

        appendMessage(messageData);
    });

    sendButton.addEventListener('click', function (e) {
        const message = messageInput.value.trim();
        if (message === '') {
            return;
        }

        const messageData = { userId: user.id, userLogin: user.login, message: message }
        socket.emit('MESSAGE', messageData);
        appendMessage(messageData);

        messageInput.value = '';
        messageInput.focus();
    });

    messageInput.addEventListener('keyup', function (e) {
        if (e.keyCode !== 13) { // Enter
            return;
        }

        sendButton.click();
    });

    logout.addEventListener('click', function (e) {
        e.preventDefault();

        socket.emit('USER_DISCONNECTED', user);
        window.location.href = '/sair';
    })
});