import type Card from "$lib/Card"
import { confBoolean, confNumber } from "$lib/util"

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
  Higher,
  Lower,
}

export type MatchConfigSetting = {
  suit?: boolean
  hasJoker?: boolean
  color?: ColorMatch
  rank?: RankMatch
  count?: number
  total?: number
}

export class MatchConfig {
  suit: boolean
  hasJoker: boolean
  color: ColorMatch
  rank: RankMatch
  count: number
  total: number
  constructor(conf:string|boolean|MatchConfig) {
    if (!conf) {
      return this
    }
    else if (typeof conf === 'boolean') {
      return this
    }
    if (typeof conf === 'string') {
      let config = conf.split('');
      [this.suit, this.hasJoker] = confBoolean.decode(config[0]);
      this.color = confNumber.decode(config[1])
      this.rank = confNumber.decode(config[2])
      this.count = confNumber.decode(config[3])
      this.total = confNumber.decode(config[4])
    }
    else {
      Object.assign(this, conf)
    }
    return this
  }
  toString() {
    return [
      confBoolean.encode(this.suit, this.hasJoker),
      confNumber.encode(this.color, this.rank, this.count, this.total),
    ].join('')
  }
}

export type MatchTest = {
  total?: number,
  suit?: string,
  rank?: string,
  count?: number,
  hasJoker?: boolean,
}

export function testCards(cards:Card|Card[], conf:MatchTest) {
  if (!Array.isArray(cards)) cards = [cards]
  let matched = 0

  if (conf.total) {
    if (conf.total === cards.reduce((agg,card) => {
      return agg + card.value
    }, 0)) matched++
    else return 0
  }

  if (conf.count) {
    if (conf.count === cards.length) matched++
    else return 0
  }

  if (conf.hasOwnProperty('hasJoker')) {
    if (cards.filter(c => c.isJoker).length) matched++
    else return 0
  }

  if (conf.hasOwnProperty('suit')) {
    if (conf.suit.match(cards[0].suitName)) matched++
    else return 0
  }

  if (conf.hasOwnProperty('rank')) {
    if (conf.rank === cards[0].rank) matched++
    else return 0
  }

  return matched
}