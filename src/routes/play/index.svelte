<script lang="ts">

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

{#if $game}
  <Table />
{/if}
