const app = require('./app')
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const socketRouter = require('./socket');

const PORT = process.env.PORT || 3000

io.sockets.on('connection', (socket) => {
    socketRouter(socket, io);
});

server.listen(PORT, () => console.log(`Server is running in PORT ${PORT}`))