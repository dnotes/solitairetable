<script lang="ts">
  import type Card from '$lib/Card'
  import type { StackInterface } from './Stack';
  import { game, draggedCards } from '$lib/data/stores'

  export let card:Card|undefined = undefined
  export let facedown = false
  export let stack:StackInterface|undefined = undefined
  export let cardIndex:number = 0

  $: cardDepth = stack?.getCardDepth(cardIndex)
  $: cards = cardDepth ? stack.look(cardDepth) : []
  $: draggable = !facedown && !$game.conf.multiSelect && cardDepth && !card.facedown && ($game.conf.selectBlockedStacks || !stack.isBlocked) && (!stack.conf.limitAvailable || cardDepth <= stack.conf.limitAvailable)

	function turn(node, {
		delay = 0,
		duration = 80
	}) {
		return {
			delay,
			duration,
			css: (t, u) => `
				transform: rotateY(${1 - (u * 180)}deg);
				opacity: ${1 - u};
        ${u ? 'position:absolute;' : 'position:static'}
			`
		};
  }

  // Set up card overlays
  let visibleCardNumber, direction, distance
  $: if (stack) {
    visibleCardNumber = Math.max(cardIndex - stack.firstVisible, 0)
    distance = visibleCardNumber * (stack.conf['horizontal'] ? 22 : 36)
    direction = stack.conf['horizontal'] ? 'left' : 'top'
  }

  let textColor, fileName, alt
  if (card) {
    textColor = ['hearts','diamonds'].includes(card.suitName) ? 'text-red-600' : 'text-black'
    fileName = card.isJoker ? '_joker' : `${card.rank}_${card.suitName}`
    alt = card.isJoker ? 'joker' : `${card.rank}${card.suit}`
  }



</script>

<div class:selected={$game.selection.filter(c => c?.id === card?.id).length} class="card container {textColor} rounded-xl absolute" style="{direction}:{distance}px"
  on:dragstart={(e) => {
    draggedCards.set({
      cards,
      cardDepth,
      fromStack: stack.index,
    });
    $game.clearSelected();
    $game.setSelected(cards,stack);
  }}
  on:dragend={(e) => {
    draggedCards.set({});
    $game.clearSelected();
    game.set($game)
  }}
  on:click >
<div class="cursor-pointer">
  {#if card}
    {#if facedown || card.facedown}
      <div transition:turn>
        <img draggable="false" class="w-full" src="/cards/_back.svg" alt="?" />
      </div>
    {:else}
      <div transition:turn>
        <img {draggable} class="w-full" src="/cards/{fileName}.svg" {alt}>
      </div>
    {/if}
  {:else}
    <div>
      <img draggable="false" class="w-full" src="/cards/_empty.svg" alt="-">
    </div>
  {/if}
  <div class="absolute w-full text-center top-2"><slot></slot></div>
</div>
</div>

<style lang="postcss">
  .selected {
    box-shadow: 0 0 2px 3px skyblue;
  }
  .jupiter {
    background-color: #e4d9ed;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='52' height='52' viewBox='0 0 52 52'%3E%3Cpath fill='%230b770b' fill-opacity='0.41' d='M0 17.83V0h17.83a3 3 0 0 1-5.66 2H5.9A5 5 0 0 1 2 5.9v6.27a3 3 0 0 1-2 5.66zm0 18.34a3 3 0 0 1 2 5.66v6.27A5 5 0 0 1 5.9 52h6.27a3 3 0 0 1 5.66 0H0V36.17zM36.17 52a3 3 0 0 1 5.66 0h6.27a5 5 0 0 1 3.9-3.9v-6.27a3 3 0 0 1 0-5.66V52H36.17zM0 31.93v-9.78a5 5 0 0 1 3.8.72l4.43-4.43a3 3 0 1 1 1.42 1.41L5.2 24.28a5 5 0 0 1 0 5.52l4.44 4.43a3 3 0 1 1-1.42 1.42L3.8 31.2a5 5 0 0 1-3.8.72zm52-14.1a3 3 0 0 1 0-5.66V5.9A5 5 0 0 1 48.1 2h-6.27a3 3 0 0 1-5.66-2H52v17.83zm0 14.1a4.97 4.97 0 0 1-1.72-.72l-4.43 4.44a3 3 0 1 1-1.41-1.42l4.43-4.43a5 5 0 0 1 0-5.52l-4.43-4.43a3 3 0 1 1 1.41-1.41l4.43 4.43c.53-.35 1.12-.6 1.72-.72v9.78zM22.15 0h9.78a5 5 0 0 1-.72 3.8l4.44 4.43a3 3 0 1 1-1.42 1.42L29.8 5.2a5 5 0 0 1-5.52 0l-4.43 4.44a3 3 0 1 1-1.41-1.42l4.43-4.43a5 5 0 0 1-.72-3.8zm0 52c.13-.6.37-1.19.72-1.72l-4.43-4.43a3 3 0 1 1 1.41-1.41l4.43 4.43a5 5 0 0 1 5.52 0l4.43-4.43a3 3 0 1 1 1.42 1.41l-4.44 4.43c.36.53.6 1.12.72 1.72h-9.78zm9.75-24a5 5 0 0 1-3.9 3.9v6.27a3 3 0 1 1-2 0V31.9a5 5 0 0 1-3.9-3.9h-6.27a3 3 0 1 1 0-2h6.27a5 5 0 0 1 3.9-3.9v-6.27a3 3 0 1 1 2 0v6.27a5 5 0 0 1 3.9 3.9h6.27a3 3 0 1 1 0 2H31.9z'%3E%3C/path%3E%3C/svg%3E");
  }
</style>