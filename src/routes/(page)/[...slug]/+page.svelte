<script lang="ts">
  import type { PageData } from './$types'

  export let data:PageData

</script>

<svelte:head>
  <title>{`${data?.content?.attributes?.title} | Solitaire Table`}</title>
</svelte:head>

{@html data?.content?.html}
