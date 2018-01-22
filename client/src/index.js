import querystring from "querystring"
import React from "react"
import ReactDOM from "react-dom"

import App from "./components/app"
import Server from "./api/serverApi"
import registerServiceWorker from "./registerServiceWorker"

const params = querystring.parse(window.location.search.substring(1))

ReactDOM.render(
  <App server = { new Server(params.wsServer) } />,
  document.getElementById("root")
)

registerServiceWorker()
