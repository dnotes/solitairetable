<script lang="ts">
  import IconButton from '$lib/IconButton.svelte'
  import { faArrowRotateLeft, faArrowRotateRight, faAsterisk, faBackward } from '@fortawesome/free-solid-svg-icons'
  import { faFile, faShareSquare, faSquare } from '@fortawesome/free-regular-svg-icons'
  import { game } from '$lib/data/stores'

  export let buttons='undo,redo,share,restart,new,edit'
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

  let el:HTMLElement

  function share() {
    navigator.clipboard.writeText(`https://solitaire.dnotes.net/play?g=${$game.conf.toString()}&d=${$game.deck.toString()}`)
    setTimeout(() => { el.click() }, 800)
  }

</script>

<span bind:this={el}>

{#if buttons.includes('undo')}
  <IconButton icon={faArrowRotateLeft} class={cls} {size} {linear} on:click={() => { $game.doUndo(); game.set($game); }}>
    {#if text}
      Undo
    {/if}
  </IconButton>
{/if}
{#if buttons.includes('redo')}
  <IconButton icon={faArrowRotateRight} class={cls} {size} {linear} on:click={() => { $game.doRedo(); game.set($game); }}>
    {#if text}
      Redo
    {/if}
  </IconButton>
{/if}
{#if buttons.includes('game')}
  <IconButton icon={faFile} class={cls} {size} {linear} dropdownFrom="{position}">
    <div slot="menu">
      <IconButton linear icon={faShareSquare} class={cls} {size} dropdownFrom="left" on:click={share}>
        {#if text}
          Share
        {/if}
        <span class="p-2" slot="menu">Link&nbsp;copied!</span>
      </IconButton>
      <IconButton linear icon={faSquare} overlay={faAsterisk} class={cls} {size} on:click={() => { $game.new(); game.set($game); }}>
        {#if text}
          New
        {/if}
      </IconButton>
      <IconButton linear icon={faSquare} overlay={faBackward} class={cls} {size} on:click={() => { $game.reset(); game.set($game); }}>
        {#if text}
          Restart
        {/if}
      </IconButton>
    </div>
    {#if text}
      Game
    {/if}
  </IconButton>
{/if}
{#if buttons.includes('share')}
  <IconButton icon={faShareSquare} class={cls} {size} {linear} dropdownFrom="{position}" on:click={share}>
    {#if text}
      Share
    {/if}
    <span class="p-2" slot="menu">Link&nbsp;copied!</span>
  </IconButton>
{/if}
{#if buttons.includes('restart')}
  <IconButton icon={faSquare} overlay={faBackward} class={cls} {size} {linear} on:click={() => { $game.reset(); game.set($game); }}>
    {#if text}
      Restart
    {/if}
  </IconButton>
{/if}
{#if buttons.includes('new')}
  <IconButton icon={faSquare} overlay={faAsterisk} class={cls} {size} {linear} on:click={() => { $game.new(); game.set($game); }}>
    {#if text}
      New
    {/if}
  </IconButton>
{/if}

</span>