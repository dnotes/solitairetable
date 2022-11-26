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
        <h3 class="m-0"><a href="/play/{item.name}">{item.title}</a>
          {#if item?.variants?.find(v => v.name === `${item.name}-thoughtful`)}
            <span>
              <a href="/play/{item.name}-thoughtful" class="w-12 rounded-full text-xs bg-blue-100 py-px px-1">thoughtful</a>
            </span>
          {/if}
        </h3>
        <ul class="m-0">
          {#each (item?.variants || []) as variant}
            {#if !variant.name.match(/-thoughtful$/)}
              <li>
                <a href="/play/{variant.name}">{variant.title}</a>
                {#if item?.variants?.find(v => v.name === `${variant.name}-thoughtful`)}
                  <span>
                    <a class="w-12 rounded-full text-xs bg-blue-100 py-px px-1" href="/play/{variant.name}-thoughtful">thoughtful</a>
                  </span>
                {/if}
              </li>
            {/if}
          {/each}
        </ul>
      </div>
    </div>
  {/each}
</div>