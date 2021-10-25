<script lang="ts">
import { StackConfig } from "$lib/Stack"
import Field from "$lib/form/Field.svelte";
import Ranks from "$lib/form/Ranks.svelte";
import Fieldset from "$lib/form/Fieldset.svelte";
import { MatchTest } from "$lib/Matchers"
import MatcherConfig from "$lib/MatcherConfig.svelte";

  export let id:string
  export let value:StackConfig = new StackConfig()

  let hideMatchers = []
  let hideComplete = []
  function hideAll(section?:string, except?:number) {
    hideMatchers = hideMatchers.map((s,i) => (section === 'match' && i === except) ? s : true)
    hideComplete = hideComplete.map((s,i) => (section === 'complete' && i === except) ? s : true)
  }
  function newMatch() {
    hideAll()
    value.match = [...value.match, new MatchTest(true)]
  }
  function newComplete() {
    hideAll()
    value.complete = [...value.complete, new MatchTest(true)]
  }
  function removeMatch(index) {
    value.match = value.match.filter((c,i) => i !== index)
    hideMatchers = hideMatchers.filter((v,i) => i !== index)
  }
  function removeComplete(index) {
    value.complete = value.complete.filter((c,i) => i !== index)
    hideComplete = hideComplete.filter((v,i) => i !== index)
  }

</script>

<Field id="{id}[name]" bind:value="{value.name}" />
<Ranks id="{id}[empty]" bind:value="{value.empty}" />

{#each Object.keys(value) as name}
  {#if !['name','empty','match','complete'].includes(name)}
    <Field id="{id}[{name}]" bind:value={value[name]} />
  {/if}
{/each}

<Fieldset name="Accepts Cards" title="">
  {#each value.match as matcher,i}
    <Fieldset
      name="_{i}"
      title="{matcher.description}"
      class="relative"
      bind:hidden={hideMatchers[i]}
      on:click={() => { hideAll('match', i) }}
    >
      <button class="absolute top-0 right-0" on:click={() => {removeMatch(i)}}>X</button>
      <MatcherConfig id="{id}[match][{i}]" bind:value={value.match[i]} />
    </Fieldset>
  {/each}
  <button
    on:click={newMatch}
    class="text-blue-400 px-4 py-2"
  >
    + New Test
  </button>
</Fieldset>


<Fieldset name="Complete When" title="">
  {#each value.complete as matcher,i}
    <Fieldset
      name="_{i}"
      title="{matcher.description}"
      class="relative"
      bind:hidden={hideComplete[i]}
      on:click={() => { hideAll('complete', i) }}
    >
      <button class="absolute top-0 right-0" on:click={() => {removeComplete(i)}}>X</button>
      <MatcherConfig id="{id}[complete][{i}]" bind:value={value.complete[i]} />
    </Fieldset>
  {/each}
  <button
    on:click={newComplete}
    class="text-blue-400 px-4 py-2"
  >
    + New Test
  </button>
</Fieldset>
