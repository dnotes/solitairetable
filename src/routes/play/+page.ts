import games from '$lib/data/games'
import Game from '$lib/Game'
import { error } from '@sveltejs/kit'

export async function load({ url }:{ url:URL }) {
  let game = url.searchParams.get('g') ?? 'klondike'
  let deck = url.searchParams.get('d')
  let name
  if (games[game]?.name) name = games[game].name
  else {
    try {
      let loadedGame = new Game(game)
    }
    catch(e) {
      return error(400, "Invalid game configuration.")
    }
  }
  let image = `${url.origin}/img/${game}` + (deck ? `/${deck}.jpg` : '.jpg')
  let link = `${url.origin}/play?g=${game}`
  if (deck) link += `&d=${deck}`

  let data = {
    game,
    deck,
    name,
    image,
    link,
  }

  return data
}
