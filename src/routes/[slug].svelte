<script context="module" lang="ts">
  export async function load({ page, fetch }) {
    let allContent = import.meta.globEager('/*.md')
    let slug = '/' + page.params.slug.toLowerCase().replace(/^about$/, 'README') + '.md'
    if (allContent.hasOwnProperty(slug)) {
      return { props: allContent[slug] }
    }
  }
</script>

<script lang="ts">
  export let attributes:{[k:string]:any} = {}
  export let html = ''
</script>

<svelte:head>
  <title>{`${attributes?.title} : Solitaire Builder`}</title>
</svelte:head>

{@html html}
