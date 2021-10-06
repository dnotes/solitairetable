<script lang="ts">

import { page } from '$app/stores'
import Game from '$lib/Game'
import Pile from '$lib/Stack.svelte'
import { game, maxCardWidth, edgeHeight } from '$lib/data/stores'

  let config = $page.query.get('g')
  if (!config) config = 'klondike-vegas'

  let deck = $page.query.get('d') || undefined

  game.set(new Game(config, deck))

  let w=0,h=0

  let rowCount = $game.layout.length + $game.footer.length
  let topEdgeCount = $game.layout.reduce((agg,row) => agg += row.maxHeight - 1, 0)

  $: maxCardWidth.set(Math.min(
    (w / $game.longestRow) - 20,
    ((-.018 * h * topEdgeCount) + (h * .66)) / (rowCount * ($game.conf.overlayRows ? $game.layout.length * .1 : 1))
  ))
  $: cardHeight = $maxCardWidth * 1.5

</script>

<div id="game" class="flex flex-col text-white h-full" bind:clientWidth={w} bind:clientHeight={h}>
  <div id="actions" class="flex-shrink">
    <button on:click={() => {$game.doUndo();game.set($game)}}>Undo</button>
    <button on:click={() => {$game.doRedo();game.set($game)}}>Redo</button>
    <button on:click={() => {game.set(new Game(config))}}>New</button>
  </div>

  <!-- ROWS -->
  {#each $game.layout as row, rowIndex}
  <div class="flex flex-row w-full relative p-4 pointer-events-none" class:justify-center={$game.conf.centerRows} style="height:{$game.conf.overlayRows && (rowIndex !== $game.layout.length - 1) ? cardHeight * .4 : cardHeight + (row.maxHeight * $edgeHeight) + $edgeHeight}px;">
    <!-- PILES -->
    {#each row.stacks as stack}
    <Pile {stack} />
    {/each}
  </div>
  {/each}

  {#each $game.footer as row, rowIndex}
  <div class="flex flex-row w-full relative p-4 pointer-events-none" class:justify-center={$game.conf.centerRows} style="height:{cardHeight}px;">
    {#each row.stacks as stack}
    <Pile {stack} />
    {/each}
  </div>
  {/each}

</div>

