<script lang="ts">

  import { game } from '$lib/data/stores';
  import { faArrowRotateLeft, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
  import IconButton from '$lib/IconButton.svelte';

</script>

{#if $game}
  <div class="flex flex-col">
    <div class="text-center">{$game.isReplayingFrom} replay</div>
    <div class="flex content-evenly">
      <IconButton icon={faArrowRotateLeft} on:click={() => { $game.doUndo(); game.set($game); }} />
      <IconButton icon={faArrowRotateRight} on:click={() => { $game.doReplay(); game.set($game); }} />
    </div>
  </div>
{/if}