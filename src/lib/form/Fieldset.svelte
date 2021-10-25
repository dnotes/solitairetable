<script lang="ts">
  export let name
  export let title
  export let hidden = false
  export let hideable = true
  let cls = ''
  export { cls as class }
</script>

<fieldset id="{name}" class="{cls}">
  <label class="cursor-pointer" for="{name}" on:click on:click="{() => {hidden = hideable && !hidden}}">
    {#if hideable}
      {hidden ? '▸ ' : '▾ '}
    {/if}
    {name}: {title}
  </label>
  <div class:hidden>
    <slot></slot>
  </div>
</fieldset>

<style lang="postcss">
  fieldset {
    @apply text-white pl-3 min-w-0 max-w-full
  }
</style>