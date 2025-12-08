export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","Belanosima-Regular.ttf","Chunk.ttf","PosterEGU.pdf","digital.ttf","favicon.png","global.css","images/.DS_Store","images/arrowdown.png","images/bank1.png","images/boer.png","images/boer1.png","images/cloud.png","images/dommelplantsoen.png","images/dwerg.png","images/festival.jpg","images/file.png","images/gasten.png","images/gesprek.png","images/hardloper1.png","images/headphones.png","images/heatwave.jpg","images/heatwave1.png","images/holdingphone.png","images/kerk.png","images/leonieradeloos.png","images/logokleur.png","images/manonwel.png","images/mute.png","images/nielsboom.png","images/nielsgaatwandelen.png","images/nielstel.png","images/oud/bank.png","images/oud/dommelplantsoen.jpg","images/oud/drinken.png","images/oud/dronkenmans.jpg","images/oud/evacuatie.png","images/oud/evacuatie1.png","images/oud/gesprek.jpg","images/oud/hardloper.png","images/oud/hardloperoud.png","images/oud/heatwave.png","images/oud/hitteproblemen.png","images/oud/holdingphone-old.png","images/oud/inbed.jpg","images/oud/inbed.png","images/oud/koelkerk.jpg","images/oud/logowit.png","images/oud/luchtweg.jpg","images/oud/nielsgaatwandelen.jpg","images/oud/ouderewater.jpg","images/oud/politie.jpg","images/oud/ritje.jpg","images/oud/rustigplekje.jpg","images/oud/schaduwdoek.jpg","images/oud/sem.jpg","images/oud/sem.png","images/oud/seminbed.png","images/oud/semslaapt.jpg","images/oud/smeltend-asfalt.jpg","images/oud/verneveling.jpg","images/oud/ziekenhuischaos.jpg","images/oud/ziekenhuischaos.png","images/oud/zonnesteek.jpg","images/oudevrouwziekenhuis.png","images/politie.png","images/pomp.png","images/seminbed1.png","images/tempmeter.png","images/volume.png","images/weeralarm.jpg","images/ziekenhuischaos2.png","images/zwembad.png","sounds/.DS_Store","sounds/cardriving.mp3","sounds/carstart.mp3","sounds/crowd.mp3","sounds/drunk.mp3","sounds/fan.mp3","sounds/gettingoutcar.mp4","sounds/heat.mp3","sounds/night.mp3","sounds/politie.mp3","sounds/trafficjam.mp3","sounds/voetstappen.mp3","sounds/ziekenhuis.mp3","steelfish.otf"]),
	mimeTypes: {".ttf":"font/ttf",".pdf":"application/pdf",".png":"image/png",".css":"text/css",".jpg":"image/jpeg",".mp3":"audio/mpeg",".mp4":"video/mp4",".otf":"font/otf"},
	_: {
		client: {start:"_app/immutable/entry/start.Dx1EfVf5.js",app:"_app/immutable/entry/app.DRwH4bVI.js",imports:["_app/immutable/entry/start.Dx1EfVf5.js","_app/immutable/chunks/CBZb9djf.js","_app/immutable/chunks/qulqJhcf.js","_app/immutable/chunks/DSZGftEx.js","_app/immutable/entry/app.DRwH4bVI.js","_app/immutable/chunks/B1xJhF-t.js","_app/immutable/chunks/qulqJhcf.js","_app/immutable/chunks/CnGfKXJO.js","_app/immutable/chunks/DSZGftEx.js","_app/immutable/chunks/DeeP4COE.js","_app/immutable/chunks/B14ALbOT.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
