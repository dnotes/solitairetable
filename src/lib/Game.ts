import { DeckConfig } from "$lib/Deck"
import type { DeckConfigSetting } from "$lib/Deck"
import type Card from "$lib/Card"
import { SelectedCard } from '$lib/Card'
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
  stacks:Array<string|StackInterface|undefined>
}

export interface GameConfigSetting {
  centerRows?: boolean          // whether the stacks should be centered in the rows (true)
  overlayRows?: boolean         // whether rows overlay each other (false)
  multiSelect?: boolean         // whether multiple cards are selected at once (false)
  showEmpty?: boolean           // whether an empty stack shows a placeholder (true)
  selectBlockedStacks?: boolean // whether stacks can be selected even when blocked (!conf.overlayRows)
  limitCycles?: number          // number of times to cycle through the deck (0 / unlimited)
  limitUndo?: number            // limit to the number of undos (0 / unlimited)
  layout: string,               // layout
  footer?: string,              // footer layout; will be on the side for small screens in landscape
  deckConfig?: string|DeckConfig|DeckConfigSetting       // configuration for the deck to be used
  stackConfig: string|StackConfig[]|StackConfigSetting[] // configuration of types of stacks
}

export class GameConfig {
  name?: string = ''              // the name of the game, if it has one
  title?: string                  // the title of the game, if it has one
  family?: string = ''            // the family to which the game belongs, if it has one
  variants?: GameConfig[]         // the variants of the current game
  centerRows: boolean = true      // whether the stacks should be centered in the rows (true)
  overlayRows: boolean = false    // whether rows overlay each other (false)
  multiSelect: boolean = false    // whether multiple cards are selected at once (false)
  selectBlockedStacks: boolean = true // whether stacks can be selected even when blocked (!conf.overlayRows)
  showEmpty: boolean = true       // whether an empty stack shows a placeholder (true)
  limitCycles: number = 0         // number of times to cycle through the deck (0 / unlimited)
  limitUndo: number = 0           // limit to the number of undos (0 / unlimited)
  deckConfig: DeckConfig          // configuration for the deck to be used
  stackConfig: Array<StackConfig> // configuration of types of stacks
  layout: string = ''             // layout string
  footer?: string = ''            // footer, unused except in building
  isOfficial?: boolean = false
  constructor(conf?:string|GameConfig|GameConfigSetting) {

    if (!conf) {
      this.deckConfig = new DeckConfig()
      this.stackConfig = [ new StackConfig() ]
    }
    else if (typeof conf === 'string' && games[conf]) {
      let config = games[conf]
      if (config.overlayRows && !config.hasOwnProperty('selectBlockedStacks')) config['selectBlockedStacks'] = false
      Object.assign(this, config)
      this.isOfficial = true
      this.deckConfig = new DeckConfig(config.deckConfig)
      this.stackConfig = Array.isArray(config.stackConfig) ? config.stackConfig.map(c => new StackConfig(c)) : [ new StackConfig(config.stackConfig) ]
    }
    else if (typeof conf === 'string') {
      let config = conf.split('!');
      [this.centerRows, this.overlayRows, this.multiSelect, this.showEmpty, this.selectBlockedStacks] = confBoolean.decode(config[0]);
      [this.limitCycles, this.limitUndo] = config[1].split('').map(confNumber.decode);
      this.deckConfig = new DeckConfig(config[2])
      this.stackConfig = config[3].split('|').map(c => new StackConfig(c))
      this.layout = config[4]
      this.footer = config[5] || ''
    }
    else {
      if (conf.overlayRows && !conf.hasOwnProperty('selectBlockedStacks')) conf['selectBlockedStacks'] = false
      Object.assign(this, conf)
      this.deckConfig = new DeckConfig(conf.deckConfig)
      this.stackConfig = Array.isArray(conf.stackConfig) ? conf.stackConfig.map(c => new StackConfig(c)) : [ new StackConfig(conf.stackConfig) ]
    }
    return this
  }
  toString() {
    return [
      confBoolean.encode(this.centerRows, this.overlayRows, this.multiSelect, this.showEmpty, this.selectBlockedStacks),
      confNumber.encode(this.limitCycles, this.limitUndo),
      this.deckConfig,
      this.stackConfig.join('|'),
      this.layout,
    ].join('!').replace(/ /g, '+')
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
  selection: SelectedCard[] = []

  constructor(conf?:string|GameConfig|GameConfigSetting, deck?:string|string[]|Card[]) {
    this.conf = new GameConfig(conf)
    this.name = this.conf.name || ''

    // Setup the deck
    this.deck = new Deck(this.conf.deckConfig);
    if (deck) this.deck.deck = deck;

    // Setup the stacks and the layout, at the same time
    ['layout','footer'].forEach(k => {
      let rows = this.conf[k].split(',').filter(Boolean).map(row => {
        let maxHeight = 0
        let rowStacks = row.split('').map(id => {
          let stack
          if (id.match(/\d/)) {
            stack = new Stack(this.conf.stackConfig[id])
            stack.index = this.stacks.length
            this.stacks.push(stack)
            if (stack.maxHeight > maxHeight) maxHeight = stack.maxHeight
          }
          else if (id.match(/[Dd]/)) {
            stack = this.deck
          }
          else if (id.match(/[-_]/)) stack = id
          return stack
        })
        if (k === 'layout' && rowStacks.length > this.longestRow) this.longestRow = rowStacks.length
        return {
          maxHeight,
          stacks: rowStacks
        }
      })
      this[k] = rows
    })

    let freecellStacks = this.stacks.filter(s => s.conf.isFreecell)
    this.stacks.forEach(s => {
      if (!s.conf.isFreecell) s.freecellStacks = freecellStacks
    })

    // Set layout indexes
    this.layout.forEach(row => {
      row.stacks.forEach((stack,i) => {
        if (stack && typeof stack !== 'string') {
          stack.rowPosition = (i * 2) + 1
          if (this.conf.centerRows) stack.rowPosition += this.longestRow - row.stacks.length
        }
      })
    })

    // Set touching stacks
    for (let rowIndex=0; rowIndex < this.layout.length - 1; rowIndex++) {
      let row = this.layout[rowIndex]
      let nextRow = this.layout[rowIndex + 1]
      row.stacks.forEach((stack,i) => {
        if (stack && typeof stack !== 'string' && !stack.isDeck) {
          nextRow.stacks.filter(s => s && typeof s !== 'string' && s.rowPosition && s.rowPosition > stack.rowPosition - 2 && s.rowPosition < stack.rowPosition + 2).forEach(touchingStack => {
            if (touchingStack && typeof touchingStack !== 'string') {
              stack.stacksOverlaying.push(touchingStack)
              touchingStack.stacksOverlayed.push(stack)
            }
          })
        }
      })
    }

    // Initialize the first deal
    this.initialize()

    return this
  }

  get canRecycle():boolean|number {
    return !this.conf.limitCycles || (this.conf.limitCycles - this.deck.cycles)
  }

  get title():string {
    if (this.conf.title && (this.conf.family?.toLowerCase() === this.conf.title?.toLowerCase())) return this.conf.title
    return `${unslug(this.conf.family)} ${this.conf.title || unslug(this.conf.name)}`.trim()
  }

  get href():string {
    return `/play/${this.isOfficial ? this.name : this.conf.toString()}/${this.deck.toString()}`
  }

  get isOfficial() { return this.conf.isOfficial }

  initialize() {

    // first make sure everything is set empty
    this.deck.reset()
    this.stacks.forEach(s => s.reset())
    this.undo = []
    this.redo = []
    this.selection = []

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
  }

  reset() {
    this.deck.reset()
    this.initialize()
    return this
  }

  new() {
    this.deck.shuffle()
    this.initialize()
    return this
  }

  getStack(index:number) {
    return this.stacks[index] || this.deck
  }

  doUndo() {
    if (!this.undo.length) return
    let activity = this.undo.pop()
    this.redo.push(activity)
    this.do(activity.reverse(), true)
    this.clearSelected()
    return this
  }
  doRedo() {
    if (!this.redo.length) return
    let activity = this.redo.pop()
    this.undo.push(activity)
    this.do(activity, true)
    this.clearSelected()
    return this
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
    return this
  }

  setUndo(activity:Activity) {
    if (this.conf.limitUndo >= 0) {
      this.undo.push(activity)
      if (this.conf.limitUndo && (this.undo.length > this.conf.limitUndo)) this.undo.shift()
    }
    return this
  }

  stacksWant(cards:SelectedCard[]):Stack[] {
    return this.stacks
      .filter(stack => stack.wants(cards))
      .sort((a,b) => b.conf.matchPriority - a.conf.matchPriority)
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
              Math.min((parseInt(stack.conf.deal.toString()) || 1), this.deck.length),
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
    this.selection = []
    return this
  }

  clickCard(crd:number|Card, stk:number|StackInterface) {
    let stack = typeof stk === 'number' ? this.getStack(stk) : stk
    let cardDepth = stack.getCardDepth(crd)
    let card = stack.getCard(cardDepth)

    // If the card is not available, do nothing
    if (stack.conf.limitAvailable && cardDepth > stack.conf.limitAvailable) return
    if (stack.conf.discard) return
    if (!this.conf.selectBlockedStacks && stack.isBlocked) return

    // Also if the card is facedown and not the top card
    if (cardDepth > 1 && card.facedown) return

    // If the card is facedown, flip it over
    if (card.facedown) this.do(new Activity('flip', new Action(cardDepth, stack.index)))

    else if (this.conf.multiSelect) {
      if (!stack.conf.canGet) return
      let cards = stack.look(cardDepth)

      // If the stack is already selected, remove it
      let alreadySelected = this.selection.find(c => c.stackIndex === stack.index && c.cardDepth >= cardDepth)
      if (alreadySelected) this.removeSelected(stack.index)
      // Otherwise, add the clicked card and all cards stacked on top of it
      else this.setSelected(cards, stack)

      // Try to move the cards
      if (this.selection.length) {
        let options = this.stacksWant(this.selection)
        if (options.length) {
          let actions = this.selection.reduce((agg,card,i,arr) => {
            if (!agg.find(a => a.fromStack === card.stackIndex)) {
              agg.push(new Action(arr.filter(c => c.stackIndex === card.stackIndex).length, card.stackIndex, options[0].index))
            }
            return agg
          }, [])
          this.selection = []
          this.do(new Activity('move', actions))
        }
      }
    }

    // Otherwise, try to move it
    else {
      let cards = stack.look(cardDepth)
      this.setSelected(cards, stack)
      let options = this.stacksWant(this.selection)
      if (options.length) {
        this.do(new Activity('move', new Action(cardDepth, stack.index, options[0].index)))
      }
      this.removeSelected(stack.index)
    }

  }

  clearSelected() {
    this.selection = []
    return this
  }

  removeSelected(stackIndex:number) {
    this.selection = this.selection.filter(c => c.stackIndex !== stackIndex)
    return this
  }

  setSelected(cards:Card[], stack:StackInterface) {
    let selectedCards = cards.map((c,i) => {
      return new SelectedCard(c,cards.length-i,stack.index)
    })
    this.removeSelected(stack.index)
    this.selection = [...this.selection, ...selectedCards]
    return this
  }

}

function unslug(text) {
  return text.replace(/(?:^|-|_)[a-z]/g, m => { return (m.length === 2 ? ' ' : '') + m.slice(m.length-1,1).toUpperCase() })
}