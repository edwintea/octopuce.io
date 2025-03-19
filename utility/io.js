let io;
exports.socketConnection = (server) => {
  io = require('socket.io')(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST","PUT", "DELETE"]
    }
  });

  io.on('connection', (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    socket.join(socket.request._query.id);

    //static event cahange to dynamic room by socket.id
    socket.on('server', function(obj) {
        console.log('Info from server : '+obj.name +':'+ obj.email + ': ' + obj.message);  
        io.emit('server', obj);
    });

    //static event cahange to dynamic room by socket.id
    socket.on('client', function(obj) {
        console.log('Info from server : '+obj.name +':'+ obj.email + ': ' + obj.message);  
        //broadcast
        socket.broadcast.emit('client', obj);

        //all sent include sender
        //io.emit('client', obj);
    });

    // This is called when a client disconnects
    socket.on('disconnect', function() {
        console.log('IO Disconnected')
        console.info(`Client disconnected [id=${socket.id}]`);
        io.emit('server',{count:1,status:'disconnected'});
    });
  });
};

exports.sendMessage = (key, message) => {
    io.emit(key, message)
};

exports.getRooms = () => io.sockets.adapter.rooms;