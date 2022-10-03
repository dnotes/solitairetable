<script lang="ts">

import Pile from '$lib/Stack.svelte'
import { maxCardWidth, edgeHeight } from '$lib/data/stores'
import { game } from '$lib/data/stores'

  let w=0,h=0

  $: rowCount = $game?.layout?.length + $game?.footer?.length
  $: topEdgeCount = $game?.layout?.reduce((agg,row) => agg += row.maxHeight - 1, 0)
  $: maxCardWidth.set(Math.min(
    // Horizontal constraint
    (w / $game?.longestRow) - 5,
    // Vertical constraint
    ((-.018 * h * topEdgeCount) + (h * .5)) / (rowCount * ($game?.conf?.overlayRows ? $game?.layout?.length * .08 : 1))
  ))
  $: cardHeight = $maxCardWidth * 1.5

</script>

<div
  id="game"
  class="flex flex-col text-white h-full overflow-hidden"
  bind:clientWidth={w}
  bind:clientHeight={h}
>

  {#if $game}

    <h1 class="absolute left-2 bottom-0 m-0 leading-tight text-lg">{$game.title}</h1>

    <!-- ROWS -->
    {#each $game.layout as row, rowIndex}
      <div
        class="flex flex-row w-full relative md:p-4 pointer-events-none select-none"
        class:justify-center={$game.conf.centerRows}
        style="height:{$game.conf.overlayRows && (rowIndex !== $game.layout.length - 1) ? cardHeight * .4 : cardHeight + (row.maxHeight * $edgeHeight) + $edgeHeight}px;"
      >
        <!-- PILES -->
        {#each row.stacks as stack}
          <Pile {stack} />
        {/each}
      </div>
    {:else}
      <div
        class="w-full relative md:p-4 pointer-events-none"
      />
    {/each}

    {#each $game.footer as row}
      <div
        class="flex flex-row w-full relative md:p-4 pointer-events-none"
        class:justify-center={$game.conf.centerRows}
        style="height:{cardHeight}px;"
      >
        {#each row.stacks as stack}
          <Pile {stack} />
        {/each}
      </div>
    {:else}
      <div
        class="w-full relative md:p-4 pointer-events-none"
      />
    {/each}

  {/if}

  <slot></slot>

</div>

