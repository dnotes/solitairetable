<script lang="ts">

import IconButton from '$lib/IconButton.svelte'
import { faHome, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

  // Whether links should be linear
  export let linear = true
  // Icon size from svelte-fa
  export let size: 'xs'|'sm'|'lg'|'1x'|'2x'|'3x'|'4x'|'5x'|'6x'|'7x'|'8x'|'9x'|'10x'='2x'

  let cls = ''
  export { cls as class }

  const links: { text:string, href:string, title?:string, icon?:any }[] = [
    { text: 'Home', href: '/', icon: faHome },
    { text: 'About', href: '/about', icon: faInfoCircle }
  ]
</script>

{#each links as {href,text,title,icon} }
  <IconButton rel="prefetch" class="no-link {cls}" {href} {title} {icon} {linear} {size}>
    {text}
  </IconButton>
{/each}
