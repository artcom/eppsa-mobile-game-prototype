import React from "react"
import styled from "styled-components"

import Circle from "./circle"

export const Container = styled.div`
  display: flex;
  
  justify-content: space-around;
  align-items: center;
  
  height: 100%;
`

const ItemSlot = styled(Circle)`
  display: flex;
  
  justify-content: center;
  align-items: center;

  width: 25vw;
  height: 25vw;

  border: 1px solid black;  
`

export default ({ items }) =>
  <Container>
    <ItemSlot>{ items[0] }</ItemSlot>
    <ItemSlot>{ items[1] }</ItemSlot>
    <ItemSlot>{ items[2] }</ItemSlot>
  </Container>
