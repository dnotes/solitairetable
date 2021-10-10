<script lang="ts">
  const files = import.meta.globEager('/*.md')
  const links: { text:string, href:string, title?:string }[] = [
    { text: 'Home', href: '/' },
    ...Object.keys(files).map(f => {
      let href = f.replace(/\//g,'').replace(/\.md$/, '').replace(/^README/, 'About')
      let text = files[f].attributes?.title || href[0].toUpperCase() + href.slice(1)
      let title = files[f].attributes?.description || ''
      return { text, href, title }
    })
  ]

  let cls = ''
  export { cls as class }
</script>

{#each links as {href,text,title} }
  <a rel="prefetch" class="{cls} px-2" {href} {title}>{text}</a>
{/each}
