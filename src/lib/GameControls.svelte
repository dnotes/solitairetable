<script lang="ts">
  import IconButton from '$lib/IconButton.svelte'
  import { faArrowLeft, faArrowRight, faArrowRotateLeft, faAsterisk } from '@fortawesome/free-solid-svg-icons'
  import { game } from '$lib/data/stores'
  import EditLink from './EditLink.svelte'

  export let buttons='undo,redo,new,restart,edit'
  export let text = true
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

{#if buttons.includes('undo')}
  <IconButton icon={faArrowLeft} class={cls} {size} {linear} on:click={() => { $game.doUndo(); game.set($game); }}>
    {#if text}
      Undo
    {/if}
  </IconButton>
{/if}
{#if buttons.includes('redo')}
  <IconButton icon={faArrowRight} class={cls} {size} {linear} on:click={() => { $game.doRedo(); game.set($game); }}>
    {#if text}
      Redo
    {/if}
  </IconButton>
{/if}
{#if buttons.includes('new')}
  <IconButton icon={faAsterisk} class={cls} {size} {linear} on:click={() => { $game.new(); game.set($game); }}>
    {#if text}
      New
    {/if}
  </IconButton>
{/if}
{#if buttons.includes('restart')}
  <IconButton icon={faArrowRotateLeft} class={cls} {size} {linear} on:click={() => { $game.reset(); game.set($game); }}>
    {#if text}
      Restart
    {/if}
  </IconButton>
{/if}
{#if buttons.includes('edit')}
  <EditLink class={cls} {size} {linear} {text} />
{/if}
