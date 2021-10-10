<script lang="ts">
import { page } from '$app/stores'
import { browser } from '$app/env'
import Game from '$lib/Game'
import Pile from '$lib/Stack.svelte'
import { game, maxCardWidth } from '$lib/data/stores'

  if (browser) {
    let config = $page.query.get('g')
    if (!config) config = 'klondike-vegas'
    let deck = $page.query.get('d')
    game.set(new Game(config, deck))
  }

  let w=0,h=0

  $: maxCardWidth.set((w / $game.longestRow) - 20)
  $: rowHeight = $maxCardWidth * 1.5

</script>

  <div id="game" class="flex flex-col text-white" bind:clientWidth={w} bind:clientHeight={h}>

    <!-- ROWS -->
    {#each $game.layout as row, rowIndex}
    <div class="flex flex-row w-full relative p-4 pointer-events-none" class:justify-center={$game.conf.centerRows} style="height:{$game.conf.overlayRows && (rowIndex !== $game.layout.length - 1) ? $maxCardWidth * .7 : rowHeight + row.padBottom}px;">
      <!-- PILES -->
      {#each row.stacks as stack}
        <div>
          <Pile {stack} />
        </div>
      {/each}
    </div>
    {/each}

    {#each $game.footer as row, rowIndex}
    <div class="flex flex-row w-full relative p-4 pointer-events-none" class:justify-center={$game.conf.centerRows} style="height:{$game.conf.overlayRows && (rowIndex !== $game.footer.length - 1) ? $maxCardWidth * .7 : rowHeight + row.padBottom}px;">
      {#each row.stacks as stack}
        <div>
          <Pile {stack} />
        </div>
      {/each}
    </div>
    {/each}

    <div class="absolute bottom-0 pl-4"><a href='/play?g={$game.conf.toString()}'>{@html $game.conf.toString().replace(/!/g, '<br>$&').replace(/\|/g, '<br> &nbsp; |')}</a></div>
  </div>


