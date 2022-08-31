<script lang="ts">
import games from '$lib/data/games'
import GameLink from './GameLink.svelte'
import IconButton from './IconButton.svelte'
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';

  export let family = ''
  export let linear = false
  export let size:
    | 'xs'
    | 'sm'
    | 'lg'
    | '1x'
    | '2x'
    | '3x'
    | '4x'
    | '5x'
    | '6x'
    | '7x'
    | '8x'
    | '9x'
    | '10x'
  ="2x"

  let links = family ? [games[family], ...(games[family].variants || [])] : Object.keys(games).map(k => games[k]).filter(g => g.family === g.name)
  let title = family ? `Variants` : 'Games'

  export let dropdownFrom: undefined
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
  =undefined

  let cls = ''
  let childClass = ''
  let menuClass = ''
  export { cls as class, childClass, menuClass }

</script>

<IconButton icon={faFolderOpen} class={cls} {dropdownFrom} {size} {linear}>
  {title}
  <div slot="menu" class="min-w-full {cls} {menuClass}">
    {#each links as config}
      <GameLink class="px-3 block {cls} {childClass}" {config}/>
    {/each}
  </div>
</IconButton>
