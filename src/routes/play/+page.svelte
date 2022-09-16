<script lang="ts">
import games from '$lib/data/games'
import { game } from '$lib/data/stores'
import Game from '$lib/Game'
import Table from '$lib/Table.svelte'
import { page } from '$app/stores'

  let ids = Object.keys(games)
  let id:string
  $: id = ids[Math.floor(Math.random() * ids.length)]
  $: if (id) game.set(new Game(id))

</script>

<svelte:head>
  <title>Random Solitaire Game | Solitaire Table</title>
  <meta property="og:title" content="Random Solitaire Game" />
  <meta property="og:image" content="{$page.url.origin}/img/klondike.jpg" />
  <meta property="twitter:image" content="{$page.url.origin}/img/klondike.jpg" />
  <meta property="og:url" content="{$page.url.origin}/play" />
  <meta property="og:site_name" content="Solitaire Table" />
</svelte:head>

<div class="w-full h-full bg-green-800 overflow-x-auto pt-4 md:pt-8">
  <Table />
</div>
