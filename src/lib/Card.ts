import { ranks } from '$lib/Stack'

export default class Card {

  suit: string = ''
  color: string = ''
  suitName: string = ''
  rank: string = ''
  char: string = ''
  text: string = '<blank>'
  value: number = 0
  isJoker:boolean = false
  facedown:boolean = false

  constructor(char:string = '', facedown:boolean = false) {
    let card
    if (!char) { // for a blank, facedown card
      facedown = true
    }
    else if (char.match(/\d/)) {
      this.isJoker = true
      this.char = char
      this.rank = char
      this.suitName = 'joker'
      this.text = 'Joker'
      this.value = 0
      card = jokers.find(c => c.char === char)
    }
    else {
      card = cards.find(c => c.char === char)
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

export const cards = [
  {suit:"♣",color:"black",suitName:"clubs",rank:"A",char:"a"},
  {suit:"♣",color:"black",suitName:"clubs",rank:"2",char:"b"},
  {suit:"♣",color:"black",suitName:"clubs",rank:"3",char:"c"},
  {suit:"♣",color:"black",suitName:"clubs",rank:"4",char:"d"},
  {suit:"♣",color:"black",suitName:"clubs",rank:"5",char:"e"},
  {suit:"♣",color:"black",suitName:"clubs",rank:"6",char:"f"},
  {suit:"♣",color:"black",suitName:"clubs",rank:"7",char:"g"},
  {suit:"♣",color:"black",suitName:"clubs",rank:"8",char:"h"},
  {suit:"♣",color:"black",suitName:"clubs",rank:"9",char:"i"},
  {suit:"♣",color:"black",suitName:"clubs",rank:"T",char:"j"},
  {suit:"♣",color:"black",suitName:"clubs",rank:"J",char:"k"},
  {suit:"♣",color:"black",suitName:"clubs",rank:"Q",char:"l"},
  {suit:"♣",color:"black",suitName:"clubs",rank:"K",char:"m"},
  {suit:"♥",color:"red",suitName:"hearts",rank:"A",char:"n"},
  {suit:"♥",color:"red",suitName:"hearts",rank:"2",char:"o"},
  {suit:"♥",color:"red",suitName:"hearts",rank:"3",char:"p"},
  {suit:"♥",color:"red",suitName:"hearts",rank:"4",char:"q"},
  {suit:"♥",color:"red",suitName:"hearts",rank:"5",char:"r"},
  {suit:"♥",color:"red",suitName:"hearts",rank:"6",char:"s"},
  {suit:"♥",color:"red",suitName:"hearts",rank:"7",char:"t"},
  {suit:"♥",color:"red",suitName:"hearts",rank:"8",char:"u"},
  {suit:"♥",color:"red",suitName:"hearts",rank:"9",char:"v"},
  {suit:"♥",color:"red",suitName:"hearts",rank:"T",char:"w"},
  {suit:"♥",color:"red",suitName:"hearts",rank:"J",char:"x"},
  {suit:"♥",color:"red",suitName:"hearts",rank:"Q",char:"y"},
  {suit:"♥",color:"red",suitName:"hearts",rank:"K",char:"z"},
  {suit:"♦",color:"red",suitName:"diamonds",rank:"A",char:"A"},
  {suit:"♦",color:"red",suitName:"diamonds",rank:"2",char:"B"},
  {suit:"♦",color:"red",suitName:"diamonds",rank:"3",char:"C"},
  {suit:"♦",color:"red",suitName:"diamonds",rank:"4",char:"D"},
  {suit:"♦",color:"red",suitName:"diamonds",rank:"5",char:"E"},
  {suit:"♦",color:"red",suitName:"diamonds",rank:"6",char:"F"},
  {suit:"♦",color:"red",suitName:"diamonds",rank:"7",char:"G"},
  {suit:"♦",color:"red",suitName:"diamonds",rank:"8",char:"H"},
  {suit:"♦",color:"red",suitName:"diamonds",rank:"9",char:"I"},
  {suit:"♦",color:"red",suitName:"diamonds",rank:"T",char:"J"},
  {suit:"♦",color:"red",suitName:"diamonds",rank:"J",char:"K"},
  {suit:"♦",color:"red",suitName:"diamonds",rank:"Q",char:"L"},
  {suit:"♦",color:"red",suitName:"diamonds",rank:"K",char:"M"},
  {suit:"♠",color:"black",suitName:"spades",rank:"A",char:"N"},
  {suit:"♠",color:"black",suitName:"spades",rank:"2",char:"O"},
  {suit:"♠",color:"black",suitName:"spades",rank:"3",char:"P"},
  {suit:"♠",color:"black",suitName:"spades",rank:"4",char:"Q"},
  {suit:"♠",color:"black",suitName:"spades",rank:"5",char:"R"},
  {suit:"♠",color:"black",suitName:"spades",rank:"6",char:"S"},
  {suit:"♠",color:"black",suitName:"spades",rank:"7",char:"T"},
  {suit:"♠",color:"black",suitName:"spades",rank:"8",char:"U"},
  {suit:"♠",color:"black",suitName:"spades",rank:"9",char:"V"},
  {suit:"♠",color:"black",suitName:"spades",rank:"T",char:"W"},
  {suit:"♠",color:"black",suitName:"spades",rank:"J",char:"X"},
  {suit:"♠",color:"black",suitName:"spades",rank:"Q",char:"Y"},
  {suit:"♠",color:"black",suitName:"spades",rank:"K",char:"Z"},
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