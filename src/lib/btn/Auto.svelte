<script lang="ts">
import IconButton from '../IconButton.svelte'
import { faArrowRotateLeft, faArrowRotateRight, faAsterisk, faBackward, faBackwardStep, faForward, faForwardStep } from '@fortawesome/free-solid-svg-icons'
import { faFile, faShareSquare, faSquare } from '@fortawesome/free-regular-svg-icons'
import { game } from '../data/stores'
import { breakpoint } from '../MediaQuery.svelte';
import LinkCopied from '../LinkCopied.svelte';
import { goto } from '$app/navigation';

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

  let cls=''
  export { cls as class }

  const sleep:(ms:number)=>Promise<void> = ms => new Promise(resolve => setTimeout(resolve, ms))

</script>

<IconButton icon={faSquare} overlay={faForward} class={cls} {size} {linear} disabled={ !$game?.canAutoplay || $game?.isComplete } on:click={async () => {
  let i = 0, working = true
  while (i < 1000 && !$game?.isComplete && working) {
    working = $game.autoplay()
    $game = $game
    i++
    await sleep(20)
  }
}}>
  <slot>Auto</slot>
</IconButton>
