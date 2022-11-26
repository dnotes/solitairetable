import { default as Card, cards } from "$lib/Card"
import { ranks } from "$lib/Stack"
import type { StackInterface } from "$lib/Stack"
import { confString, confNumber, confBoolean } from "$lib/util"

export const suits = "chds"

export type DeckConfigSetting = {
  ranks?: string   // ranks to include ("A23456789TJQK")
  suits?: string // suits to include ("CHDS")
  jokers?: number   // number of jokers to include (0)
  decks?: number // number of full decks in this deck
}

export class DeckConfig {
  ranks = ranks     // ranks to include ("A23456789TJQK")
  suits = suits // suits to include ("CHDS")
  jokers = 0    // number of jokers to include (0)
  decks = 1 // number of full decks in this deck
  constructor(conf?:string|DeckConfigSetting) {
    if (!conf) return this
    if (typeof conf === 'string') {
      let ranksSuits = confString.decode(conf.slice(0,3), ranks + suits)
      this.ranks = ranksSuits.replace(/chds/g, '').toLowerCase()
      this.suits = ranksSuits.replace(/A23456789TJQK/g, '')
      this.jokers = confNumber.decode(conf.slice(3,4).toString()) ?? 0
      this.decks = confNumber.decode(conf.slice(4,5).toString()) ?? 1;
    }
    else {
      Object.assign(this, conf)
      this.suits = this.suits.toLowerCase()
    }
  }
  toString() {
    return [
      confString.encode(this.ranks + this.suits, ranks + suits),
      confNumber.encode(this.jokers),
      confNumber.encode(this.decks),
    ].join('')
  }
  get description() {
    let out = []
    if (this.ranks.length !== ranks.length) {
      if (this.ranks.length <= ranks.length / 2) out.push(`${this.ranks}`)
      else out.push(`-${ranks.replace(new RegExp('[' + this.ranks + ']', 'g'), '')}`)
    }
    if (this.suits.length !== 4) {
      out.push(this.suits.replace('C', '♣').replace('H', '♥').replace('D', '♦').replace('S', '♠'))
    }
    if (!out.length) out.push('Standard')
    if (this.jokers) out.push(`${this.jokers} jk`)
    if (this.decks > 1) out.push(`x${this.decks}`)
    return out.filter(Boolean).join(', ')
  }
}

export interface DeckInterface {
  decks: number
  suits: string
  ranks: string
  cycles: number
}

export default class Deck implements StackInterface,DeckInterface {

  _deck = <Card[]>[]
  base = <string[]>[]
  stack = <Card[]>[]
  index = -1
  isDeck = true
  cycles = 1
  maxHeight = 1
  maxWidth = 1
  initialized = false
  isShuffled = false
  freecellStacks = []
  stacksOverlayed = []
  stacksOverlaying = []
  conf: DeckConfig

  constructor(conf?:string|DeckConfigSetting) {

    // for passing options object
    this.conf = new DeckConfig(conf)
    this.base = [...cards.filter(c => this.ranks.match(c.rank) && this.suits.match(c.suitName[0])).map(c => c.char), ...Array.from({length:this.conf.jokers}, (_,i) => i+1).map(v => v.toString())]
    this.deck = new Array(this.conf.decks).fill(this.base).flat()
    if (!this.isShuffled) this.shuffle()

    return this

  }

  get deck():Card[] {
    return this._deck
  }

  set deck(stack:string|string[]|Card[]) {

    // Ensure an array
    if (typeof stack === 'string') stack = stack.split('')
    if (!Array.isArray(stack)) throw new Error('Invalid deck : Not a valid string or array of cards')
    if (stack.length !== this.base.length * this.conf.decks) throw new Error(`Invalid deck : Wrong number of cards (${stack.length}/${this.base.length * this.conf.decks})`)

    // Get a map of single characters (incase Card[] was passed)
    let charMap = stack.map(c => typeof c === 'string' ? c : c.id)

    // Ensure a sensible number of cards
    // let cardCount = charMap.filter(c => c.match(/[a-zA-z]/)).length
    // if (cardCount % 4 !== 0) throw new Error(`Invalid number of cards in deck: ${cardCount} (must be divisble by 4, sans jokers)`)

    // Ensure valid, unique cards
    // if (charMap.filter((v,i,a) => {
    //   return a.indexOf(v) === i && v.match(/[a-zA-Z1-9]/)
    // }).length !== stack.length ) {
    //   let badCards = charMap.filter(v => !v.match(/[a-zA-Z1-9]/))
    //   let duplicateCards = charMap.filter((v,i,a) => a.slice(i+1).indexOf(v) > -1)
    //   throw new Error(`Duplicate or invalid cards in deck. (duplicate: ${duplicateCards.join(' ')}, invalid: ${badCards.join(' ')})`)
    // }

    this._deck = stack.map((c,i) => new Card(c.toString(),i))
    this.stack = [...this._deck]

    // Set config (for exports)
    if (!this.conf) {
      let hasRanks = this.deck.filter(c => c.char.match(/[a-zA-Z]/)).map(c => c.rank).join('')
      let rankList = ranks.split('').filter(r => hasRanks.match(r)).join('')
      let firstCharOfDeck = hasRanks[0]
      let cardRankInDeck = cards?.find(c => c.char === firstCharOfDeck)?.rank
      let allSuitsInDeck = cards.filter(c => c.rank === cardRankInDeck).map(c => c.suitName[0])
      let numberOfDecks = hasRanks.length - hasRanks.replace(RegExp(firstCharOfDeck, 'g'), '').length
      let numberOfJokers = charMap.filter(c => c.toString().match(/\d/)).length
      this.conf = new DeckConfig({
        decks: numberOfDecks,
        ranks: [...new Set(rankList)].join(''),
        suits: [...new Set(allSuitsInDeck)].join(''),
        jokers: numberOfJokers ? numberOfJokers / numberOfDecks : 0
      })
    }

  }

  get decks() { return this.conf.decks }

  get suits() { return this.conf.suits }

  get ranks() { return this.conf.ranks }

  get isEmpty() { return this.stack.length === 0 }

  get topCard() {
    return this.stack[0]
  }

  get isBlocked():boolean {
    return false
  }

  reset() {
    this.initialized = false
    this.cycles = 1
    this.stack = [...this.deck.map(c => { c.facedown = false; return c; })]
  }

  isTouching(stackIndex:number):boolean {
    return this.isOverlaying(stackIndex) || this.isOverlayedBy(stackIndex)
  }

  isOverlaying(stackIndex:number):boolean {
    return false
  }

  isOverlayedBy(stackIndex:number):boolean {
    return false
  }

  shuffle(): Deck {
    let count = this._deck.length;
    while(count) {
      this._deck.push(this._deck.splice(Math.floor(Math.random() * count), 1)[0]);
      count -= 1;
    }
    this.reset()
    return this
  }

  push(cards:Card|Card[]) {
    if (!Array.isArray(cards)) cards = [cards]
    this.stack = [...cards, ...this.stack]
  }

  pull(qty:string|number|any[]=1):Card[] {
    if (typeof qty === 'number') {}
    else if (typeof qty === 'string') qty = parseInt(qty)
    else if (Array.isArray(qty)) qty = qty.length
    else qty = 1
    return this.stack.splice(0, qty)
  }

  look(qty:string|number|any[]=1):Card[] {
    if (typeof qty === 'number') {}
    else if (typeof qty === 'string') qty = parseInt(qty)
    else if (Array.isArray(qty)) qty = qty.length
    else qty = 1
    return this.stack.slice(0, qty)
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

  toString():string {
    return this.deck.map(c => c.char).join('')
  }

  wants() { return 0 }

  get firstVisible() { return this.stack.length - 1 }

  get length() { return this.stack.length }

}
