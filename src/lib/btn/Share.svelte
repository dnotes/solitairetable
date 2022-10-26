<script lang="ts">
import IconButton from '../IconButton.svelte'
import { faArrowRotateLeft, faArrowRotateRight, faAsterisk, faBackward, faBackwardStep, faForward, faForwardStep } from '@fortawesome/free-solid-svg-icons'
import { faFile, faShareSquare, faSquare } from '@fortawesome/free-regular-svg-icons'
import { game } from '../data/stores'
import { breakpoint } from '../MediaQuery.svelte';
import LinkCopied from '../LinkCopied.svelte';
import { goto } from '$app/navigation';
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

<IconButton icon={faShareSquare} class={cls} {size} {linear} {dropdownFrom} on:click={share}>
  Share
  <span slot="menu"><LinkCopied /></span>
</IconButton>