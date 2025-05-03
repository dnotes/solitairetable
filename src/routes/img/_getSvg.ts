import Game from "$lib/Game";
import type { StackInterface } from "$lib/Stack";

const cards = import.meta.glob('/static/cards/*.svg', { eager:true, as:'raw' })
Object.keys(cards).forEach(k => {
  cards[k] = cards[k].replace(/^[\s\S]+<svg/, '<svg')
})

const cardWidth = 100
const cardHeight = 150
const hSpace = 10
const vSpace = 15

function cardImage(x:number,y:number,filename:string) {
  return `<svg x="${x}" y="${y}" width="${cardWidth}" height="${cardHeight}" viewBox="0 0 360 540">${cards['/static/cards/' + filename]}</svg>`
}

function getParseRow(game:Game, deckStr:string|undefined) {

  return (row:any, i:number) => {
    let rowWidth = hSpace
    let rowHeight = 0

    let currentStack

    try {
      // Get all the stacks to determine the width
      let stacks:string[] = row.stacks.map((stack:StackInterface|string) => {

        currentStack = stack

        let stackSvg = ''
        let y = 0, x = rowWidth // find the left and top of the stack

        if (!stack || typeof stack === 'string') {
          rowHeight = Math.max(rowHeight, cardHeight)
          rowWidth = x + cardWidth + hSpace
        }
        else if (stack.isEmpty) {
          if (stack.conf.showEmpty) stackSvg = cardImage(x,y,`_empty.svg`)
          rowHeight = Math.max(rowHeight, cardHeight)
          rowWidth = x + cardWidth + hSpace
        }
        else if (stack.isDeck) {
          stackSvg = cardImage(x,y,`_back.svg`)
          rowHeight = Math.max(rowHeight, cardHeight)
          rowWidth = x + cardWidth + hSpace
        }
        else {
          let startCard = stack.conf.limitVisible ? Math.max(stack.length - stack.conf.limitVisible, 0) : 0

          for (let c = startCard; c < stack.length; c++) {
            stackSvg += cardImage(x,y,stack.stack[c].facedown ? '_back.svg' : stack.stack[c].filename)
            if (stack.conf.horizontal) x += hSpace
            else y += vSpace * 2.5
          }

          if (stack.conf.horizontal) rowHeight = Math.max(rowHeight, cardHeight)
          else rowHeight = Math.max(rowHeight, y + cardHeight + vSpace)

          rowWidth = x + cardWidth + hSpace // increase the row width by the size of the stack

        }

        return stackSvg

      })
      return {
        h: rowHeight,
        w: rowWidth,
        svg: stacks.join('\n')
      }
    }
    catch(e) {
      console.error(`Error parsing stack ${currentStack}\nGame config: ${game.conf}`)
      throw e
    }

  }

}

const getSvg = function(slug:string, width = 1200, height = 630, text = true) {

  let [ gameStr,deckStr ] = (slug?.split('/') || [])

  if (gameStr) {

    let game = new Game(gameStr, deckStr)

    let parseRow = getParseRow(game, deckStr)

    let layoutRows = game.layout.map(parseRow)
    let footerRows = game.footer.map(parseRow)

    let maxWidth = Math.max(layoutRows.reduce((p,v) => { return Math.max(p, v.w) }, 0), footerRows.reduce((p,v) => { return Math.max(p, v.w)}, 0))
    let fullHeight = layoutRows.reduce((p,r) => p + (game.conf.overlayRows ? r.h/2 : r.h + vSpace), 0) + footerRows.reduce((p,r) => p + r.h + vSpace, 0) + (vSpace * 2)

    let svgWidth = maxWidth
    let svgHeight = fullHeight

    let y = 20
    let leftX = 0

    let ratio = width / height

    if (svgWidth < svgHeight * ratio) {
      let newWidth = svgHeight * ratio
      leftX = newWidth - svgWidth / 2
      svgWidth = newWidth
    }
    else {
      svgHeight = svgWidth / ratio
    }

    let output = `<svg width="${width}" height="${height}" viewBox="0 0 ${svgWidth} ${svgHeight}" version="1.1" xmlns="http://www.w3.org/2000/svg">\n`
      + `<rect x="0" y="0" width="100%" height="100%" fill="#065f46" />`
      + layoutRows.map((r,i,a) => {
        let svg = `<svg x="${game.conf.centerRows ? (svgWidth / 2 - r.w / 2) : leftX}" y="${y}" width="${r.w}" height="${r.h}" viewBox="0 0 ${r.w} ${r.h}">${r.svg}</svg>`
        y += (game.conf.overlayRows && i < a.length-1) ? (r.h / 2.8) : (r.h + vSpace)
        return svg
      }).join('\n')
      + '\n'
      + footerRows.map(r => {
        let svg = `<svg x="${game.conf.centerRows ? (svgWidth / 2 - r.w / 2) : leftX}" y="${y}" width="${r.w}" height="${r.h}" viewBox="0 0 ${r.w} ${r.h}">${r.svg}</svg>`
        y += (r.h + vSpace)
        return svg
      }).join('\n')

    if (text) output += `\n<style>
    .game{ font:bold ${Math.round(svgHeight / 14)}px serif; fill: #6C9B8B; text-anchor: middle; }
    </style>`
      + `\n<text x="50%" y="${svgHeight - 19}" width="100%" class="game">${game.title}</text>`

    output += `\n</svg>`

    return output

  }

  throw new Error('Bad request')

}

export default getSvg