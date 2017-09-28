import React from "react"
import styled from "styled-components"

import ItemSlot from "./itemSlot"
import { selectSharedContent } from "../selectContent"

export const Container = styled.div`
  display: flex;
  
  justify-content: space-around;
  align-items: center;
  
  height: 100%;
`

export default ({ inventory, onItemSelect, selectedItem }) => {
  const { items } = selectSharedContent()

  const entries = Object.entries(inventory)

  return (
    <Container>
      { entries.map(entry =>
        <ItemSlot key={ entry[0] } isSelected={ selectedItem !== null && selectedItem === entry[1] }
          onClick={ () => onItemSelect(entry[1]) } >
          {
            entry[1] && items[entry[1]].name
            ||
            <div>
              <div>Quest:</div>
              <div>{ entry[0] }</div>
            </div>
          }
        </ItemSlot>
      )}
    </Container>
  )
}
