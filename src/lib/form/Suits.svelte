<script lang="ts">
import getLabel from "./getLabel";

  export let value = 'CHDS'
  export let id:string = ''

  let suitList = {
    Clubs: true,
    Hearts: true,
    Diamonds: true,
    Spades: true,
  }

  $: value = Object.entries(suitList).filter(([k,v]) => v).map(([k,v]) => k.slice(0,1)).join('')

  function toggle(k:string) {
    suitList[k] = !suitList[k]
  }

</script>

{#if id}
  <label class="pl-3" for="{id}">{getLabel(id)}</label>
{/if}
<div {id} class="field flex flex-row px-3">
  {#each Object.keys(suitList) as k}
    <div class="flex-grow text-center cursor-pointer {value.includes(k.slice(0,1)) ? 'text-green-300' : 'text-gray-600'}" on:click={() => {toggle(k)}}>
      {k}
    </div>
  {/each}
</div>
