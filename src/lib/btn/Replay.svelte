<script lang="ts">
import IconButton from '../IconButton.svelte'
import { faShareSquare, faCaretSquareRight } from '@fortawesome/free-regular-svg-icons'
import { game } from '../data/stores'
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

  $: replayItems = [$game?._sharedReplay, $game?._userReplay, $game?.undo.length > 5]

</script>
{#if replayItems.filter(Boolean).length > 1}

  <IconButton icon={faCaretSquareRight} class={cls} {size} {linear} {dropdownFrom}>
    Replay

    <div slot="menu" class="bg-gray-100 border-gray-300 border text-black">

      {#if $game?._sharedReplay}
        <IconButton icon={faCaretSquareRight} {size} linear on:click={() => { $game.setReplay('shared'); $game = $game; }}>
          run shared replay
        </IconButton>
      {/if}

      {#if $game?._userReplay}
        <IconButton icon={faCaretSquareRight} {size} linear on:click={() => { $game.setReplay('user'); $game = $game; }}>
          run previous replay
        </IconButton>
      {/if}

      {#if $game?.undo.length > 5}
        <IconButton icon={faCaretSquareRight} {size} linear on:click={() => { $game.setReplay(); $game = $game; }}>
          replay current attempt
        </IconButton>
      {/if}

    </div>
  </IconButton>

{:else}

  <IconButton icon={faCaretSquareRight} class={cls} {size} {linear} disabled={replayItems.filter(Boolean).length ? false : true} on:click={()=>{
    if (replayItems[0]) $game.setReplay('shared')
    else if (replayItems[1]) $game.setReplay('user')
    else $game.setReplay()
    $game = $game
  }}>
    Replay
  </IconButton>

{/if}