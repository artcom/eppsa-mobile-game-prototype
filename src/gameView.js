import React from "react"
import styled, { injectGlobal, keyframes } from "styled-components"
import QrReader from "react-qr-reader"

import ScanIconSvg from "./icon-scan.svg"
import ExitIconSvg from "./icon-exit.svg"

import Inventory from "./inventory"
import ItemCard from "./itemCard"

import Circle from "./circle"

import data from "./data.json"

// eslint-disable-next-line no-unused-expressions
injectGlobal`
  #root, html, body {
    height: 100%;
  }
  
  body {
	margin: 0;
  }
`

const Container = styled.div`
  height: 100%;
`

const TopContainer = styled.div`
  display: flex;
  
  justify-content: center;
  align-items: center;
  
  height: 100vw;
`

const BottomContainer = styled.div` 
  height: calc(100vh - 100vw);
`

const CircleButton = styled(Circle)`
  border: 1px solid black;
`

const ScanIcon = styled(ScanIconSvg)`
  width: 30vw;
  height: 30vw;
  padding: 10vw;
`

const fadeIn = keyframes`
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
`

const QrReaderContainer = styled.div`
  position: absolute;
  
  width: 100%;
  height: 100vw;
  
  overflow: hidden;
  
  background: black;
  
  animation: ${fadeIn} 1s linear;
`

const BackButton = styled(ExitIconSvg)`
  width: 15vw;
  height: 15vw;
  
  position: absolute;
  bottom: 5vw;
  right: 5vw;
  
  z-index: 1;
`

export default class GameView extends React.Component {
  constructor() {
    super()

    this.player = data.game.players[0]
    this.quests = this.player.quests
    this.questItems = this.quests.map(quest =>
      data.game.quests[quest].items
    ).reduce((a, b) => a.concat(b), [])

    this.state = {
      qrMode: false,
      scannedItemId: "copper",
      inventory: {
        [this.quests[0]]: null,
        [this.quests[1]]: null,
        [this.quests[2]]: null
      }
    }

    this.onQrButtonClicked = this.onQrButtonClicked.bind(this)
    this.onItemTake = this.onItemTake.bind(this)
    this.onItemDiscard = this.onItemDiscard.bind(this)
  }

  render() {
    const itemId = this.state.scannedItemId

    return (
      <Container>
        { itemId
          &&
          <ItemCard
            item={ data.game.items[itemId] }
            isQuestItem={ this.questItems.includes(itemId) }
            onTake={ this.onItemTake }
            onDiscard={ this.onItemDiscard } /> }
        <TopContainer>
          { this.state.qrMode
            ?
            <QrReaderContainer>
              <BackButton onClick={ this.onQrButtonClicked } />
              <QrReader
                delay={ 100 }
                onError={ (error) => console.log(error) }
                onScan={ (scannedItemId) => this.handleQrResult(scannedItemId) }
                style={ { width: "100%" } } />
            </QrReaderContainer>
            :
            <CircleButton onClick={ this.onQrButtonClicked }><ScanIcon /></CircleButton> }
        </TopContainer>
        <BottomContainer>
          <Inventory inventory={ this.state.inventory } />
        </BottomContainer>
      </Container>
    )
  }

  handleQrResult(scannedItemId) {
    if (data.game.items[scannedItemId]) {
      this.setState({ scannedItemId, qrMode: false })
    }
  }

  onQrButtonClicked() {
    this.setState({ qrMode: !this.state.qrMode })
  }

  onItemTake() {
    const itemId = this.state.scannedItemId

    const inventory = this.state.inventory

    const [questId] = this.quests.filter(quest =>
      data.game.quests[quest].items.includes(itemId)
    )

    inventory[questId] = itemId

    this.setState({ scannedItemId: null, inventory })
  }

  onItemDiscard() {
    this.setState({ scannedItemId: null })
  }
}
