import type { GameConfigSetting } from "$lib/Game"
import { RankMatch, ColorMatch } from "$lib/Matchers"

export type NamedGameConfigSetting = GameConfigSetting & {
  name: string
  family: string
  title: string
  variants?: NamedGameConfigSetting[]
}

let games = <NamedGameConfigSetting[]> {}

function register(config:NamedGameConfigSetting):void {
  if (games[config.name]) throw new Error(`Duplicate name ${config.name}`)
  games[config.name] = config
  if (config.name === config.family) games[config.name].variants = []
  else if (games[config.family]) {
    games[config.family].variants.push(config)
  }
}

register({
  name: 'klondike',
  family: 'klondike',
  title: 'Klondike',
  centerRows: false,
  stackConfig: [
    { empty:"A", limitVisible:1, match: { suit:true, rank:RankMatch.Asc, count:1 }, complete: { count: 13, suit:true } },
    { empty:"K", match: { color:ColorMatch.Alternate, rank:RankMatch.Desc }, limitAvailable:0, init:1 },
    { empty:"K", match: { color:ColorMatch.Alternate, rank:RankMatch.Desc }, limitAvailable:0, init:2, facedown:1 },
    { empty:"K", match: { color:ColorMatch.Alternate, rank:RankMatch.Desc }, limitAvailable:0, init:3, facedown:2 },
    { empty:"K", match: { color:ColorMatch.Alternate, rank:RankMatch.Desc }, limitAvailable:0, init:4, facedown:3 },
    { empty:"K", match: { color:ColorMatch.Alternate, rank:RankMatch.Desc }, limitAvailable:0, init:5, facedown:4 },
    { empty:"K", match: { color:ColorMatch.Alternate, rank:RankMatch.Desc }, limitAvailable:0, init:6, facedown:5 },
    { empty:"K", match: { color:ColorMatch.Alternate, rank:RankMatch.Desc }, limitAvailable:0, init:7, facedown:6 },
    { deal:3, limitAvailable:1, limitVisible:3, horizontal:true }
  ],
  layout: '0000-D8,1234567',
})

register(Object.assign({}, games['klondike'], {
  name: 'klondike-vegas',
  title: 'Vegas',
  limitCycles: 3,
}))

register(Object.assign({}, games['klondike-vegas'], {
  name: 'klondike-vegas-strict',
  title: 'Vegas Strict (1 undo)',
  limitUndo: 1,
}))

register(Object.assign({}, games['klondike'], {
  name: 'klondike-one',
  family: 'klondike',
  title: 'Draw One',
  stackConfig: [...games['klondike'].stackConfig].map(c => {
    if (c.deal) c = Object.assign({}, c, { deal:1 })
  })
}))

register({
  name: 'freecell',
  family: 'freecell',
  title: 'Freecell',
  stackConfig: [
    { limitCards:1, isFreecell:true },
    { empty:"A", limitVisible:1, matchPriority:3, match: { count:1, suit:true, rank:RankMatch.Asc }, complete: { count:13, suit:true } },
    { init:50, matchPriority:2, limitAvailable:0, match: { color:ColorMatch.Alternate, rank:RankMatch.Desc, useFreecells:true } },
  ],
  layout: '0000 1111,22222222',
})

register({
  name: 'pyramid',
  family: 'pyramid',
  title: 'Pyramid',
  overlayRows: true,
  showEmpty: false,
  multiSelect: true,
  limitCycles: 1,
  deckConfig: { jokers:2 },
  stackConfig: [
    { empty:'', canPut:false, init:1, limitCards:1, complete: { count:0 }, showEmpty:false },
    { empty:'', deal:1, canPut:false, limitAvailable:5, limitVisible:5, horizontal:true },
    { canGet:false, empty:'', limitVisible:1, match: [{ total: 13 }, { hasJoker:true }] }
  ],
  layout: '0,00,000,0000,00000,000000,0000000',
  footer: '_D 1 2_'
})

register(Object.assign({}, games['pyramid'], {
  name: 'pyramid-extra',
  family: 'pyramid',
  title: 'Extra',
  deckConfig: { jokers:3 },
  layout: '0,00,000,0000,00000,000000,0000000,00000000'
}))

register(Object.assign({}, games['pyramid'], {
  name: 'pyramid-exact-draw-three',
  family: 'pyramid',
  title: 'Exact, Draw 3',
  stackConfig: [
    { empty:'', canPut:false, init:1, limitCards:1, complete: { count:0 }, showEmpty:false},
    { deal:true, limitAvailable:1, limitVisible:5, horizontal:true },
    { canGet:false, empty:'', limitVisible:1, match: [{ count:2, countLT:true, total:13 }, { count:2, countLT:true, hasJoker:true }] }
  ],
  footer: 'D 1 1 1 2'
}))

export default games