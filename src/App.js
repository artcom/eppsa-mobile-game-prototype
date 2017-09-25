import { injectGlobal } from "styled-components"

import React from "react"
import GameView from "./components/gameView"

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  #root, html, body {
    height: 100%;
  }
  
  body {
	margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`

export default function App() {
  return <GameView />
}
