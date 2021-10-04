import { ranks } from '$lib/Stack'

export default class Card {

  suit: string = ''
  color: string = ''
  suitName: string = ''
  rank: string = ''
  id: string = ''
  text: string = '<blank>'
  value: number = 0
  isJoker: boolean = false
  facedown: boolean = false

  constructor(id:string = '', facedown:boolean = false) {
    let card
    if (!id) { // for a blank, facedown card
      facedown = true
    }
    else if (id.match(/\d/)) {
      this.isJoker = true
      this.id = id
      this.rank = id
      this.suitName = 'joker'
      this.text = 'Joker'
      this.value = 0
      card = jokers.find(c => c.id === id)
    }
    else {
      card = cards.find(c => c.id === id)
      Object.assign(this, card)
      this.text = this.rank.replace('T', '10')
      this.value = ranks.indexOf(this.rank) + 1
    }
    this.facedown = facedown ? true : false
  }

  flip(): Card {
    this.facedown = !this.facedown
    return this
  }

  toString(): string {
    if (this.isJoker) return `🃏`
    return `${this.rank}${this.suit}`
  }

}

export class SelectedCard {

  suit: string = ''
  color: string = ''
  suitName: string = ''
  rank: string = ''
  id: string = ''
  text: string = '<blank>'
  value: number = 0
  isJoker:boolean = false
  facedown:boolean = false

  cardDepth:number
  stackIndex:number

  constructor(card:Card, cardDepth:number, stackIndex:number) {
    Object.assign(this, card)
    this.cardDepth = cardDepth
    this.stackIndex = stackIndex
  }
  toString(): string {
    if (this.isJoker) return `🃏`
    return `${this.rank}${this.suit}`
  }
}

export const cards = [
  {suit:"♣",color:"black",suitName:"clubs",rank:"A",id:"a"},
  {suit:"♣",color:"black",suitName:"clubs",rank:"2",id:"b"},
  {suit:"♣",color:"black",suitName:"clubs",rank:"3",id:"c"},
  {suit:"♣",color:"black",suitName:"clubs",rank:"4",id:"d"},
  {suit:"♣",color:"black",suitName:"clubs",rank:"5",id:"e"},
  {suit:"♣",color:"black",suitName:"clubs",rank:"6",id:"f"},
  {suit:"♣",color:"black",suitName:"clubs",rank:"7",id:"g"},
  {suit:"♣",color:"black",suitName:"clubs",rank:"8",id:"h"},
  {suit:"♣",color:"black",suitName:"clubs",rank:"9",id:"i"},
  {suit:"♣",color:"black",suitName:"clubs",rank:"T",id:"j"},
  {suit:"♣",color:"black",suitName:"clubs",rank:"J",id:"k"},
  {suit:"♣",color:"black",suitName:"clubs",rank:"Q",id:"l"},
  {suit:"♣",color:"black",suitName:"clubs",rank:"K",id:"m"},
  {suit:"♥",color:"red",suitName:"hearts",rank:"A",id:"n"},
  {suit:"♥",color:"red",suitName:"hearts",rank:"2",id:"o"},
  {suit:"♥",color:"red",suitName:"hearts",rank:"3",id:"p"},
  {suit:"♥",color:"red",suitName:"hearts",rank:"4",id:"q"},
  {suit:"♥",color:"red",suitName:"hearts",rank:"5",id:"r"},
  {suit:"♥",color:"red",suitName:"hearts",rank:"6",id:"s"},
  {suit:"♥",color:"red",suitName:"hearts",rank:"7",id:"t"},
  {suit:"♥",color:"red",suitName:"hearts",rank:"8",id:"u"},
  {suit:"♥",color:"red",suitName:"hearts",rank:"9",id:"v"},
  {suit:"♥",color:"red",suitName:"hearts",rank:"T",id:"w"},
  {suit:"♥",color:"red",suitName:"hearts",rank:"J",id:"x"},
  {suit:"♥",color:"red",suitName:"hearts",rank:"Q",id:"y"},
  {suit:"♥",color:"red",suitName:"hearts",rank:"K",id:"z"},
  {suit:"♦",color:"red",suitName:"diamonds",rank:"A",id:"A"},
  {suit:"♦",color:"red",suitName:"diamonds",rank:"2",id:"B"},
  {suit:"♦",color:"red",suitName:"diamonds",rank:"3",id:"C"},
  {suit:"♦",color:"red",suitName:"diamonds",rank:"4",id:"D"},
  {suit:"♦",color:"red",suitName:"diamonds",rank:"5",id:"E"},
  {suit:"♦",color:"red",suitName:"diamonds",rank:"6",id:"F"},
  {suit:"♦",color:"red",suitName:"diamonds",rank:"7",id:"G"},
  {suit:"♦",color:"red",suitName:"diamonds",rank:"8",id:"H"},
  {suit:"♦",color:"red",suitName:"diamonds",rank:"9",id:"I"},
  {suit:"♦",color:"red",suitName:"diamonds",rank:"T",id:"J"},
  {suit:"♦",color:"red",suitName:"diamonds",rank:"J",id:"K"},
  {suit:"♦",color:"red",suitName:"diamonds",rank:"Q",id:"L"},
  {suit:"♦",color:"red",suitName:"diamonds",rank:"K",id:"M"},
  {suit:"♠",color:"black",suitName:"spades",rank:"A",id:"N"},
  {suit:"♠",color:"black",suitName:"spades",rank:"2",id:"O"},
  {suit:"♠",color:"black",suitName:"spades",rank:"3",id:"P"},
  {suit:"♠",color:"black",suitName:"spades",rank:"4",id:"Q"},
  {suit:"♠",color:"black",suitName:"spades",rank:"5",id:"R"},
  {suit:"♠",color:"black",suitName:"spades",rank:"6",id:"S"},
  {suit:"♠",color:"black",suitName:"spades",rank:"7",id:"T"},
  {suit:"♠",color:"black",suitName:"spades",rank:"8",id:"U"},
  {suit:"♠",color:"black",suitName:"spades",rank:"9",id:"V"},
  {suit:"♠",color:"black",suitName:"spades",rank:"T",id:"W"},
  {suit:"♠",color:"black",suitName:"spades",rank:"J",id:"X"},
  {suit:"♠",color:"black",suitName:"spades",rank:"Q",id:"Y"},
  {suit:"♠",color:"black",suitName:"spades",rank:"K",id:"Z"},
]
export const jokers = [
  {suit:"🃏",suitName:"joker",rank:"1",id:"1"},
  {suit:"🃏",suitName:"joker",rank:"2",id:"2"},
  {suit:"🃏",suitName:"joker",rank:"3",id:"3"},
  {suit:"🃏",suitName:"joker",rank:"4",id:"4"},
  {suit:"🃏",suitName:"joker",rank:"5",id:"5"},
  {suit:"🃏",suitName:"joker",rank:"6",id:"6"},
  {suit:"🃏",suitName:"joker",rank:"7",id:"7"},
  {suit:"🃏",suitName:"joker",rank:"8",id:"8"},
  {suit:"🃏",suitName:"joker",rank:"9",id:"9"},
]