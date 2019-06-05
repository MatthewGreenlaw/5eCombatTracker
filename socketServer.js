const io = require('socket.io')()
const port = 3001;
var connections = []
var targets = ["None"]

function addConnection (socket) {
    connections.push({
      type: socket.handshake.query.type,
      name: socket.handshake.query.name,
      id: socket.id
    })
    console.log("New Connection:")
    console.log(connections)
}

function removeItem(list, socket) {
  for (var i in list) {
    if (list[i].id === socket.id){
      list.splice(i, 1);

      console.log("Removed:")
      console.log(list)
      return
    }
  }
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
  socket.emit('addTargets', [socket.handshake.query.name])

  socket.on('disconnect', () => {
    removeItem(connections, socket)
    removeItem(targets, socket.handshake.query.name)

  })

  io.emit('updateInitiative', connections)

  socket.on('updateInitiative', (player) => {
    console.log(player.name + " rolled " + player.init + " for initiative")
    io.emit('updateInitiative', player)
  })

  socket.on('actionFromPlayer', (data) => {
    console.log(data)
    console.log(data.from + " " +data.action + "ed " + data.to + " for " + data.roll)

    io.emit('actionFromServer', {
      from: data.name,
      to: data.target,
      action: data.action,
      roll: data.roll
    })
  })

  socket.on('addTargets', (_targets) => {
    _targets.forEach((target) => {
      if(!targets.includes(target))
        targets.push(target)
    })
    io.emit('updateTargets', targets)
  })

  socket.on('removeTarget', (target) => {
    for (var i in targets){
      var check = targets[i]
      if(check = target)
      targets.splice(i, 1)
    }
    io.emit('updateTargets', targets)
  })

  socket.on('getPlayers', () => {
    io.emit('sendPlayers', connections)
  })
})

io.listen(port, (error) => {
  if (error) throw error
  console.log('Server running. Listening on port %s', port)
})
