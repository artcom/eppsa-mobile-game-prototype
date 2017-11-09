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
  constructor({ socket }) {
    super()

    this.state = {
      name: socket.id,
      game: selectSharedContent(),
      waitingPlayers: []
    }

    socket.on("connect", () => {
      this.setState({
        name: socket.id
      })
    })

    socket.on("players", data => {
      const waitingPlayers = data.waitingPlayers
      waitingPlayers.splice(waitingPlayers.indexOf(socket.id), 1)

      this.setState({
        waitingPlayers
      })
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
        <PlaySolo>PlaySolo</PlaySolo>
        <PlayRnd>PlayRnd</PlayRnd>
        <PlayWith>PlayWith
          {
            this.state.waitingPlayers.map(player => <div key={ player }> {player} </div>)
          }
        </PlayWith>
      </Container>
    )
  }
}
