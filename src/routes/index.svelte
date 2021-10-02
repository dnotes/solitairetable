<script>
import GameIcon from '$lib/GameIcon.svelte';
  import games from '$lib/data/games'
</script>

<h1>Solitaire Construction Kit</h1>



<h2 id="play-solitaire">Play solitaire here!</h2>

<div class="flex flex-row justify-center space-x-4">
  {#each Object.keys(games).map(k => games[k]) as config}
    {#if config.name === config.family}
      <GameIcon {config}/>
    {/if}
  {/each}
</div>
