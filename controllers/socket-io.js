
exports.init = function(io) {
  io.sockets.on('connection', function (socket) {
    console.log("try");
    try {
      /**
       * create or joins a room
       */
      // socket.on('create or join', function (room, userId) {
      //   socket.join(room);
      //   io.sockets.to(room).emit('joined', room, userId);
      // });

      socket.on('chat', function ( userId, chatText) {
        io.sockets.emit('chat',userId, chatText);
      });

      socket.on('disconnect', function(){
        console.log('someone disconnected');
      });
    } catch (e) {
    }
  });
}
