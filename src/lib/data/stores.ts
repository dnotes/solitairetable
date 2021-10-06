import { writable, readable, derived } from "svelte/store";
import Game from '$lib/Game'

export const game = writable(new Game())

export const maxCardWidth = writable(120)
export const edgeWidth = derived(maxCardWidth, $maxCardWidth => $maxCardWidth * .14 )
export const edgeHeight = derived(maxCardWidth, $maxCardWidth => $maxCardWidth * .24 )

export const draggedCards = writable({})
