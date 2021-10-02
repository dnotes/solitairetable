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
  layout: '0000 D8,1234567',
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
    { limitCards:1 },
    { empty:"A", match: { suit:true, rank:RankMatch.Asc }, complete: { count:13, suit:true } },
    { init:50, match: { color:ColorMatch.Alternate, rank:RankMatch.Desc } },
  ],
  layout: '0000 1111,22222222',
})

register({
  name: 'pyramid',
  family: 'pyramid',
  title: 'Pyramid',
  offsetRows: true,
  overlayRows: true,
  centerRows: true,
  showEmpty: false,
  multiSelect: true,
  limitCycles: 1,
  deal: 1,
  deckConfig: { jokers:2 },
  stackConfig: [
    { empty:'', canPut:false, init:1, limitCards:1, complete: { count:0 }, showEmpty:false },
    { empty:'', deal:1, canPut:false, limitAvailable:5, limitVisible:5, horizontal:true },
    { canGet:false, empty:'', limitVisible:1, match: [{ total: 13 }, { hasJoker:true }] }
  ],
  layout: '_0_,_00_,_000_,_0000_,_00000_,_000000_,_0000000_',
  footer: '_D 1 2_'
})

register(Object.assign({}, games['pyramid'], {
  name: 'pyramid-exact-draw-three',
  family: 'pyramid',
  title: 'Exact, Draw 3',
  stackConfig: [
    { empty:'', canPut:false, init:1, limitCards:1, complete: { count:0 }, showEmpty:false},
    { deal:true, limitAvailable:1, limitVisible:5, horizontal:true },
    { canGet:false, empty:'', limitVisible:1, match: [{ count:2, total:13 }, { count:2, hasJoker:true }, { count:1, hasJoker:true }] }
  ],
  footer: 'D 1 1 1 2'
}))

export default games