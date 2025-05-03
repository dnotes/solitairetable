<script lang="ts">
import games from '$lib/data/games'
import type { DropdownDirection } from '../global';
import IconButton from './IconButton.svelte'
import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';

  export let family = ''
  export let linear:boolean = false
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
  let title = family ? links[0].title : 'Games'

  export let dropdownFrom:DropdownDirection

  let cls = ''
  export { cls as class }

</script>

<IconButton icon={faFolderOpen} class={cls} {dropdownFrom} {size} {linear}>
  {title}
  <div slot="menu" class="min-w-full {cls}">
    {#each links as game}
      <IconButton
        href="/play/{game.name}"
        title="play {game.title} solitaire"
        linear
        class="no-link {cls}"
        dropdownFrom="left"
        on:click={(e)=>{
          if (!game?.variants?.length) {
            e.stopImmediatePropagation()
          }
        }}
      >
        {game.title}
        <div slot="menu">
          {#if game?.variants?.length}
            {#each [game, ...game.variants] as {name,title}}
              <IconButton
                href="/play/{name}"
                title="play {title} solitaire"
                linear
                class="no-link {cls}"
              >
                {title}
              </IconButton>
             <!-- content here -->
            {/each}
          {/if}
        </div>
      </IconButton>
    {/each}
  </div>
</IconButton>
