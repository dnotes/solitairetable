<script>
import Game from "./Game";
import Pile from "$lib/StackIcon.svelte"
import { goto } from "$app/navigation";
export let config

  let game = new Game(config)
  let maxCardWidth, rowHeight

  $: maxCardWidth = ((160 / game.longestRow) - 2)
  $: rowHeight = maxCardWidth * 1.5

</script>

<div class="w-40 h-40 cursor-pointer overflow-hidden hover:overflow-visible rounded">
<div class="w-40 h-32 flex flex-col bg-green-800 box-content overflow-hidden rounded" on:click={() => {goto(`/play?g=${config.name}`)}}>
  {#each game.layout as row, rowIndex}
  <div class="flex flex-row w-full" style="height:{game.conf.overlayRows && (rowIndex !== game.layout.length - 1) ? maxCardWidth * .7 : rowHeight + (row.maxHeight * 2)}px;">
    <!-- PILES -->
    {#each row.stacks as stack}
    <Pile {stack} {maxCardWidth} />
    {/each}
  </div>
  {/each}

  {#each game.footer as row, rowIndex}
  <div class="flex flex-row" style="height:{game.conf.overlayRows && (rowIndex !== game.footer.length - 1) ? maxCardWidth * .7 : rowHeight + row.padBottom}px;">
    {#each row.stacks as stack}
    <Pile {stack} {maxCardWidth} />
    {/each}
  </div>
  {/each}

</div>

<div class="leading-loose text-center bg-white overflow-hidden">
  <div class="w-40"><a href="/play?g={config.name}">{config.title}</a></div>
  {#each config.variants as conf}
    <div><a href="/play?g={conf.name}">{conf.title}</a></div>
  {/each}
</div>

</div>