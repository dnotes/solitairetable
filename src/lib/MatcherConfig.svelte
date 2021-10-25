<script lang="ts">
import { ColorMatch, RankMatch, StackMatch, MatchTest } from "./Matchers"
import Field from "$lib/form/Field.svelte"

  export let value:MatchTest = new MatchTest(true)
  export let id:string

  function getEnumValues<T extends string>(enumType: {}): T[] {
    const values: T[] = [];
    const keys = Object.keys(enumType);
    for (const key of keys.slice(0, keys.length / 2)) {
      values.push(enumType[key]);
    }
    return values;
  }
</script>

<Field id="{id}[matchSuit]" bind:value={value.conf.suit} />
<Field id="{id}[hasJoker]" bind:value={value.conf.hasJoker} />
<Field id="{id}[useFreecells]" bind:value={value.conf.useFreecells} />
<Field id="{id}[fromStack]" select={getEnumValues(StackMatch)} bind:value={value.conf.fromStack} />
<Field id="{id}[color]" select={getEnumValues(ColorMatch)} bind:value={value.conf.color} />
<Field id="{id}[rank]" select={getEnumValues(RankMatch)} bind:value={value.conf.rank} />
<Field id="{id}[count]" max={0} bind:value={value.conf.count}>
  {#if value.conf.count}
    <span
      class="circle"
      class:border-2="{value.conf.countLT}"
      on:click="{() => {
        value.conf.countGT = false;
        value.conf.countLT = !value.conf.countLT;
      }}"
    >＜</span>
    <span
      class="circle"
      class:border-2="{value.conf.countGT}"
      on:click="{() => {
        value.conf.countLT = false;
        value.conf.countGT = !value.conf.countGT;
      }}"
    >＞</span>
  {/if}
</Field>
<Field id="{id}[total]" max={0} bind:value={value.conf.total}>
  {#if value.conf.total}
    <span
      class="circle"
      class:border-2="{value.conf.totalLT}"
      on:click="{() => {
        value.conf.totalGT = false;
        value.conf.totalLT = !value.conf.totalLT;
      }}"
    >＜</span>
    <span
      class="circle"
      class:border-2="{value.conf.totalGT}"
      on:click="{() => {
        value.conf.totalLT = false;
        value.conf.totalGT = !value.conf.totalGT;
      }}"
    >＞</span>
  {/if}
</Field>

<style lang="postcss">
  .circle {
    @apply rounded-full border-green-500 px-1 cursor-pointer align-middle box-content;
  }
</style>