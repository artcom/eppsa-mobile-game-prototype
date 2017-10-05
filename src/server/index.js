/* eslint-disable import/no-commonjs */

const express = require("express")
const http = require("http")

const app = express()
const server = http.Server(app)

app.get("/", (req, res) => {
  res.send("Hello World!")
})

server.listen(5000, () => {
  console.log("Example appstening on port 5000!")
})
