<script lang="ts">
import IconButton from '../IconButton.svelte'
import { faShareSquare, faCaretSquareRight } from '@fortawesome/free-regular-svg-icons'
import { game } from '../data/stores'
import LinkCopied from '../LinkCopied.svelte';
import type { DropdownDirection } from 'src/global';

  export let linear = false
  export let dropdownFrom:DropdownDirection = "top"
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

  let cls=''
  export { cls as class }

  function share() {
    navigator.clipboard.writeText(new URL($game.href, window.location.href).toString())
  }

</script>

<IconButton icon={faShareSquare} class="{cls}" {size} {linear} {dropdownFrom} on:click={share}>
  Share
  <div slot="menu" class="{cls}">
    <IconButton icon={faShareSquare} size="lg" linear on:click={() => { navigator.clipboard.writeText(new URL($game.href, window.location.href).toString()) }}>
      share game
      <span slot="menu"><LinkCopied>game</LinkCopied></span>
    </IconButton>
    <IconButton icon={faCaretSquareRight} size="lg" linear on:click={() => { navigator.clipboard.writeText(new URL(`${$game.href}/${$game.history}`, window.location.href).toString()) }}>
      share replay
      <span slot="menu"><LinkCopied>replay</LinkCopied></span>
    </IconButton>
  </div>
</IconButton>