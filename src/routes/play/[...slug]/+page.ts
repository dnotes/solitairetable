import Game from '$lib/Game'
import { error } from '@sveltejs/kit'

export const prerender = false

export async function load({ url, params }:{ url:URL, params:any }) {

  let [game,deck,replay] = params?.slug?.split('/')
  let title:string
  try {
    let loadedGame = new Game(game, deck)
    title = loadedGame.title
  }
  catch(e) {
    error(400, "Invalid game configuration.");
  }
  let image = `${url.origin}/img/${game}` + (deck ? `/${deck}.png` : '.png')
  let link = `${url.origin}/play/${game}`
  if (deck) link += `/${deck}`

  let data = {
    game,
    deck,
    title,
    image,
    link,
    replay,
  }

  return data
}
