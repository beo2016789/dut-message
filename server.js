const app = require('./app')
const server = require('http').createServer(app)
const io = require('socket.io')(server)

const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log(`Server is running in PORT ${PORT}`))