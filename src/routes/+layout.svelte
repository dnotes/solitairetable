<script lang="ts">
import "../app.css"
import { platform, isMobileLandscape } from '$lib/MediaQuery.svelte';
import { game } from '$lib/data/stores'
import SiteLinks from '$lib/SiteLinks.svelte';
import IconButton from '$lib/IconButton.svelte';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import GameList from "$lib/GameList.svelte";
import { faFolderOpen, faFile } from "@fortawesome/free-regular-svg-icons";
import { modal } from "$lib/modal";
import { fly } from "svelte/transition"
import { quartIn, quintIn } from "svelte/easing"
import Restart from "$lib/btn/Restart.svelte";
import New from "$lib/btn/New.svelte";
import Share from "$lib/btn/Share.svelte";
import Undo from "$lib/btn/Undo.svelte";
import Redo from "$lib/btn/Redo.svelte";
import Prev from "$lib/btn/Prev.svelte";
import Next from "$lib/btn/Next.svelte";
import Replay from "$lib/btn/Replay.svelte";

let showGames = false
function toggleGames(e:any) {
  showGames = !showGames
}

</script>

<div class="h-screen flex flex-col overflow-hidden">

  {#if import.meta.env.SSR || $platform === 'desktop'}

    <header class="flex-grow-0 flex flex-row z-10 w-full h-14 px-2 md:px-6 lg:px-12 border-b-2 bg-gray-700 text-white items-center">
      <h1 class="h-full">Solitaire Table</h1>
      <div class="flex-grow"/>
      {#if $game}
        <div class="text-xs">
          <Restart/>
          <New/>
          <Share/>
          <!-- <Replay/> -->
          <Undo/>
          <Redo/>
        </div>
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
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        role="button"
        aria-label="Show games"
        tabindex="0"
        use:modal
        transition:fly|global={{ duration:320, x:120, easing:quintIn }}
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

    <footer class="flex-grow-0 flex flex-row justify-center h-20 w-full leading-10 px-2 pb-3 md:px-6 lg:px-12 text-xs bg-gray-900 text-white">

      <IconButton icon="{faFolderOpen}" on:click={toggleGames}>
        Games
      </IconButton>

      <div class="flex-grow" />
      {#if $game}
        <IconButton icon="{faFile}" dropdownFrom={$isMobileLandscape ? "right" : "bottom"} class="bg-gray-900 text-white">
          Deal
          <div slot="menu">
            <New linear />
            <Restart linear />
            <Prev linear />
            <Next linear />
          </div>
        </IconButton>
        <!-- <Replay dropdownFrom={$isMobileLandscape ? "right" : "bottom"} class="bg-gray-900 text-white {$isMobileLandscape || "text-right right-0"}"/> -->
        <Undo/>
        <Redo/>
        <Share dropdownFrom={$isMobileLandscape ? "right" : "bottom"} class="bg-gray-900 text-white {$isMobileLandscape || "text-right right-0"}"/>
        <div class="flex-grow" />
      {/if}

      <IconButton icon={faEllipsis} dropdownFrom={$isMobileLandscape ? "bottom-0 right" : "bottom"} class="bg-gray-900 text-white {$isMobileLandscape || "text-right right-0"}">
        Menu
        <div slot="menu" class="bg-gray-900 text-white rounded-t min-w-full {$isMobileLandscape || "text-right right-0"}">
          <SiteLinks class="no-link bg-gray-900 text-white" />
        </div>
      </IconButton>

    </footer>

    {#if showGames}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        role="button"
        aria-label="Show games"
        tabindex="0"
        use:modal
        transition:fly|global={{ duration:240, x:-120, easing:quartIn }}
        id="show-games"
        class="fixed left-0 w-56 bottom-16 p-4 overflow-y-auto overflow-x-hidden bg-gray-800 text-white z-10 rounded-r drop-shadow-xl"
        on:click={()=>{showGames=false}}
        on:cancel={()=>{showGames=false}}
      >
        <GameList />
      </div>
    {/if}

  {/if}

</div>

<style lang="postcss">
  #show-games {
    height:720px;
    max-height:calc(100vh - 140px);
  }
  .right-only { display:none; }
  @media all and (orientation:landscape) and (max-height:500px) {
    .bottom-only { display:none; }
    .right-only { display:block; }
    #main { @apply pr-14; }
    #show-games {
      @apply left-0 bottom-0;
      max-height:100vh;
    }
    footer { @apply fixed right-0 top-0 bottom-0 h-auto p-1 flex-col w-14 content-center; }
  }
</style>
