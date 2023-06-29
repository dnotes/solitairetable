import type Card from "$lib/Card"
import type { SelectedCard } from "$lib/Card"
import { MatchConfig, MatchTest } from "$lib/Matchers"
import type { MatchConfigSetting } from "$lib/Matchers"
import { confString, confBoolean, confNumber } from "$lib/util"
import { slugify } from 'transliteration'
import type { DeckConfig } from "./Deck"

export const ranks = "A23456789TJQK"
const emptyRanks = "23456789TJQKA"

export type StackConfigSetting = {
  name: string            // a name for this type of stack
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
  isFreecell?: boolean    // whether this stack should be part of a freecell group (false)
  showEmpty?: boolean     // whether a placeholder for the stack is shown when empty (true)
  matchPriority?: number  // the priority of the row for matches (1)
  match?: string|boolean|MatchConfigSetting|MatchConfigSetting[]|MatchConfig|MatchConfig[]|MatchTest[] // the match configuration for the top card (undefined)
  complete?: string|boolean|MatchConfigSetting|MatchConfigSetting[]|MatchConfig|MatchConfig[]|MatchTest[] // the completion conditions for the stack (undefined)
  autoplay?: string|boolean|MatchConfigSetting|MatchConfigSetting[]|MatchConfig|MatchConfig[]|MatchTest[] // the completion conditions for the stack (undefined)
}

export class StackConfig {
  name = ''
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
  isFreecell = false
  showEmpty = true
  matchPriority = 1
  match:MatchTest[] = []
  complete:MatchTest[] = []
  autoplay:MatchTest[] = []
  isAutoplayStack:boolean = false
  isCompletionStack:boolean = false

  constructor(conf?:string|boolean|StackConfig|StackConfigSetting) {
    if (!conf || typeof conf === 'boolean') return this
    else if (typeof conf === "string") {
      let config = conf.split(";")
      this.name = config[0]
      this.empty = confString.decode(config[1], emptyRanks);
      [this.canPut, this.canGet, this.horizontal, this.isFreecell, this.showEmpty] = confBoolean.decode(config[2]);
      let numbers = config[3].split("").map(confNumber.decode);
      this.init = numbers[0] ?? 0
      this.facedown = numbers[1] ?? 0
      this.deal = numbers[2] ?? 0
      this.limitCards = numbers[3] ?? 0
      this.limitAvailable = numbers[4] ?? 0
      this.limitVisible = numbers[5] ?? 0
      this.match = config[4].split(",").map(t => new MatchTest(t));
      this.complete = config[5].split(",").map(t => new MatchTest(t));
      this.autoplay = config[6].split(",").map(t => new MatchTest(t))
    }
    else {
      if (conf.deal && !conf.canPut) conf.canPut = false
      if (conf.match) conf.match = Array.isArray(conf.match) ? conf.match.map(c => new MatchTest(c)) : [new MatchTest(conf.match)]
      if (conf.complete) conf.complete = Array.isArray(conf.complete) ? conf.complete.map(t => new MatchTest(t)) : [new MatchTest(conf.complete)]
      if (conf.autoplay) conf.autoplay = Array.isArray(conf.autoplay) ? conf.autoplay.map(t => new MatchTest(t)) : [new MatchTest(conf.autoplay)]
      Object.assign(this, conf)
    }
    if (this.autoplay.length) this.isAutoplayStack = true
    if (this.complete.length) this.isCompletionStack = true
    return this
  }
  toString():string {
    return [
      slugify(this.name, { allowedChars:'-_a-zA-Z0-9', fixChineseSpacing:false, trim:true }),
      confString.encode(this.empty, emptyRanks),
      confBoolean.encode(this.canPut, this.canGet, this.horizontal, this.isFreecell, this.showEmpty),
      confNumber.encode(this.init, this.facedown, this.deal, this.limitCards, this.limitAvailable, this.limitVisible, this.matchPriority),
      this.match.join(","),
      this.complete.join(","),
      this.autoplay.join(","),
    ].join(";")
  }
  get description() {
    return this.name
  }
}

export interface StackInterface {
  index:number
  length:number
  stack:Card[]
  firstVisible:number
  isDeck:boolean
  conf:StackConfig|DeckConfig
  maxHeight:number
  maxWidth:number
  initialized:boolean
  rowPosition?:number
  topCard?:Card
  freecellStacks:StackInterface[]
  stacksOverlaying:StackInterface[]
  stacksOverlayed:StackInterface[]
  isEmpty:boolean
  isBlocked:boolean
  reset():void
  isTouching(stackIndex:number):boolean
  isOverlaying(stackIndex:number):boolean
  isOverlayedBy(stackIndex:number):boolean
  wants(cards:SelectedCard[]):number
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
  _stack:Card[] = []
  _facedown = 0
  index = 0
  isDeck = false
  initialized = false
  stacksOverlayed:StackInterface[] = []
  stacksOverlaying:StackInterface[] = []
  freecellStacks:StackInterface[] = []
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
    return Math.max(this.stack.length - this.conf.limitVisible, 0)
  }

  get maxHeight() {
    if (this.conf.horizontal || this.conf.limitCards === 1 || this.conf.limitVisible === 1) return 1
    if (this.conf.limitCards || this.conf.limitVisible) return this.conf.limitCards || this.conf.limitVisible
    if (!this.conf.canPut && !this.conf.deal) return this.conf.init || 1
    return 14
  }

  get maxWidth() {
    if (!this.conf.horizontal || this.conf.limitCards === 1 || this.conf.limitVisible === 1) return 1
    if (this.conf.limitCards || this.conf.limitVisible) return this.conf.limitCards || this.conf.limitVisible
    if (!this.conf.canPut && !this.conf.deal) return this.conf.init || 1
    return 52
  }

  get topCard():Card|undefined {
    return this.stack[this.length-1] || undefined
  }

  get isComplete():boolean {
    return this.conf.complete.reduce((agg,match) => {
      return agg && (match.test(this.stack) ? true : false)
    }, true)
  }

  get canAutoplay():boolean {
    if (!this.length) return true
    return this.conf.autoplay.reduce((agg,match) => {
      return agg && (match.test(this.stack) ? true : false)
    }, true)
  }

  get isBlocked():boolean {
    return this.stacksOverlaying.reduce((v,stack) => {
      return v || !stack.isEmpty
    }, false)
  }

  isTouching(stackIndex:number):boolean {
    return this.isOverlaying(stackIndex) || this.isOverlayedBy(stackIndex)
  }

  isOverlaying(stackIndex:number):boolean {
    return this.stacksOverlayed.map(s => s.index).includes(stackIndex)
  }

  isOverlayedBy(stackIndex:number):boolean {
    return this.stacksOverlaying.map(s => s.index).includes(stackIndex)
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

  wants(cards:SelectedCard[]):number {

    // if this is not a play stack, exit now
    if (!this.conf.canPut) return 0

    // ensure array of cards
    if (!Array.isArray(cards)) cards = [cards]

    // if this is the same stack, exit
    if (this.stack.join('').match(RegExp(cards.join('') + '$'))) return 0

    // first try empty
    if (this.isEmpty && !this.conf.empty.match(cards[0].rank)) return 0

    // ensure max number of cards
    if (this.conf.limitCards && this.length + cards.length > this.conf.limitCards) return 0

    // not all stacks take cards
    if (!this.conf.match) return 0

    // iterate over array
    return Math.max(...this.conf.match.map(matcher => {
      // @ts-ignore it complains because this is passing SelectedCard[], but the final requires Card[]... @TODO fix
      return matcher.test(cards, this)
    }))

  }

}
