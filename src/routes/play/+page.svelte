<script lang="ts">
// @ts-ignore
import { afterNavigate, beforeNavigate } from '$app/navigation'
// @ts-ignore
import { page } from '$app/stores'
import { platform } from '$lib/MediaQuery.svelte';
import { game } from '$lib/data/stores'
import Game from '$lib/Game'
import Table from '$lib/Table.svelte'
import GameLinks from '$lib/GameLinks.svelte';
import SiteLinks from '$lib/SiteLinks.svelte';
import GameControls from '$lib/GameControls.svelte';
import IconButton from '$lib/IconButton.svelte';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

  beforeNavigate((nav:any) => {
    console.log({before: nav})
    // @ts-ignore
    // This seems to be needed for everything to reset. Not sure why.
    // If it's omitted, strange things start to happen, like if you are on a "/play" page
    // and then go to a different Game from the Games menu, the Variants menu does not update.
    // Then, if you click Home or About, the Table component doesn't go away and your game
    // will stay loaded, positioned on top of whatever page you visit.
    // I think there is a memory leak but I can't figure it out and maybe this solves it.
    game.set(undefined)
  })

  afterNavigate((nav:any) => {
    console.log({after: nav})
    let config = $page.url.searchParams.get('g')
    if (!config) config = 'klondike-vegas'
    let deck = $page.url.searchParams.get('d')
    game.set(new Game(config, deck))
  })

</script>

<svelte:head>
  <title>{$game?.title} | Solitaire Table</title>
</svelte:head>

<div class="h-screen flex flex-col">

  {#if $platform==='desktop'}
    <header class="flex-grow-0 flex flex-row z-10 w-full px-12 border-b-2 border-gray-800 bg-gray-700 text-white">
      <GameLinks dropdownFrom="top" linear size="lg" class="text-blue-400 text-lg py-1 bg-gray-700 rounded-b border-gray-800" />
      <SiteLinks linear size="lg" class="text-lg h-full py-1" />
      <div class="flex-grow"/>
      <GameControls size="lg" class="align-middle text-sm text-white bg-gray-700" position="top" />
      {#if $game?.conf?.family}
        <GameLinks dropdownFrom="top" size="lg" class="text-sm bg-gray-700 rounded-b right-0 border-gray-800 text-right text-white" childClass="min-w-full" family="{$game.conf.family}" />
      {/if}
    </header>
  {/if}

  <div id="main" class="flex-grow max-w-full overflow-x-hidden bg-green-800 pt-4 md:pt-8">
    <Table />
  </div>

  <footer class="flex-grow-0 flex flex-row justify-center h-12 w-full leading-10 px-12 text-xs bg-gray-900 text-white">

    {#if $platform==='mobile'}

      <IconButton icon={faEllipsis} dropdownFrom="bottom" class="bg-gray-900 text-white">
        Menu
        <div slot="menu" class="bg-gray-900 text-white rounded-t border-gray-600">
          <GameLinks linear family={$game?.conf?.family || ''} class="bg-gray-900 text-white hover:no-underline"/>
        <SiteLinks linear class="text-white hover:no-underline" />
        </div>
      </IconButton>
      <GameControls class="text-white bg-gray-900 border-gray-900" buttons="undo,redo,game" position="bottom" />

    {:else}

        <div class="caps-small">© 2021 David Hunt</div>
        <div class="flex-grow"/>
        <SiteLinks linear size="sm" class="text-white" />

    {/if}

  </footer>

</div>
