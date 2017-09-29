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
              itemId && <span>{ items[itemId].name }</span>
              ||
              <div>
                <div>{ quests[questId].name }</div>
              </div>
            }
          </ItemSlot>
        )
      })}
    </Container>
  )
}
