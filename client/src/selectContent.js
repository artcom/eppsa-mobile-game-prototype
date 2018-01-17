import memoize from "lodash/memoize"
import mapValues from "lodash/mapValues"
import omit from "lodash/omit"
import keys from "lodash/keys"

import cmsData from "./cmsData.json"

const data = {}
data.game = transform(cmsData)

export const selectPlayerContent = memoize((playerId) => {
  const player = data.game.players[`player-${playerId + 1}`]
  const playerQuestIds = player.quests.split(",").map(val => val.trim())
  const playerQuests = playerQuestIds.reduce((obj, questId) => {
    const out = {
      ...obj,
      [questId]: data.game.quests[questId]
    }
    out[questId].items = out[questId].items.split(",").map(val => val.trim())
    return out
  }, {})
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
  if (data) {
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
  }
})

function getQuestId(itemId) {
  const [questId] = Object.keys(data.game.quests).filter(questId =>
    data.game.quests[questId].items.includes(itemId)
  )

  return questId
}

export function transform(content) {
  const result = omit(content.index, "template")
  keys(omit(content, "index")).forEach(key => {
    result[key] = transform(content[key])
  })
  return result
}
