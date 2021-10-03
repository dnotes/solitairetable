<script lang="ts">
  import type { StackInterface } from "$lib/Stack"
  import { game, maxCardWidth } from '$lib/data/stores'
  import Card from '$lib/Card.svelte'
  import Game from '$lib/Game'
  import type CardInterface from '$lib/Card'

  export let stack:string|StackInterface|undefined

  let direction, distance, overlay, flex = ''
  if (typeof stack === 'string') {
    if (stack === '-') flex = 'flex-shrink'
    if (stack === '_') flex = 'flex-grow'
  }
  else if (stack && !stack.isDeck) {
    direction = stack.conf['horizontal'] ? 'right' : 'bottom'
    distance = stack.conf['horizontal'] ? stack.maxWidth * 22 : stack.maxHeight * 36
  }

  function clickCard(stack:string|StackInterface, card?:CardInterface) {
    if (typeof stack === 'string') return
    if (!card) $game.deal()
    else $game.clickCard(card, stack)
    game.set($game)
  }

</script>

{#if typeof stack !== 'string'}
  <div class:pointer-events-auto={stack && (stack.length || stack.isDeck || stack.conf.showEmpty)} class="relative p-1 justify-center box-content" style="padding-{direction}:{distance}px; width:{$maxCardWidth}px;">
    <div class="relative h-full" style="max-width:{$maxCardWidth}px;">
      <!-- THE DECK -->
      {#if stack}
        {#if stack.isDeck}
          {#each stack.stack as card, cardIndex (card.char)}
            <Card {card} stack={$game.deck} facedown {cardIndex} on:click={() => clickCard(stack)} />
          {:else}
            <Card on:click={() => clickCard(stack)}>
              <div class:text-gray-600={!$game.canRecycle}>Cycle
                {#if typeof $game.canRecycle === 'number'}
                  ({$game.canRecycle})
                {/if}
              </div>
              {#if !$game.canRecycle}
                <div><button on:click={() => {$game = new Game(Object.assign({}, $game.conf, $game.deck.conf))}}>New</button></div>
              {/if}
            </Card>
          {/each}
        <!-- OTHER STACKS -->
        {:else}
          <!-- CARDS -->
          {#each stack.stack as card, cardIndex (card.char)}
            <Card {card} stack={$game.stacks[stack.index]} {cardIndex} on:click={() => clickCard(stack, card)} />
          {:else}
            {#if $game.conf.showEmpty}
              <Card />
            {/if}
          {/each}
        {/if}
      {/if}
    </div>
  </div>
{:else}
  <div class="relative p-1 {flex} box-content" style="width:{stack === '-' ? $maxCardWidth / 2 : $maxCardWidth}px;">
    <slot></slot>
  </div>
{/if}
