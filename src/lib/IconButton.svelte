<script lang="ts">
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

import { onMount } from 'svelte'
import Fa from 'svelte-fa'

  export let icon:IconDefinition|undefined = undefined
  export let size: 'xs'|'sm'|'lg'|'1x'|'2x'|'3x'|'4x'|'5x'|'6x'|'7x'|'8x'|'9x'|'10x'='2x'

  export let dropdownFrom: undefined
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
  =undefined
  let dropdownBorder = dropdownFrom ? 'border-t border-b-2 border-r border-l'.replace(`border-${dropdownFrom[0]}`, '').replace(' -2 ', '') : ''

  export let linear=false

  export let overlay:IconDefinition|undefined = undefined


  let open = false
  let menu:HTMLElement
  let btn:HTMLButtonElement

  let cls = ''
  export { cls as class }

  const sizes = ['xs','sm','lg','1x','2x','3x','4x','5x','6x','7x','8x','9x','10x']
  let overlaySize:'xs'|'sm'|'lg'|'1x'|'2x'|'3x'|'4x'|'5x'|'6x'|'7x'|'8x'|'9x'|'10x'
  // @ts-ignore
  $: overlaySize = size.match(/[gx]$/) ? sizes[Math.round(sizes.indexOf(size)/2.8)] : undefined

  onMount(() => {
    const handleOutsideClick = (e:any) => {
      if (open && !menu.contains(e.target)) {
        open = false;
      }
    };

    const handleEscape = (e:any) => {
      if (open && e.key === 'Escape') {
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

  function btnClick(e:any) {
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
    class="px-2 py-1 text-center leading-none {cls} {linear ? 'whitespace-nowrap' : ''}"
  >
    {#if icon}
      <span class="relative {linear ? 'inline-block px-1 align-middle' : 'block'}">
        <Fa class="{linear ? '' : 'mx-auto'}" {icon} {size} />
        {#if overlay && sizes.includes(overlaySize)}
          <Fa class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" icon={overlay} size="{overlaySize}" />
        {/if}
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
