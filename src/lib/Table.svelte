<script lang="ts">

import Pile from '$lib/Stack.svelte'
import { maxCardWidth, edgeHeight, showGameOver } from '$lib/data/stores'
import { game } from '$lib/data/stores'
import { modal } from './modal';
import { fly } from 'svelte/transition';
import { quintOut } from 'svelte/easing';
import New from './btn/New.svelte';
import Share from './btn/Share.svelte';
import Auto from './btn/Auto.svelte';
import Restart from './btn/Restart.svelte';
import Replay from './btn/Replay.svelte';
import ReplayControls from './btn/ReplayControls.svelte';

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

  function hideGameOver() {
    $showGameOver = false
    if ($game) {
      $game.hideComplete = true
      $game=$game
    }
  }

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
        class="row flex flex-row w-full relative pointer-events-none select-none"
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
        class="row w-full relative pointer-events-none"
      />
    {/each}

    {#each $game.footer as row}
      <div
        class="row flex flex-row w-full relative pointer-events-none"
        class:justify-center={$game.conf.centerRows}
        style="height:{cardHeight}px;"
      >
        {#each row.stacks as stack}
          <Pile {stack} />
        {/each}
      </div>
    {:else}
      <div
        class="row w-full relative pointer-events-none"
      />
    {/each}

  {/if}

  <slot></slot>

  {#if $game?.isReplaying}
    <div
      class="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-lg border bg-gray-400 bg-opacity-40 z-10 text-center shadow-2xl h-16 text-sm px-2 pt-1 pb-4"
      transition:fly={{ duration:160, easing:quintOut, y:20 }}
    >
      <ReplayControls />
    </div>
  {/if}


</div>

{#if $game && ($showGameOver || ($game?.isComplete && !$game?.hideComplete))}
  <div
    class="modal top-1/3 bg-gray-100 border-gray-900 border-2 z-50 text-center shadow-2xl"
    use:modal
    transition:fly={{ duration:160, easing:quintOut, y:20 }}
    on:cancel={hideGameOver}
  >
    <h2 class="m-0">Finished{$game.isComplete ? '!' : '?'}</h2>

    <p>Time: {$game.elapsedTime} Moves: {$game.undo.length}</p>
    <div class="flex justify-center pt-4">
      <div on:click={hideGameOver}><New/></div>
      <div on:click={hideGameOver}><Restart/></div>
      <div><Share class="bg-gray-100 border-gray-300 text-black"/></div>
      <div><Replay class="bg-gray-100 border-gray-300 text-black right-0"/></div>
    </div>
  </div>
{/if}

{#if $game?.canAutoplay && !$game.isComplete}
  <div
    class="modal -bottom-4 text-yellow-200"
    transition:fly={{ duration:80, easing:quintOut, y:40 }}
  >
    <Auto class="text-sm" size="2x">autoplay</Auto>
  </div>
{/if}

<style lang="postcss">
  .modal {
    @apply fixed left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 rounded-lg;
  }
  .row {
    @apply md:p-4;
  }
  @media all and (orientation:landscape) and (max-height:500px) {
    .row {
      @apply p-0;
    }
  }
</style>