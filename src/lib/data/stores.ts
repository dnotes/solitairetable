import { writable, readable, derived } from "svelte/store";

export const game = writable()

export const maxCardWidth = writable(120)
export const edgeWidth = derived(maxCardWidth, $maxCardWidth => $maxCardWidth > 100 ? $maxCardWidth * .14 : $maxCardWidth * .24 )
export const edgeHeight = derived(maxCardWidth, $maxCardWidth => $maxCardWidth > 100 ? $maxCardWidth * .24 : $maxCardWidth * .40 )

export const draggedCards = writable({})
