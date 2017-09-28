import memoize from "lodash/memoize"
import mapValues from "lodash/mapValues"

import data from "./data.json"

export const selectPlayerContent = memoize((playerId) => {
  const player = data.game.players[playerId]
  const playerQuestIds = data.game.players[playerId].questIds
  const playerQuestItemIds = playerQuestIds
    .map(questId => data.game.questIds[questId].items)
    .reduce((a, b) => a.concat(b), [])

  return {
    player,
    playerQuestIds,
    playerQuestItemIds
  }
})

export const selectSharedContent = memoize(() => {
  const items = mapValues(data.game.items, (item, itemId) => (
    {
      name: item.name,
      description: item.description,
      questId: getQuestId(itemId)
    }
  ))

  return {
    items
  }
})

function getQuestId(itemId) {
  const [questId] = Object.keys(data.game.questIds).filter(questId =>
    data.game.questIds[questId].items.includes(itemId)
  )

  return questId
}
