import { Given, When, Then } from 'quickpickle'
import type { PlaywrightWorld } from '@quickpickle/playwright/PlaywrightWorld'
import '@quickpickle/playwright/actions'
import '@quickpickle/playwright/outcomes'
import '@quickpickle/playwright/world'

let deals = [
  'OwkrbDZdvVUcTspxHLEgmXNiyGulAfoIWMKFneaBSJPjRhqYCQtz'
]

function host(world:PlaywrightWorld) {
  return `${world.playwrightConfig.host}:${world.playwrightConfig.port}`
}

async function gotoGame(world:PlaywrightWorld, game:string, deal?:string) {
  if (!deal) deal = deals[0]
  await world.page.goto(`${host(world)}/play/${game}/${deal}`)
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
