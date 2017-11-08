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

app.get("/", (req, res) => {
  res.send("Hello World!")
})

socket.on("connection", (socket) => {
  console.log("A user connected.")

  const timeInterval = setInterval(() => {
    socket.emit("time", { time: new Date() })
  }, 1000)

  socket.on("disconnect", () => {
    console.log("User disconnected")
    clearInterval(timeInterval)
  })
})


server.listen(5000, () => {
  console.log("Example listening on port 5000!")
})
