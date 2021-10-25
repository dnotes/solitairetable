<script lang="ts">

import GameConfig from '$lib/GameConfig.svelte'

import { browser } from '$app/env'
import { page } from '$app/stores'
import Game from '$lib/Game'
import { game } from '$lib/data/stores'
import Table from '$lib/Table.svelte'

  if (browser) {
    let config = $page.query.get('g')
    if (!config) config = 'klondike-vegas'
    let deck = $page.query.get('d')
    game.set(new Game(config, deck))
  }

</script>

<div class="flex flex-row h-screen">
  <div class="py-12 w-full flex-grow h-full overflow-y-scroll md:pr-80">
    <Table editing />
  </div>
  <div class="py-12 w-80 h-full fixed top-0 right-0 overflow-y-scroll bg-gray-800">
    <GameConfig bind:value={$game.conf} />
  </div>
</div>
