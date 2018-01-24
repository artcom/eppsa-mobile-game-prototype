import React from "react"
import styled from "styled-components"

import Circle from "./circle"
import Wave from "./effects/wave"

const Container = styled(Circle)`
  display: flex;
  
  justify-content: center;
  align-items: center;
  
  box-sizing: border-box;

  width: 25vw;
  height: 25vw;

  border: ${props =>
    props.isItemSelected || props.isQuestSelected ? "3px solid black" : "1px solid black"};
  
  box-shadow: ${props =>
    props.isItemSelected || props.isQuestSelected ? "5px 5px 22px -8px rgba(0,0,0,0.75);" : "none"};
`

const Content = styled.div`
  position: absolute;
`

export default function ItemSlot(props) {
  return (
    <Container { ...props } >
      <Wave visible={ props.isQuestSelected || props.isItemSelected } />
      <Content>{ props.children }</Content>
    </Container>
  )
}
