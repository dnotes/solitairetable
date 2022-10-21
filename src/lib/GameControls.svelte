<script lang="ts">
import IconButton from '$lib/IconButton.svelte'
import { faArrowRotateLeft, faArrowRotateRight, faAsterisk, faBackward } from '@fortawesome/free-solid-svg-icons'
import { faFile, faShareSquare, faSquare } from '@fortawesome/free-regular-svg-icons'
import { game } from '$lib/data/stores'
import GameLinks from './GameLinks.svelte';
import { breakpoint } from './MediaQuery.svelte';
import LinkCopied from './LinkCopied.svelte';
import { goto } from '$app/navigation';

  export let collapseGameButtons = false
  export let text = true
  export let linear = false
  export let position:'top'|'bottom' = 'top'
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


  <IconButton icon={faArrowRotateLeft} class={cls} {size} {linear} on:click={() => { $game.doUndo(); game.set($game); }}>
    {#if text}
      Undo
    {/if}
  </IconButton>
  <IconButton icon={faArrowRotateRight} class={cls} {size} {linear} on:click={() => { $game.doRedo(); game.set($game); }}>
    {#if text}
      Redo
    {/if}
  </IconButton>

{#if !collapseGameButtons && $breakpoint.includes('l')}

  <IconButton icon={faSquare} overlay={faBackward} class={cls} {size} {linear} on:click={() => { $game.reset(); game.set($game); }}>
    {#if text}
      Restart
    {/if}
  </IconButton>
  <IconButton icon={faSquare} overlay={faAsterisk} class={cls} {size} {linear} on:click={() => { goto($game.new().href ) }}>
    {#if text}
      New
    {/if}
  </IconButton>
  <IconButton icon={faShareSquare} class={cls} {size} {linear} dropdownFrom="{position}" on:click={share}>
    {#if text}
      Share
    {/if}
    <span slot="menu"><LinkCopied /></span>
  </IconButton>

{:else}

  <IconButton icon={faFile} class={cls} {size} {linear} dropdownFrom="{position}">
    <div slot="menu">

      <IconButton linear icon={faSquare} overlay={faAsterisk} class={cls} {size} on:click={() => { goto($game.new().href) }}>
        {#if text}
          New
        {/if}
      </IconButton>
      <IconButton linear icon={faSquare} overlay={faBackward} class={cls} {size} on:click={() => { $game.reset(); game.set($game); }}>
        {#if text}
          Restart
        {/if}
      </IconButton>
      <IconButton linear icon={faShareSquare} class={cls} {size} dropdownFrom="top" on:click={share}>
        {#if text}
          Share
        {/if}
        <span slot="menu"><LinkCopied /></span>
      </IconButton>

    </div>
    {#if text}
      Game
    {/if}
  </IconButton>

{/if}

{#if $game?.conf?.family}
  <GameLinks dropdownFrom="{position}" {size} class="{cls} right-0" childClass="min-w-full text-right no-link" family="{$game.conf.family}" />
{/if}
