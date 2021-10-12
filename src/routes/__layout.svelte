<script context="module" lang="ts">
  export async function load({ page }) {
    let isTable = page.path.match(/^\/play/) ? true : false
    return { props: { isTable }}
  }
</script>

<script lang="ts">

import ReloadPrompt from '$lib/ReloadPrompt.svelte'
import GameControls from '$lib/GameControls.svelte'
import GameLinks from '$lib/GameLinks.svelte'
import SiteLinks from '$lib/SiteLinks.svelte'
import { game } from '$lib/data/stores'
import "../app.css"

export let isTable

</script>

<div class="min-h-screen {isTable ? '' : 'flex flex-col'}">

  {#if isTable}
    <div id="main" class="h-screen bg-green-800">
      <slot></slot>
    </div>
  {:else}
    <div id="main" class="flex-grow w-full max-w-screen-lg mx-auto p-4">
      <slot></slot>
    </div>
  {/if}


  <footer class="h-10 w-full leading-10 px-12 text-xs bg-gray-900 text-white {isTable ? 'fixed bottom-0' : ''}">

    {#if isTable}
      <GameControls/>
      <GameLinks family={$game?.conf?.family || ''} labelSide="bottom" class="bg-gray-900 text-white hover:no-underline" childClass="text-white hover:no-underline hover:bg-gray-500" />
    {:else}
      <GameLinks labelSide="bottom" class="bg-gray-900 text-white hover:no-underline" childClass="text-white hover:no-underline hover:bg-gray-500" />
    {/if}

    <SiteLinks class="text-white hover:no-underline" />

    <ReloadPrompt/>

  </footer>

</div>
