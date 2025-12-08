import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.COUFsvRh.js","_app/immutable/chunks/qaikPjnM.js","_app/immutable/chunks/B1xJhF-t.js","_app/immutable/chunks/qulqJhcf.js","_app/immutable/chunks/CnGfKXJO.js","_app/immutable/chunks/DSZGftEx.js","_app/immutable/chunks/B14ALbOT.js","_app/immutable/chunks/CN-PP5RH.js","_app/immutable/chunks/DeeP4COE.js"];
export const stylesheets = ["_app/immutable/assets/2.BaPDchzG.css"];
export const fonts = [];
