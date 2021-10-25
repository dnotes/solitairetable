<script lang="ts">

import Pile from '$lib/Stack.svelte'
import { maxCardWidth, edgeHeight } from '$lib/data/stores'
import { game } from '$lib/data/stores'

  export let editing = false
  // TODO: setup editing tools

  let w=0,h=0

  $: rowCount = $game.layout.length + $game.footer.length
  $: topEdgeCount = $game.layout.reduce((agg,row) => agg += row.maxHeight - 1, 0)
  $: maxCardWidth.set(Math.min(
    (w / $game.longestRow) - 5,
    ((-.018 * h * topEdgeCount) + (h * .66)) / (rowCount * ($game.conf.overlayRows ? $game.layout.length * .1 : 1))
  ))
  $: cardHeight = $maxCardWidth * 1.5

</script>

<div id="game" class="flex flex-col text-white h-full" bind:clientWidth={w} bind:clientHeight={h}>

  <!-- ROWS -->
  {#each $game.layout as row, rowIndex}
  <div class="flex flex-row w-full relative md:p-4 pointer-events-none" class:justify-center={$game.conf.centerRows} style="height:{$game.conf.overlayRows && (rowIndex !== $game.layout.length - 1) ? cardHeight * .4 : cardHeight + (row.maxHeight * $edgeHeight) + $edgeHeight}px;">
    <!-- PILES -->
    {#each row.stacks as stack}
    <Pile {stack} />
    {/each}
  </div>
  {:else}
  <div class="w-full relative md:p-4 pointer-events-none"></div>
  {/each}

  {#each $game.footer as row}
  <div class="flex flex-row w-full relative md:p-4 pointer-events-none" class:justify-center={$game.conf.centerRows} style="height:{cardHeight}px;">
    {#each row.stacks as stack}
    <Pile {stack} />
    {/each}
  </div>
  {:else}
  <div class="w-full relative md:p-4 pointer-events-none"></div>
  {/each}

</div>

