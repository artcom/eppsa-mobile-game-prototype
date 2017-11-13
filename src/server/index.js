/* eslint-disable import/no-commonjs */

const express = require("express")
const fs = require("fs")
const https = require("https")
const socketIO = require("socket.io")

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

const runningLobbys = []
const waitingPlayers = []

app.get("/", (req, res) => {
  res.send("Hello World!")
})

io.on("connection", (socket) => {
  console.log("A user connected.")

  waitingPlayers.push(socket.id)

  io.emit("players", {
    waitingPlayers
  })

  socket.on("disconnect", () => {
    console.log("User disconnected")

    waitingPlayers.splice(waitingPlayers.indexOf(socket.id), 1)

    io.emit("players", {
      waitingPlayers
    })
  })

  socket.on("playSolo", () => console.log(`${socket.id} wants to play solo`))

  socket.on("playRandom", () => console.log(`${socket.id} wants to play with random player`))

  socket.on("playWith", (player) => {
    socket.to(player).emit("playRequest", { player: socket.id })
    console.log(`${socket.id} wants to play with ${player}`)
  })

  socket.on("itemScanned", item => {
    console.log(`${socket.id} scanned ${item}`)
  })
})


server.listen(5000, () => {
  console.log("Example listening on port 5000!")
})
