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
  height: 100%;
`

const QrReaderComponent = styled(QrReader)`
  background: red;
  height: 100vw;
  overflow: hidden;
`

export default class App extends React.Component {
  constructor() {
    super()
    this.state = { result: null }
  }

  render() {
    return (
      <Container>
        <QrReaderComponent
          delay={ 100 }
          onError={ (error) => console.log(error) }
          onScan={ (result) => this.setState({ result }) }
          style={ { width: "100%" } } />
        { this.state.result && <div>{ this.state.result }</div> }
      </Container>
    )
  }
}
