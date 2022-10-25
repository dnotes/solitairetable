<script lang="ts">
import "../app.css"
import { platform } from '$lib/MediaQuery.svelte';
import { game } from '$lib/data/stores'
import GameLinks from '$lib/GameLinks.svelte';
import SiteLinks from '$lib/SiteLinks.svelte';
import GameControls from '$lib/GameControls.svelte';
import IconButton from '$lib/IconButton.svelte';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import GameList from "$lib/GameList.svelte";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import { modal } from "$lib/modal";
import { fly } from "svelte/transition"
import { quartIn, quintIn } from "svelte/easing"

let showGames = false
function toggleGames(e:any) {
  e.stopImmediatePropagation()
  showGames = !showGames
}

</script>

<div class="h-screen flex flex-col overflow-hidden">

  {#if import.meta.env.SSR || $platform === 'desktop'}

    <header class="flex-grow-0 flex flex-row z-10 w-full h-14 px-2 md:px-6 lg:px-12 border-b-2 bg-gray-700 text-white">
      <GameLinks linear dropdownFrom="top" size="lg" class="no-link bg-gray-700 text-white" />
      <div class="flex-grow"/>
      {#if $game}
        <GameControls class="text-xs text-white bg-gray-700" position="top" />
      {/if}
    </header>

    <div id="main" class="flex-grow w-screen h-full overflow-y-auto m-0 p-0">
      <slot></slot>
    </div>

    <footer class="flex-grow-0 flex flex-row justify-center h-12 w-full leading-10 px-2 md:px-6 lg:px-12 text-xs bg-gray-900 text-white">

      <div class="caps-small">© 2021 DNotes Media Productions</div>
      <div class="flex-grow" />
      <IconButton linear size="sm" icon="{faFolderOpen}" on:click={toggleGames}>
        Games
      </IconButton>
      <SiteLinks size="sm" class="no-link bg-gray-900 text-white rounded-t" />

    </footer>

    {#if showGames}
      <div
        use:modal
        transition:fly={{ duration:320, x:120, easing:quintIn }}
        class="fixed right-0 w-96 bottom-16 p-4 overflow-y-auto overflow-x-hidden bg-gray-800 text-white z-10 rounded-l drop-shadow-xl"
        style="height:720px; max-height:calc(100vh - 140px);"
        on:click={()=>{showGames=false}}
        on:cancel={()=>{showGames=false}}
      >
        <GameList />
      </div>
    {/if}

  {:else}

    <div id="main" class="flex-grow w-screen h-full overflow-y-auto m-0 p-0">
      <slot></slot>
    </div>

    <footer class="flex-grow-0 flex flex-row justify-center h-12 w-full leading-10 px-2 md:px-6 lg:px-12 text-xs bg-gray-900 text-white">

      <IconButton icon="{faFolderOpen}" on:click={toggleGames}>
        Games
      </IconButton>

      <div class="flex-grow" />
      {#if $game}
        <GameControls class="text-white bg-gray-900" position="bottom" />
        <div class="flex-grow" />
      {/if}

      <IconButton icon={faEllipsis} dropdownFrom="bottom" class="bg-gray-900 text-white right-0 text-right">
        Menu
        <div slot="menu" class="bg-gray-900 text-white rounded-t min-w-full right-0">
          <SiteLinks class="no-link bg-gray-900 text-white" />
        </div>
      </IconButton>

    </footer>

    {#if showGames}
      <div
        use:modal
        transition:fly={{ duration:240, x:-120, easing:quartIn }}
        class="fixed left-0 w-48 bottom-16 p-4 overflow-y-auto overflow-x-hidden bg-gray-800 text-white z-10 rounded-r drop-shadow-xl"
        style="height:720px; max-height:calc(100vh - 140px);"
        on:click={()=>{showGames=false}}
        on:cancel={()=>{showGames=false}}
      >
        <GameList />
      </div>
    {/if}

  {/if}

</div>

