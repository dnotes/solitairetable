<script lang="ts">
  import Game from '$lib/Game'
  import { game } from '$lib/data/stores'
  export let config

  let cls = ''
  export {cls as class}
</script>

<a class="{cls}" href="/play?g={config.name}" alt="play {config.title} solitaire" on:click={() => { game.set(new Game(config)) }}>{config.title}</a>
