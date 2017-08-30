import React from "react"
import styled, { injectGlobal } from "styled-components"
import "./App.css"
import QrReader from "react-qr-reader"

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
  display: flex;
  
  flex-direction: column;
  
  height: 100%;
`

const QrReaderContainer = styled.div`
  display: flex;
  
  justify-content: center;
  align-items: center;
  
  height: 100vw;
`

const Button = styled.button`
`

const QrReaderComponent = styled(QrReader)`
  height: 100vw;

  overflow: hidden;
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
        <QrReaderContainer>
          { this.state.qrMode
            ? <QrReaderComponent
              delay={ 100 }
              onError={ (error) => console.log(error) }
              onScan={ (result) => this.setState({ result }) }
              style={ { width: "100%" } } />
            : <Button onClick={ this.onQrButtonClicked }>QR</Button>
          }
        </QrReaderContainer>
        { this.state.qrMode && <Button onClick={ this.onQrButtonClicked }>Back</Button> }
        { this.state.result && <div>{ this.state.result }</div> }
      </Container>
    )
  }

  onQrButtonClicked() {
    this.setState({ qrMode: !this.state.qrMode })
  }
}
