/* eslint-disable import/no-commonjs */

const express = require("express")
const fs = require("fs")
const https = require("https")
const socketIO = require("socket.io")

const options = {
  key: fs.readFileSync(`${__dirname}/../../ssl/ssl.key`, "utf8"),
  cert: fs.readFileSync(`${__dirname}/../../ssl/ssl.crt`, "utf8")
}

const app = express()
const server = https.createServer(options, app)
const io = socketIO(server)

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

  socket.on("play", ({ mode, player }) => {
    switch (mode) {
      case "playSolo":
        console.log(`${socket.id} wants to play solo`)

        break
      case "playRnd":
        console.log(`${socket.id} wants to play with rnd`)

        break
      case "playWith":
        socket.to(player).emit("playRequest", { player: socket.id })
        console.log(`${socket.id} wants to play with ${player}`)

        break
    }
  })

  socket.on("item", data => {
    console.log(`${socket.id} scanned ${data.item}`)
  })
})


server.listen(5000, () => {
  console.log("Example listening on port 5000!")
})
