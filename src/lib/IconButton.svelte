<script lang="ts">
import { onMount } from 'svelte'
import Fa from 'svelte-fa'

  export let icon = undefined
  export let size:
    | 'xs'
    | 'sm'
    | 'lg'
    | '1x'
    | '2x'
    | '3x'
    | '4x'
    | '5x'
    | '6x'
    | '7x'
    | '8x'
    | '9x'
    | '10x'
  ="2x"

  export let dropdownFrom:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
  =undefined
  let dropdownBorder = dropdownFrom ? 'border-t border-b-2 border-r border-l'.replace(`border-${dropdownFrom[0]}`, '').replace(' -2 ', '') : ''

  export let linear=false

  let open = false
  let menu
  let btn

  let cls = ''
  export { cls as class }

  onMount(() => {
    const handleOutsideClick = (event) => {
      if (open && !menu.contains(event.target)) {
        open = false;
      }
    };

    const handleEscape = (event) => {
      if (open && event.key === 'Escape') {
        open = false;
      }
    };

    // add events when element is added to the DOM
    document.addEventListener('click', handleOutsideClick, false);
    document.addEventListener('keyup', handleEscape, false);

    // remove events when element is removed from the DOM
    return () => {
      document.removeEventListener('click', handleOutsideClick, false);
      document.removeEventListener('keyup', handleEscape, false);
    };
  });

  function btnClick(e) {
    if ($$slots.menu) {
      e.stopPropagation()
      open = !open
    }
  }

</script>

<div class="relative inline-block {cls}" bind:this={menu}>

  <button
    bind:this={btn}
    on:click
    on:click={btnClick}
    class="{cls} {linear ? 'whitespace-nowrap' : ''}"
  >
    {#if icon}
      <span class="{linear ? 'inline-block px-1 align-middle' : ''}">
        <Fa class="{linear ? '' : 'mx-auto'}" {icon} {size} />
      </span>
    {/if}
    <span class="align-middle">
      <slot />
    </span>
  </button>
  {#if open}
    <div
      on:click={(e) => {open=false}}
      class="{dropdownFrom ? `absolute ${dropdownFrom}-full ${dropdownBorder}` : ''} {cls}"
    >
      <slot name="menu"></slot>
    </div>
  {/if}

</div>

<style lang="postcss">
  button { @apply px-2 py-1 text-center leading-none caps-small }
</style>