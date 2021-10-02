import { ranks } from '$lib/Stack'

export default class Card {

  suit: string
  suitName: string
  rank: string
  char: string
  text: string
  value: number
  isJoker:boolean = false
  facedown:boolean = false

  constructor(char:string = '', facedown:boolean = false) {
    let card
    if (!char) { // for a blank, facedown card
      this.suit = ''
      this.suitName = ''
      this.rank = ''
      this.char = ''
      this.text = '<blank>'
      this.value = 0
      facedown = true
    }
    else if (char.match(/\d/)) {
      this.isJoker = true
      this.value = 0
      card = jokers.find(c => c.char === char)
    }
    else {
      card = cards.find(c => c.char === char)
      this.suit = card.suit
      this.suitName = card.suitName
      this.rank = card.rank
      this.char = card.char
      this.text = this.isJoker ? 'Joker' : card.rank.replace('T', '10')
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

export const cards = [
  {suit:"♣",suitName:"clubs",rank:"A",char:"a"},
  {suit:"♣",suitName:"clubs",rank:"2",char:"b"},
  {suit:"♣",suitName:"clubs",rank:"3",char:"c"},
  {suit:"♣",suitName:"clubs",rank:"4",char:"d"},
  {suit:"♣",suitName:"clubs",rank:"5",char:"e"},
  {suit:"♣",suitName:"clubs",rank:"6",char:"f"},
  {suit:"♣",suitName:"clubs",rank:"7",char:"g"},
  {suit:"♣",suitName:"clubs",rank:"8",char:"h"},
  {suit:"♣",suitName:"clubs",rank:"9",char:"i"},
  {suit:"♣",suitName:"clubs",rank:"T",char:"j"},
  {suit:"♣",suitName:"clubs",rank:"J",char:"k"},
  {suit:"♣",suitName:"clubs",rank:"Q",char:"l"},
  {suit:"♣",suitName:"clubs",rank:"K",char:"m"},
  {suit:"♥",suitName:"hearts",rank:"A",char:"n"},
  {suit:"♥",suitName:"hearts",rank:"2",char:"o"},
  {suit:"♥",suitName:"hearts",rank:"3",char:"p"},
  {suit:"♥",suitName:"hearts",rank:"4",char:"q"},
  {suit:"♥",suitName:"hearts",rank:"5",char:"r"},
  {suit:"♥",suitName:"hearts",rank:"6",char:"s"},
  {suit:"♥",suitName:"hearts",rank:"7",char:"t"},
  {suit:"♥",suitName:"hearts",rank:"8",char:"u"},
  {suit:"♥",suitName:"hearts",rank:"9",char:"v"},
  {suit:"♥",suitName:"hearts",rank:"T",char:"w"},
  {suit:"♥",suitName:"hearts",rank:"J",char:"x"},
  {suit:"♥",suitName:"hearts",rank:"Q",char:"y"},
  {suit:"♥",suitName:"hearts",rank:"K",char:"z"},
  {suit:"♦",suitName:"diamonds",rank:"A",char:"A"},
  {suit:"♦",suitName:"diamonds",rank:"2",char:"B"},
  {suit:"♦",suitName:"diamonds",rank:"3",char:"C"},
  {suit:"♦",suitName:"diamonds",rank:"4",char:"D"},
  {suit:"♦",suitName:"diamonds",rank:"5",char:"E"},
  {suit:"♦",suitName:"diamonds",rank:"6",char:"F"},
  {suit:"♦",suitName:"diamonds",rank:"7",char:"G"},
  {suit:"♦",suitName:"diamonds",rank:"8",char:"H"},
  {suit:"♦",suitName:"diamonds",rank:"9",char:"I"},
  {suit:"♦",suitName:"diamonds",rank:"T",char:"J"},
  {suit:"♦",suitName:"diamonds",rank:"J",char:"K"},
  {suit:"♦",suitName:"diamonds",rank:"Q",char:"L"},
  {suit:"♦",suitName:"diamonds",rank:"K",char:"M"},
  {suit:"♠",suitName:"spades",rank:"A",char:"N"},
  {suit:"♠",suitName:"spades",rank:"2",char:"O"},
  {suit:"♠",suitName:"spades",rank:"3",char:"P"},
  {suit:"♠",suitName:"spades",rank:"4",char:"Q"},
  {suit:"♠",suitName:"spades",rank:"5",char:"R"},
  {suit:"♠",suitName:"spades",rank:"6",char:"S"},
  {suit:"♠",suitName:"spades",rank:"7",char:"T"},
  {suit:"♠",suitName:"spades",rank:"8",char:"U"},
  {suit:"♠",suitName:"spades",rank:"9",char:"V"},
  {suit:"♠",suitName:"spades",rank:"T",char:"W"},
  {suit:"♠",suitName:"spades",rank:"J",char:"X"},
  {suit:"♠",suitName:"spades",rank:"Q",char:"Y"},
  {suit:"♠",suitName:"spades",rank:"K",char:"Z"},
]
export const jokers = [
  {suit:"🃏",suitName:"joker",rank:"1",char:"1"},
  {suit:"🃏",suitName:"joker",rank:"2",char:"2"},
  {suit:"🃏",suitName:"joker",rank:"3",char:"3"},
  {suit:"🃏",suitName:"joker",rank:"4",char:"4"},
  {suit:"🃏",suitName:"joker",rank:"5",char:"5"},
  {suit:"🃏",suitName:"joker",rank:"6",char:"6"},
  {suit:"🃏",suitName:"joker",rank:"7",char:"7"},
  {suit:"🃏",suitName:"joker",rank:"8",char:"8"},
  {suit:"🃏",suitName:"joker",rank:"9",char:"9"},
]