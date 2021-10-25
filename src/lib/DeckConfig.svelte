<script lang="ts">
import { DeckConfig } from "$lib/Deck"
import Field from "$lib/form/Field.svelte"
import Ranks from "$lib/form/Ranks.svelte"
import Suits from "$lib/form/Suits.svelte"

  export let value:DeckConfig = new DeckConfig()

</script>

<Ranks bind:value={value.ranks} />
<Suits bind:value={value.suits} />
<Field id="deck[jokers]" bind:value={value.jokers} />
<Field id="deck[decks]" bind:value={value.decks} min={1} max={8} />
