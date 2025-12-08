

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.DNrHSTTX.js","_app/immutable/chunks/B14ALbOT.js","_app/immutable/chunks/qulqJhcf.js","_app/immutable/chunks/CnGfKXJO.js"];
export const stylesheets = [];
export const fonts = [];
