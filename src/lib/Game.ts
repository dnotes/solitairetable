import { DeckConfig } from "$lib/Deck"
import type { DeckConfigSetting } from "$lib/Deck"
import type Card from "$lib/Card"
import Deck from "$lib/Deck";
import Stack, { StackConfig } from "$lib/Stack";
import type { StackConfigSetting, StackInterface } from "$lib/Stack"
import games from "$lib/data/games"
import { confBoolean, confNumber } from "$lib/util";

export class Action {
  cardDepth:number
  fromStack:number
  toStack?:number
  constructor(cardDepth:number, fromStack:number, toStack?:number) {
    this.cardDepth = cardDepth
    this.fromStack = fromStack
    this.toStack = toStack
    return this
  }
  toString() {
    if (this.toStack) return `${this.fromStack}->${this.toStack}${this.cardDepth > 1 ? `(${this.cardDepth})` : ''}`
    else return `${this.fromStack}[#${this.cardDepth}]`
  }
  reverse() {
    if (this.toStack || this.toStack === 0) return new Action(this.cardDepth, this.toStack, this.fromStack)
    else return new Action(this.cardDepth, this.fromStack)
  }
}

export class Activity {
  type: string
  actions: Action[]
  constructor(type:string, actions:Action|Action[]) {
    this.type = type
    this.actions = Array.isArray(actions) ? actions : [actions]
    return this
  }
  toString() {
    return `${this.type} (${this.actions.join(',')})`
  }
  reverse() {
    let a = new Activity(this.type, this.actions.map(a => a.reverse()))
    a.actions.reverse()
    return a
  }
}

export type Row = {
  maxHeight:number
  padBottom:number
  stacks:Array<StackInterface|undefined>
}

export interface GameConfigSetting {
  offsetRows?: boolean          // whether the rows are layed out in offset/hexagonal design (false)
  overlayRows?: boolean         // whether rows overlay each other (false)
  centerRows?: boolean          // whether the stacks are centered in the rows (false)
  multiSelect?: boolean         // whether multiple cards are selected at once (false)
  deal?: number                 // number of cards to deal at a time, if there is a deal pile (1)
  limitCycles?: number          // number of times to cycle through the deck (0 / unlimited)
  limitUndo?: number            // limit to the number of undos (0 / unlimited)
  layout: string,               // layout
  footer?: string,              // footer layout; will be on the side for small screens in landscape
  deckConfig?: string|DeckConfig|DeckConfigSetting       // configuration for the deck to be used
  stackConfig: string|StackConfig[]|StackConfigSetting[] // configuration of types of stacks
}

export class GameConfig {
  name?: string = ''              // the name of the game, if it has one
  offsetRows: boolean = false     // whether the rows are layed out in offset/hexagonal design (false)
  overlayRows: boolean = false    // whether rows overlay each other (false)
  centerRows?: boolean = false    // whether the stacks are centered in the rows (false)
  multiSelect: boolean = false    // whether multiple cards are selected at once (false)
  deal: number = 1                // number of cards to deal at a time, if there is a deal pile (1)
  limitCycles: number = 0         // number of times to cycle through the deck (0 / unlimited)
  limitUndo: number = 0           // limit to the number of undos (0 / unlimited)
  deckConfig: DeckConfig          // configuration for the deck to be used
  stackConfig: Array<StackConfig> // configuration of types of stacks
  layout: string = ''             // layout string
  footer?: string = ''            // footer, unused except in building
  constructor(conf?:string|GameConfig|GameConfigSetting) {

    if (!conf) {
      this.deckConfig = new DeckConfig()
      this.stackConfig = [ new StackConfig() ]
    }
    else if (typeof conf === 'string' && games[conf]) {
      Object.assign(this, games[conf], { name:conf })
      this.deckConfig = new DeckConfig(this.deckConfig)
      this.stackConfig = Array.isArray(this.stackConfig) ? this.stackConfig.map(c => new StackConfig(c)) : [ new StackConfig ]
    }
    else if (typeof conf === 'string') {
      let config = conf.split('!');
      [this.offsetRows, this.overlayRows, this.multiSelect] = confBoolean.decode(config[0]);
      [this.deal, this.limitCycles, this.limitUndo] = config[1].split('').map(confNumber.decode);
      this.deckConfig = new DeckConfig(config[2])
      this.stackConfig = config[3].split('').map(c => new StackConfig(c))
      this.layout = config[4]
      this.footer = config[5] || ''
    }
    else {
      Object.assign(this, conf)
      this.deckConfig = new DeckConfig(this.deckConfig)
      this.stackConfig.forEach(c => new StackConfig(c))
    }
    return this
  }
  toString() {
    return [
      confBoolean.encode(this.offsetRows, this.overlayRows, this.multiSelect),
      confNumber.encode(this.deal, this.limitCycles, this.limitUndo),
      this.deckConfig,
      this.stackConfig.join('|'),
      this.layout,
    ].join('')
  }
}

export default class Game {

  name: string = ''
  stacks: Stack[] = []
  deck: Deck
  undo: Activity[] = []
  redo: Activity[] = []
  layout: Row[] = []
  footer: Row[] = []
  longestRow: number = 0
  conf: GameConfig

  constructor(conf?:string|GameConfig|GameConfigSetting, deck?:string|DeckConfig|DeckConfigSetting) {
    this.conf = new GameConfig(conf)
    this.name = this.conf.name || ''

    // Setup the deck
    this.deck = new Deck(deck || this.conf.deckConfig);

    // Setup the stacks and the layout, at the same time
    ['layout','footer'].forEach(k => {
      let rows = this.conf[k].split(',').map(row => {
        let maxHeight = 0
        let rowStacks = row.split('').map(char => {
          let stack
          if (char.match(/\d/)) {
            stack = new Stack(this.conf.stackConfig[char])
            stack.index = this.stacks.length
            this.stacks.push(stack)
            if (stack.maxHeight > maxHeight) maxHeight = stack.maxHeight
          }
          else if (char.match(/[Dd]/)) {
            stack = this.deck
          }
          else if (char.match(/[-_]/)) stack = char
          return stack
        })
        if (k === 'layout' && rowStacks.length > this.longestRow) this.longestRow = rowStacks.length
        return {
          maxHeight,
          padBottom: maxHeight * 36,
          stacks: rowStacks
        }
      })

      this[k] = rows
    })

    // Initialize the first deal
    let length = this.deck.length
    // continue as long as the deck changes size
    do {
      length = this.deck.length
      this.deal(false)
    } while (this.deck.length !== length)
    this.deck.initialized = true
    this.stacks.forEach(stack => {
      stack.initialized = true
      if (stack.length && stack.conf.facedown) {
        for (let i=0; i<stack.conf.facedown; i++) {
          stack.stack[i].facedown = true
        }
      }
    })

    this.stacks = this.stacks
    this.deck = this.deck

    return this
  }

  get canRecycle():boolean|number {
    return !this.conf.limitCycles || (this.conf.limitCycles - this.deck.cycles)
  }

  getStack(index:number) {
    return this.stacks[index] || this.deck
  }

  doUndo() {
    if (!this.undo.length) return
    let activity = this.undo.pop()
    this.redo.push(activity)
    this.do(activity.reverse(), true)
  }
  doRedo() {
    if (!this.redo.length) return
    let activity = this.redo.pop()
    this.undo.push(activity)
    this.do(activity, true)
  }

  do(activity:Activity, isUndoRedo:boolean = false) {
    if (!isUndoRedo) {
      this.setUndo(activity)
      this.redo = []
    }
    if (activity.type === 'flip') {
      activity.actions.forEach(action => {
        this.getStack(action.fromStack).getCard(action.cardDepth).flip()
      })
    }
    // move, deal, recycle
    else {
      activity.actions.forEach(action => {
        this.getStack(action.toStack).push(this.getStack(action.fromStack).pull(action.cardDepth))
      })
      if (activity.type === 'recycle') {
        this.deck.cycles += (activity.actions[0].toStack === -1) ? 1 : -1
      }
    }
  }

  setUndo(activity:Activity) {
    if (this.conf.limitUndo >= 0) {
      this.undo.push(activity)
      if (this.conf.limitUndo && (this.undo.length > this.conf.limitUndo)) this.undo.shift()
    }
  }

  stacksWant(cards:Card[]) {
    return this.stacks
      .filter(stack => stack.wants(cards))
      .sort((a,b) => a.index - b.index)
  }

  deal(setUndo:boolean = true) {
    if (!this.deck.initialized) {
      this.stacks.forEach(stack => {
        if (stack.conf.init > stack.stack.length) stack.push(this.deck.pull())
      })
    }
    else if (!this.deck.isEmpty) {
      this.do(new Activity(
        'deal',
        this.stacks.map(stack => {
          if (!this.deck.isEmpty && stack.conf.deal) {
            return new Action(
              parseInt(stack.conf.deal.toString()) || 1,
              this.deck.index,
              stack.index
            )
          }
        }).filter(Boolean)))
    }
    else if (this.canRecycle) {
      this.do(new Activity(
        'recycle',
        this.stacks.map(stack => {
          if (stack.conf.deal) {
            return new Action(
              stack.length,
              stack.index,
              this.deck.index,
            )
          }
        })
        .filter(Boolean)
      ))
    }
  }

  clickCard(crd:number|Card, stk:number|StackInterface) {
    let stack = typeof stk === 'number' ? this.getStack(stk) : stk
    let cardDepth = stack.getCardDepth(crd)
    let card = stack.getCard(cardDepth)


    // If the card is not available, do nothing
    if (stack.conf.limitAvailable && cardDepth > stack.conf.limitAvailable) return

    // Also if the card is facedown and not the top card
    if (cardDepth > 1 && card.facedown) return

    // If the card is facedown, flip it over
    if (card.facedown) this.do(new Activity('flip', new Action(cardDepth, stack.index)))

    // else if (conf.multiSelect) {
    //   if (selectedCards.includes(card)) selectedCards = selectedCards.filter(c => c !== card)
    //   else {}
    // }

    // Otherwise, try to move it
    else {
      let cards = stack.look(cardDepth)
      let options = this.stacksWant(cards)
      if (options.length) {
        this.do(new Activity('move', new Action(cardDepth, stack.index, options[0].index)))
      }
    }

  }

}
