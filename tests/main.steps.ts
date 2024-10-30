import { Given, When, Then } from 'quickpickle'
import type { PlaywrightWorld } from '@quickpickle/playwright/PlaywrightWorld'
import '@quickpickle/playwright/actions'
import '@quickpickle/playwright/outcomes'
import '@quickpickle/playwright/world'

let deals = [
  'OwkrbDZdvVUcTspxHLEgmXNiyGulAfoIWMKFneaBSJPjRhqYCQtz'
]

async function gotoGame(world:PlaywrightWorld, game:string, deal?:string) {
  if (!deal) deal = deals[0]
  await world.page.goto(`http://${world.baseUrl.host}/play/${game}/${deal}`)
  await world.page.waitForTimeout(200)
}

Given('I am playing', async (world:PlaywrightWorld) => {
  await gotoGame(world, 'klondike')
})

Given('I am playing {word}', async (world:PlaywrightWorld, str:string) => {
  let [game,deal] = str.split('/')
  if (!deal) deal = deals[0]
  await gotoGame(world, game, deal)
})

Given('I am playing {word} with deal {int}', async (world:PlaywrightWorld, game:string, int:number) => {
  let deal = deals[int-1] ?? deals[0]
  await gotoGame(world, game, deal)
})

Given('I am playing {word} with the deal {string}', async (world:PlaywrightWorld, game:string, deal:string) => {
  await gotoGame(world, game, deal)
})

Given('all cards are playable', async (world:PlaywrightWorld) => {
  await gotoGame(world, 'freecell', 'MmZzFfSslLyYeErRKkXxDdQqjJwWcCpPIiVvBbOohHuUaAnNGgTt')
})
Given('I have just won a game', async (world:PlaywrightWorld) => {
  await gotoGame(world, 'freecell', 'MmZzFfSslLyYeErRKkXxDdQqjJwWcCpPIiVvBbOohHuUaAnNGgTt')
  await world.page.getByRole('button', { name:'autoplay' }).click({ timeout:500 })
  await world.page.waitForTimeout(1500)
})