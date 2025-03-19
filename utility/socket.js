let connection = null;

class Socket {
    socket;
    prop;
    
    constructor() {
        this.socket = null;
        this.prop = null;
    }
    connect(server) {
        const io = require("socket.io")(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST","PUT", "DELETE"]
            }
        });
        io.on("connection", (socket) => {
            this.socket = socket;
        });
    }
    emit(event, data) {
        this.socket.emit(event, data);
    }
    static init(server) {
        if (!connection) {
            connection = new Socket();
            connection.connect(server);
        }
    }
    static getConnection() {
        if (connection) {
        return connection;
        }
    }
}

module.exports= {
    connect: Socket.init,
    connection: Socket.getConnection
}