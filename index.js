const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

const onlineUsers = []

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })
  socket.on('hello', (username) => {
    onlineUsers.push(username + '-' + onlineUsers.length)
    io.emit('hello', onlineUsers)
  })
  socket.on('bye', (username) => {
    onlineUsers.splice(onlineUsers.indexOf(username), 1)
    io.emit('hello', onlineUsers)
  })
})

http.listen(port, '0.0.0.0', () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`)
})
