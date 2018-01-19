import styled, { injectGlobal } from "styled-components"

import React from "react"
import GameView from "./gameView"
import StartScreen from "./startScreen"

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
  constructor({ server, content }) {
    super()

    this.server = server
    this.content = content

    this.state = {
      matched: false
    }

    server.on("matched", matched => this.setState({ matched }))
  }

  render() {
    const matched = this.state.matched

    return (
      <Container>
        { matched ?
          <GameView
            server={ this.server }
            content = { this.content } />
          :
          <StartScreen
            server={ this.server }
            content = { this.content } /> }
      </Container>
    )
  }
}
