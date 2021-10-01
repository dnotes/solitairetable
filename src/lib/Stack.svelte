<script lang="ts">
  import type { StackInterface } from "$lib/Stack";
  export let stack:string|StackInterface|undefined
  export let maxCardWidth

  let direction, distance, overlay, flex = ''
  if (typeof stack === 'string') {
    if (stack === '-') flex = 'flex-shrink'
    if (stack === '_') flex = 'flex-grow'
  }
  else if (stack && !stack.isDeck) {
    direction = stack.conf['horizontal'] ? 'right' : 'bottom'
    distance = stack.conf['horizontal'] ? stack.maxWidth * 22 : stack.maxHeight * 36
  }

</script>

{#if direction && distance}
  <div class="relative p-1 justify-center box-content" style="padding-{direction}:{distance}px; width:{maxCardWidth}px;">
    <slot></slot>
  </div>
{:else}
  <div class="relative p-1 {flex} justify-center box-content" style="width:{maxCardWidth}px;">
    <slot></slot>
  </div>
{/if}
