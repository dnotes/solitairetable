<script lang="ts">
import type { PageData } from './$types';
// @ts-ignore
import { afterNavigate, beforeNavigate, goto } from '$app/navigation'
// @ts-ignore
import { game } from '$lib/data/stores'
import Game from '$lib/Game'
import Table from '$lib/Table.svelte'

  export let data:PageData

  $: if ($game && !data.deck) goto($game.href, {
    replaceState: true,
    keepFocus: true,
  })

  beforeNavigate((nav:any) => {
    // @ts-ignore
    // This seems to be needed for everything to reset. Not sure why.
    // If it's omitted, strange things start to happen, like if you are on a "/play" page
    // and then go to a different Game from the Games menu, the Variants menu does not update.
    // Then, if you click Home or About, the Table component doesn't go away and your game
    // will stay loaded, positioned on top of whatever page you visit.
    // I think there is a memory leak but I can't figure it out and maybe this solves it.
    // TODO: Evaluate whether this is still needed, after switch to normal routing
    game.set(undefined)
  })

  afterNavigate((nav:any) => {
    game.set(new Game(data.game, data.deck, data.replay))
  })

</script>

<svelte:head>
  <title>{data?.title} | Solitaire Table</title>
  <meta property="og:title" content="{data.title}" />
  <meta property="og:image" content="{data.image}" />
  <meta property="twitter:image" content="{data.image}" />
  <meta property="og:url" content="{data.link}" />
  <meta property="og:site_name" content="Solitaire Table" />
</svelte:head>


<div class="w-full h-full bg-emerald-800 overflow-x-auto pt-4 md:pt-8">
  <Table />
</div>

<style lang="postcss">
  @media all and (orientation:landscape) and (max-height:500px) {
    div { padding-top:.5rem !important; }
  }
</style>
