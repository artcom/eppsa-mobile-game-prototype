/* eslint-disable no-unused-vars,import/no-extraneous-dependencies */
import React from "react"
import ReactDOM from "react-dom"
import client from "socket.io-client"

import App from "./App"
import registerServiceWorker from "./registerServiceWorker"

const socket = client("https://eppsa.dev:5000/", { secure: true })

ReactDOM.render(<App socket = { socket } />, document.getElementById("root"))
registerServiceWorker()

socket.on("time", data => console.log(data.time.toLocaleString()))
