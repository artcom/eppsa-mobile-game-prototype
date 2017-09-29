import React from "react"
import styled, { keyframes } from "styled-components"
import QrReader from "react-qr-reader"

import ScanIconSvg from "../svg/icon-scan.svg"
import ExitIconSvg from "../svg/icon-exit.svg"
import SwitchIconSvg from "../svg/icon-switch.svg"

import { selectPlayerContent, selectSharedContent } from "../selectContent"
import Inventory from "./inventory"
import ItemCard from "./itemCard"
import Quest from "./quest"
import ReadyDialog from "./readyDialog"

import Circle from "./circle"

const Container = styled.div`
  height: 100%;
`

const TopContainer = styled.div`
  display: flex;
  
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  height: 100vw;
`

const BottomContainer = styled.div`
  display: flex;

  flex-direction: column;
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
  
  z-index: 1;
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

const devState = null // {
//   qrMode: false,
//   scannedItemId: null,
//   previewItemId: null,
//   selectedItemId: null,
//   finished: false,
//   questItems: {
//     material: null,
//     connections: null,
//     protection: null
//   }
// }

export default class GameView extends React.Component {
  constructor() {
    super()

    this.playerId = 0

    const playerContent = selectPlayerContent(this.playerId)

    this.player = playerContent.player
    this.quests = playerContent.playerQuests
    this.questIds = playerContent.playerQuestIds
    this.questItemIds = playerContent.playerQuestItemIds

    this.items = selectSharedContent().items

    this.state = devState || {
      qrMode: false,
      scannedItemId: null,
      previewItemId: null,
      selectedQuestId: null,
      selectedItemId: null,
      finished: false,
      questItems: this.questIds.reduce((obj, questId) => ({
        ...obj,
        [questId]: null
      }), {})
    }

    this.onQrButtonClicked = this.onQrButtonClicked.bind(this)
    this.onItemTake = this.onItemTake.bind(this)
    this.onItemDiscard = this.onItemDiscard.bind(this)
    this.onReadyConfirmed = this.onReadyConfirmed.bind(this)
    this.onReadyDeclined = this.onReadyDeclined.bind(this)
  }

  render() {
    const scannedItemId = this.state.scannedItemId
    const scannedQuestId = scannedItemId && this.items[scannedItemId].questId

    const previewItemId = this.state.previewItemId

    const collectedItemId = this.state.questItems[scannedQuestId]

    const selectedQuestId = this.state.selectedQuestId
    const selectedItemId = this.state.selectedItemId

    const ready = this.completedQuests.length === this.questIds.length

    return (
      <Container>
        { previewItemId
          &&
          <ScannedItemCardContainer>
            <ItemCard
              item={ this.items[previewItemId] }
              onTake={ this.questItemIds.includes(previewItemId) && this.onItemTake }
              onDiscard={ collectedItemId !== previewItemId && this.onItemDiscard } />
            { collectedItemId && collectedItemId !== scannedItemId
            &&
            <SwitchItemButton
              onClick={ () => this.switchItems(collectedItemId) } /> }
          </ScannedItemCardContainer> }
        <TopContainer>
          { selectedItemId &&
            <ItemCard item={ this.items[selectedItemId] } /> }
          { selectedQuestId && !selectedItemId &&
            <Quest quest={ this.quests[selectedQuestId] } /> }
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
            quests={ this.quests }
            inventory={ this.state.questItems }
            selectedItemId={ this.state.selectedItemId }
            selectedQuestId={ this.state.selectedQuestId }
            onSlotSelect={ (quest, item) => this.onSlotSelect(quest, item) } />
          { this.state.finished && <div>All quest items collected.</div> }
          { ready && !this.state.finished &&
          <ReadyDialog onOk={ this.onReadyConfirmed } onCancel={ this.onReadyDeclined } /> }
        </BottomContainer>
      </Container>
    )
  }

  handleQrResult(scannedItemId) {
    if (this.items[scannedItemId]) {
      this.setState({ scannedItemId, previewItemId: scannedItemId, qrMode: false })
    }
  }

  onQrButtonClicked() {
    this.setState({ qrMode: !this.state.qrMode })
  }

  onItemTake() {
    const itemId = this.state.previewItemId

    const questItems = this.state.questItems

    const questId = this.items[itemId].questId

    questItems[questId] = itemId

    this.setState({ scannedItemId: null, previewItemId: null, questItems })
  }

  onItemDiscard() {
    this.setState({ scannedItemId: null, previewItemId: null })
  }

  onSlotSelect(questId, itemId) {
    if (questId === this.state.selectedQuestId) {
      this.setState({ selectedQuestId: null, selectedItemId: null })
    } else {
      this.setState({ selectedQuestId: questId, selectedItemId: itemId })
    }
  }

  onReadyConfirmed() {
    this.setState({ finished: true })
  }

  onReadyDeclined() {
    this.setState({ finished: false })
  }

  switchItems(collectedItemId) {
    const previewItemId = this.state.previewItemId === this.state.scannedItemId
      ? collectedItemId
      : this.state.scannedItemId

    this.setState({ previewItemId })
  }

  get completedQuests() {
    const items = Object.entries(this.state.questItems)
      .map((entry) => entry[1])
      .filter(entry => entry !== null)

    return items
  }
}
