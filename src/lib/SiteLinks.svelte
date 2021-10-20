<script lang="ts">
  import IconLink from '$lib/IconLink.svelte'
  import * as icons from '@fortawesome/free-solid-svg-icons'
  const files = import.meta.globEager('/*.md')
  const links: { text:string, href:string, title?:string, icon?:any }[] = [
    { text: 'Home', href: '/', icon: "faHome" },
    ...Object.keys(files).map(f => {
      let href = f.replace(/\//g,'').replace(/\.md$/, '').replace(/^README/, 'About')
      let text = files[f].attributes?.title || href[0].toUpperCase() + href.slice(1)
      let title = files[f].attributes?.description || ''
      let icon = files[f].attributes?.icon || ''
      return { text, href, title, icon }
    })
  ].map(l => {
    l.icon = l.icon ? icons[`${l.icon}`] || undefined : undefined
    return l
  })

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
</script>

{#each links as {href,text,title,icon} }
  <IconLink rel="prefetch" class={cls} {href} {title} {icon} {linear} {size}>
    {text}
  </IconLink>
{/each}
