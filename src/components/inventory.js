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

export const Item = styled.div`
  font-weight: bold;
`

export const Quest = styled.div`
  opacity: 0.5;
`

export default ({ inventory, onSlotSelect, quests, selectedQuestId, selectedItemId }) => {
  const { items } = selectSharedContent()

  const entries = Object.entries(inventory)

  return (
    <Container>
      { entries.map(entry => {
        const [questId, itemId] = entry

        return (
          <ItemSlot
            key={ questId }
            isItemSelected={ selectedItemId !== null && selectedItemId === itemId }
            isQuestSelected={ selectedQuestId !== null && selectedQuestId === questId }
            onClick={ () => onSlotSelect(questId, itemId) }>
            {
              itemId && <Item>{ items[itemId].name }</Item>
              ||
              <div>
                <Quest>{ quests[questId].name }</Quest>
              </div>
            }
          </ItemSlot>
        )
      })}
    </Container>
  )
}
