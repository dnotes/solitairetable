<script>
  export let family = ''

  import games from '$lib/data/games'
  import GameIcon from './GameIcon.svelte'

  let links = family ? [games[family], ...games[family].variants] : Object.keys(games).map(k => games[k]).filter(g => g.family === g.name)

</script>

{#each links as config}
  <GameIcon {config}/>
{/each}
