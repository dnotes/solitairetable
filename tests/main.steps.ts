import { Given, When, Then } from 'quickpickle'
import type { PlaywrightWorld } from '@quickpickle/playwright/PlaywrightWorld'
import '@quickpickle/playwright/actions'
import '@quickpickle/playwright/outcomes'
import '@quickpickle/playwright/world'

let deals = [
  'OwkrbDZdvVUcTspxHLEgmXNiyGulAfoIWMKFneaBSJPjRhqYCQtz'
]

Given('I am playing {word}', async (world:PlaywrightWorld, str:string) => {
  let [game,deal] = str.split('/')
  if (!deal) deal = deals[0]
  await world.page.goto(`/play/${game}/${deal}`)
})

Given('I am playing {word} with deal {int}', async (world:PlaywrightWorld, game:string, int:number) => {
  let deal = deals[int-1] ?? deals[0]
  await world.page.goto(`/play/${game}/${deal}`)
})

Given('I am playing {word} with the deal {string}', async (world:PlaywrightWorld, game:string, deal:string) => {
  await world.page.goto(`/play/${game}/${deal}`)
})
