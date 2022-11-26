<script>
  import GameList from '$lib/GameList.svelte';
</script>

<svelte:head>
  <title>Solitaire Table | by David Hunt</title>
</svelte:head>

<h1>Solitaire Table</h1>

<h2 id="play-solitaire">All Games</h2>

<div class="flex flex-row flex-wrap justify-center">
  <GameList/>
</div>
