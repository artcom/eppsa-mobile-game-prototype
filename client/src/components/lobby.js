import styled from "styled-components"
import React from "react"

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 10vw;
  
  font-family: 'Tangerine', serif;
  font-size: 8vw;
`

const EnterName = styled.input`
  &::placeholder {
    color: grey;
    font-family: 'Tangerine', serif;
  }
  
  &:focus {
    outline: none;
  }
  
  display: flex;
  
  text-align: center;
  
  font-family: 'Tangerine', serif;
  font-weight: bold;  
  font-size: 8vw;
  
  margin-left: 10vw;
  margin-right: 10vw;
  margin-bottom: 5vw;
`

const Description = styled.div`
  margin-bottom: 10vw;
`

const PlayWith = styled.div`
  margin-bottom: 5vw;
`

const Player = styled.div`
  text-align: center;

  margin-left: 10vw;
  margin-right: 10vw;
  margin-bottom: 5vw;
  
  font-weight: bold;
  font-size: 8vw;
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

export default class Lobby extends React.Component {
  constructor(props) {
    super(props)

    this.server = props.server
    this.content = props.content

    this.state = {
      player: {},
      game: this.content,
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
        Dear
        <EnterName
          type="text"
          placeholder= { this.state.player.name }
          onChange={ event => { this.setName(event) } } />
        <Description>
          {this.state.game.description}
        </Description>
        <PlayWith>Play with</PlayWith>
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
      </Container>
    )
  }

  setName(event) {
    const name = event.target.value.trim().substr(0, 25) || this.state.givenName

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
