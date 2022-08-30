<script lang="ts">

import { platform } from '$lib/MediaQuery.svelte';
import GameLinks from '$lib/GameLinks.svelte'
import SiteLinks from '$lib/SiteLinks.svelte'
import IconButton from '$lib/IconButton.svelte';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

</script>

<div class="min-h-screen flex flex-col">

  {#if $platform==='desktop'}
    <header class="flex flex-row z-10 w-full px-12 border-b-2 border-gray-800 bg-gray-700 text-white">
      <GameLinks dropdownFrom="top" linear size="lg" class="text-blue-400 text-lg py-1 bg-gray-700 rounded-b border-gray-800" />
      <SiteLinks linear size="lg" class="text-lg h-full py-1" />
      <div class="flex-grow"/>
    </header>
  {/if}

  <div id="main" class="flex-grow w-full max-w-screen-lg mx-auto p-4 md:py-8">
    <slot></slot>
  </div>

  <footer class="flex flex-row justify-center h-12 w-full leading-10 px-12 text-xs bg-gray-900 text-white">

    {#if $platform==='mobile'}

      <IconButton icon={faEllipsis} dropdownFrom="bottom" class="bg-gray-900 text-white">
        Menu
        <div slot="menu" class="bg-gray-900 text-white rounded-t border-gray-600">
          <GameLinks linear class="bg-gray-900 text-white hover:no-underline"/>
          <SiteLinks linear class="text-white hover:no-underline" />
        </div>
      </IconButton>
      <GameLinks dropdownFrom="bottom" class="bg-gray-900 text-white hover:no-underline" />

    {:else}

      <div class="caps-small">© 2021 David Hunt</div>
      <div class="flex-grow"/>
      <SiteLinks linear size="sm" class="text-white" />

    {/if}

  </footer>

</div>
