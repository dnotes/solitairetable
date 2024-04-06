<script lang="ts">
import IconButton from '../IconButton.svelte'
import { faBackwardStep } from '@fortawesome/free-solid-svg-icons'

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

<IconButton {linear} icon={faBackwardStep} class={cls} {size} on:click={() => { history.back(); }}>Prev</IconButton>

