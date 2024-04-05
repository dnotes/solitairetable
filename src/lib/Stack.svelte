<script lang="ts">
  import type { StackInterface } from "$lib/Stack"
  import { game, maxCardWidth, edgeHeight, edgeWidth, draggedCards, showGameOver } from '$lib/data/stores'
  import Card from '$lib/Card.svelte'
  import { Action, Activity } from '$lib/Game'
  import type CardInterface from '$lib/Card'
  import { faBan, faRotate } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa";

  export let stack:string|StackInterface|undefined

  let flex = '', extraHeight = 0, extraWidth = 0
  if (typeof stack === 'string') {
    if (stack === '-') flex = 'flex-shrink'
    if (stack === '_') flex = 'flex-grow'
  }
  else if (stack && !stack.isDeck) {
    if (stack.conf['horizontal']) extraWidth = stack.maxWidth * $edgeWidth
    else extraHeight = stack.maxHeight * $edgeHeight
  }

  $: stackWidth = $maxCardWidth + extraWidth
  $: stackHeight = ($maxCardWidth * 1.5) + extraHeight

  function clickCard(stack:string|StackInterface|undefined, card?:CardInterface) {
    if (!stack || typeof stack === 'string') return
    if (!card) { // Clicking on the deck
      if (stack.length || $game.canRecycle) $game?.deal()
      else {
        $game.endTime = new Date()
        $showGameOver = true
      }
    }
    else $game?.clickCard(card, stack)
    game.set($game)
  }

  // @ts-ignore
  $: wanted = (stack && typeof stack !== 'string' && $draggedCards?.cards && stack.wants($draggedCards.cards))

  let bigCards:boolean, hugeCards:boolean
  let buttonSize:'2x'|'lg' = '2x'
  $: bigCards = $maxCardWidth > 95
  $: hugeCards = $maxCardWidth > 150
  $: buttonSize = bigCards ? '2x' : 'lg'

  let positions:number[] = []
  $: if (stack && typeof stack !== 'string' && !stack.isDeck) positions = stack.stack.reduce(positionsReducer, [])

  function positionsReducer(agg:number[], card:CardInterface, cardIndex:number) {
    if (!stack || typeof stack === 'string') return [...agg, 0]
    if (cardIndex <= stack.firstVisible || cardIndex <= stack.stack.length - Math.max(stack.maxHeight, stack.maxWidth)) return [...agg, 0]
    let prev = agg[agg.length-1] ?? 0
    if (card?.facedown || stack.stack[cardIndex - 1]?.facedown) return [...agg, prev + 4]
    return [...agg, prev + (stack?.conf?.horizontal ? $edgeWidth : $edgeHeight)]
  }

</script>

{#if $game && typeof stack !== 'string'}
  <div
    class:pointer-events-auto={stack && (stack.length || stack.isDeck || stack.conf.showEmpty)}
    class:p-1={$maxCardWidth > 100}
    class="relative justify-center"
    style="height:{stackHeight}px; width:{stackWidth}px;"
    on:dragover="{(e) => {
      e.preventDefault()
    }}"
    on:drop="{(e) => {
      e.preventDefault();
      // @ts-ignore
      if (stack.wants($draggedCards.cards)) {
        // @ts-ignore
        $game.do(new Activity('move', new Action($draggedCards.cardDepth, $draggedCards.fromStack, stack.index)));
      }
    }}"
  >
    <div class="relative h-full" style="max-width:{$maxCardWidth}px;">
      <!-- THE DECK -->
      {#if stack}
        {#if stack.isDeck}
          {#each stack.stack as card, cardIndex (card.id)}
            <Card {card} stack={$game.deck} facedown {cardIndex} on:click={() => clickCard(stack)} />
          {:else}
            <Card on:click={() => clickCard(stack)}>
              <div class="flex flex-col items-center justify-center h-full" class:text-gray-600={!$game.canRecycle}>
                {#if $game.canRecycle}
                  <Fa icon={faRotate} size="2x" />
                  Cycle
                  {#if typeof $game.canRecycle === 'number'}
                    ({$game.canRecycle})
                  {/if}
                {:else}
                  <Fa icon={faBan} size="2x" />
                {/if}
              </div>
            </Card>
          {/each}
        <!-- OTHER STACKS -->
        {:else}
          <!-- CARDS -->
          {#each stack.stack as card, cardIndex (card.id)}
            <Card {card} {stack} {cardIndex}
              distance={positions[cardIndex]}
              direction={stack?.conf?.horizontal ? 'left' : 'top'}
              on:click={() => clickCard(stack, card)}
            >
            {#if wanted && cardIndex === stack.length - 1}
              <div class="absolute w-full top-0 bg-blue-500 opacity-40 rounded-xl -my-2" style="height:{$maxCardWidth * 1.5}px">&nbsp;</div>
            {/if}
            </Card>
          {:else}
            {#if $game.conf.showEmpty}
              <Card>
                {#if wanted}
                  <div class="absolute w-full top-0 bg-blue-300 opacity-40 rounded-xl -my-2" style="height:{$maxCardWidth * 1.5}px">&nbsp;</div>
                {/if}
              </Card>
            {/if}
          {/each}
        {/if}
      {/if}
    </div>
  </div>
  {:else}
  <div class="relative {flex} box-content" style="width:{stack === '-' ? $maxCardWidth / 2 : $maxCardWidth}px;">
    <slot></slot>
  </div>
{/if}
