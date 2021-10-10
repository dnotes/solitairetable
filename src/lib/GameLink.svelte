<script lang="ts">
  export let config

  let cls = ''
  export {cls as class}
</script>

<a class="{cls}" href="/play?g={config.name}" alt="play {config.title} solitaire">{config.title}</a>
