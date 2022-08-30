<script lang="ts">
import Game from '$lib/Game'
import { game } from '$lib/data/stores'
import IconLink from './IconLink.svelte'
import type { NamedGameConfig } from './data/games';

  export let config:NamedGameConfig

  let cls = ''
  export {cls as class}
</script>

<IconLink href="/play?g={config.name}" title="play {config.title} solitaire" linear class="{cls}" on:click={() => { game.set(new Game(config)) }}>{config.title}</IconLink>