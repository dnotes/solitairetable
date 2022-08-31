<script lang="ts">
// @ts-ignore
import { afterNavigate, beforeNavigate } from '$app/navigation'
// @ts-ignore
import { page } from '$app/stores'
import { game } from '$lib/data/stores'
import Game from '$lib/Game'
import Table from '$lib/Table.svelte'

  beforeNavigate((nav:any) => {
    // @ts-ignore
    // This seems to be needed for everything to reset. Not sure why.
    // If it's omitted, strange things start to happen, like if you are on a "/play" page
    // and then go to a different Game from the Games menu, the Variants menu does not update.
    // Then, if you click Home or About, the Table component doesn't go away and your game
    // will stay loaded, positioned on top of whatever page you visit.
    // I think there is a memory leak but I can't figure it out and maybe this solves it.
    game.set(undefined)
  })

  afterNavigate((nav:any) => {
    let config = $page.url.searchParams.get('g')
    if (!config) config = 'klondike-vegas'
    let deck = $page.url.searchParams.get('d') || undefined
    game.set(new Game(config, deck))
  })

</script>

<svelte:head>
  <title>{$game?.title} | Solitaire Table</title>
</svelte:head>


<div class="w-full h-full bg-green-800 overflow-x-auto pt-4 md:pt-8">
  <Table />
</div>

