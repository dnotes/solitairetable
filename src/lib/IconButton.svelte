<script lang="ts">
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
  import type { DropdownDirection } from 'src/global';

import { onMount } from 'svelte'
import Fa from 'svelte-fa'

  // Icon definition from fontawesome
  export let icon:IconDefinition|undefined = undefined

  // Size from svelte-fa
  export let size: 'xs'|'sm'|'lg'|'1x'|'2x'|'3x'|'4x'|'5x'|'6x'|'7x'|'8x'|'9x'|'10x'='2x'

  // Whether this will be a menu
  export let dropdownFrom:undefined|DropdownDirection = undefined
  $: noBorderDirection = dropdownFrom ? dropdownFrom[(dropdownFrom?.indexOf(' ') + 1)] : ''
  $: dropdownBorder = dropdownFrom ? 'border-t border-b-2 border-r border-l'.replace(`border-${noBorderDirection}`, '').replace(' -2 ', '') : ''

  // Whether the button text should be linear (default: stacked)
  export let linear=false

  // Whether the button should be disabled
  export let disabled=false

  // Text elements for building links
  export let href=""
  export let title=""
  export let rel=""

  // Whether there is a second icon overlayed over the main one
  export let overlay:IconDefinition|undefined = undefined
  const sizes = ['xs','sm','lg','1x','2x','3x','4x','5x','6x','7x','8x','9x','10x']
  let overlaySize:'xs'|'sm'|'lg'|'1x'|'2x'|'3x'|'4x'|'5x'|'6x'|'7x'|'8x'|'9x'|'10x'
  // @ts-ignore Get the overlayed icon's size automatically
  $: overlaySize = size.match(/[gx]$/) ? sizes[Math.round(sizes.indexOf(size)/2.8)] : undefined

  let open = false
  let menu:HTMLElement
  let btn:HTMLButtonElement|HTMLAnchorElement

  let cls = ''
  export { cls as class }

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
      e.preventDefault()
      e.stopPropagation()
      open = !open
    }
  }

</script>

<div class="relative inline-block max-h-full h-full {cls}" bind:this={menu}>

  <svelte:element
    this={href ? 'a' : 'button'}
    type="button"
    {href}
    {title}
    {rel}
    {disabled}
    class:opacity-40={disabled}
    bind:this={btn}
    on:click
    on:click={btnClick}
    class="px-2 py-1 text-center leading-none h-full flex flex-{linear ? 'row' : 'col'} items-center justify-center {cls} {linear ? 'whitespace-nowrap' : ''}"
  >
    {#if icon}
      <span class="relative px-1 mb-1 inline-block {cls}">
        <Fa {icon} {size} />
        {#if overlay && sizes.includes(overlaySize)}
          <Fa class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" icon={overlay} size="{overlaySize}" />
        {/if}
      </span>
    {/if}
    <span class="align-middle">
      <slot />
    </span>
  </svelte:element>
  {#if open}
    <div
      on:click={(e) => {open=false}}
      class="{dropdownFrom ? `absolute ${dropdownFrom}-full ${dropdownBorder} ${dropdownFrom.match(/(right|left)/) && 'top-0'}` : ''} {cls}"
    >
      <slot name="menu"></slot>
    </div>
  {/if}

</div>
