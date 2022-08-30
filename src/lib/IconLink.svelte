<script lang="ts">
// @ts-ignore
import { goto } from '$app/navigation';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { onMount } from 'svelte'
import Fa from 'svelte-fa'

  export let href="#"
  export let title=""
  export let rel=""

  export let icon:IconDefinition|undefined = undefined
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

  export let dropdownFrom: undefined
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
  = undefined
  let dropdownBorder = dropdownFrom ? 'border-t border-b-2 border-r border-l'.replace(`border-${dropdownFrom[0]}`, '').replace(' -2 ', '') : ''

  export let linear=false

  let open = false
  let menu:HTMLElement
  let link:HTMLAnchorElement

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

  function clickLink(e:any) {
    if (link.href !== '#') goto(link.href)
    else if ($$slots.menu) {
      e.stopPropagation()
      open = !open
    }
  }

</script>

<div class="relative inline-block {cls}" bind:this={menu}>

  <a
    bind:this={link}
    {href}
    {title}
    {rel}
    class="no-underline hover:no-underline {cls} {linear ? 'whitespace-nowrap' : ''}"
    on:click
    on:click|preventDefault={clickLink}
  >
    {#if icon}
      <span class="{linear ? 'inline-block px-1 align-middle' : ''}">
        <Fa class="{linear ? '' : 'mx-auto'}" {icon} {size} />
      </span>
    {/if}
    <span class="align-middle">
      <slot />
    </span>
  </a>
  {#if open}
    <div
      on:click={() => {open=false}}
      class="{dropdownFrom ? `absolute ${dropdownFrom}-full ${dropdownBorder}` : ''}"
    >
      <slot name="menu"></slot>
    </div>
  {/if}

</div>

<style lang="postcss">
  a { @apply inline-block px-2 py-1 leading-none }
</style>