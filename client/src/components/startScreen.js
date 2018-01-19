import styled from "styled-components"
import React from "react"

const Container = styled.div`
  height: 100%;
  width: 100%;
  
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  
  position: absolute;
`

const Head = styled.div`
  width: 75%;
  height: 30%;
  
  overflow-y: scroll;
  
  text-align: justify;
  
  border: solid 2px red;
`

const Name = styled.input`
  
  &::placeholder{
    color: grey;
  }
  
  width: 100%;
  font-family: sans-serif;
  font-size: 16px;
  
  border-top: solid 2px;
  border-bottom: solid 2px;
  border-left: hidden;
  border-right: hidden;
`

const PlayWith = styled.div`
  width: 75%;
  height: 50%;
  
  overflow-y: scroll;
  
  border: solid 2px red;
  border-top: none;
`

const Player = styled.div`
  height: 6vh;

  border: solid 2px orange;
  border-top: none;
  
  &:first-child{
    border-top: solid 2px orange;
  }
`

const PlayRnd = styled.div`
  width: 75%;
  height: 12.5%;
  
  border: solid 2px red;
  border-top: none;
`

const PlayRequest = styled.div`
   
  position: absolute;
  top: 0px;
  
  width: 100%;
  height: 100%;
  
  text-align: center;
  vertical-align: middle;
  
  background-color: rgba(0,0,0,0.56);
  
  display: flex;
  flex-flow: column nowrap;
  
  align-items: center;
  justify-content: center;
  
`

const PlayRequestText = styled.div`
  width: 75%;
  height: 15%;
  
  background-color: rgb(29,238,165);
  
`

export default class StartScreen extends React.Component {
  constructor({ ...props }) {
    super()

    this.server = props.server
    this.content = props.content

    this.state = {
      player: {},
      game: this.content.selectSharedContent(),
      waitingPlayers: [],
      requestFrom: null,
      requestTo: null
    }

    this.server.on("init", player => {
      this.setState({
        player,
        givenName: player.name
      })
    })

    this.server.on("players", waitingPlayers => {
      waitingPlayers.splice(waitingPlayers.findIndex(player => this.isSamePlayer(player)), 1)
      this.setState({
        waitingPlayers
      })
    })

    this.server.on("playRequest", player => {
      this.setState({
        requestFrom: player
      })
      console.log(`${player.id} wants to play with you`)
    })
  }

  render() {
    return (
      <Container>
        {
          (this.state.requestFrom || this.state.requestTo) &&
          <PlayRequest
            onClick= { () => this.hidePlayRequest() }>
            <PlayRequestText
              onClick={ this.state.requestFrom ? () => this.acceptInvite() : () => {} }>
              {this.state.requestFrom && `${this.state.requestFrom.name} wants to play with you`}
              {this.state.requestTo && `you requested to play with ${this.state.requestTo.name}`}
            </PlayRequestText>
          </PlayRequest>
        }
        <Head>
            Dear,
          <Name
            type="text"
            placeholder= { this.state.player.name }
            onChange={ event => { this.setName(event) } } /><br />
          <br />
          {this.state.game.description}
        </Head>
        <PlayWith>Play With
          {
            this.state.waitingPlayers.map(
              player =>
                <Player
                  onClick={ () => this.requestToPlay(player) }
                  key={ player.id }>
                  {player.name}
                </Player>
            )
          }
        </PlayWith>
        <PlayRnd
          onClick={ () => this.server.playRandom() }>
          Play With Random Player
        </PlayRnd>
      </Container>
    )
  }

  setName(event) {
    const name = event.target.value.trim().substr(0, 25) || this.state.givenName

    // eslint-disable-next-line
    event.target.value = name
    this.server.setName(name)
  }

  isSamePlayer(otherPlayer) {
    return otherPlayer.id === this.state.player.id
  }

  hidePlayRequest() {
    this.setState({
      requestFrom: null,
      requestTo: null
    })
  }

  acceptInvite() {
    this.server.acceptInvite(this.state.requestFrom)
    this.setState({
      requestFrom: null,
      requestTo: null
    })
  }

  requestToPlay(player) {
    this.server.playWith(player)
    this.setState({
      requestTo: player
    })
  }
}
