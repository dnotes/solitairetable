import type Card from "$lib/Card"
import { MatchConfig, ColorMatch, RankMatch } from "$lib/Matchers"
import type { MatchTest, MatchConfigSetting } from "$lib/Matchers"
import { testCards } from "$lib/Matchers"
import { confString, confBoolean, confNumber } from "$lib/util"

export const ranks = "A23456789TJQK"
const emptyRanks = "23456789TJQKA"

export type StackConfigSetting = {
  empty?: string          // which ranks can be placed onto empty stacks ("23456789TJQKA")
  init?: number           // number of cards dealt initially (0)
  facedown?: number       // number of cards face down initially (0)
  deal?: number           // number of cards this stack takes in dealing rounds (0)
  limitCards?: number     // whether this stack has a limit to the number of cards (0) (0 = no limit on number of cards)
  limitAvailable?:number  // how many cards are available from the stack (1) (0 = no limit)
  limitVisible?: number   // how many cards are visible (0) (0 = all cards are visible)
  canPut?: boolean        // whether this stack can accept cards during play (true, unless "deal" is true)
  canGet?: boolean        // whether this stack can be pulled from during play (true) (set to false for a standard discard pile)
  horizontal?: boolean    // whether the stack is horizontal (false)
  showEmpty?: boolean     // whether a placeholder for the stack is shown when empty (true)
  match?: string|boolean|MatchConfigSetting|MatchConfigSetting[]|MatchConfig|MatchConfig[] // the match configuration for the top card (undefined)
  complete?: string|boolean|MatchConfigSetting|MatchConfigSetting[]|MatchConfig|MatchConfig[] // the completion conditions for the stack (undefined)
}

export class StackConfig {
  empty = emptyRanks
  init = 0
  facedown = 0
  deal = 0
  limitCards = 0
  limitAvailable = 1
  limitVisible = 0
  canPut = true
  canGet = true
  horizontal = false
  showEmpty = true
  match:MatchConfig[] = []
  complete:MatchConfig[] = []

  constructor(conf?:string|boolean|StackConfig|StackConfigSetting) {
    if (!conf || typeof conf === 'boolean') return this
    else if (typeof conf === "string") {
      let config = conf.split("|")
      this.empty = confString.decode(config[0], ranks);
      [this.init, this.facedown, this.deal, this.limitCards, this.limitAvailable, this.limitVisible] = config[1].split("").map(confNumber.decode);
      [this.canPut, this.canGet, this.horizontal, this.showEmpty] = confBoolean.decode(config[2]);
      this.match = config[3].split(",").map(t => new MatchConfig(t));
      this.complete = config[4].split(",").map(t => new MatchConfig(t));
    }
    else {
      if (conf.deal && !conf.canPut) conf.canPut = false
      Object.assign(this, conf)
      if (this.match) this.match = Array.isArray(this.match) ? this.match.map(c => new MatchConfig(c)) : [new MatchConfig(this.match)]
      if (this.complete) this.complete = Array.isArray(this.complete) ? this.complete.map(c => new MatchConfig(c)) : [new MatchConfig(this.complete)]
    }
    return this
  }
  toString():string {
    return [
      confString.encode(this.empty, emptyRanks),
      confNumber.encode(this.init, this.facedown, this.deal, this.limitCards, this.limitAvailable, this.limitVisible),
      confBoolean.encode(this.canPut, this.canGet, this.horizontal, this.showEmpty),
      this.match.map(m => m.toString()).join(","),
      this.complete.map(m => m.toString()).join(","),
    ].join(";")
  }
}

export interface StackInterface {
  index:number
  length:number
  stack:Card[]
  firstVisible:number
  isDeck:boolean
  conf:any
  maxHeight:number
  maxWidth:number
  initialized:boolean
  blocked:boolean
  wants(cards:Card|Card[]):number
  push(cards:Card|Card[]):void
  look(qty?:string|number|any[]):Card[]
  pull(qty?:string|number|any[]):Card[]
  truncate(index:number):Card[]
  getCardDepth(card:number|Card|Card[]):number
  getCard(cardDepth:number):Card
  // pick(index:number):Card
  // put(card:Card):void
}

export default class Stack implements StackInterface {
  _stack = []
  _facedown = 0
  index = 0
  isDeck = false
  initialized = false
  conf:StackConfig = new StackConfig()

  constructor(conf?:string|StackConfig|StackConfigSetting, index=0) {
    let config = new StackConfig(conf)
    Object.assign(this.conf, config)
    if (Number.isInteger(index)) this.index = index
    return this
  }

  get stack() { return this._stack }
  set stack(stack) { this._stack = stack }

  get isEmpty() { return this._stack.length === 0 }

  get length() { return this._stack.length}

  get firstVisible() {
    if (!this.conf.limitVisible) return 0
    return this.stack.length - this.conf.limitVisible
  }

  get maxHeight() {
    if (this.conf.horizontal || this.conf.limitCards === 1 || this.conf.limitVisible === 1) return 1
    return this.conf.limitVisible || 14
  }

  get maxWidth() {
    if (!this.conf.horizontal || this.conf.limitCards === 1 || this.conf.limitVisible === 1) return 1
    return this.conf.limitVisible || 52
  }

  get topCard():Card|undefined {
    return this.stack[this.length-1] || undefined
  }

  get blocked():boolean {
    return false
  }

  reset() {
    this.stack = []
    this.initialized = false
  }

  push(cards:Card|Card[]) {
    if (!Array.isArray(cards)) cards = [cards]
    this._stack = [...this._stack, ...cards]
  }

  look(qty:string|number|any[]=1):Card[] {
    if (typeof qty === "number") {}
    else if (typeof qty === "string") qty = parseInt(qty)
    else if (Array.isArray(qty)) qty = qty.length
    else qty = 1
    return this._stack.slice(this.length - qty)
  }

  pull(qty:string|number|any[]=1):Card[] {
    if (typeof qty === "number") {}
    else if (typeof qty === "string") qty = parseInt(qty)
    else if (Array.isArray(qty)) qty = qty.length
    else qty = 1
    return this._stack.splice(this.length - qty, qty)
  }

  truncate(index:string|number):Card[] {
    if (typeof index === 'number') {}
    else if (typeof index === 'string') index = parseInt(index)
    let qty = this.length - index
    return this.pull(qty)
  }

  getCardDepth(card:number|Card|Card[]):number {
    if (typeof card === 'number') return this.length - card
    let index = Array.isArray(card) ? this.stack.indexOf(card[0]) : this.stack.indexOf(card)
    return this.length - index
  }
  getCard(cardDepth:number):Card {
    return this.stack[this.length - cardDepth]
  }

  toString() {
    return this.stack.join(",")
  }

  wants(cards:Card|Card[]):number {

    // if this is not a play stack, exit now
    if (!this.conf.canPut) return 0

    // ensure array of cards
    if (!Array.isArray(cards)) cards = [cards]

    // first try empty
    if (this.isEmpty && this.conf.empty.match(cards[0].rank)) return 1

    // not all stacks take cards
    if (!this.conf.match) return 0

    // iterate over array
    return Math.max(...this.conf.match.map(conf => {
      let test = this.getMatchTest(conf)
      return test ? testCards(cards, test) : 0
    }))

  }

  getMatchTest(conf:MatchConfig):MatchTest|undefined {
    if (!this.topCard) {
      if (conf.suit || conf.color || conf.rank) return
    }
    let test = {}
    Object.keys(conf).forEach(k => test[k] = conf[k])
    if (conf.suit) test["suit"] = this.topCard?.suitName
    else if (conf.hasOwnProperty("color")) {
      if (conf.color === ColorMatch.Same) test["suit"] = "hearts|diamonds".match(this.topCard.suitName) ? "hearts|diamonds" : "clubs|spades"
      else test["suit"] = "clubs|spades".match(this.topCard.suitName) ? "hearts|diamonds" : "clubs|spades"
    }
    if (conf.hasOwnProperty("rank")) {
      if (conf.rank === RankMatch.Equal) test["rank"] = this.topCard.rank
      else if (conf.rank === RankMatch.Asc) test["rank"] = this.topCard.rank === "K" ? "" : ranks[ranks.indexOf(this.topCard.rank)+1]
      else if (conf.rank === RankMatch.Desc) test["rank"] = this.topCard.rank === "A" ? "" : ranks[ranks.indexOf(this.topCard.rank)-1]
      else if (conf.rank === RankMatch.Higher) test["rank"] = this.topCard.rank === "K" ? "" : ranks.slice(ranks.indexOf(this.topCard.rank)+1)
      else if (conf.rank === RankMatch.Lower) test["rank"] = this.topCard.rank === "A" ? "" : ranks.slice(0,ranks.indexOf(this.topCard.rank)-1)
    }
    return test
  }

}
