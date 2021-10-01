import { writable } from "svelte/store";
import Game from '$lib/Game'

export const game = writable(new Game())

export const maxCardWidth = writable(120)
