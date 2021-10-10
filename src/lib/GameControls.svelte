<script lang="ts">
  import { game } from '$lib/data/stores'
</script>

<button on:click={() => { $game.doUndo(); game.set($game); }}>Undo</button>
<button on:click={() => { $game.doRedo(); game.set($game); }}>Redo</button>
<button on:click={() => { location.reload(); }}>New</button>