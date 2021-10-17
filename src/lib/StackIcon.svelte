<script lang="ts">
  import type { StackInterface } from "$lib/Stack"
  import Card from "./CardIcon.svelte"

  export let stack:string|StackInterface|undefined
  export let maxCardWidth:number

  let direction, distance, flex = ''

  if (typeof stack === 'string') {
    if (stack === '-') flex = 'flex-shrink'
    if (stack === '_') flex = 'flex-grow'
  }
  else if (stack && !stack.isDeck) {
    direction = stack.conf['horizontal'] ? 'right' : 'bottom'
    distance = stack.conf['horizontal'] ? stack.maxWidth * 2 : stack.maxHeight * 4
  }

</script>

{#if typeof stack !== 'string'}
  <div
    class="relative justify-center box-content"
    style="padding:1px; padding-{direction}:{distance}px; width:{maxCardWidth}px;"
  >
    <div class="relative h-full" style="max-width:{maxCardWidth}px;">
      <!-- THE DECK -->
      {#if stack}
        {#if stack.isDeck}
          <Card facedown={true} />
        <!-- OTHER STACKS -->
        {:else if typeof stack !== 'string'}
          <!-- CARDS -->
          {#each stack.stack as card, cardIndex}
            <Card {card} {stack} {cardIndex} />
          {:else}
            <Card />
          {/each}
        {/if}
      {/if}
    </div>
  </div>
{:else}
  <div class="relative {flex} justify-center box-content" style="width:{stack === '-' ? maxCardWidth / 2 :maxCardWidth}px;">
    <slot></slot>
  </div>
{/if}
