module.exports = function (server) {
    const io = require('socket.io')(server);

    let onlineUsers = [];
    let messages = [];

    io.on('connection', (socket) => {
        io.emit('CONNECTED_USERS', onlineUsers);
        io.emit('PREVIOUS_MESSAGES', messages);

        socket.on('USER_CONNECTED', (user) => {
            onlineUsers.push(user);
            io.emit('USER_CONNECTED', user);
        });

        socket.on('MESSAGE', (messageData) => {
            messages.push(messageData);
            io.emit('MESSAGE', messageData);
        });

        socket.on('USER_DISCONNECTED', (user) => {
            onlineUsers = onlineUsers.filter(u => u.id !== user.id);
            io.emit('USER_DISCONNECTED', user);
        });
    });
}
