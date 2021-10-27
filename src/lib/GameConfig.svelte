<script lang="ts">
import { game } from '$lib/data/stores'
import Game, { GameConfig } from '$lib/Game'
import { StackConfig as StackConf } from "$lib/Stack"
import { onMount } from 'svelte'
import Field from "$lib/form/Field.svelte";
import Fieldset from "$lib/form/Fieldset.svelte";
import DeckConfig from '$lib/DeckConfig.svelte';
import StackConfig from '$lib/StackConfig.svelte';

  export let value:GameConfig = new GameConfig()

  onMount(() => {
    if ( $game?.conf ) value = $game.conf
    else {
      value = new GameConfig()
      game.set(new Game(value))
    }
    hideStacks = $game.conf.stackConfig.map(item => true)
    hideAllSections(0)
  })

  let hideStacks = []
  function hideAllStacks(except?:number) {
    hideStacks = hideStacks.map((s,i) => i === except ? s : true)
  }
  function newStack() {
    hideAllStacks()
    value.stackConfig = [...value.stackConfig, new StackConf()]
  }
  function removeStack(index) {
    value.stackConfig = value.stackConfig.filter((c,i) => i !== index)
    hideStacks = hideStacks.filter((v,i) => i !== index)
  }

  let hideSections = []
  function hideAllSections(except?:number) {
    hideSections = hideSections.map((s,i) => i === except ? s : true)
  }

</script>


<Fieldset name="Game" title="{$game.title}" bind:hidden="{hideSections[0]}">
  <Field id={'title'} bind:value={value.title} />
  <Field id={'family'} bind:value={value.family} />
  <Field id={'name'} bind:value={value.name} />
  {#each Object.entries(value) as [id,v]}
    {#if !['name','family','variants','deckConfig','stackConfig'].includes(id)}
      <Field {id} bind:value={value[id]} />
    {/if}
  {/each}
</Fieldset>

<Fieldset name="Deck" title="{value.deckConfig.description}" bind:hidden={hideSections[1]}>
  <DeckConfig bind:value={value.deckConfig} />
</Fieldset>

<Fieldset name="Stack Types" title="({value.stackConfig.length})" bind:hidden={hideSections[2]}>
  {#each value.stackConfig as conf,index}
    <Fieldset
      name="S{index}"
      title="{conf.description}"
      class="relative"
      bind:hidden={hideStacks[index]}
      on:click={() => { hideAllStacks(index) }}
    >
      <button class="absolute top-0 right-0" on:click={() => {removeStack(index)}}>X</button>
      <StackConfig id="stack[{index}]" bind:value={value.stackConfig[index]} />
    </Fieldset>
  {/each}
  <button
    on:click={newStack}
    class="text-blue-400 px-4 py-2"
  >
    + New Stack
  </button>
</Fieldset>
