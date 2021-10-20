<script context="module" lang="ts">
  export async function load({ page }) {
    let isTable = page.path.match(/^\/play/) ? true : false
    return { props: { isTable }}
  }
</script>

<script lang="ts">

import ReloadPrompt from '$lib/ReloadPrompt.svelte'
import { platform } from '$lib/MediaQuery.svelte'
import GameControls from '$lib/GameControls.svelte'
import GameLinks from '$lib/GameLinks.svelte'
import SiteLinks from '$lib/SiteLinks.svelte'
import { game } from '$lib/data/stores'
import "../app.css"
import IconButton from '$lib/IconButton.svelte';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

export let isTable

</script>

<div class="min-h-screen {isTable ? '' : 'flex flex-col'}">

  {#if $platform==='desktop'}
    <header class="flex flex-row z-10 w-full px-12 border-b-2 border-gray-800 bg-gray-700 text-white {isTable ? 'fixed top-0' : ''}">
      <GameLinks dropdownFrom="top" linear size="lg" class="text-blue-400 text-lg py-1 bg-gray-700 rounded-b border-gray-800" />
      <SiteLinks linear size="lg" class="text-lg h-full py-1" />
      <div class="flex-grow"/>
      {#if isTable}
        <GameControls size="lg" class="align-middle text-sm" />
        {#if $game.conf.family}
          <GameLinks dropdownFrom="top" size="lg" class="text-sm bg-gray-700 rounded-b right-0 border-gray-800 text-right text-white" childClass="min-w-full" family="{$game.conf.family}" />
        {/if}
      {/if}
    </header>
  {/if}

  {#if isTable}
    <div id="main" class="h-screen max-w-full overflow-x-hidden bg-green-800 {$platform==='desktop' ? 'pt-8' : ''}">
      <slot></slot>
    </div>
  {:else}
    <div id="main" class="flex-grow w-full max-w-screen-lg mx-auto p-4">
      <slot></slot>
    </div>
  {/if}


  <footer class="flex flex-row justify-center h-12 w-full leading-10 px-12 text-xs bg-gray-900 text-white {isTable ? 'fixed bottom-0' : ''}">

    {#if $platform==='mobile'}

      {#if isTable}
        <IconButton icon={faEllipsis} dropdownFrom="bottom" class="bg-gray-900 text-white">
          Menu
          <div slot="menu" class="bg-gray-900 text-white rounded-t border-gray-600">
            <GameLinks linear family={$game?.conf?.family || ''} class="bg-gray-900 text-white hover:no-underline"/>
            <SiteLinks linear class="text-white hover:no-underline" />
          </div>
        </IconButton>
        <GameControls/>
      {:else}
        <GameLinks dropdownFrom="bottom" class="bg-gray-900 text-white hover:no-underline" />
        <SiteLinks class="text-white hover:no-underline" />
      {/if}

    {:else}

        <div class="caps-small">© 2021 David Hunt</div>
        <div class="flex-grow"/>
        <SiteLinks linear size="sm" class="text-white" />

    {/if}

    <ReloadPrompt/>

  </footer>

</div>
