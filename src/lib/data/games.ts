import type { GameConfigSetting } from "$lib/Game"
import { RankMatch, ColorMatch } from "$lib/Matchers"

let games = {}

games['klondike'] = <GameConfigSetting> {
  stackConfig: [
    { empty:"A", limitVisible:1, match: { suit:true, rank:RankMatch.Asc, count:1 }, complete: { count: 13, suit:true } },
    { empty:"K", match: { color:ColorMatch.Alternate, rank:RankMatch.Desc }, limitAvailable:0, init:1 },
    { empty:"K", match: { color:ColorMatch.Alternate, rank:RankMatch.Desc }, limitAvailable:0, init:2, facedown:1 },
    { empty:"K", match: { color:ColorMatch.Alternate, rank:RankMatch.Desc }, limitAvailable:0, init:3, facedown:2 },
    { empty:"K", match: { color:ColorMatch.Alternate, rank:RankMatch.Desc }, limitAvailable:0, init:4, facedown:3 },
    { empty:"K", match: { color:ColorMatch.Alternate, rank:RankMatch.Desc }, limitAvailable:0, init:5, facedown:4 },
    { empty:"K", match: { color:ColorMatch.Alternate, rank:RankMatch.Desc }, limitAvailable:0, init:6, facedown:5 },
    { empty:"K", match: { color:ColorMatch.Alternate, rank:RankMatch.Desc }, limitAvailable:0, init:7, facedown:6 },
    { deal:3, play:false, limitAvailable:1, limitVisible:3, horizontal:true }
  ],
  layout: '0000 D8,1234567',
}

games["klondike-vegas"] = <GameConfigSetting> Object.assign({}, games['klondike'], {
  limitCycles: 3,
})

games["klondike-single"] = <GameConfigSetting> Object.assign({}, games['klondike'], {
  cycle: 1,
  deal: 1,
})

games["freecell"] = <GameConfigSetting> {
  stackConfig: [
    { limitCards:1 },
    { empty:"A", match: { suit:true, rank:RankMatch.Asc }, complete: { count:13, suit:true } },
    { init:true, match: { color:ColorMatch.Alternate, rank:RankMatch.Desc } },
  ],
  layout: '0000 1111,22222222',
  center: true
}

games["pyramid"] = <GameConfigSetting> {
  offsetRows: true,
  overlayRows: true,
  centerRows: true,
  showEmpty: false,
  multiSelect: true,
  limitCycles: 1,
  deal: 1,
  deckConfig: { jokers:2 },
  stackConfig: [
    { empty:'', match: false, init:1, limitCards:1, complete: { count:0 } },
    { deal:true, limitAvailable:5, limitVisible:5, horizontal:true },
    { discard:true, limitVisible:1, match: [{ total: 13 }, { hasJoker:true }] }
  ],
  layout: '_0_,_00_,_000_,_0000_,_00000_,_000000_,_0000000_',
  footer: '_D 1 2_'
}

games["pyramid-draw-three"] = <GameConfigSetting> Object.assign({}, games['pyramid'], {
  stacks: [
    { empty:'', deal:1, limitCards:1, complete: { count:0 } },
    { deal:true, limitAvailable:1, limitVisible:4, horizontal:true },
    { discard:true, limitVisible:1, match: [{ count:2, total:13 }, { count:2, hasJoker:true }] }
  ],
  footer: 'D 1 1 1 2'
})

export default games