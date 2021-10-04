import { writable } from "svelte/store";
import Game from '$lib/Game'

export const game = writable(new Game())

export const maxCardWidth = writable(120)

export const draggedCards = writable({})
export const stacksWant = writable([])
export const droppedStack = writable({})
