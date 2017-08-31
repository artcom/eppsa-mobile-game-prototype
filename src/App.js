import React from "react"
import styled, { injectGlobal } from "styled-components"
import "./App.css"
import QrReader from "react-qr-reader"

import ScanIconSvg from "./icon-scan.svg"

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
  display: flex;
  
  justify-content: space-around;
  align-items: center;
  
  height: calc(100vh - 100vw);
`

const Circle = styled.div`
  border-radius: 50%;
`

const CircleButton = styled(Circle)`
  border: 1px solid black;
`

const ScanIcon = styled(ScanIconSvg)`
  width: 30vw;
  height: 30vw;
  padding: 10vw;
`

const QrReaderComponent = styled(QrReader)`
  height: 100vw;

  overflow: hidden;
`

const ItemSlot = styled(Circle)`
  width: 25vw;
  height: 25vw;

  border: 1px solid black;  
`

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      qrMode: false,
      result: null
    }

    this.onQrButtonClicked = this.onQrButtonClicked.bind(this)
  }

  render() {
    return (
      <Container>
        <TopContainer>
          { this.state.qrMode
            ? <QrReaderComponent
              delay={ 100 }
              onError={ (error) => console.log(error) }
              onScan={ (result) => this.setState({ result }) }
              style={ { width: "100%" } } />
            : <CircleButton onClick={ this.onQrButtonClicked }><ScanIcon /></CircleButton>
          }
        </TopContainer>
        { this.state.qrMode && <button onClick={ this.onQrButtonClicked }>Back</button> }
        { this.state.result && <div>{ this.state.result }</div> }
        <BottomContainer>
          <ItemSlot />
          <ItemSlot />
          <ItemSlot />
        </BottomContainer>
      </Container>
    )
  }

  onQrButtonClicked() {
    this.setState({ qrMode: !this.state.qrMode })
  }
}
