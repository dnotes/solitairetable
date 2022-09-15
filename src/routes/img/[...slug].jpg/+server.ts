import games from '$lib/data/games'
import Deck from '$lib/Deck'
import { error, type RequestEvent } from '@sveltejs/kit'
import captureWebsite from 'capture-website'

export async function GET(e:RequestEvent) {
  let { origin } = e.url
  let [ gameStr,deckStr ] = (e?.params?.slug?.split('/') || [])
  let cacheControl = 'public,max-age=2592000'
  if (gameStr) {

    // Get the full game config
    // TODO: adjust for custom games
    let namedGame = games[gameStr]
    // If the game config did not load, it's 404
    if (!namedGame) throw error(404)

    // Get the address from which the image resource should be created
    let href = `${origin}/play?g=${gameStr}`

    // Get the full deck, if necessary
    if (deckStr) {
      let deck = new Deck(games[gameStr].deckConfig)
      try {
        deck.deck = deckStr
      }
      catch(e:any) {
        // If the deck sequence does not parse, that's an error
        throw error(400, e?.message)
      }
      href += `&d=${deckStr}`
      cacheControl+=',immutable'
    }

    // Get the actual screenshot
    let buffer = await captureWebsite.buffer(href, {
      type: 'jpeg',
      width: 800,
      height: 800,
      delay: 1,
      removeElements: ['header','footer'],
    })

    // Set cache headers and return the response
    e.setHeaders({
      'Cache-Control': cacheControl,
      'Content-Type': 'image/jpeg',
    })
    return new Response(buffer)
  }
}
