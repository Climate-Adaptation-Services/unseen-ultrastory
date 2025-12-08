import * as server from '../entries/pages/_page.server.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/+page.server.js";
export const imports = ["_app/immutable/nodes/2.EkNojuaM.js","_app/immutable/chunks/2.B_KdDsmP.js","_app/immutable/chunks/preload-helper.C1FmrZbK.js","_app/immutable/chunks/scheduler.DUP1aq8b.js","_app/immutable/chunks/index.BXdpqZcg.js","_app/immutable/chunks/index.DIVT5ioR.js"];
export const stylesheets = ["_app/immutable/assets/2.DoIwwoUO.css"];
export const fonts = [];
