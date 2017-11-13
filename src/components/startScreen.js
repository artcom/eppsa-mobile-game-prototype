import styled from "styled-components"
import React from "react"
import { selectSharedContent } from "../selectContent"

const Container = styled.div`
  height: 100%;
  width: 100%;
  
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  
  position: absolute;
`

const Head = styled.div`
  width: 75%;
  height: 25%;
  
  overflow-y: scroll;
  
  text-align: justify;
  
`

const PlaySolo = styled.div`
  width: 75%;
  height: 12.5%;
`

const PlayRnd = styled.div`
  width: 75%;
  height: 12.5%;
`

const PlayWith = styled.div`
  width: 75%;
  height: 50%;
`

export default class StartScreen extends React.Component {
  constructor({ server }) {
    super()

    this.server = server

    this.state = {
      name: server.id,
      game: selectSharedContent(),
      waitingPlayers: [],
      requestingPlayer: null
    }

    server.on("connect", () => {
      this.setState({
        name: server.id
      })
    })

    server.on("players", data => {
      const waitingPlayers = data.waitingPlayers
      waitingPlayers.splice(waitingPlayers.indexOf(server.id), 1)

      this.setState({
        waitingPlayers
      })
    })

    server.on("playRequest", data => {
      this.setState({
        requestingPlayer: data.player
      })
      console.log(`${data.player} wants to play with you`)
    })
  }

  render() {
    return (
      <Container>
        <Head>
          Hallo {this.state.name} <br />
          <br />
          {this.state.game.description}
        </Head>
        <PlaySolo
          onClick={ () => this.server.playSolo() }>
          PlaySolo
        </PlaySolo>
        <PlayRnd
          onClick={ () => this.server.playRandom() }>
          PlayRnd
        </PlayRnd>
        <PlayWith>PlayWith
          {
            this.state.waitingPlayers.map(
              player =>
                <div
                  onClick={ () => this.server.playWith(player) }
                  key={ player }>
                  {player}
                </div>
            )
          }
        </PlayWith>
      </Container>
    )
  }
}
