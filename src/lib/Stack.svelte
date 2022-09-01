<script lang="ts">
  import type { StackInterface } from "$lib/Stack"
  import { game, maxCardWidth, edgeHeight, edgeWidth, draggedCards } from '$lib/data/stores'
  import Card from '$lib/Card.svelte'
  import { Action, Activity } from '$lib/Game'
  import GameControls from "./GameControls.svelte"
  import type CardInterface from '$lib/Card'
import IconButton from "./IconButton.svelte";
import { faShareSquare, faSquare } from "@fortawesome/free-regular-svg-icons";
import { faAsterisk, faBackward } from "@fortawesome/free-solid-svg-icons";
import LinkCopied from "./LinkCopied.svelte"

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
    if (!card) $game?.deal()
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
        console.log('dropped!');
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
              {#if $game.canRecycle}
                <div class:text-gray-600={!$game.canRecycle}>Cycle
                  {#if typeof $game.canRecycle === 'number'}
                    ({$game.canRecycle})
                  {/if}
                </div>
              {:else}
                <div class="flex flex-col justify-center items-center">
                  {#if bigCards}
                    <IconButton icon={faShareSquare} dropdownFrom="top" href="{$game.href}" class="no-link {hugeCards ? 'text-lg' : 'text-xs'} {bigCards ? '' : 'py-0'}" on:click={(e)=>{
                      e.preventDefault()
                      navigator.clipboard.writeText(new URL($game.href, window.location.href).toString())
                    }}>
                      Share
                      <span slot="menu"><LinkCopied/></span>
                    </IconButton>
                    <IconButton icon={faSquare} overlay={faBackward} class="{hugeCards ? 'text-lg' : 'text-xs'} {bigCards ? '' : 'py-0'}" on:click={() => { $game.reset(); game.set($game); }}>
                      Restart
                    </IconButton>
                  {/if}
                  <IconButton icon={faSquare} overlay={faAsterisk} class="{hugeCards ? 'text-lg' : 'text-xs'} {bigCards ? '' : 'py-0'}" on:click={() => { $game.new(); game.set($game); }}>
                    {#if bigCards}New{/if}
                  </IconButton>
                </div>
              {/if}
            </Card>
          {/each}
        <!-- OTHER STACKS -->
        {:else}
          <!-- CARDS -->
          {#each stack.stack as card, cardIndex (card.id)}
            <Card {card} {stack} {cardIndex}
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
