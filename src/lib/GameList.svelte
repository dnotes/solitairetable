<script lang="ts">
  import games from '$lib/data/games'
  let items = Object.values(games).filter(g => g.family === g.name)
</script>

<div class="flex flex-col gap-3">
  {#each items as item}
    <div class="flex flex-row">
      <div class="flex-grow-0">
        <img src="/img/tn/{item.name}.png" alt="A single deal of {item.title}.">
      </div>
      <div class="w-48 pl-3 flex-grow flex-shrink-0">
        <h3 class="m-0"><a href="/play/{item.name}">{item.title}</a></h3>
        <ul class="m-0">
          {#each (item?.variants || []) as variant}
            <li><a href="/play/{variant.name}">{variant.title}</a></li>
          {/each}
        </ul>
      </div>
    </div>
  {/each}
</div>