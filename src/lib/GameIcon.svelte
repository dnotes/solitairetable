<script lang="ts">
import Game from "./Game";
import Pile from "$lib/StackIcon.svelte"
// @ts-ignore
import { goto } from "$app/navigation";
import { onMount } from "svelte"
import type { NamedGameConfig } from "./data/games";
export let config:NamedGameConfig

  let game:Game, rowCount:number, topEdgeCount:number
  let maxCardWidth:number, edgeHeight:number
  let w=160, h=128

  onMount(() => {
    game = new Game(config)
    rowCount = game.layout.length + game.footer.length
    topEdgeCount = game.layout.reduce((agg,row) => agg += row.maxHeight - 1, 0)
  })

  $: maxCardWidth = Math.min(
    (w / game?.longestRow) - 2,
    ((-.018 * h * topEdgeCount) + (h * .66)) / (rowCount * (game?.conf.overlayRows ? game?.layout.length * .1 : 1))
  )
  $: cardHeight = maxCardWidth * 1.5
  $: edgeHeight = maxCardWidth * .24

</script>

<div class="w-40 h-40 cursor-pointer overflow-hidden hover:overflow-visible hover:z-10 rounded mb-4 mx-1 drop-shadow relative">
<div class="w-40 h-32 flex flex-col bg-green-800 box-content overflow-hidden rounded justify-center relative z-10" on:click={() => {goto(`/play?g=${config.name}`)}}>

  {#if game}
  {#each game.layout as row, rowIndex}
  <div
    class="flex flex-row w-full"
    class:justify-center={game.conf.centerRows}
    style="height:{game.conf.overlayRows && (rowIndex !== game.layout.length - 1) ? cardHeight * .4 : cardHeight + (row.maxHeight * edgeHeight) + edgeHeight}px;"
  >
    <!-- PILES -->
    {#each row.stacks as stack}
    <Pile {stack} {maxCardWidth} />
    {/each}
  </div>
  {/each}

  {#each game.footer as row, rowIndex}
  <div
    class="flex flex-row w-full relative md:p-4 pointer-events-none"
    class:justify-center={game.conf.centerRows}
    style="height:{cardHeight}px;"
  >
    {#each row.stacks as stack}
    <Pile {stack} {maxCardWidth} />
    {/each}
  </div>
  {/each}
  {:else}
    generating preview
  {/if}

</div>

<div class="leading-loose text-center bg-white rounded-b overflow-hidden pt-1 -mt-1">
  <div class="w-40"><a href="/play?g={config.name}">{config.title}</a></div>
  {#each (config.variants || []) as conf}
    <div><a href="/play?g={conf.name}">{conf.title}</a></div>
  {/each}
</div>

</div>