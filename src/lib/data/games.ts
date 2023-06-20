import type { GameConfigSetting } from "$lib/Game"
import { RankMatch, ColorMatch } from "$lib/Matchers"
import { slugify } from 'transliteration'

export type NamedGameConfigSetting = GameConfigSetting & {
  family?: string
  title: string
  variants?: NamedGameConfig[]
}

export type NamedGameConfig = NamedGameConfigSetting & {
  name: string
}

let games:{[key:string]:NamedGameConfig} = {}

function register(config:NamedGameConfigSetting):void {
  let name = slugify(`${config.family || ''} ${config.title}`.trim())
  if (games[name]) throw new Error(`Duplicate name ${name}`)

  let game:NamedGameConfig = {
    ...config,
    name,
    family: slugify(config.family || config.title),
  }
  games[name] = game

  if (!config.family || config?.family?.toLowerCase() === config.title.toLowerCase()) games[name].variants = []
  else if (games[config.family]) {
    games[config.family]?.variants?.push(game)
  }
}

register({
  title: 'Klondike',
  stackConfig: [
    { name:"foundation", empty:"A", limitVisible:1, match: { suit:true, rank:RankMatch.Asc, count:1 }, complete: { count: 13, suit:true } },
    { name:"play1", empty:"K", match: { color:ColorMatch.Alternate, rank:RankMatch.Desc }, limitAvailable:0, init:1, autoplay: { color:ColorMatch.Alternate, rank:RankMatch.Desc } },
    { name:"play2", empty:"K", match: { color:ColorMatch.Alternate, rank:RankMatch.Desc }, limitAvailable:0, init:2, facedown:1, autoplay: { color:ColorMatch.Alternate, rank:RankMatch.Desc } },
    { name:"play3", empty:"K", match: { color:ColorMatch.Alternate, rank:RankMatch.Desc }, limitAvailable:0, init:3, facedown:2, autoplay: { color:ColorMatch.Alternate, rank:RankMatch.Desc } },
    { name:"play4", empty:"K", match: { color:ColorMatch.Alternate, rank:RankMatch.Desc }, limitAvailable:0, init:4, facedown:3, autoplay: { color:ColorMatch.Alternate, rank:RankMatch.Desc } },
    { name:"play5", empty:"K", match: { color:ColorMatch.Alternate, rank:RankMatch.Desc }, limitAvailable:0, init:5, facedown:4, autoplay: { color:ColorMatch.Alternate, rank:RankMatch.Desc } },
    { name:"play6", empty:"K", match: { color:ColorMatch.Alternate, rank:RankMatch.Desc }, limitAvailable:0, init:6, facedown:5, autoplay: { color:ColorMatch.Alternate, rank:RankMatch.Desc } },
    { name:"play7", empty:"K", match: { color:ColorMatch.Alternate, rank:RankMatch.Desc }, limitAvailable:0, init:7, facedown:6, autoplay: { color:ColorMatch.Alternate, rank:RankMatch.Desc } },
    { name:"discard", deal:3, limitAvailable:1, limitVisible:3, horizontal:true, autoplay: { count:1 } }
  ],
  layout: '0000-D8,1234567',
  autoflip: true,
})

register({...games['klondike'],
  title: '(Thoughtful)',
  thoughtful: true,
})

register({...games['klondike'],
  title: 'Vegas',
  limitCycles: 3,
})

register({...games['klondike-vegas'],
  title: 'Vegas (Thoughtful)',
  thoughtful: true,
})

register({...games['klondike-vegas'],
  title: 'Vegas Strict',
  limitUndo: 1,
  autoflip: false,
})

register({...games['klondike'],
  title: 'Draw One',
  // @ts-ignore
  stackConfig: games['klondike'].stackConfig.map(c => (typeof c !== 'string' && c.deal) ? {...c, deal:1 } : c)
})

register({...games['klondike-draw-one'],
  title: 'Draw One (Thoughtful)',
  thoughtful: true,
})

register({
  title: 'Freecell',
  stackConfig: [
    { name:"free", limitCards:1, isFreecell:true, autoplay: {} },
    { name:"foundation", empty:"A", limitVisible:1, matchPriority:3, match: { count:1, suit:true, rank:RankMatch.Asc }, complete: { count:13, suit:true } },
    { name:"play", init:50, matchPriority:2, limitAvailable:0, match: { color:ColorMatch.Alternate, rank:RankMatch.Desc, useFreecells:true }, autoplay: { color:ColorMatch.Alternate, rank:RankMatch.Desc } },
  ],
  layout: '0000 1111,22222222',
})

register({
  title: 'Pyramid',
  overlayRows: true,
  showEmpty: false,
  multiSelect: true,
  limitCycles: 1,
  deckConfig: { jokers:2 },
  stackConfig: [
    { name:"pyramid", empty:'', canPut:false, init:1, limitCards:1, complete: { count:0 }, showEmpty:false },
    { name:"play", empty:'', deal:1, canPut:false, limitAvailable:5, limitVisible:5, horizontal:true },
    { name:"discard", canGet:false, limitVisible:1, match: [{ total: 13 }, { total: 13, totalLT: true, hasJoker:true }] }
  ],
  layout: '0,00,000,0000,00000,000000,0000000',
  footer: '_D 1 2_'
})

register({...games['pyramid'],
  title: 'No Jokers',
  deckConfig: { jokers:0 },
})

register({...games['pyramid'],
  title: 'Pairs, Draw Three',
  stackConfig: [
    { name:"pyramid", empty:'', canPut:false, init:1, limitCards:1, complete: { count:0 }, showEmpty:false},
    { name:"play", deal:1, limitAvailable:1, limitVisible:5, horizontal:true },
    { name:"discard", canGet:false, limitVisible:1, match: [{ count:2, countLT:true, total:13 }, { count:2, countLT:true, hasJoker:true }] }
  ],
  footer: 'D 1 1 1 2'
})

register({
  title: 'Golf',
  stackConfig: [
    { name:"play", init:5, canPut:false, complete: { count:0 } },
    { name:"discard",limitVisible:1, limitAvailable:1, deal:1, init:1, canGet:true, canPut:true, match: [
      { count:1, rank:RankMatch.Asc },
      { count:1, rank:RankMatch.Desc }
    ] },
  ],
  layout: '0000000',
  footer: '_D 1_',
  limitCycles: 1,
})

register({
  title: 'TriPeaks',
  limitCycles: 1,
  stackConfig: [
    { name:"pyramidDown", empty:'', canPut:false, init:1, limitCards:1, complete: { count:0 }, showEmpty:false, facedown:1 },
    { name:"pyramidUp", empty:'', canPut:false, init:1, limitCards:1, complete: { count:0 }, showEmpty:false },
    { name:"discard", limitVisible:1, limitAvailable:1, deal:1, init:1, canPut: true, match: [
      { count:1, rank:RankMatch.Asc },
      { count:1, rank:RankMatch.Desc },
    ]},
  ],
  layout: '--_0  0  0_--,__00 00 00__,_000000000_,1111111111',
  footer: 'D 2',
  autoflip: true,
  overlayRows: true,
  showEmpty: false,
})

register({...games['tripeaks'],
  title: '(Thoughtful)',
  thoughtful: true,
})

register({...games['tripeaks'],
  title: 'Head Start',
  stackConfig: [
    { name:"pyramidDown", canPut:false, init:1, limitCards:1, complete: { count:0 }, facedown:1 },
    { name:"pyramidUp", canPut:false, init:1, limitCards:1, complete: { count:0 } },
    { name:"discard", limitVisible:1, limitAvailable:1, deal:1, init:0, canPut: true, match: [
      { count:1, rank:RankMatch.Asc },
      { count:1, rank:RankMatch.Desc },
    ]},
  ],
})

register({...games['tripeaks-head-start'],
  title: 'Head Start (Thoughtful)',
  thoughtful: true,
})

register({
  title: 'Spider',
  limitCycles: 1,
  deckConfig: {
    decks:8,
    suits:'S',
  },
  stackConfig: [
    { name:"foundation", match: { suit:true, count:13, rank:RankMatch.Desc }, limitVisible:1, complete: { count:13, suit:true }, matchPriority:2 },
    { name:"play6", deal:1, canPut:true, init:6, facedown:5, limitAvailable:0, match: { suit:true, suitOnlyForMovedCards:true, rank:RankMatch.Desc }, limitVisible:20 },
    { name:"play5", deal:1, canPut:true, init:5, facedown:4, limitAvailable:0, match: { suit:true, suitOnlyForMovedCards:true, rank:RankMatch.Desc }, limitVisible:20 }
  ],
  layout: 'D 00000000,1111222222',
  autoflip: true,
})

register({...games['spider'],
  title: '(Thoughtful)',
  thoughtful: true,
})

register({...games['spider'],
  title: 'Two Suits',
  deckConfig: {
    decks: 4,
    suits:'SD',
  }
})

register({...games['spider-two-suits'],
  title: 'Two Suits (Thoughtful)',
  thoughtful: true,
})

register({...games['spider'],
  title: 'Four Suits',
  deckConfig: {
    decks: 4,
    suits:'SDHC',
  }
})

register({...games['spider-four-suits'],
  title: 'Four Suits (Thoughtful)',
  thoughtful: true,
})

export default games