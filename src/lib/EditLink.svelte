<script lang="ts">
  import IconButton from "$lib/IconButton.svelte"
  // @ts-ignore
  import { page } from "$app/stores"
  import { game } from "$lib/data/stores"
  import { faEdit } from '@fortawesome/free-solid-svg-icons'

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

  export let linear = false

  export let text = true

  let isBuild = $page.url.pathname.match(/^\/build/i)
  let url = isBuild ? 'play' : 'build'

</script>

<IconButton
  href="/{url}?g={$game?.name || $game?.conf?.toString()}"
  icon="{faEdit}"
  class="{cls} {isBuild && ('text-green-500')}"
  {size}
  {linear}
>
  {#if text}
    Edit
  {/if}
</IconButton>
