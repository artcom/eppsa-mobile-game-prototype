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

  border: ${props => props.isSelected ? "3px solid black" : "1px solid black"};
`

export default ({ inventory, onItemSelect, selectedItem }) => {
  const items = Object.entries(inventory).map((entry) => entry[1])

  return (
    <Container>
      <ItemSlot
        isSelected={ selectedItem !== null && selectedItem === items[0] }
        onClick={ () => onItemSelect(items[0]) } >
        { items[0] }
      </ItemSlot>
      <ItemSlot
        isSelected={ selectedItem !== null && selectedItem === items[1] }
        onClick={ () => onItemSelect(items[1]) } >
        { items[1] }
      </ItemSlot>
      <ItemSlot
        isSelected={ selectedItem !== null && selectedItem === items[2] }
        onClick={ () => onItemSelect(items[2]) } >
        { items[2] }
      </ItemSlot>
    </Container>
  )
}
