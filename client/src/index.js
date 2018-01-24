import querystring from "querystring"
import React from "react"
import ReactDOM from "react-dom"

import App from "./components/app"
import Server from "./api/serverApi"
import registerServiceWorker from "./registerServiceWorker"
import content from "./Content"

const params = querystring.parse(window.location.search.substring(1))

content.loadCmsData().then(() => {
  document.title = content.data.game.name
  ReactDOM.render(
    <App
      server = { new Server(params.wsServer) }
      content = { content } />,
    document.getElementById("root")
  )
})


registerServiceWorker()
