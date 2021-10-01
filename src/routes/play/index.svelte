<script context="module" lang="ts">
  // import Deck from '$lib/Deck'
  // import Game from '$lib/Game'

  // export async function load({ page }) {

  //   let config = page.query.get('g')
  //   if (!config) {
  //     page.query.set('g', 'klondike-vegas')
  //     return { status: 302, redirect: `/play?${page.query}` }
  //   }

  //   let deck = page.query.get('d') || false
  //   if (deck) {
  //     try {
  //       deck = new Deck(deck)
  //     }
  //     catch(e) { console.error(e) }
  //   }

  //   let game
  //   try {
  //     game = new Game(config, deck || undefined)
  //   }
  //   catch(e) { return { status: 404, error: e } }

  //   return { props: { game } }

  // }
</script>

<script lang="ts">

import { page } from '$app/stores'
import Game from '$lib/Game'
import Pile from '$lib/Stack.svelte'
import { game, maxCardWidth } from '$lib/data/stores'

  let config = $page.query.get('g')
  if (!config) config = 'klondike-vegas'

  let deck = $page.query.get('d') || undefined

  game.set(new Game(config, deck))

  let w=0,h=0

  $: maxCardWidth.set((w / $game.longestRow) - 20)
  $: rowHeight = $maxCardWidth * 1.5

</script>

<div id="game" class="flex flex-col text-white" bind:clientWidth={w} bind:clientHeight={h}>
  <div id="actions" class="flex-shrink">
    <button on:click={() => {$game.doUndo();game.set($game)}}>Undo</button>
    <button on:click={() => {$game.doRedo();game.set($game)}}>Redo</button>
    <button on:click={() => {game.set(new Game(config))}}>New</button>
  </div>

  <!-- ROWS -->
  {#each $game.layout as row, rowIndex}
  <div class="flex flex-row w-full relative p-4" style="height:{$game.conf.overlayRows && (rowIndex !== $game.layout.length - 1) ? $maxCardWidth * .7 : rowHeight + row.padBottom}px;">
    <!-- PILES -->
    {#each row.stacks as stack}
    <Pile {stack} />
    {/each}
  </div>
  {/each}



</div>
