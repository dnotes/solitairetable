<script lang="ts">
import type { NamedGameConfig } from "./data/games";
import * as env from '$app/environment'
export let config:NamedGameConfig

let expanded = false
let hovering = false
let hasVariants = (config.variants || []).length
function clicklink(e:any) {
  if (hasVariants && !hovering) {
    e?.preventDefault()
    expanded = !expanded
  }
}

</script>

<div
  class="tile"
  class:expanded
  on:focus={()=>{hovering=true}}
  on:blur={()=>{hovering=false}}
  on:mouseover={()=>{hovering=true}}
  on:mouseout={()=>{hovering=false}}
>

  <a class="block w-40 h-32 overflow-hidden rounded" href="/play/{config.name}" on:click={clicklink}>
    <img src="/img/tn/{config.name}.png" alt="A game of {config.title} solitaire.">
  </a>

  <div class="leading-loose bg-white rounded-b overflow-hidden px-2 pt-1 -mt-1">
    <div class="w-40"><a href="/play/{config.name}" on:click={clicklink}>{config.title}</a></div>
    {#each (config.variants || []) as conf}
      <div><a href="/play/{conf.name}">{conf.title}</a></div>
    {/each}
  </div>

</div>

<style lang="postcss">
  div.tile {
    @apply w-40 h-40 cursor-pointer overflow-hidden rounded mb-4 mx-1 drop-shadow relative;
  }
  div.tile:hover,
  div.tile.expanded {
    @apply overflow-visible z-10
  }
</style>