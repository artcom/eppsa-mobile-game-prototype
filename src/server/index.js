/* eslint-disable import/no-commonjs */

const express = require("express")
const fs = require("fs")
const https = require("https")
const socketIO = require("socket.io")

const options = {
  key: fs.readFileSync(`${__dirname}/file.pem`, "utf8"),
  cert: fs.readFileSync(`${__dirname}/file.crt`, "utf8")
}

const app = express()
const server = https.createServer(options, app)
const socket = socketIO(server)

app.get("/", (req, res) => {
  res.send("Hello World!")
})

socket.on("connection", () => {
  console.log("A user connected.")

  socket.on("disconnect", () => {
    console.log("User disconnected")
  })
})


server.listen(5000, () => {
  console.log("Example listening on port 5000!")
})
