<script lang="ts">
import getLabel from './getLabel';
import { ranks } from '$lib/Stack'

  export let value = ranks
  export let id:string = ''

  let rankList = ranks.split('').reduce((obj,r) => {
    obj[r]=true
    return obj
  }, {})

  $: value = Object.entries(rankList).filter(([k,v]) => v).map(([k,v]) => k).join('')

  function toggle(r:string) {
    rankList[r] = !rankList[r]
  }

</script>

{#if id}
  <label class="pl-3" for="{id}">{getLabel(id)}</label>
{/if}
<div {id} class="field flex flex-row px-3">
  {#each ranks.split('') as r}
    <div
      class="flex-grow text-center cursor-pointer {value.includes(r) ? 'text-green-300' : 'text-gray-600'}"
      on:click={() => {toggle(r)}}
      on:dblclick={() => {
        Object.keys(rankList).forEach(k => {rankList[k] = !rankList[k]})
        rankList[r] = true
      }}
    >
      {r}
    </div>
  {/each}
</div>
