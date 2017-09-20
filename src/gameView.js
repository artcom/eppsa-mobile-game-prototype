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
    this.state = {
      qrMode: false,
      result: "copper",
      items: []
    }

    this.onQrButtonClicked = this.onQrButtonClicked.bind(this)
    this.onItemTake = this.onItemTake.bind(this)
    this.onItemDiscard = this.onItemDiscard.bind(this)
  }

  render() {
    return (
      <Container>
        { this.state.result
          &&
          <ItemCard
            item={ data.game.items[this.state.result] }
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
                onScan={ (result) => this.handleQrResult(result) }
                style={ { width: "100%" } } />
            </QrReaderContainer>
            :
            <CircleButton onClick={ this.onQrButtonClicked }><ScanIcon /></CircleButton> }
        </TopContainer>
        <BottomContainer>
          <Inventory items={ this.state.items } />
        </BottomContainer>
      </Container>
    )
  }

  handleQrResult(result) {
    if (data.game.items[result]) {
      this.setState({ result, qrMode: false })
    }
  }

  onQrButtonClicked() {
    this.setState({ qrMode: !this.state.qrMode })
  }

  onItemTake() {
    this.setState({ result: null, items: [this.state.result, ...this.state.items] })
  }

  onItemDiscard() {
    this.setState({ result: null })
  }
}
