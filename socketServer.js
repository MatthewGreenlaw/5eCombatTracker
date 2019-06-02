const io = require('socket.io')()
const port = 3001;
var connections = []

function addConnection (socket) {
    connections.push({type: socket.handshake.query.type, id: socket.id})
    console.log("New Connection:")
    console.log(connections)
}

function removeConnection (socket) {
  for (var i in connections) {
    if (connections[i].id === socket.id){
      connections.splice(i, 1);
      return
    }
  }
  console.log("Removed Connection:")
  console.log(connections)
}

io.on('connection', (socket) => {
  addConnection(socket)
  socket.on('disconnect', () => {
    removeConnection(socket)
  })

  socket.on('actionFromPlayer', (data) => {
    io.emit('actionFromServer', {
      from: data.name,
      to: data.target,
      action: data.action,
      roll: data.roll
    })
  })
})

io.listen(port, (error) => {
  if (error) throw error
  console.log('Server running. Listening on port %s', port)
})
