<script lang="ts">
  import games from '$lib/data/games'
  import type { NamedGameConfig } from '$lib/data/games';
  import GameIcon from './GameIcon.svelte'

  export let family:string = ''
  let links:NamedGameConfig[] = []
  $: links = family ? [games[family], ...(games[family].variants ?? [])] : Object.keys(games).map(k => games[k]).filter(g => g.family === g.name)

</script>

{#each links as config}
  <GameIcon {config}/>
{/each}
