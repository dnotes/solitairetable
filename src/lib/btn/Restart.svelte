<script lang="ts">
import IconButton from '../IconButton.svelte'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { faSquare } from '@fortawesome/free-regular-svg-icons'
import { game } from '../data/stores'

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

</script>

<IconButton icon={faSquare} overlay={faBackward} class={cls} {size} {linear} on:click={() => { $game.reset(); game.set($game); }}>
  Restart
</IconButton>
