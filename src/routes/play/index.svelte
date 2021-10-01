<script context="module" lang="ts">
  // import Deck from '$lib/Deck'
  // import Game from '$lib/Game'

  // export async function load({ page }) {

  //   let config = page.query.get('g')
  //   if (!config) {
  //     page.query.set('g', 'klondike-vegas')
  //     return { status: 302, redirect: `/play?${page.query}` }
  //   }

  //   let deck = page.query.get('d') || false
  //   if (deck) {
  //     try {
  //       deck = new Deck(deck)
  //     }
  //     catch(e) { console.error(e) }
  //   }

  //   let game
  //   try {
  //     game = new Game(config, deck || undefined)
  //   }
  //   catch(e) { return { status: 404, error: e } }

  //   return { props: { game } }

  // }
</script>

<script lang="ts">

import { page } from '$app/stores'
import Game from '$lib/Game'
import Pile from '$lib/Stack.svelte'
import Card from '$lib/Card.svelte'
import type CardInterface from '$lib/Card'
import type { StackInterface } from '$lib/Stack';
import Stack from '$lib/Stack.svelte'

  let config = $page.query.get('g')
  if (!config) config = 'klondike-vegas'

  let deck = $page.query.get('d') || undefined

  let game = new Game(config, deck)

  let w=0,h=0

  $: maxCardWidth = (w / game.longestRow) - 20
  $: rowHeight = maxCardWidth * 1.5

  function clickCard(stack:StackInterface, card?:CardInterface) {
    if (!card) game.deal()
    else game.clickCard(card, stack)
    game = game
  }

</script>

<div id="game" class="flex flex-col text-white" bind:clientWidth={w} bind:clientHeight={h}>
  <div id="actions" class="flex-shrink">
    <button on:click={() => {game.doUndo();game=game}}>Undo</button>
    <button on:click={() => {game.doRedo();game=game}}>Redo</button>
    <button on:click={() => {game = new Game(config)}}>New</button>
  </div>
  <!-- ROWS -->
  {#each game.layout as row}
  <div class="flex flex-row w-full relative p-4" style="height:{game.conf.overlayRows ? maxCardWidth * .7 : rowHeight + row.padBottom}px;">
    <!-- PILES -->
    {#each row.stacks as stack}
    <Pile {stack} {maxCardWidth}>
      <div class="relative h-full" style="max-width:{maxCardWidth}px;">
        <!-- THE DECK -->
        {#if stack}
          {#if stack.isDeck}
            {#each game.deck.stack as card, cardIndex}
              <Card {card} stack={game.deck} facedown {cardIndex} on:click={() => clickCard(stack)} />
            {:else}
              <Card on:click={() => clickCard(stack)}>
                <div class:text-gray-600={!game.canRecycle}>Cycle
                  {#if typeof game.canRecycle === 'number'}
                    ({game.canRecycle})
                  {/if}
                </div>
                {#if !game.canRecycle}
                  <div><button on:click={() => {game = new Game(config)}}>New</button></div>
                {/if}
              </Card>
            {/each}
          <!-- OTHER STACKS -->
          {:else if typeof stack !== 'string'}
            <!-- CARDS -->
            {#each game.stacks[stack.index].stack as card, cardIndex}
            <Card {card} stack={game.stacks[stack.index]} {cardIndex} on:click={() => clickCard(stack, card)} />
            {:else}
              {#if game.conf.showEmpty}
              <Card />
              {/if}
            {/each}
          {/if}
        {/if}
      </div>
    </Pile>
    {/each}
  </div>
  {/each}
</div>
