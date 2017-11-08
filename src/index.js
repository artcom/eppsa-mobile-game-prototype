/* eslint-disable no-unused-vars,import/no-extraneous-dependencies */
import React from "react"
import ReactDOM from "react-dom"
import client from "socket.io-client"

import App from "./App"
import registerServiceWorker from "./registerServiceWorker"

ReactDOM.render(<App />, document.getElementById("root"))
registerServiceWorker()

const socket = client("https://eppsa.dev:5000/", { secure: true })

socket.on("time", data => console.log(data.time.toLocaleString()))
