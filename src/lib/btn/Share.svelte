<script lang="ts">
import IconButton from '../IconButton.svelte'
import { faShareSquare, faCaretSquareRight } from '@fortawesome/free-regular-svg-icons'
import { game } from '../data/stores'
import LinkCopied from '../LinkCopied.svelte';
import type { DropdownDirection } from '../../global';

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

  let open = false
  function share() {
    navigator.clipboard.writeText($game.shareLink)
    setTimeout(()=>{ open=false }, 1400)
  }

</script>

<IconButton icon={faShareSquare} class="{cls}" {size} {linear} {dropdownFrom} on:click={share} bind:open>
  Share
  <div slot="menu"><LinkCopied>game</LinkCopied></div>
</IconButton>