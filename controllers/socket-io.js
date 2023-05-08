exports.init = function(io) {
    io.on('connection', function (socket) {
        console.log('A user connected');

        socket.on('chat', function (userId, chatText) {
            io.emit('chat', userId, chatText);
        });

        socket.on('disconnect', function() {
            console.log('A user disconnected');
        });
    });
};
