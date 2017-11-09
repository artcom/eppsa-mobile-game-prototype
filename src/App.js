import styled, { injectGlobal } from "styled-components"

import React from "react"
import GameView from "./components/gameView"
import StartScreen from "./components/startScreen"

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  #root, html, body {
    height: 100%;
  }
  
  body {
	margin: 0;
    padding: 0;
    font-family: sans-serif;
    user-select: none;
  }
`

const Container = styled.div`
  height: 100%;
  width: 100%;
  
  position: absolute;
`

export default class App extends React.Component {
  constructor({ socket }) {
    super()

    this.socket = socket

    this.state = {
      matched: false
    }
  }

  render() {
    const matched = this.state.matched

    return (
      <Container>
        {matched && <GameView socket={ this.socket } />}
        {!matched && <StartScreen socket={ this.socket } />}
      </Container>
    )
  }
}
