<script lang="ts">
import Game from '$lib/Game'
import { game } from '$lib/data/stores'
import IconButton from './IconButton.svelte'
import type { NamedGameConfig } from './data/games';

  export let config:NamedGameConfig

  let cls = ''
  export {cls as class}
</script>

<IconButton
  href="/play/{config.name}"
  title="play {config.title} solitaire"
  linear
  class="{cls}"
  on:click={() => { game.set(new Game(config)) }}
>
  {config.title}
</IconButton>