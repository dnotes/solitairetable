import { Given, When, Then, defineParameterType, Before } from 'quickpickle'
import type { PlaywrightWorld } from '@quickpickle/playwright/PlaywrightWorld'
import '@quickpickle/playwright/actions'
import '@quickpickle/playwright/outcomes'
import '@quickpickle/playwright/world'
import { expect } from '@playwright/test'

let deals = [
  'OwkrbDZdvVUcTspxHLEgmXNiyGulAfoIWMKFneaBSJPjRhqYCQtz'
]

defineParameterType({
  name: 'card',
  regexp: /(?:the )?(\d|10|[TtJjQqKkAa])(?:en|ack|ueen|ing|ce)?(?: of )?([cdhsCDHS♣♦♥♠])(?:lub|iamond|eart|pade)?s?/,
  transformer: (rank:string, suit:string) => {
    rank = rank.replace('10','T').toUpperCase()
    suit = suit.toUpperCase().replace('C', '♣').replace('D', '♦').replace('H', '♥').replace('S', '♠')
    return `${rank}${suit}`
  }
})

async function gotoGame(world:PlaywrightWorld, game:string, deal?:string) {
  if (!deal) deal = deals[0]
  let res = await world.page.goto(`http://${world.baseUrl.host}/play/${game}/${deal}`)
  await world.page.waitForTimeout(800)
  try {
    await expect(res?.status(), `Game ${game} with deal ${deal} was not found`).toBe(200)
  }
  catch(e) {
    throw new Error(`Game ${game} with deal ${deal} was not found. (${world.page.url()})`)
  }
}

Given('I am playing', async (world:PlaywrightWorld) => {
  await gotoGame(world, 'klondike')
})

Given('I am playing {word}', async (world:PlaywrightWorld, str:string) => {
  let [game,deal] = str.replace(/["']/g,'').split('/')
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

When('I click the deck', async (world:PlaywrightWorld) => {
  await world.page.getByRole('cell', { name:'Deck' }).locator('div.card').last().click()
})
When('I click the deck {int} time(s)', async(world:PlaywrightWorld, times:number) => {
  for (let i=0; i<times; i++) {
    await world.page.getByRole('cell', { name:'Deck' }).locator('div.card').last().click()
    await world.page.waitForTimeout(50)
  }
})

When('I click stack {int}', async (world:PlaywrightWorld, stack:number) => {
  await world.page.getByRole('cell', { name:`Stack ${stack}` }).locator('div.card').last().click()
})
When('I click stack {int} {int} times', async (world:PlaywrightWorld, stack:number, times:number) => {
  for (let i=0; i<times; i++) {
    await world.page.getByRole('cell', { name:`Stack ${stack}` }).locator('div.card').last().click()
    await world.page.waitForTimeout(50)
  }
})

When('I click/play {card}', async (world:PlaywrightWorld, card:string) => {
  let locator = await world.page.getByRole('img', { name:`${card}` })
  await expect(await locator.count(), `card ${card} not found`).toBeGreaterThan(0)
  let parent = await locator.first().locator('../../..')
  await parent.click()
})

Then('the clipboard (text )should contain {string}', async (world:PlaywrightWorld, str:string) => {
  let clipboard = await world.page.evaluate(() => navigator.clipboard.readText())
  expect(clipboard).toContain(str)
})
Then('the clipboard (text )should not/NOT contain {string}', async (world:PlaywrightWorld, str:string) => {
  let clipboard = await world.page.evaluate(() => navigator.clipboard.readText())
  expect(clipboard).not.toContain(str)
})

Before(async (world:PlaywrightWorld) => {
  world.browserContext.grantPermissions(['clipboard-read', 'clipboard-write'])
})