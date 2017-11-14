/* eslint-disable import/no-commonjs */

const express = require("express")
const fs = require("fs")
const https = require("https")
const socketIO = require("socket.io")

const pres = ["one", "wood", "two", "long", "short", "sharp", "wicked",
  "black", "brown", "red", "twitchy", "grumpy", "no", "big", "small", "tiny", "green"]
const parts = ["Eye", "Beard", "Leg", "Hand", "Saber", "Knee", "Elbow", "Nose", "Chin", "Thumb"]
const names = ["Jimmy", "Bob", "Roland", "Whitman", "Delbert"]

console.log(`${pres.length * parts.length * names.length} available names`)

const httpsOptions = {
  key: fs.readFileSync(`${__dirname}/../../ssl/ssl.key`, "utf8"),
  cert: fs.readFileSync(`${__dirname}/../../ssl/ssl.crt`, "utf8")
}

const ioOptions = {
  pingTimeout: 1000 * 15,
  pingInterval: 1000 * 10
}

const app = express()
const server = https.createServer(httpsOptions, app)
const io = socketIO(server, ioOptions)

const playerNames = []
const waitingPlayers = []
const runningGames = []

app.get("/", (req, res) => {
  res.send("Hello World!")
})

io.on("connection", (socket) => {
  console.log(`${socket.id} A user connected.`)

  const player = { id: socket.id, name: getName() }
  const game = []

  waitingPlayers.push(player)
  console.log(`waitingPlayers: ${JSON.stringify(waitingPlayers)}`)

  socket.emit("init", player)

  sendWaitingPlayers()

  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected`)

    removeFromWaitinglist(player)
    playerNames.splice(playerNames.indexOf(player.name), 1)
    console.log(`waitingPlayers: ${JSON.stringify(waitingPlayers)}`)

    sendWaitingPlayers()
  })

  socket.on("playSolo", () => console.log(`${socket.id} wants to play solo`))

  socket.on("playRandom", () => console.log(`${socket.id} wants to play with random player`))

  socket.on("playWith", targetPlayer => {
    socket.to(targetPlayer.id).emit("playRequest", player)
    console.log(`${player.id} wants to play with ${targetPlayer.id}`)
  })

  socket.on("acceptInvite", fromPlayer => {
    console.log(`${player.id} accepts ${fromPlayer.id} Invite`)
    game.push(player)

    game.push(waitingPlayers[waitingPlayers.findIndex(
      currentPlayer => isSamePlayer(currentPlayer, fromPlayer))])

    removeFromWaitinglist(fromPlayer)
    removeFromWaitinglist(player)

    runningGames.push(game)

    socket.emit("matched", true)
    socket.to(fromPlayer.id).emit("matched", true)
    socket.emit("initGame", game)
    socket.to(fromPlayer.id).emit("initGame", game)
  })

  socket.on("ready", ({ ready, partner }) => {
    socket.to(partner.id).emit("partnerIsReady", ready)
  })

  socket.on("setName", name => {
    player.name = name.trim()
    sendWaitingPlayers()
  })

  socket.on("itemScanned", item => {
    console.log(`${socket.id} scanned ${item}`)
  })
})


server.listen(5000, () => {
  console.log("Example listening on port 5000!")
})

function removeFromWaitinglist(player) {
  const index = waitingPlayers.findIndex(currentPlayer => isSamePlayer(currentPlayer, player))
  if (index >= 0) {
    waitingPlayers.splice(index, 1)
  }
}

function sendWaitingPlayers() {
  io.emit("players", waitingPlayers)
}

function getRandomEleent(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function getName() {
  const name = `${getRandomEleent(pres)} ${getRandomEleent(parts)} ${getRandomEleent(names)}`
  if (playerNames.includes(name)) {
    return getName()
  } else {
    playerNames.push(name)
    return name
  }
}

function isSamePlayer(currentPlayer, searchedPlayer) {
  return currentPlayer.id === searchedPlayer.id
}
