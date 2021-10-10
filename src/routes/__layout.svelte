<script context="module" lang="ts">
  import games from '$lib/data/games'
  export async function load({ page }) {
    let isTable = page.path.match(/^\/play/) ? true : false
    let game = page.query.get('g') || ''
    let family = games?.[game]?.family || ''
    return { props: { isTable, family }}
  }
</script>

<script lang="ts">
import { goto } from '$app/navigation';

  import GameControls from '$lib/GameControls.svelte'
  import GameLinks from '$lib/GameLinks.svelte'

  export let isTable
  export let family
  import "../app.css"

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
      <GameLinks {family} labelSide="bottom" class="bg-gray-900 text-white hover:no-underline" childClass="text-white hover:no-underline hover:bg-gray-500" />
    {:else}
      <GameLinks labelSide="bottom" class="bg-gray-900 text-white hover:no-underline" childClass="text-white hover:no-underline hover:bg-gray-500" />
    {/if}


    <a href="/" on:click|preventDefault={() => {goto('/')}}>Home</a> |
    © 2021 David Hunt
  </footer>

</div>
