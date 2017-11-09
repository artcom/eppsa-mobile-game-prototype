import memoize from "lodash/memoize"
import mapValues from "lodash/mapValues"

import data from "./data.json"

export const selectPlayerContent = memoize((playerId) => {
  const player = data.game.players[playerId]
  const playerQuestIds = data.game.players[playerId].questIds
  const playerQuests = playerQuestIds.reduce((obj, questId) => ({
    ...obj,
    [questId]: data.game.quests[questId]
  }), {})
  const playerQuestItemIds = playerQuestIds
    .map(questId => data.game.quests[questId].items)
    .reduce((a, b) => a.concat(b), [])

  return {
    player,
    playerQuests,
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
    name: data.game.name,
    description: data.game.description,
    items
  }
})

function getQuestId(itemId) {
  const [questId] = Object.keys(data.game.quests).filter(questId =>
    data.game.quests[questId].items.includes(itemId)
  )

  return questId
}
