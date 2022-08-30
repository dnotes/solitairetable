<script lang="ts">

import IconLink from '$lib/IconLink.svelte'
import { faHome, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

  export let linear = false
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

  let cls = ''
  export { cls as class }

  const links: { text:string, href:string, title?:string, icon?:any }[] = [
    { text: 'Home', href: '/', icon: faHome },
    { text: 'About', href: 'about', icon: faInfoCircle }
  ]
</script>

{#each links as {href,text,title,icon} }
  <IconLink rel="prefetch" class={cls} {href} {title} {icon} {linear} {size}>
    {text}
  </IconLink>
{/each}
