/* eslint-disable no-unused-vars,import/no-extraneous-dependencies */
import React from "react"
import ReactDOM from "react-dom"
import client from "socket.io-client"

import App from "./App"
import registerServiceWorker from "./registerServiceWorker"

ReactDOM.render(<App />, document.getElementById("root"))
registerServiceWorker()

const socket = client("https://localhost:5000/", { secure: true })
