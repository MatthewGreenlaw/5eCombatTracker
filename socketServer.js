const io = require('socket.io')()
const port = 3001;
var connections = []
var targets = ["None"]

function addConnection (data) {
  var lobby = data.lobby.toString()
  if(connections[lobby.toString()] === undefined){
    connections[lobby.toString()] = [{
      id: data.socket.id,
      type: data.socket.handshake.query.type,
      name: data.socket.handshake.query.name,
    }]
  }
  else {
    connections[data.lobby].push({
      id: data.socket.id,
      type: data.socket.handshake.query.type,
      name: data.socket.handshake.query.name,
    })
  }
    console.log("New Connection:")
    console.log(connections)
}

function removeConnection (id) {
  for (var i in connections){
    var lobby = connections[i]
    for (var j in lobby){
      var connection = lobby[j]
      if (connection.id === id){
        lobby.splice(j, 1)
      }
      if(connection.length < 1)
        delete connections[i][j]
    }
    if(connections[i].length < 1)
      delete connections[i]
  }
  console.log("Removed Connection:")
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

io.on('connection', (socket) => {
  var lobby = socket.handshake.query.lobby;

  addConnection({
    lobby: lobby,
    socket: socket
  })

  socket.join(lobby)

  socket.on('disconnect', () => {
    removeConnection(socket.id)
    removeItem(targets, socket.handshake.query.name)

  })
  io.to(socket.id).emit('initTargets', connections[lobby])

  io.emit('updateInitiative', connections)

  socket.on('updateInitiative', (player) => {
    console.log(player.name + " rolled " + player.init + " for initiative")
    io.to(lobby).emit('updateInitiative', player)
  })

  socket.on('actionFromPlayer', (data) => {
    console.log(data)
    console.log(data.player + " " +data.action + "ed " + data.target + " for " + data.roll)

    io.to(lobby).emit('actionFromServer', {
      player: data.player,
      target: data.target,
      action: data.action,
      roll: data.roll
    })
  })

  socket.on('addTargets', (_targets) => {
    _targets.forEach((target) => {
      if(!targets.includes(target))
        targets.push(target)
    })
    io.to(lobby).emit('updateTargets', targets)
  })

  socket.on('removeTarget', (target) => {
    for (var i in targets){
      var check = targets[i]
      if(check = target)
      targets.splice(i, 1)
    }
    io.to(lobby).emit('updateTargets', targets)
  })

  socket.on('getPlayers', () => {
    io.to(lobby).emit('sendPlayers', connections)
  })
})

io.listen(port, (error) => {
  if (error) throw error
  console.log('Server running. Listening on port %s', port)
})
