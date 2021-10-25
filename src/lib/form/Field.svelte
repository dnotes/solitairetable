<script lang="ts">
import getLabel from './getLabel'
  let k
  let v
  let cls = ''
  export { k as id, v as value, cls as class }
  export let label = ''
  export let min = 0
  export let max = 9
  export let select:string[] = undefined
</script>

<div class="field {cls}">
  {#if select}
    <label for="{k}">{label || getLabel(k)}</label>
    <slot/>
    <select id="{k}" bind:value={v}>
      {#each select as key,value}
        <option {value}>{key}</option>
      {/each}
    </select>
  {:else if typeof v === 'boolean'}
    <label for="{k}">{label || getLabel(k)}</label>
    <slot/>
    <input type="checkbox" id="{k}" bind:checked={v} />
  {:else if typeof v === 'string'}
    <label for="{k}">{label || getLabel(k)}</label>
    <slot/>
    <input type="text" id="{k}" bind:value={v} />
  {:else if typeof v === 'number'}
    <label for="{k}">{label || getLabel(k)}</label>
    <slot/>
    <input
      type="number"
      class="w-14 text-center"
      id="{k}"
      {min}
      max="{max ? max : 99999}"
      bind:value={v}
    />
  {/if}
</div>

<style lang="postcss">
  .field {
    @apply m-2 flex;
  }
  label {
    @apply text-white flex-grow mx-1 align-middle;
  }
  input,select,option {
    @apply align-middle flex-shrink min-w-0 mx-1 text-black;
  }
</style>
