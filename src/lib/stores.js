import { writable } from 'svelte/store';

export const csvData = writable(null)
export const started = writable(false);
export const sound = writable(true)
