<script lang="ts">
import "../app.css"
import { platform } from '$lib/MediaQuery.svelte';
import { game } from '$lib/data/stores'
import GameLinks from '$lib/GameLinks.svelte';
import SiteLinks from '$lib/SiteLinks.svelte';
import GameControls from '$lib/GameControls.svelte';
import IconButton from '$lib/IconButton.svelte';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
</script>

<div class="h-screen flex flex-col overflow-hidden">

  {#if import.meta.env.SSR || $platform==='desktop'}
    <header class="flex-grow-0 flex flex-row z-10 w-full h-14 px-2 md:px-6 lg:px-12 border-b-2 bg-gray-700 text-white">
      <div class="flex-grow"/>
      {#if $game}
        <GameControls size="lg" class="text-sm text-white bg-gray-700" position="top" />
      {/if}
    </header>
  {/if}

  <div id="main" class="flex-grow w-screen h-full overflow-hidden m-0 p-0">
    <slot></slot>
  </div>

  <footer class="flex-grow-0 flex flex-row justify-center h-12 w-full leading-10 px-2 md:px-6 lg:px-12 text-xs bg-gray-900 text-white">

    <div class="caps-small">© 2021<span class="hidden md:inline-block">David Hunt</span></div>
    <div class="flex-grow"></div>
    {#if $platform==='mobile'}

      {#if $game}
        <GameControls class="text-white bg-gray-900" position="bottom" />
        <div class="flex-grow"></div>
      {:else}
        <GameLinks dropdownFrom="bottom" class="no-link bg-gray-900 text-white" />
      {/if}

      <IconButton icon={faEllipsis} dropdownFrom="bottom" class="bg-gray-900 text-white right-0 text-right">
        Menu
        <div slot="menu" class="bg-gray-900 text-white rounded-t min-w-full right-0">
          <SiteLinks class="no-link bg-gray-900 text-white" />
        </div>
      </IconButton>

    {:else}

      <div class="flex-grow"/>
      <GameLinks linear dropdownFrom="bottom" size="sm" class="no-link bg-gray-900 text-white" />
      <SiteLinks size="sm" class="no-link bg-gray-900 text-white rounded-t" />

    {/if}

  </footer>

</div>
