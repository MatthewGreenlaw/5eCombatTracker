const io = require('socket.io')()
const port = 3001;
var connections = []
var targets = []//DM can have multiple targets, so must keep a sperate list from connections

function addToLobbyArray (arr, data) {
  var lobby = data.lobby.toString()
  //New lobby, Initialize it
  if (arr[lobby] === undefined) {
    arr[lobby] = [data]
  }
  //Lobby exists, add to it.
  else {
    arr[lobby].push(data)
  }
}

function removeFromLobbyArray (lobby, id) {
  if(lobby !== undefined){
    for(var i = lobby.length - 1; i >= 0; i--){
      var item = lobby[i]//item is an object
      if(item.id === id){
        lobby.splice(i, 1)
        console.log("Removing %s", item.name)
      }
    }
  }
}

function removeTarget(lobby, id){
  removeFromLobbyArray(targets[lobby], id)
  if(targets[lobby] !== undefined && targets[lobby].length < 1)
    delete targets[lobby]
  console.log("Removed Target:")
  console.log(targets)
}

function removeConnection(lobby, id){
  removeFromLobbyArray(connections[lobby], id)
  if(connections[lobby].length < 1)
    delete connections[lobby]
  console.log("Removed Connection:")
  console.log(connections)
}

function updateInitiative(lobby, id, init) {
  connections[lobby].forEach((connection) => {
    if(connection.id === id){
        connection.initiative = init
    }
  })
}

io.on('connection', (socket) => {
  var lobby = socket.handshake.query.lobby;
  socket.join(lobby)
  addToLobbyArray(connections, {
    lobby: lobby,
    id: socket.id,
    type: socket.handshake.query.type,
    name: socket.handshake.query.name,
    initiative: '-',
  })


  socket.on('disconnect', () => {
    removeTarget(lobby, socket.id)
    removeConnection(lobby, socket.id)
    io.to(lobby).emit('logAction', socket.handshake.query.name + " left the game.")
    io.to(lobby).emit('targetUpdate', targets[lobby])
  })

  socket.on('updateInitiative', (player) => {
    updateInitiative(lobby, player.id, player.init)
    io.to(lobby).emit('logAction', player.name + "'s initiative is " + player.init + '.')
    io.to(lobby).emit('initiativeUpdate', connections[lobby])
  })

  socket.on('actionFromPlayer', (data) => {
    console.log(data.source.name + " " +data.action + "ed " + data.target.name + " for " + data.roll)
    console.log(data)

    var action;
    if (data.action === 'Damage')
      action = "damaged"
    else
      action = data.action.toLowerCase()+'ed'

    var log = data.source.name + ' '+ action + ' '+ data.target.name + ' for ' + data.roll + '.'
    io.to(lobby).emit('logAction',log)

    var emitAction = "recieve" + data.action//recieve health/damage/attack
    io.to(data.target.id).emit(emitAction, {
      name: data.target.name,//Since monsters use the same socket, we need to validate by name
      roll: data.roll
    })
  })

  //Adds a target to the targets array
  //Called by Entity when the component mounts
  socket.on('addTarget', (target) => {
    if(!targets.includes(target)){
      addToLobbyArray(targets, {
        lobby: lobby,
        id: socket.id,
        type: socket.handshake.query.type,
        name:target.name,
      })
      console.log("Added Target:")
      console.log(targets)
      io.to(lobby).emit('targetUpdate', targets[lobby])
      io.to(lobby).emit('initiativeUpdate', connections[lobby].map((player) => {
        return {
          name: player.name,
          initiative: player.initiative,
        }
      }))
      io.to(lobby).emit('logAction', target.name + " joined the game.")
      io.to(lobby).emit('initiativeUpdate', connections[lobby])
    }
  })
})

io.listen(port, (error) => {
  if (error) throw error
  console.log('Server running. Listening on port %s', port)
})
