

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.BQ6kMB9y.js","_app/immutable/chunks/scheduler.DUP1aq8b.js","_app/immutable/chunks/index.BXdpqZcg.js"];
export const stylesheets = [];
export const fonts = [];
