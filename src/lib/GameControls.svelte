<script lang="ts">
  export let buttons='undo,redo,new,restart'
  import { game } from '$lib/data/stores'
</script>

{#if buttons.includes('undo')}
  <button on:click={() => { $game.doUndo(); game.set($game); }}>Undo</button>
{/if}
{#if buttons.includes('redo')}
  <button on:click={() => { $game.doRedo(); game.set($game); }}>Redo</button>
{/if}
{#if buttons.includes('new')}
  <button on:click={() => { $game.new(); game.set($game); }}>New</button>
{/if}
{#if buttons.includes('restart')}
  <button on:click={() => { $game.reset(); game.set($game); }}>Restart</button>
{/if}
