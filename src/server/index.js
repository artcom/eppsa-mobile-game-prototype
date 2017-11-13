/* eslint-disable import/no-commonjs */

const express = require("express")
const fs = require("fs")
const https = require("https")
const socketIO = require("socket.io")

const pres = ["one", "wood", "two", "three", "sharp", "wicked",
  "black", "brown", "red", "twitchy", "grumpy"]
const parts = ["Eye", "Beard", "Leg", "Hand", "Saber", "Knee", "Elbow", "Nose", "Chin", "Thumb"]
const names = ["Jimmy", "Bob", "Roland", "Whitman", "Delbert"]

console.log(`${pres.length * parts.length * names.length} available names`)

const httpsOptions = {
  key: fs.readFileSync(`${__dirname}/../../ssl/ssl.key`, "utf8"),
  cert: fs.readFileSync(`${__dirname}/../../ssl/ssl.crt`, "utf8")
}

const ioOptions = {
  pingTimeout: 1000 * 30,
  pingInterval: 1000 * 15
}

const app = express()
const server = https.createServer(httpsOptions, app)
const io = socketIO(server, ioOptions)

const playerNames = []
const waitingPlayers = []

app.get("/", (req, res) => {
  res.send("Hello World!")
})

io.on("connection", (socket) => {
  console.log("A user connected.")

  const player = { id: socket.id, name: getName() }

  waitingPlayers.push(player)

  socket.emit("init", player)

  io.emit("players", waitingPlayers)

  socket.on("disconnect", () => {
    console.log("User disconnected")

    waitingPlayers.splice(waitingPlayers.indexOf(player), 1)
    playerNames.splice(playerNames.indexOf(player.name), 1)

    io.emit("players", waitingPlayers)
  })

  socket.on("playSolo", () => console.log(`${socket.id} wants to play solo`))

  socket.on("playRandom", () => console.log(`${socket.id} wants to play with random player`))

  socket.on("playWith", player => {
    socket.to(player).emit("playRequest", { player: socket.id })
    console.log(`${socket.id} wants to play with ${player}`)
  })

  socket.on("setName", name => {
    player.name = name.trim()
    io.emit("players", waitingPlayers)
  })

  socket.on("itemScanned", item => {
    console.log(`${socket.id} scanned ${item}`)
  })
})


server.listen(5000, () => {
  console.log("Example listening on port 5000!")
})


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
