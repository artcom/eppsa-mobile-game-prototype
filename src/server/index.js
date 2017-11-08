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
const socket = socketIO(server)

const runningLobbys = []
const waitingLobbys = []

app.get("/", (req, res) => {
  res.send("Hello World!")
})

socket.on("connection", (socket) => {
  console.log("A user connected.")

  let lobby

  if (waitingLobbys.length > 0) {
    waitingLobbys[0].push(socket.id)
    lobby = waitingLobbys[0]
    if (waitingLobbys[0].length === 2) {
      runningLobbys.push(waitingLobbys.shift())
    }
  } else {
    lobby = [socket.id]
    waitingLobbys.push(lobby)
  }

  console.log(`running:\t${JSON.stringify(runningLobbys)}`)
  console.log(`waiting:\t${JSON.stringify(waitingLobbys)}`)
  console.log(`lobby:  \t${JSON.stringify(lobby)}`)

  socket.emit("init", { id: lobby.indexOf(socket.id) })

  const timeInterval = setInterval(() => {
    socket.emit("time", { time: new Date() })
  }, 1000)

  socket.on("disconnect", () => {
    console.log("User disconnected")

    /*
    if (waitingLobbys.indexOf(lobby) >= 0) {
      waitingLobbys.splice(waitingLobbys.indexOf(lobby), 1)
    }
    */

    clearInterval(timeInterval)
  })

  socket.on("item", data => {
    console.log(`${socket.id} scanned ${data.item}`)
  })
})


server.listen(5000, () => {
  console.log("Example listening on port 5000!")
})
