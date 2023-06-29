import type Card from "$lib/Card"
import { confBoolean, confNumber } from "$lib/util"
import { ranks } from "$lib/Stack"
import type { StackInterface } from "$lib/Stack"

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

export enum StackMatch {
  Any,
  Touching,
  Overlaying,
  Underlaying,
}

export type MatchConfigSetting = {

  // Matches if the suit is the same for all cards
  suit?: boolean

  // Matches if the suit is the same for all cards that are being moved (not necessarily the stack)
  suitOnlyForMovedCards?: boolean

  // Matches if the moved cards include a joker
  hasJoker?: boolean

  // Matches if the number of cards is less than the number of "freecell" stacks
  useFreecells?: boolean

  // Disallows moving cards to an empty pile IF a match requires suit, color, or rank
  blockWhenEmpty?: boolean

  // Allows moving cards to a pile with a facedown topcard EVEN IF a match requires suit, color, or rank
  moveWhenFacedown?: boolean

  // Specifies the Stacks from which cards may be moved
  fromStack?: StackMatch

  // Specifies a type of color matching to perform (none, alternate, or same)
  color?: ColorMatch

  // Specifies a type of rank matching to perform (none, equal, asc, desc)
  rank?: RankMatch

  // Matches the number of cards being moved or inspected
  count?: number

  // Matches the total value of the cards being moved or inspected (e.g. for Pyramid games)
  total?: number

  // Alters "count" or "total" matchers so that the value of the cards moved or inspected matches
  // if it is greater than (GT) or less than (LT) the number provided for "count" or "total"
  countGT?: boolean
  countLT?: boolean
  totalGT?: boolean
  totalLT?: boolean
}

export class MatchConfig {
  suit: boolean = false
  suitOnlyForMovedCards: boolean = false
  hasJoker: boolean = false
  useFreecells: boolean = false
  blockWhenEmpty: boolean = false
  moveWhenFacedown: boolean = false
  fromStack?: StackMatch = StackMatch.Any
  color?: ColorMatch = ColorMatch.None
  rank?: RankMatch = RankMatch.None
  count?: number
  total?: number
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
      [this.suit, this.hasJoker, this.useFreecells, this.blockWhenEmpty, this.moveWhenFacedown] = confBoolean.decode(config[0]);
      [this.countLT, this.countGT, this.totalLT, this.totalGT, this.suitOnlyForMovedCards] = confBoolean.decode(config[1])
      this.color = confNumber.decode(config[2])
      this.rank = confNumber.decode(config[3])
      this.count = confNumber.decode(config[4])
      this.total = confNumber.decode(config[5])
      this.fromStack = confNumber.decode(config[6])
    }
    else {
      Object.assign(this, conf)
    }
    return this
  }
  toString() {
    return [
      confBoolean.encode(this.suit, this.hasJoker, this.useFreecells, this.blockWhenEmpty, this.moveWhenFacedown),
      confBoolean.encode(this.countLT, this.countGT, this.totalLT, this.totalGT),
      confNumber.encode(this.color, this.rank, this.count, this.total, this.fromStack),
    ].join('')
  }
  get description() {
    let out:any = []
    return out.join(',')
  }
}

export class MatchTest {
  conf: MatchConfig = new MatchConfig()
  constructor(conf:string|boolean|MatchTest|MatchConfig|MatchConfigSetting) {
    if (!conf || typeof conf === 'boolean') return this
    else if (conf instanceof MatchTest) Object.assign(this, conf)
    else this.conf = new MatchConfig(conf)
    return this
  }
  /**
   * Test whether an array of cards matches a set of conditions.
   * @param cards An array Card[]|SelectedCard[] to run the test against.
   * @param stack (optional) The stack that the cards should match.
   * This must be provided if the cards are attempting to move to the stack,
   * and must be omitted if the stack is being tested for completeness.
   * @returns An integer for how many conditions matched, or 0 if a condition failed.
   */
  test(cards:Card|Card[], stack?:StackInterface):number {

    let isMoveTest = stack ? true : false
    let topCard = isMoveTest ? stack?.topCard : false

    // Tests for suit, color, and rank may require a face-up topcard to compare against when being moved
    if (isMoveTest && ((!topCard && this.conf.blockWhenEmpty) || (topCard && topCard.facedown && !this.conf.moveWhenFacedown)) && (this.conf.suit || this.conf.color || this.conf.rank)) return 0

    // Setup further variables
    if (!cards) cards = []
    if (!Array.isArray(cards)) cards = [cards]
    let matched = 0

    if (typeof this.conf.total !== 'undefined') {
      let total = cards.reduce((agg,card) => {
        return agg + card.value
      }, 0)
      if (this.conf.totalLT && this.conf.total >= total) matched++
      else if (this.conf.totalGT && this.conf.total <= total) matched++
      else if (this.conf.total === total) matched++
      else return 0
    }

    if (typeof this.conf.count !== 'undefined') {
      if (this.conf.countLT && this.conf.count >= cards.length) matched++
      else if (this.conf.countGT && this.conf.count <= cards.length) matched++
      else if (this.conf.count === cards.length) matched++
      else return 0
    }

    if (this.conf.useFreecells) {
      if (cards.length -1 <= (stack?.freecellStacks || []).filter(s => s.isEmpty)?.length) matched++
      else return 0
    }

    if (this.conf.hasJoker) {
      if (cards.filter(c => c.isJoker).length) matched++
      else return 0
    }

    if (this.conf.suit) {
      if (!cards.length) matched++ // suit, color, and rank tests pass for empty arrays (is this right?)
      else {
        let suit = topCard && !this.conf.suitOnlyForMovedCards ? topCard.suit : cards[0].suit
        if (cards.filter(c => c.suit === suit).length === cards.length) matched++
        else return 0
      }
    }

    if (this.conf.color) {
      if (!cards.length) matched++ // suit, color, and rank tests pass for empty arrays (is this right?)
      else {
        let color = topCard ? topCard.color : cards[0].color
        let hasTopCard = topCard ? 1 : 0
        if (this.conf.color === ColorMatch.Same && cards.length === cards.filter(c => c.color === color).length) matched++
        else if (cards.length === cards.filter((c,i) => (
          (i%2 === hasTopCard) === (c.color === color)
        )).length) matched++
        else return 0
      }
    }

    if (this.conf.rank) {
      if (!cards.length) matched++ // suit, color, and rank tests pass for empty arrays (is this right?)
      else {
        let rankTest = topCard ? topCard.rank : ''
        if (this.conf.rank === RankMatch.Equal) {
          if (cards.filter(c => c.rank === rankTest).length === cards.length) matched++
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
    }

    // @ts-ignore matchPriority is not in DeckConfig... that's why it has "?."
    return isMoveTest ? (stack?.conf?.matchPriority || 0) : 1

  }
  toString() {
    return this.conf.toString()
  }
  toJSON() {
    return this.conf
  }
  get description() {
    return this.conf.description
  }
}
