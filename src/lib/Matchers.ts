import type Card from "$lib/Card"
import { confBoolean, confNumber } from "$lib/util"
import { ranks } from "$lib/Stack"

export enum ColorMatch {
  None,
  Alternate,
  Same,
}

export enum RankMatch {
  None,
  Equal,
  Asc,
  Desc,
}

export type MatchConfigSetting = {
  suit?: boolean
  hasJoker?: boolean
  color?: ColorMatch
  rank?: RankMatch
  count?: number
  total?: number
  countGT?: boolean
  countLT?: boolean
  totalGT?: boolean
  totalLT?: boolean
}

export class MatchConfig {
  suit: boolean = false
  hasJoker: boolean = false
  color: ColorMatch = ColorMatch.None
  rank: RankMatch = RankMatch.None
  count: number = 0
  total: number = 0
  countGT: boolean = false
  countLT: boolean = false
  totalGT: boolean = false
  totalLT: boolean = false
  constructor(conf?:string|boolean|MatchConfig|MatchConfigSetting) {
    if (!conf || typeof conf === 'boolean') {
      return this
    }
    if (typeof conf === 'string') {
      let config = conf.split('');
      [this.suit, this.hasJoker] = confBoolean.decode(config[0]);
      [this.countLT, this.countGT, this.totalLT, this.totalGT] = confBoolean.decode(config[1])
      this.color = confNumber.decode(config[2])
      this.rank = confNumber.decode(config[3])
      this.count = confNumber.decode(config[4])
      this.total = confNumber.decode(config[5])
    }
    else {
      Object.assign(this, conf)
    }
    return this
  }
  toString() {
    return [
      confBoolean.encode(this.suit, this.hasJoker),
      confBoolean.encode(this.countLT, this.countGT, this.totalLT, this.totalGT),
      confNumber.encode(this.color, this.rank, this.count, this.total),
    ].join('')
  }
}

export class MatchTest {
  conf: MatchConfig = new MatchConfig()
  constructor(conf:string|boolean|MatchTest|MatchConfig|MatchConfigSetting) {
    if (!conf || typeof conf === 'boolean') return this
    else if (typeof conf === 'string') this.conf = new MatchConfig(conf)
    else if (conf instanceof MatchTest) Object.assign(this, conf)
    else this.conf = Object.assign(conf, new MatchConfig(conf))
    return this
  }
  test(cards:Card|Card[], topCard?:Card|boolean):number {

    // If the stack's topCard is undefined, it means that one is needed but there is none.
    if (typeof topCard === 'undefined' && (this.conf.suit || this.conf.color || this.conf.rank)) return 0
    if (topCard === true) throw new Error(`You can't use "true" as the top card.`)

    if (!Array.isArray(cards)) cards = [cards]
    let matched = 0

    if (this.conf.total) {
      let total = cards.reduce((agg,card) => {
        return agg + card.value
      }, 0)
      if (this.conf.totalLT && this.conf.total >= total) matched++
      else if (this.conf.totalGT && this.conf.total <= total) matched++
      else if (this.conf.total === total) matched++
      else return 0
    }

    if (this.conf.count) {
      if (this.conf.countLT && this.conf.count >= cards.length) matched++
      else if (this.conf.countGT && this.conf.count <= cards.length) matched++
      else if (this.conf.count === cards.length) matched++
      else return 0
    }

    if (this.conf.hasJoker) {
      if (cards.filter(c => c.isJoker).length) matched++
      else return 0
    }

    if (this.conf.suit) {
      let suit = topCard ? topCard.suit : cards[0].suit
      if (cards.filter(c => c.suit === suit).length === cards.length) matched++
      else return 0
    }

    if (this.conf.color) {
      let color = topCard ? topCard.color : cards[0].color
      if (this.conf.color === ColorMatch.Same && cards.length === cards.filter(c => c.color === color).length) matched++
      else if (cards.length === cards.filter((c,i) => (i%2 ? c.color === color : (c.color && c.color !== color))).length) matched++
      else return 0
    }

    if (this.conf.rank) {
      let rankTest = topCard ? topCard.rank : ''
      if (this.conf.rank === RankMatch.Equal) {
        if (cards[0].rank && rankTest.match(cards[0].rank)) matched++
        else return 0
      }
      else if (this.conf.rank === RankMatch.Asc) {
        rankTest += cards.map(c => c.rank).join('')
        if (ranks.match(rankTest)) matched++
        else return 0
      }
      else if (this.conf.rank === RankMatch.Desc) {
        rankTest = cards.map(c => c.rank).reverse().join('') + rankTest
        if (ranks.match(rankTest)) matched++
        else return 0
      }
    }

    return matched

  }
}
