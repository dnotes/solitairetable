<script>
  import { onMount } from 'svelte'
  export let family = ''

  import games from '$lib/data/games'
  import GameLink from './GameLink.svelte'

  let open = false
  let menu
  let links = family ? [games[family], ...games[family].variants] : Object.keys(games).map(k => games[k]).filter(g => g.family === g.name)
  let title = family ? `${links[0].title} Variants` : 'All Games'

  export let labelSide = 'top'

  let cls = ''
  let childClass = ''
  export { cls as class, childClass }

  onMount(() => {
    const handleOutsideClick = (event) => {
      if (open && !menu.contains(event.target)) {
        open = false;
      }
    };

    const handleEscape = (event) => {
      if (open && event.key === 'Escape') {
        open = false;
      }
    };

    // add events when element is added to the DOM
    document.addEventListener('click', handleOutsideClick, false);
    document.addEventListener('keyup', handleEscape, false);

    // remove events when element is removed from the DOM
    return () => {
      document.removeEventListener('click', handleOutsideClick, false);
      document.removeEventListener('keyup', handleEscape, false);
    };
  });

</script>

<div class="relative inline-block px-4 cursor-pointer {cls}" bind:this={menu} >
  <a class="px-3 block {cls}" href="/" on:click|preventDefault={() => {open=!open}}>{title}</a>
  {#if open}
    <div class="absolute {labelSide}-full min-w-full {cls}" on:click={() => {open=false}}>
      {#each links as config}
        <GameLink class="px-3 block {childClass}" {config}/>
      {/each}
    </div>
  {/if}
</div>
