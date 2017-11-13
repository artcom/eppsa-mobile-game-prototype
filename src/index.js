import React from "react"
import ReactDOM from "react-dom"

import App from "./components/app"
import Server from "./api/serverApi"
import registerServiceWorker from "./registerServiceWorker"

ReactDOM.render(
  <App server = { new Server(window.location.hostname) } />,
  document.getElementById("root")
)

registerServiceWorker()
