import React from "react"
import styled, { keyframes } from "styled-components"
import QrReader from "react-qr-reader"

import ScanIconSvg from "../svg/icon-scan.svg"
import ExitIconSvg from "../svg/icon-exit.svg"
import SwitchIconSvg from "../svg/icon-switch.svg"

import Inventory from "./inventory"
import ItemCard from "./itemCard"

import Circle from "./circle"

import data from "../data.json"

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
  display: flex;
  justify-content: center;
  align-items: center;
  
  height: calc(100% - 100vw);
`

const ScannedItemCardContainer = styled.div`
  position: absolute;

  display: flex;
  flex-direction: column;
  
  width: 100vw;
  height: 100%;
  
  justify-content: center;
  align-items: center;
  
  background-color: rgba(0, 0, 0, 0.2);
`

const SwitchItemButton = styled(SwitchIconSvg)`
  position: absolute;
  
  display: flex;
  align-self: flex-end;

  width: 15vw;
  height: 15vw;
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
  position: absolute;
  bottom: 5vw;
  right: 5vw;
  
  width: 15vw;
  height: 15vw;
  
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
      previewItemId: "copper",
      selectedItemId: null,
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
    const scannedItemId = this.state.scannedItemId
    const scannedQuestId = this.getQuestId(scannedItemId)

    const previewItemId = this.state.previewItemId

    const collectedItemId = this.state.inventory[scannedQuestId]

    const selectedItemId = this.state.selectedItemId

    return (
      <Container>
        { previewItemId
          &&
          <ScannedItemCardContainer>
            <ItemCard
              item={ data.game.items[previewItemId] }
              onTake={ this.questItems.includes(previewItemId) && this.onItemTake }
              onDiscard={ collectedItemId !== previewItemId && this.onItemDiscard } />
            { collectedItemId && collectedItemId !== scannedItemId
            &&
            <SwitchItemButton
              onClick={ () => this.switchItems(collectedItemId) } /> }
          </ScannedItemCardContainer> }
        <TopContainer>
          { selectedItemId && <ItemCard item={ data.game.items[selectedItemId] } /> }
          { this.state.qrMode &&
            <QrReaderContainer>
              <BackButton onClick={ this.onQrButtonClicked } />
              <QrReader
                delay={ 100 }
                onError={ (error) => console.log(error) }
                onScan={ (scannedItemId) => this.handleQrResult(scannedItemId) }
                style={ { width: "100%" } } />
            </QrReaderContainer> }
          { !this.state.qrMode && !selectedItemId &&
            <CircleButton onClick={ this.onQrButtonClicked }><ScanIcon /></CircleButton> }
        </TopContainer>
        <BottomContainer>
          <Inventory
            inventory={ this.state.inventory }
            selectedItem={ this.state.selectedItemId }
            onItemSelect={ (item) => this.onItemSelect(item) } />
        </BottomContainer>
      </Container>
    )
  }

  handleQrResult(scannedItemId) {
    if (data.game.items[scannedItemId]) {
      this.setState({ scannedItemId, previewItemId: scannedItemId, qrMode: false })
    }
  }

  onQrButtonClicked() {
    this.setState({ qrMode: !this.state.qrMode })
  }

  onItemTake() {
    const itemId = this.state.previewItemId

    const inventory = this.state.inventory

    const questId = this.getQuestId(itemId)

    inventory[questId] = itemId

    this.setState({ scannedItemId: null, previewItemId: null, inventory })
  }

  onItemDiscard() {
    this.setState({ scannedItemId: null, previewItemId: null })
  }

  onItemSelect(item) {
    if (item === this.state.selectedItemId) {
      this.setState({ selectedItemId: null })
    } else {
      this.setState({ selectedItemId: item })
    }
  }

  switchItems(collectedItemId) {
    const previewItemId = this.state.previewItemId === this.state.scannedItemId
      ? collectedItemId
      : this.state.scannedItemId

    this.setState({ previewItemId })
  }

  getQuestId(itemId) {
    const [questId] = this.quests.filter(quest =>
      data.game.quests[quest].items.includes(itemId)
    )

    return questId
  }
}
