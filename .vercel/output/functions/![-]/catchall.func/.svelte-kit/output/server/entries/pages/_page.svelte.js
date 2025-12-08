import { c as create_ssr_component, a as subscribe, b as add_attribute, e as escape, d as each, v as validate_component } from "../../chunks/ssr.js";
import { w as writable } from "../../chunks/index.js";
import * as d3 from "d3";
import { select } from "d3";
import * as _ from "lodash";
const wandelRoute = [["51.4263847", "5.4707285"], ["51.42639", "5.47102"], ["51.42639", "5.47108"], ["51.4264", "5.47113"], ["51.42646", "5.4712"], ["51.4264551", "5.4711994"], ["51.42639", "5.47138"], ["51.42633", "5.47153"], ["51.42629", "5.47165"], ["51.42626", "5.47176"], ["51.42623", "5.47182"], ["51.4262", "5.47188"], ["51.4262033", "5.471881"], ["51.4262033", "5.471881"], ["51.42623", "5.47192"], ["51.42626", "5.47195"], ["51.4262615", "5.4719548"], ["51.42623", "5.47201"], ["51.42622", "5.47206"], ["51.42622", "5.47233"], ["51.4262206", "5.4723349"], ["51.42634", "5.47249"], ["51.42639", "5.47256"], ["51.42658", "5.47289"], ["51.4268", "5.47364"], ["51.42706", "5.47436"], ["51.42712", "5.47459"], ["51.42719", "5.47481"], ["51.4271895", "5.4748098"], ["51.4271895", "5.4748098"], ["51.42714", "5.47484"], ["51.42709", "5.47487"], ["51.42705", "5.4749"], ["51.427", "5.47494"], ["51.4269", "5.47493"], ["51.4268995", "5.4749307"], ["51.42676", "5.47535"], ["51.4267584", "5.4753456"], ["51.42673", "5.47536"], ["51.42654", "5.47545"], ["51.426542", "5.4754484"], ["51.42657", "5.47559"], ["51.42659", "5.47568"], ["51.4266", "5.47579"], ["51.4266039", "5.4757891"], ["51.42642", "5.47585"], ["51.4263", "5.47589"], ["51.42615", "5.47593"], ["51.42612", "5.47595"], ["51.42608", "5.47598"], ["51.42597", "5.4761"], ["51.42594", "5.47615"], ["51.42581", "5.47635"], ["51.4257", "5.47647"], ["51.42565", "5.47651"], ["51.42555", "5.47659"], ["51.42547", "5.47666"], ["51.42543", "5.47671"], ["51.42541", "5.47676"], ["51.42538", "5.47683"], ["51.42521", "5.47759"], ["51.4252054", "5.4775852"]];
const autoRoute2 = [["51.4501649", "5.5007588"], ["51.45023", "5.5011"], ["51.45024", "5.50115"], ["51.45026", "5.50128"], ["51.45049", "5.50252"], ["51.45054", "5.50285"], ["51.45054", "5.50287"], ["51.45059", "5.50319"], ["51.45069", "5.50366"], ["51.45079", "5.50413"], ["51.45081", "5.5043"], ["51.45084", "5.50447"], ["51.45092", "5.50485"], ["51.45099", "5.50522"], ["51.45119", "5.50636"], ["51.45123", "5.50661"], ["51.45138", "5.50745"], ["51.45157", "5.5085"], ["51.45167", "5.50904"], ["51.45173", "5.50935"], ["51.4518", "5.50966"], ["51.4517961", "5.5096579"], ["51.45234", "5.509"], ["51.45238", "5.50897"], ["51.45304", "5.50809"], ["51.45309", "5.50804"], ["51.45314", "5.50798"], ["51.45345", "5.50761"], ["51.45383", "5.50731"], ["51.45412", "5.50709"], ["51.4544", "5.50686"], ["51.45476", "5.5066"], ["51.45495", "5.50645"], ["51.45505", "5.50638"], ["51.45514", "5.50634"], ["51.45521", "5.50629"], ["51.45525", "5.50627"], ["51.4555", "5.50622"], ["51.45574", "5.50617"], ["51.4557449", "5.5061731"], ["51.45573", "5.5054"], ["51.45574", "5.50463"], ["51.45573", "5.50445"], ["51.4557323", "5.5044495"], ["51.45595", "5.50451"], ["51.45616", "5.50459"], ["51.4561627", "5.5045881"]];
const css$a = {
  code: "div.svelte-1u53yae{height:100%;width:100%}.backgroundMap.svelte-1u53yae{pointer-events:none;filter:contrast(1) saturate(1) hue-rotate(-30deg) sepia(10%) opacity(0.9)}",
  map: `{"version":3,"file":"BackgroundMap.svelte","sources":["BackgroundMap.svelte"],"sourcesContent":["<script>\\n  import { onMount } from 'svelte'\\n  import { wandelRoute, autoRoute1, autoRoute2, autoRoute3 } from '$lib/noncomponents/routes.js';\\n  import { browser } from '$app/environment';\\n\\n  // modules loaded from the client\\n  let LeafletMap;\\n  let TileLayer;\\n  let Marker;\\n  let Polyline;\\n\\n  onMount(async () => {\\n\\t\\tconst SL = await import('svelte-leafletjs');\\n    LeafletMap = SL.LeafletMap\\n    TileLayer = SL.TileLayer\\n    Marker = SL.Marker\\n    Polyline = SL.Polyline\\n\\t});\\n\\n  export let leafletMap;\\n  export let offset;\\n  export let index;\\n  export let currentStepName;\\n\\n  let ziekenhuis;\\n  let huis;\\n  let zwembad;\\n\\n  $: if(leafletMap){\\n    leafletMap = leafletMap.getMap()\\n    \\n    huis = L.tooltip(wandelRoute[0], {direction:'top', offset:[0,-40]})\\n    huis\\n      .setContent(\\"Haus von Niels und Leonie\\")\\n      .addTo(leafletMap);\\n\\n    ziekenhuis = L.tooltip([51.466143, 5.472363], {direction:'top', offset:[0,-40]})\\n    zwembad = L.tooltip(autoRoute2[0], {direction:'top', offset:[0,-40]})\\n  }\\n  \\n  const mapOptions = {\\n    center: [51.426437, 5.470482],\\n    zoom: 7,\\n    preferCanvas: true,\\n    zoomControl: false,\\n  };\\n\\n  const nightTileURL = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=70276298-f784-4ba8-93c8-439b926e8cab'\\n  const dayTileURL = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png'\\n\\n  const coordsHuis = [parseFloat(wandelRoute[0][0]), parseFloat(wandelRoute[0][1])] \\n  const coordsZiekenhuis = [51.466143, 5.472363]\\n  $: flyToCoordsHuis = (browser && window.innerWidth < 600)\\n    ? [coordsHuis[0]+0.002, coordsHuis[1]]\\n    : coordsHuis\\n  $: flyToCoordsZiekenhuis = (browser && window.innerWidth < 600)\\n    ? [coordsZiekenhuis[0]+0.002, coordsZiekenhuis[1]]\\n    : coordsZiekenhuis\\n  \\n  const tileLayerOptions = {\\n      minZoom: 2,\\n      maxZoom: 20,\\n      maxNativeZoom: 19,\\n      maxBounds: [[51.263871, 3.892372],[52.263871, 4.892372]],\\n  };\\n\\n  $: if(leafletMap && !['ziekenhuis'].includes(currentStepName)){\\n    const zoom = (currentStepName === 'autoritje' || (currentStepName === 'wandeling' && window.innerWidth < 600)) ? 13 : 16;\\n    let centerCoords = flyToCoordsHuis\\n    if(currentStepName === 'autoritje'){\\n      centerCoords = [parseFloat(flyToCoordsHuis[0])+0.02, parseFloat(flyToCoordsHuis[1])+0.02]\\n    }else if(currentStepName === 'wandeling'){\\n      centerCoords = [parseFloat(flyToCoordsHuis[0]), parseFloat(flyToCoordsHuis[1])-0.002]\\n    }\\n    leafletMap.flyTo(centerCoords, zoom, {duration: 3})\\n  }\\n\\n  $: if(leafletMap && 'ziekenhuis' === currentStepName){\\n    leafletMap.flyTo(flyToCoordsZiekenhuis, 16, {duration: 3})\\n    \\n    ziekenhuis\\n      .setContent(\\"Catharina Krankenhaus\\")\\n      .addTo(leafletMap);\\n  }\\n\\n  $: if(leafletMap && 'autoritje' === currentStepName){\\n    zwembad\\n      .setContent(\\"Schwimmbad\\")\\n      .addTo(leafletMap);\\n  }\\n\\n\\n<\/script>\\n\\n  {#if LeafletMap}\\n    <div class=\\"backgroundMap\\">\\n      <LeafletMap bind:this={leafletMap} options={mapOptions}>\\n        <TileLayer url={(['krantenkoppen', 'wandeling'].includes(currentStepName)) ? nightTileURL : dayTileURL} options={tileLayerOptions}/>\\n        <Marker latLng={wandelRoute[0]}/>\\n        {#if currentStepName === 'wandeling'}\\n          <Polyline latLngs={wandelRoute.slice(0, Math.max(0, Math.round(offset*1.2*wandelRoute.length - 5)))} color=\\"#00bcd4\\" weight='5'/>\\n        {/if}\\n        {#if currentStepName === 'krantenkoppen'}\\n          <Polyline latLngs={wandelRoute} color=\\"#00bcd4\\" weight='5'/>\\n        {/if}\\n        {#if currentStepName !== 'thuis'}\\n          <Marker latLng={[51.466143, 5.472363]}/>\\n        {/if}\\n        {#if currentStepName === 'autoritje'}\\n          <Marker latLng={autoRoute2[0]}/>\\n          {#if offset > 0.05}\\n            <Polyline latLngs={autoRoute1.slice(0, Math.max(0, Math.round(offset*6*autoRoute1.length-100)))} color=\\"#00bcd4\\" weight='5'/>\\n          {/if}\\n          {#if offset > 0.24}\\n            <Polyline latLngs={autoRoute2.slice(0, Math.max(0, Math.round(offset*2.5*autoRoute2.length-40)))} color=\\"#00bcd4\\" weight='5'/>\\n          {/if}\\n          {#if offset > 0.43}\\n            <Polyline latLngs={autoRoute3.slice(0, Math.max(0, Math.round(offset*16*autoRoute3.length-3500)))} color=\\"#00bcd4\\" weight='5'/>\\n          {/if}\\n        {/if}\\n      </LeafletMap>\\n    </div>\\n  {/if}\\n\\n\\n<style>\\n\\n  div{\\n    height:100%;\\n    width:100%;\\n  }\\n\\n  .backgroundMap{\\n    pointer-events:none;\\n    filter: contrast(1) saturate(1) hue-rotate(-30deg) sepia(10%) opacity(0.9);\\n  }\\n\\n</style>\\n"],"names":[],"mappings":"AA+HE,kBAAG,CACD,OAAO,IAAI,CACX,MAAM,IACR,CAEA,6BAAc,CACZ,eAAe,IAAI,CACnB,MAAM,CAAE,SAAS,CAAC,CAAC,CAAC,SAAS,CAAC,CAAC,CAAC,WAAW,MAAM,CAAC,CAAC,MAAM,GAAG,CAAC,CAAC,QAAQ,GAAG,CAC3E"}`
};
const BackgroundMap = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let flyToCoordsHuis;
  let flyToCoordsZiekenhuis;
  let { leafletMap } = $$props;
  let { offset } = $$props;
  let { index } = $$props;
  let { currentStepName } = $$props;
  let ziekenhuis;
  let huis;
  let zwembad;
  const coordsHuis = [parseFloat(wandelRoute[0][0]), parseFloat(wandelRoute[0][1])];
  const coordsZiekenhuis = [51.466143, 5.472363];
  if ($$props.leafletMap === void 0 && $$bindings.leafletMap && leafletMap !== void 0) $$bindings.leafletMap(leafletMap);
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0) $$bindings.offset(offset);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0) $$bindings.index(index);
  if ($$props.currentStepName === void 0 && $$bindings.currentStepName && currentStepName !== void 0) $$bindings.currentStepName(currentStepName);
  $$result.css.add(css$a);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      if (leafletMap) {
        leafletMap = leafletMap.getMap();
        huis = L.tooltip(wandelRoute[0], { direction: "top", offset: [0, -40] });
        huis.setContent("Haus von Niels und Leonie").addTo(leafletMap);
        ziekenhuis = L.tooltip([51.466143, 5.472363], { direction: "top", offset: [0, -40] });
        zwembad = L.tooltip(autoRoute2[0], { direction: "top", offset: [0, -40] });
      }
    }
    flyToCoordsHuis = coordsHuis;
    flyToCoordsZiekenhuis = coordsZiekenhuis;
    {
      if (leafletMap && !["ziekenhuis"].includes(currentStepName)) {
        const zoom = currentStepName === "autoritje" || currentStepName === "wandeling" && window.innerWidth < 600 ? 13 : 16;
        let centerCoords = flyToCoordsHuis;
        if (currentStepName === "autoritje") {
          centerCoords = [
            parseFloat(flyToCoordsHuis[0]) + 0.02,
            parseFloat(flyToCoordsHuis[1]) + 0.02
          ];
        } else if (currentStepName === "wandeling") {
          centerCoords = [parseFloat(flyToCoordsHuis[0]), parseFloat(flyToCoordsHuis[1]) - 2e-3];
        }
        leafletMap.flyTo(centerCoords, zoom, { duration: 3 });
      }
    }
    {
      if (leafletMap && "ziekenhuis" === currentStepName) {
        leafletMap.flyTo(flyToCoordsZiekenhuis, 16, { duration: 3 });
        ziekenhuis.setContent("Catharina Krankenhaus").addTo(leafletMap);
      }
    }
    {
      if (leafletMap && "autoritje" === currentStepName) {
        zwembad.setContent("Schwimmbad").addTo(leafletMap);
      }
    }
    $$rendered = `${``}`;
  } while (!$$settled);
  return $$rendered;
});
const started = writable(false);
const sound = writable(true);
function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
const css$9 = {
  code: "h1.svelte-xe3xtl{margin-bottom:1.5em;font-size:3.7vh}.headphones.svelte-xe3xtl{filter:invert(1)}.title.svelte-xe3xtl{height:100vh;display:flex;justify-content:center;align-items:center;color:white;background-image:url('$lib/heatwave.png');background-repeat:no-repeat;background-size:cover}.started.svelte-xe3xtl{animation:svelte-xe3xtl-blurry-animation 7s infinite;-webkit-animation:svelte-xe3xtl-blurry-animation 7s infinite;-moz-animation:svelte-xe3xtl-blurry-animation 7s infinite}.sub-start.svelte-xe3xtl{top:50%;position:absolute;width:80%;left:10%}.subtitle.svelte-xe3xtl{position:absolute;top:70%;width:70%;left:15%}.title-huge.svelte-xe3xtl{font-size:10vh;transform:translate(0%,-50%)}.scrolldown.svelte-xe3xtl{position:absolute;margin-left:auto;margin-right:auto;bottom:1%;-webkit-animation:svelte-xe3xtl-flickerAnimation 3s infinite;-moz-animation:svelte-xe3xtl-flickerAnimation 3s infinite;-o-animation:svelte-xe3xtl-flickerAnimation 3s infinite;animation:svelte-xe3xtl-flickerAnimation 3s infinite}@keyframes svelte-xe3xtl-flickerAnimation{0%{opacity:1}50%{opacity:0}100%{opacity:1}}@-o-keyframes svelte-xe3xtl-flickerAnimation{0%{opacity:1}50%{opacity:0}100%{opacity:1}}@-moz-keyframes svelte-xe3xtl-flickerAnimation{0%{opacity:1}50%{opacity:0}100%{opacity:1}}@-webkit-keyframes svelte-xe3xtl-flickerAnimation{0%{opacity:1}50%{opacity:0}100%{opacity:1}}@keyframes svelte-xe3xtl-blurry-animation{0%{filter:blur(0);opacity:1;transform:scale(1)}50%{filter:blur(1px);opacity:0.7  ;transform:scale(1.02)}100%{filter:blur(0);opacity:1;transform:scale(1)}}",
  map: `{"version":3,"file":"Titlepage.svelte","sources":["Titlepage.svelte"],"sourcesContent":["<script>\\n  import { started } from \\"$lib/stores\\";\\n  import { clamp } from \\"$lib/noncomponents/helperFunctions\\";\\n  import { browser } from \\"$app/environment\\";\\n\\n  export let currentStepName;\\n  export let offset\\n\\n  $: cricketvolume = clamp(1 - Math.pow(offset, 1/4), 0, 1);\\n  \\n<\/script>\\n\\n<!-- svelte-ignore a11y-click-events-have-key-events -->\\n<div class='title {($started) ? \\"started\\" : \\"\\"}' on:click={() => document.getElementById('heat').play()}>\\n\\t\\n  {#if currentStepName === 'thuis' && browser && window.innerWidth > 600}\\n\\t\\t<audio src=\\"sounds/heat.mp3\\" loop id='heat' bind:volume={cricketvolume} /> \\n\\t{/if}\\n\\n  {#if $started}\\n    <div class='scrolldown'>\\n      <h4>Nach unten scrollen</h4>\\n      <img  width='7%' src={'/images/arrowdown.png'} />\\n    </div>\\n  {/if}\\n  <div style='{(!$started) ? \\"cursor:pointer\\" : \\"pointer-events:none\\"}' on:click={() => {started.set(true)}}>\\n    <h1 class='title-huge'>Beispiellos hei&szlig;</h1>\\n    <h1 class='sub-start'>Eine Geschichte &uuml;ber m&ouml;gliche extreme Hitze in den Niederlanden auf Basis wissenschaftlicher Erkenntnisse</h1>\\n  </div>\\n</div>\\n\\n<!-- svelte-ignore a11y-click-events-have-key-events -->\\n<div on:click={() => document.getElementById('heat').play()}>\\n  {#if !$started}\\n    <div class=\\"subtitle\\" style='cursor:pointer' on:click={() => {started.set(true)}}>\\n      <em><h3 class=\\"klik-start\\">KLICKEN ZUM STARTEN</h3>\\n      <h3 class=\\"geluid-info\\">Diese Bildgeschichte enth&auml;lt Ton. Die Geschichte wirkt am besten mit Kopfh&ouml;rern.</h3></em>\\n      <img class='headphones' src='/images/headphones.png' width='60px'/>\\n    </div>\\n  {:else}\\n    <!-- <div class='introtekst'>\\n      <h1>Een verhaal over mogelijke exceptionele hitte in Nederland op basis van wetenschappelijke inzichten</h1>\\n    </div> -->\\n  {/if}\\n  \\n </div>\\n\\n\\n<style>\\n\\th1{\\n\\t\\tmargin-bottom:1.5em;\\n\\t\\tfont-size: 3.7vh;\\n\\t}\\n\\n  .headphones{\\n    filter:invert(1);\\n  }\\n\\n\\t.title{\\n\\t\\theight: 100vh;\\n\\t\\tdisplay: flex;\\n\\t\\tjustify-content: center;\\n\\t\\talign-items: center;\\n\\t\\tcolor: white;\\n\\t\\tbackground-image: url('$lib/heatwave.png');\\n\\t\\tbackground-repeat: no-repeat;\\n\\t\\tbackground-size: cover;\\n  }\\n  .started{\\n    animation: blurry-animation 7s infinite;\\n\\t\\t-webkit-animation: blurry-animation 7s infinite;\\n\\t\\t-moz-animation: blurry-animation 7s infinite;\\n\\t}\\n\\n  .sub-start{\\n    top:50%;\\n    position:absolute;\\n    width:80%;\\n    left:10%;\\n  }\\n\\n  .subtitle{\\n    position:absolute;\\n    top:70%;\\n    width:70%;\\n    left:15%;\\n  }\\n\\n  .introtekst{\\n    position:absolute;\\n    width: 80%;\\n    left: 50%;\\n    top: 62%;\\n    transform: translate(-50%,0%);\\n  }\\n\\n  .title-huge{\\n    font-size: 10vh;\\n    /* margin:100px; */\\n    transform: translate(0%,-50%);\\n  }\\n\\n  .scrolldown{\\n\\tposition: absolute;\\n\\tmargin-left:auto;\\n\\tmargin-right:auto;\\n\\tbottom: 1%;\\n\\t-webkit-animation: flickerAnimation 3s infinite;\\n    -moz-animation: flickerAnimation 3s infinite;\\n    -o-animation: flickerAnimation 3s infinite;\\n    animation: flickerAnimation 3s infinite;\\n  }\\n\\n\\t@keyframes flickerAnimation {\\n\\t0%   { opacity:1; }\\n\\t50%  { opacity:0; }\\n\\t100% { opacity:1; }\\n\\t}\\n\\t@-o-keyframes flickerAnimation{\\n\\t0%   { opacity:1; }\\n\\t50%  { opacity:0; }\\n\\t100% { opacity:1; }\\n\\t}\\n\\t@-moz-keyframes flickerAnimation{\\n\\t0%   { opacity:1; }\\n\\t50%  { opacity:0; }\\n\\t100% { opacity:1; }\\n\\t}\\n\\t@-webkit-keyframes flickerAnimation{\\n\\t0%   { opacity:1; }\\n\\t50%  { opacity:0; }\\n\\t100% { opacity:1; }\\n\\t}\\n\\n  @keyframes blurry-animation {\\n    0% {\\n      filter: blur(0);\\n      opacity: 1;\\n      transform: scale(1);\\n    }\\n    50% {\\n      filter: blur(1px);\\n      opacity: 0.7  ;\\n      transform: scale(1.02);\\n    }\\n    100% {\\n      filter: blur(0);\\n      opacity: 1;\\n      transform: scale(1);\\n    }\\n  }\\n\\n</style>"],"names":[],"mappings":"AAiDC,gBAAE,CACD,cAAc,KAAK,CACnB,SAAS,CAAE,KACZ,CAEC,yBAAW,CACT,OAAO,OAAO,CAAC,CACjB,CAED,oBAAM,CACL,MAAM,CAAE,KAAK,CACb,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,MAAM,CACvB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,KAAK,CACZ,gBAAgB,CAAE,wBAAwB,CAC1C,iBAAiB,CAAE,SAAS,CAC5B,eAAe,CAAE,KACjB,CACA,sBAAQ,CACN,SAAS,CAAE,8BAAgB,CAAC,EAAE,CAAC,QAAQ,CACzC,iBAAiB,CAAE,8BAAgB,CAAC,EAAE,CAAC,QAAQ,CAC/C,cAAc,CAAE,8BAAgB,CAAC,EAAE,CAAC,QACrC,CAEC,wBAAU,CACR,IAAI,GAAG,CACP,SAAS,QAAQ,CACjB,MAAM,GAAG,CACT,KAAK,GACP,CAEA,uBAAS,CACP,SAAS,QAAQ,CACjB,IAAI,GAAG,CACP,MAAM,GAAG,CACT,KAAK,GACP,CAUA,yBAAW,CACT,SAAS,CAAE,IAAI,CAEf,SAAS,CAAE,UAAU,EAAE,CAAC,IAAI,CAC9B,CAEA,yBAAW,CACZ,QAAQ,CAAE,QAAQ,CAClB,YAAY,IAAI,CAChB,aAAa,IAAI,CACjB,MAAM,CAAE,EAAE,CACV,iBAAiB,CAAE,8BAAgB,CAAC,EAAE,CAAC,QAAQ,CAC5C,cAAc,CAAE,8BAAgB,CAAC,EAAE,CAAC,QAAQ,CAC5C,YAAY,CAAE,8BAAgB,CAAC,EAAE,CAAC,QAAQ,CAC1C,SAAS,CAAE,8BAAgB,CAAC,EAAE,CAAC,QACjC,CAED,WAAW,8BAAiB,CAC5B,EAAK,CAAE,QAAQ,CAAG,CAClB,GAAK,CAAE,QAAQ,CAAG,CAClB,IAAK,CAAE,QAAQ,CAAG,CAClB,CACA,cAAc,8BAAgB,CAC9B,EAAK,CAAE,QAAQ,CAAG,CAClB,GAAK,CAAE,QAAQ,CAAG,CAClB,IAAK,CAAE,QAAQ,CAAG,CAClB,CACA,gBAAgB,8BAAgB,CAChC,EAAK,CAAE,QAAQ,CAAG,CAClB,GAAK,CAAE,QAAQ,CAAG,CAClB,IAAK,CAAE,QAAQ,CAAG,CAClB,CACA,mBAAmB,8BAAgB,CACnC,EAAK,CAAE,QAAQ,CAAG,CAClB,GAAK,CAAE,QAAQ,CAAG,CAClB,IAAK,CAAE,QAAQ,CAAG,CAClB,CAEC,WAAW,8BAAiB,CAC1B,EAAG,CACD,MAAM,CAAE,KAAK,CAAC,CAAC,CACf,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,MAAM,CAAC,CACpB,CACA,GAAI,CACF,MAAM,CAAE,KAAK,GAAG,CAAC,CACjB,OAAO,CAAE,GAAG,EAAE,CACd,SAAS,CAAE,MAAM,IAAI,CACvB,CACA,IAAK,CACH,MAAM,CAAE,KAAK,CAAC,CAAC,CACf,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,MAAM,CAAC,CACpB,CACF"}`
};
const Titlepage = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $started, $$unsubscribe_started;
  $$unsubscribe_started = subscribe(started, (value) => $started = value);
  let { currentStepName } = $$props;
  let { offset } = $$props;
  if ($$props.currentStepName === void 0 && $$bindings.currentStepName && currentStepName !== void 0) $$bindings.currentStepName(currentStepName);
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0) $$bindings.offset(offset);
  $$result.css.add(css$9);
  $$unsubscribe_started();
  return ` <div class="${"title " + escape($started ? "started" : "", true) + " svelte-xe3xtl"}">${``} ${$started ? `<div class="scrolldown svelte-xe3xtl" data-svelte-h="svelte-4k4xll"><h4>Nach unten scrollen</h4> <img width="7%"${add_attribute("src", "/images/arrowdown.png", 0)}></div>` : ``} <div${add_attribute("style", !$started ? "cursor:pointer" : "pointer-events:none", 0)}><h1 class="title-huge svelte-xe3xtl" data-svelte-h="svelte-9fd2eq">Beispiellos heiß</h1> <h1 class="sub-start svelte-xe3xtl" data-svelte-h="svelte-y4otol">Eine Geschichte über mögliche extreme Hitze in den Niederlanden auf Basis wissenschaftlicher Erkenntnisse</h1></div></div>  <div>${!$started ? `<div class="subtitle svelte-xe3xtl" style="cursor:pointer" data-svelte-h="svelte-8g7dr2"><em><h3 class="klik-start">KLICKEN ZUM STARTEN</h3> <h3 class="geluid-info">Diese Bildgeschichte enthält Ton. Die Geschichte wirkt am besten mit Kopfhörern.</h3></em> <img class="headphones svelte-xe3xtl" src="/images/headphones.png" width="60px"></div>` : ``} </div>`;
});
function fadeOut() {
  select(".fixed-image").transition("out").duration(500).style("opacity", 0);
}
const TextAndImagesScenes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { scenes } = $$props;
  let { stepSize } = $$props;
  let { imageOffset = 0.1 } = $$props;
  if ($$props.scenes === void 0 && $$bindings.scenes && scenes !== void 0) $$bindings.scenes(scenes);
  if ($$props.stepSize === void 0 && $$bindings.stepSize && stepSize !== void 0) $$bindings.stepSize(stepSize);
  if ($$props.imageOffset === void 0 && $$bindings.imageOffset && imageOffset !== void 0) $$bindings.imageOffset(imageOffset);
  return `${each(scenes, (scene, i) => {
    return `<div class="scroll-text-block" style="${"top:" + escape(`${(scene["time"] + imageOffset) * stepSize}px`, true)}"><p${add_attribute("class", scene["class"], 0)}><!-- HTML_TAG_START -->${scene["text"]}<!-- HTML_TAG_END --></p> </div>`;
  })}`;
});
const css$8 = {
  code: ".stepdiv.svelte-ml2cej{height:100%}",
  map: `{"version":3,"file":"Introductie.svelte","sources":["Introductie.svelte"],"sourcesContent":["<script>\\n  import { showImages } from \\"$lib/noncomponents/fadeOutIn\\";\\n  import { afterUpdate, onMount } from \\"svelte\\";\\n  import TextAndImagesScenes from \\"./TextAndImagesScenes.svelte\\";\\n  import { getStepSize } from \\"$lib/noncomponents/helperFunctions\\";\\n  import { clamp } from \\"$lib/noncomponents/helperFunctions\\";\\n\\n  export let offset;\\n  export let index;\\n  export let stepName;\\n  export let currentStepName;\\n\\n  $: fanvolume = clamp(-4*Math.pow(offset-0.5,2)+0.6, 0, 1)\\n\\n  let stepSize;\\n  onMount(() => {\\n    stepSize = getStepSize(stepName);\\n  })\\n\\n  const scenes = [\\n    {\\n      name:'bank1',\\n      image:'png',\\n      time:0.2,\\n      text:'Es ist Anfang Juli und in Eindhoven herrschen bereits seit drei Tagen Temperaturen über vierzig Grad. Auch nachts sinkt die Temperatur nicht mehr unter 25 Grad. Alle leiden unter der drückenden Hitze.<br/><br/> Wir begleiten Leonie und Niels sowie ihren siebenjährigen Sohn Sem. Niels ist Niederländischlehrer. Leonie arbeitet in der Notaufnahme des Catharina-Krankenhauses. <br/><br/>Leonie und Niels liegen erschöpft auf dem Sofa. Sie schlafen seit Nächten schlecht, weil ihr Schlafzimmer so heiß ist. Niels lauscht dem Summen des Ventilators. Leonie denkt an ihre Mutter, die schlecht zu Fuß ist und in einer Wohnung ohne Klimaanlage oder Sonnenschutz lebt.​',\\n      class: 'scroll-text'\\n    },\\n    {\\n      name:'seminbed1',\\n      image:'png',\\n      time:0.5,\\n      text:'Sem kann nicht schlafen und ist seit Tagen müde. Die Schulen sind wegen der extremen Hitze geschlossen. Ein Glück im Unglück, dass Niels Lehrer ist: Er kann tagsüber auf Sem aufpassen, während Leonie im Krankenhaus arbeitet.',\\n      class: 'scroll-text'\\n    }\\n  ]\\n\\n  let currentScene;\\n  afterUpdate(() => {\\n    currentScene = showImages(stepName, currentStepName, scenes, currentScene, offset)\\n  })\\n\\n<\/script>\\n\\n<div class='stepdiv'>\\n\\n  <TextAndImagesScenes {scenes} {stepSize}/>\\n\\n  {#if stepName === currentStepName && window.innerWidth > 600}\\n    <audio id='fansound' autoplay loop src=\\"sounds/fan.mp3\\" bind:volume={fanvolume}/> \\n  {/if}\\n\\n  {#if offset > 0.3 && offset < 0.5 && currentStepName === stepName}\\n    <p class='temp-text'>{Math.max(25.0, Math.min(30.5, Math.round(offset*670)/10))}</p>\\n    <img class='tempmeter' src={'/images/tempmeter.png'} />\\n  {/if}\\n\\n  \\n\\n\\n</div>\\n\\n<style>\\n\\n  .stepdiv{\\n    height:100%;\\n  }\\n\\n  .item .image:after {\\n  width: calc(100% + 150px);\\n  height: 100px;\\n  content: '';\\n  position: absolute;\\n  bottom: -125px;\\n  left: 50%;\\n  transform: translateX(-50%);\\n  border-radius: 50%;\\n  background-color: rgba(0,0,0,0.2);\\n  filter: blur(20px);\\n}\\n  \\n</style>\\n\\n\\n"],"names":[],"mappings":"AA+DE,sBAAQ,CACN,OAAO,IACT"}`
};
const Introductie = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let fanvolume;
  let { offset } = $$props;
  let { index } = $$props;
  let { stepName } = $$props;
  let { currentStepName } = $$props;
  let stepSize;
  const scenes = [
    {
      name: "bank1",
      image: "png",
      time: 0.2,
      text: "Es ist Anfang Juli und in Eindhoven herrschen bereits seit drei Tagen Temperaturen über vierzig Grad. Auch nachts sinkt die Temperatur nicht mehr unter 25 Grad. Alle leiden unter der drückenden Hitze.<br/><br/> Wir begleiten Leonie und Niels sowie ihren siebenjährigen Sohn Sem. Niels ist Niederländischlehrer. Leonie arbeitet in der Notaufnahme des Catharina-Krankenhauses. <br/><br/>Leonie und Niels liegen erschöpft auf dem Sofa. Sie schlafen seit Nächten schlecht, weil ihr Schlafzimmer so heiß ist. Niels lauscht dem Summen des Ventilators. Leonie denkt an ihre Mutter, die schlecht zu Fuß ist und in einer Wohnung ohne Klimaanlage oder Sonnenschutz lebt.​",
      class: "scroll-text"
    },
    {
      name: "seminbed1",
      image: "png",
      time: 0.5,
      text: "Sem kann nicht schlafen und ist seit Tagen müde. Die Schulen sind wegen der extremen Hitze geschlossen. Ein Glück im Unglück, dass Niels Lehrer ist: Er kann tagsüber auf Sem aufpassen, während Leonie im Krankenhaus arbeitet.",
      class: "scroll-text"
    }
  ];
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0) $$bindings.offset(offset);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0) $$bindings.index(index);
  if ($$props.stepName === void 0 && $$bindings.stepName && stepName !== void 0) $$bindings.stepName(stepName);
  if ($$props.currentStepName === void 0 && $$bindings.currentStepName && currentStepName !== void 0) $$bindings.currentStepName(currentStepName);
  $$result.css.add(css$8);
  fanvolume = clamp(-4 * Math.pow(offset - 0.5, 2) + 0.6, 0, 1);
  return `<div class="stepdiv svelte-ml2cej">${validate_component(TextAndImagesScenes, "TextAndImagesScenes").$$render($$result, { scenes, stepSize }, {}, {})} ${stepName === currentStepName && window.innerWidth > 600 ? `<audio id="fansound" autoplay loop src="sounds/fan.mp3"${add_attribute("volume", fanvolume, 0)}></audio>` : ``} ${offset > 0.3 && offset < 0.5 && currentStepName === stepName ? `<p class="temp-text">${escape(Math.max(25, Math.min(30.5, Math.round(offset * 670) / 10)))}</p> <img class="tempmeter"${add_attribute("src", "/images/tempmeter.png", 0)}>` : ``} </div>`;
});
const Ziekenhuis = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $sound, $$unsubscribe_sound;
  $$unsubscribe_sound = subscribe(sound, (value) => $sound = value);
  let { offset } = $$props;
  let { index } = $$props;
  let { currentStepName } = $$props;
  let { stepName } = $$props;
  let stepSize;
  const scenes = [
    {
      name: "ziekenhuischaos2",
      image: "png",
      time: 0.01,
      text: "Im Krankenhaus arbeitet Leonie so hart sie kann. Eine Kollegin hat sich wegen eines Hitzschlags krankgemeldet. Und in der Notaufnahme herrscht enormer Andrang: Die Hitze verursacht massive Gesundheitsprobleme. Es ist harte Arbeit, und morgen geht es wieder weiter.",
      class: "scroll-text"
    },
    {
      name: "oudevrouwziekenhuis",
      image: "png",
      time: 0.25,
      text: "Heute war das Wartezimmer voll mit Menschen. Viele ältere Menschen landeten mit Dehydrierungserscheinungen in der Notaufnahme.",
      class: "scroll-text"
    },
    {
      name: "hardloper1",
      image: "png",
      time: 0.5,
      text: "Einige junge Sportler wurden ohnmächtig, als sie trotz Warnungen joggen gingen.",
      class: "scroll-text"
    },
    {
      name: "boer1",
      image: "png",
      time: 0.75,
      text: "Und ein Bauer hatte beim Heumachen einen schweren Sonnenstich bekommen.",
      class: "scroll-text"
    }
  ];
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0) $$bindings.offset(offset);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0) $$bindings.index(index);
  if ($$props.currentStepName === void 0 && $$bindings.currentStepName && currentStepName !== void 0) $$bindings.currentStepName(currentStepName);
  if ($$props.stepName === void 0 && $$bindings.stepName && stepName !== void 0) $$bindings.stepName(stepName);
  $$unsubscribe_sound();
  return `<div class="stepdiv">${validate_component(TextAndImagesScenes, "TextAndImagesScenes").$$render($$result, { scenes, stepSize }, {}, {})} ${stepName === currentStepName && $sound ? `<audio src="sounds/ziekenhuis.mp3" autoplay loop></audio>` : ``} </div>`;
});
const Gesprek = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $sound, $$unsubscribe_sound;
  $$unsubscribe_sound = subscribe(sound, (value) => $sound = value);
  let { offset } = $$props;
  let { index } = $$props;
  let { currentStepName } = $$props;
  let { stepName } = $$props;
  let volume = 0.3;
  let stepSize;
  const scenes = [
    {
      name: "gesprek",
      image: "png",
      time: 0.2,
      text: 'Sem kann wegen der Wärme nicht schlafen und denkt an das, was Oma heute Nachmittag am Telefon sagte. Niels versucht, Sem mit nassen Waschlappen beim Einschlafen zu helfen. Den Ventilator stellt er auf die höchste Stufe. Während er damit beschäftigt ist, sagt Sem: "Laut Oma war es früher nie so heiß."   <br/> <br/> Niels: "Stimmt. Als ich so alt war wie du, gab es diese Art von Hitze nie. Wenn mir damals jemand gesagt hätte, dass es tagelang über 40 Grad werden könnte, hätte ich das nie geglaubt."',
      class: "scroll-text"
    }
  ];
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0) $$bindings.offset(offset);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0) $$bindings.index(index);
  if ($$props.currentStepName === void 0 && $$bindings.currentStepName && currentStepName !== void 0) $$bindings.currentStepName(currentStepName);
  if ($$props.stepName === void 0 && $$bindings.stepName && stepName !== void 0) $$bindings.stepName(stepName);
  $$unsubscribe_sound();
  return `<div class="stepdiv">${stepName === currentStepName ? `${validate_component(TextAndImagesScenes, "TextAndImagesScenes").$$render($$result, { scenes, stepSize }, {}, {})}` : ``} ${stepName === currentStepName && $sound ? `<audio src="sounds/fan.mp3" autoplay loop${add_attribute("volume", volume, 0)}></audio>` : ``} </div>`;
});
const Wandeling = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $sound, $$unsubscribe_sound;
  $$unsubscribe_sound = subscribe(sound, (value) => $sound = value);
  let { offset } = $$props;
  let { index } = $$props;
  let { currentStepName } = $$props;
  let { stepName } = $$props;
  let stepSize;
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0) $$bindings.offset(offset);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0) $$bindings.index(index);
  if ($$props.currentStepName === void 0 && $$bindings.currentStepName && currentStepName !== void 0) $$bindings.currentStepName(currentStepName);
  if ($$props.stepName === void 0 && $$bindings.stepName && stepName !== void 0) $$bindings.stepName(stepName);
  {
    console.log(stepSize);
  }
  {
    if (currentStepName === stepName) {
      fadeOut();
    }
  }
  $$unsubscribe_sound();
  return `${stepName === currentStepName && $sound ? `<audio src="sounds/night.mp3" autoplay loop></audio>` : ``} <div class="stepdiv"><div class="scroll-text-block night" style="${"top:" + escape(`${0.125 * stepSize}px`, true)}"><img class="nielsgaatwandelen night-image"${add_attribute("src", "/images/nielsgaatwandelen.png", 0)}> <p class="scroll-text nighttext" data-svelte-h="svelte-1cvi3li">Als Sem endlich schläft, beschließt Niels, einen Spaziergang zu machen. Draußen ist es immer noch sehr heiß. Er bemerkt, dass die Steine auf der Straße viel Wärme abstrahlen.</p></div> ${stepName === currentStepName && offset > 0.1 && offset < 0.6 && $sound ? `<audio src="sounds/voetstappen.mp3" autoplay loop></audio>` : ``} ${stepName === currentStepName && offset > 0.3 && offset < 0.5 && $sound ? `<audio src="sounds/crowd.mp3" autoplay loop></audio>` : ``} <div class="scroll-text-block night" style="${"top:" + escape(`${0.36 * stepSize}px`, true)}"><img class="festival night-image"${add_attribute("src", "/images/gasten.png", 0)}> <p class="scroll-text nighttext" data-svelte-h="svelte-8qc24d">Glücklicherweise fühlt sich der Dommelplantsoen etwas kühler an. Das Festival, das hier geplant war, wurde abgesagt, aber trotzdem ist es sehr voll im Park. Es wird viel Lärm gemacht und getrunken. Trotz des Lärms schlafen manche Menschen draußen.</p></div> ${stepName === currentStepName && offset > 0.4 && offset < 0.85 && $sound ? `<audio src="sounds/drunk.mp3" autoplay loop></audio>` : ``} <div class="scroll-text-block night" style="${"top:" + escape(`${0.63 * stepSize}px`, true)}"><img class="politie night-image"${add_attribute("src", "/images/politie.png", 0)}> <p class="scroll-text nighttext" data-svelte-h="svelte-1wlkr9g">In der Nähe ist Polizei, um die Situation im Auge zu behalten. Die Stimmung wird unangenehm. Niels geht schnell weiter.</p></div> ${stepName === currentStepName && offset > 0.65 && offset < 0.85 && $sound ? `<audio src="sounds/politie.mp3" autoplay loop></audio>` : ``} <div class="scroll-text-block night" style="${"right:100; top:" + escape(`${0.87 * stepSize}px`, true)}"><img class="rustigplekje night-image"${add_attribute("src", "/images/nielsboom.png", 0)}> <p class="scroll-text nighttext" data-svelte-h="svelte-1jg0zqs">Weiter vorne findet Niels einen ruhigen Platz bei einem Baum. Er muss an das Gespräch mit Sem über die Hitze denken und überprüft die neuesten Nachrichten auf seinem Handy.</p></div> </div>`;
});
const XAxis = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { xScale } = $$props;
  let { height } = $$props;
  let pinXAxis;
  if ($$props.xScale === void 0 && $$bindings.xScale && xScale !== void 0) $$bindings.xScale(xScale);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0) $$bindings.height(height);
  return `<g class="xAxis" transform="${"translate(" + escape(0, true) + "," + escape(height, true) + ")"}"${add_attribute("this", pinXAxis, 0)}></g>`;
});
const YAxis = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { yScale } = $$props;
  let { height } = $$props;
  let pinYAxis;
  if ($$props.yScale === void 0 && $$bindings.yScale && yScale !== void 0) $$bindings.yScale(yScale);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0) $$bindings.height(height);
  return `<g class="yAxis"${add_attribute("this", pinYAxis, 0)}></g>`;
});
const css$7 = {
  code: "svg.svelte-1bziafo{width:100%;height:100%;margin-top:0%}",
  map: `{"version":3,"file":"Scatter.svelte","sources":["Scatter.svelte"],"sourcesContent":["<script>\\n\\timport XAxis from \\"$lib/components/axes/XAxis.svelte\\";\\n\\timport YAxis from \\"$lib/components/axes/YAxis.svelte\\";\\n  import * as d3 from 'd3'\\n  import * as _ from 'lodash'\\n  import { onMount } from \\"svelte\\";\\n  import { getStepSize } from \\"$lib/noncomponents/helperFunctions\\";\\n\\n  export let index\\n  export let maxTempData\\n  export let offset\\n  export let currentStepName\\n  export let stepName;\\n\\n  let visible = true;\\n\\n  $: ratioOfCsvData = Math.round((offset * 1.6)*maxTempData.length)\\n\\n  let stepSize;\\n  let screenHeight\\n  let screenWidth\\n\\n  onMount(() => {\\n    stepSize = getStepSize(stepName);\\n    screenHeight = document.documentElement.clientHeight\\n    screenWidth = document.documentElement.clientWidth\\n  })\\n\\n  let xAxisScale\\n  let yAxisScale\\n  let textPadding\\n  let title\\n  \\n  $: if(screenWidth < 600){\\n      xAxisScale = 0.7\\n      yAxisScale = 0.5\\n      textPadding = 0.65\\n      title = 'Höchsttemperatur KNMI-Station Eindhoven'\\n    }\\n     else {\\n      xAxisScale = 0.4\\n      yAxisScale = 0.7\\n      textPadding = 0.15\\n      title = 'Jährlich gemessene Höchsttemperatur an der KNMI-Station Eindhoven'\\n    }\\n  \\n  $: xScale = d3.scaleLinear() \\n    .domain(d3.extent(maxTempData, function(d) { return +d.year; }))\\n    .range([ 0,screenWidth * xAxisScale]);\\n\\n  $: yScale = d3.scaleLinear()\\n    .domain([27, d3.max(maxTempData, function(d) { return +d.T; })])\\n    .range([ screenHeight * yAxisScale, screenHeight * 0.05 ]);\\n\\n  let colorScale = d3\\n  .scaleLinear()\\n  .domain([28,42])\\n  .range(['orange', 'darkred'])\\n\\n<\/script>\\n\\n<div class='grafiek'>\\n  <div class='graphtext' style='top:{\`\${textPadding*screenHeight}px\`}'>\\n    {#if (currentStepName === 'temperatuurstijging') || currentStepName === 'gesprek'}\\n    <h1 class='scroll-text'>Temperaturmessungen</h1>\\n    <p class='scroll-text'> \\n      Messungen zeigen, dass die jährliche Höchsttemperatur in Eindhoven bereits erheblich gestiegen ist. Bis 2019 wurde eine Temperatur über 37 Grad noch nie gemessen.  \\n    </p>\\n    <div class= 'fade-in' style='visibility:{(ratioOfCsvData > 60 && currentStepName ==='temperatuurstijging') ? 'visible' : 'hidden'}'>\\n      <p class='scroll-text'> Aber am 24. Juli 2019 wurden in Eindhoven 40,4 Grad erreicht. Der Hitzerekord von 2018 wurde um 3,7 Grad pulverisiert!  \\n      </p> \\n    </div>  \\n    {/if}\\n  </div>\\n\\n  <div class='sticky-div'>\\n    <svg>\\n      <g class = 'graphsvg' transform=\\"translate({screenWidth * 0.45},{screenHeight * 0})\\">\\n      <XAxis {xScale} height={screenHeight * yAxisScale}/>\\n      <YAxis {yScale} height={screenHeight * yAxisScale}/>\\n      <text class='axistitle' x={xScale(1988)} y={yScale(26)+2}>Jahr</text>  \\n      <text class = 'graphtitle' x={xScale(1985)} y={yScale(41)}>{title}</text>\\n      <text class='axistitle' transform=\\"translate({(xAxisScale * screenWidth * -0.07)-5},{yAxisScale * screenHeight * 0.5} ) rotate(-90)\\" text-anchor = 'middle'>Höchsttemperatur (°C)</text>\\n      {#if ratioOfCsvData > 80 && currentStepName === 'temperatuurstijging'}\\n        <g transform='translate({xScale(2017)},{yScale(40)})'>\\n          <text x={-90} y={32} class=\\"recordyear\\" font-size = \\"2vh\\">Das erste Mal</text>\\n          <text x={-90} y={32 + (0.02*innerHeight)} class=\\"recordyear\\"font-size = \\"2vh\\"> 40+ °C in 2019</text>\\n          <path\\n            fill='none'\\n            stroke='darkred'\\n            d=\\"M0 0 L-15 15 L0 0 L-10 0 L0 0 L0 10\\"\\n            stroke-width=\\"2\\"\\n          />\\n        </g>\\n      {/if}\\n      {#if currentStepName === 'temperatuurstijging'}\\n        {#each _.slice(maxTempData, 0, ratioOfCsvData) as d}\\n          <circle\\n            cx = {xScale(+d.year)}\\n            cy = {yScale(+d.T)}\\n            r = {0.003 * screenHeight}\\n            fill = {colorScale(+d.T)}\\n          />\\n        {/each}\\n      {/if}\\n      {#if currentStepName === 'temperatuurstijging'}\\n        {#each _.slice(maxTempData, 0, ratioOfCsvData) as d}\\n          <circle\\n            class= 'fade-in dot'\\n            cx = {xScale(+d.year)}\\n            cy = {yScale(+d.T)}\\n            r = {0.007 * screenHeight}\\n            fill = {colorScale(+d.T)}\\n          />\\n        {/each}\\n      {/if}\\n      </g>\\n    </svg>\\n  </div>\\n\\n   \\n</div>\\n\\n\\n<style>\\n  \\n  svg{\\n    width:100%;\\n    height:100%;\\n    margin-top:0%;\\n  }\\n\\n</style>\\n"],"names":[],"mappings":"AA8HE,kBAAG,CACD,MAAM,IAAI,CACV,OAAO,IAAI,CACX,WAAW,EACb"}`
};
const Scatter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ratioOfCsvData;
  let xScale;
  let yScale;
  let { index } = $$props;
  let { maxTempData } = $$props;
  let { offset } = $$props;
  let { currentStepName } = $$props;
  let { stepName } = $$props;
  let screenHeight;
  let screenWidth;
  let xAxisScale;
  let yAxisScale;
  let textPadding;
  let title;
  let colorScale = d3.scaleLinear().domain([28, 42]).range(["orange", "darkred"]);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0) $$bindings.index(index);
  if ($$props.maxTempData === void 0 && $$bindings.maxTempData && maxTempData !== void 0) $$bindings.maxTempData(maxTempData);
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0) $$bindings.offset(offset);
  if ($$props.currentStepName === void 0 && $$bindings.currentStepName && currentStepName !== void 0) $$bindings.currentStepName(currentStepName);
  if ($$props.stepName === void 0 && $$bindings.stepName && stepName !== void 0) $$bindings.stepName(stepName);
  $$result.css.add(css$7);
  ratioOfCsvData = Math.round(offset * 1.6 * maxTempData.length);
  {
    {
      xAxisScale = 0.4;
      yAxisScale = 0.7;
      textPadding = 0.15;
      title = "Jährlich gemessene Höchsttemperatur an der KNMI-Station Eindhoven";
    }
  }
  xScale = d3.scaleLinear().domain(d3.extent(maxTempData, function(d) {
    return +d.year;
  })).range([0, screenWidth * xAxisScale]);
  yScale = d3.scaleLinear().domain([
    27,
    d3.max(maxTempData, function(d) {
      return +d.T;
    })
  ]).range([screenHeight * yAxisScale, screenHeight * 0.05]);
  return `<div class="grafiek"><div class="graphtext" style="${"top:" + escape(`${textPadding * screenHeight}px`, true)}">${currentStepName === "temperatuurstijging" || currentStepName === "gesprek" ? `<h1 class="scroll-text" data-svelte-h="svelte-8buoa0">Temperaturmessungen</h1> <p class="scroll-text" data-svelte-h="svelte-1dzm1tz">Messungen zeigen, dass die jährliche Höchsttemperatur in Eindhoven bereits erheblich gestiegen ist. Bis 2019 wurde eine Temperatur über 37 Grad noch nie gemessen.</p> <div class="fade-in" style="${"visibility:" + escape(
    ratioOfCsvData > 60 && currentStepName === "temperatuurstijging" ? "visible" : "hidden",
    true
  )}"><p class="scroll-text" data-svelte-h="svelte-ls8d4e">Aber am 24. Juli 2019 wurden in Eindhoven 40,4 Grad erreicht. Der Hitzerekord von 2018 wurde um 3,7 Grad pulverisiert!</p></div>` : ``}</div> <div class="sticky-div"><svg class="svelte-1bziafo"><g class="graphsvg" transform="${"translate(" + escape(screenWidth * 0.45, true) + "," + escape(screenHeight * 0, true) + ")"}">${validate_component(XAxis, "XAxis").$$render(
    $$result,
    {
      xScale,
      height: screenHeight * yAxisScale
    },
    {},
    {}
  )}${validate_component(YAxis, "YAxis").$$render(
    $$result,
    {
      yScale,
      height: screenHeight * yAxisScale
    },
    {},
    {}
  )}<text class="axistitle"${add_attribute("x", xScale(1988), 0)}${add_attribute("y", yScale(26) + 2, 0)}>Jahr</text><text class="graphtitle"${add_attribute("x", xScale(1985), 0)}${add_attribute("y", yScale(41), 0)}>${escape(title)}</text><text class="axistitle" transform="${"translate(" + escape(xAxisScale * screenWidth * -0.07 - 5, true) + "," + escape(yAxisScale * screenHeight * 0.5, true) + " ) rotate(-90)"}" text-anchor="middle">Höchsttemperatur (°C)</text>${ratioOfCsvData > 80 && currentStepName === "temperatuurstijging" ? `<g transform="${"translate(" + escape(xScale(2017), true) + "," + escape(yScale(40), true) + ")"}"><text${add_attribute("x", -90, 0)}${add_attribute("y", 32, 0)} class="recordyear" font-size="2vh">Das erste Mal</text><text${add_attribute("x", -90, 0)}${add_attribute("y", 32 + 0.02 * innerHeight, 0)} class="recordyear" font-size="2vh">40+ °C in 2019</text><path fill="none" stroke="darkred" d="M0 0 L-15 15 L0 0 L-10 0 L0 0 L0 10" stroke-width="2"></path></g>` : ``}${currentStepName === "temperatuurstijging" ? `${each(_.slice(maxTempData, 0, ratioOfCsvData), (d) => {
    return `<circle${add_attribute("cx", xScale(+d.year), 0)}${add_attribute("cy", yScale(+d.T), 0)}${add_attribute("r", 3e-3 * screenHeight, 0)}${add_attribute("fill", colorScale(+d.T), 0)}></circle>`;
  })}` : ``}${currentStepName === "temperatuurstijging" ? `${each(_.slice(maxTempData, 0, ratioOfCsvData), (d) => {
    return `<circle class="fade-in dot"${add_attribute("cx", xScale(+d.year), 0)}${add_attribute("cy", yScale(+d.T), 0)}${add_attribute("r", 7e-3 * screenHeight, 0)}${add_attribute("fill", colorScale(+d.T), 0)}></circle>`;
  })}` : ``}</g></svg></div> </div>`;
});
const css$6 = {
  code: "svg.svelte-dlszzn{width:100%;height:90%;float:right}.legendtext.svelte-dlszzn{font-size:2vh;dominant-baseline:middle}.graph-description.svelte-dlszzn{color:#4e4e4e;font-size:1.5vh;text-align:left;bottom:8%;position:absolute;left:50%}",
  map: `{"version":3,"file":"Kansgrafiek.svelte","sources":["Kansgrafiek.svelte"],"sourcesContent":["<script>\\n  import XAxis from \\"$lib/components/axes/XAxis.svelte\\";\\n  import YAxis from \\"$lib/components/axes/YAxis.svelte\\";\\n  import * as d3 from 'd3'\\n  import * as _ from 'lodash'\\n  import { afterUpdate, onMount } from 'svelte'\\n  import { getStepSize } from \\"$lib/noncomponents/helperFunctions\\";\\n\\n  export let index\\n  export let middellijnData\\n  export let middellijnData2050\\n  export let offset\\n  export let confidenceData\\n  export let currentStepName\\n  export let stepName\\n\\n  let stepSize;\\n  let screenHeight\\n  let screenWidth\\n\\n  $: ratioOfCsvData = Math.round((offset*6)*middellijnData.length)\\n  $: ratioOfCsvDataConfidence = Math.round((offset*6)*confidenceData.length)\\n  \\n  onMount(() => {\\n    stepSize = getStepSize(stepName);\\n    screenHeight = document.documentElement.clientHeight\\n    screenWidth = document.documentElement.clientWidth\\n  })\\n\\n  let xAxisWidthRatio\\n  let yAxisScaleKans\\n  let textPaddingKans\\n  let grafiekPositionY\\n  let grafiekPositionX\\n  let legendPositionX1\\n  let legendPositionX2\\n  \\n  $: if(screenWidth < 600){\\n      xAxisWidthRatio  = 0.7\\n      yAxisScaleKans = 0.4\\n      textPaddingKans = 0.52   \\n      grafiekPositionY = 0\\n      grafiekPositionX = 0.15\\n      legendPositionX1 = 0.5\\n      legendPositionX2 = 0.55\\n    }\\n     else {\\n      xAxisWidthRatio = 0.38\\n      yAxisScaleKans = 0.7\\n      textPaddingKans = 0.25\\n      grafiekPositionY = 0.0\\n      grafiekPositionX = 0.45\\n      legendPositionX1 = 0.33\\n      legendPositionX2 = 0.35\\n    }\\n\\n  $: xScale = d3.scaleLog()\\n      .domain([100,0.01])\\n      .range([ 0,screenWidth * xAxisWidthRatio]);\\n\\n  $: yScale = d3.scaleLinear()\\n    .domain([28, 49])\\n    .range([ screenHeight * yAxisScaleKans, 0 ]);\\n\\n  const areaZonder = d3\\n    .area()\\n    .x(d => xScale(d.Kans))\\n    .y0(d => yScale(d.Lower_zonder))\\n    .y1(d => yScale(d.Upper_zonder))\\n\\n  const areaMet = d3\\n    .area()\\n    .x(d => xScale(d.Kans))\\n    .y0(d => yScale(d.Lower_met))\\n    .y1(d => yScale(d.Upper_met))\\n\\n  const area2050 = d3\\n    .area()\\n    .x(d => xScale(d.Kans))\\n    .y0(d => yScale(d.Lower_2050))\\n    .y1(d => yScale(d.Upper_2050))\\n  \\n  \\n    \\n  afterUpdate(() => {\\n  \\n    if(currentStepName === 'kansgrafiek' ){\\n      d3.select('.kansgraphpathzonder').remove()\\n      d3.select('.kansgraphpathconfidencemet').remove()\\n      d3.select('.kansgraphpathconfidence2050').remove()\\n      d3.select('.kansgraphpathmet').remove()\\n      d3.select('.kansgraphpath2050').remove()\\n      d3.select('.kansgraphpathconfidencezonder').remove() \\n      \\n      d3.select('.svgkansgrafiek')\\n      .append(\\"path\\")\\n      .attr('class', 'kansgraphpathzonder')\\n      .datum((currentStepName === 'kansgrafiek') ? _.slice(middellijnData, 0, ratioOfCsvData) : [])\\n      .attr(\\"fill\\", \\"none\\")\\n      .attr(\\"stroke\\", \\"#648fff\\")\\n      .attr(\\"stroke-width\\", 1.5)\\n      .attr(\\"d\\", d3.line()\\n        .x(function(d) { return xScale(d.Kans) })\\n        .y(function(d) { return yScale(d.vroeger) })\\n        )\\n       \\n      d3.select(\\".svgkansgrafiek\\")\\n          .append(\\"path\\")\\n          .attr('class', 'kansgraphpathconfidencezonder')\\n          .attr(\\"d\\", areaZonder(_.slice(confidenceData, 0, Math.max(0, ratioOfCsvDataConfidence - 4))))\\n          .attr(\\"fill\\", \\"#648fff\\")\\n          .attr(\\"stroke\\", \\"none\\")\\n          .attr(\\"fill-opacity\\", \\"0.2\\")\\n\\n      if (ratioOfCsvData > 189){  \\n        \\n        d3.select('.svgkansgrafiek')\\n        .append(\\"path\\")\\n        .attr('class', 'kansgraphpathmet')\\n        .datum(_.slice(middellijnData, 0, Math.max(0, ratioOfCsvData-190)))\\n        .attr(\\"fill\\", \\"none\\")\\n        .attr(\\"stroke\\", \\"#ffb000\\")\\n        .attr(\\"stroke-width\\", 1.5)\\n        .attr(\\"d\\", d3.line()\\n          .x(function(d) { return xScale(d.Kans) })\\n          .y(function(d) { return yScale(d.nu) })\\n          )\\n      }   \\n    \\n      if( ratioOfCsvDataConfidence > 20){    \\n        d3.select(\\".svgkansgrafiek\\")\\n          .append(\\"path\\")\\n          .attr('class', 'kansgraphpathconfidencemet')\\n          .attr(\\"d\\", areaMet(_.slice(confidenceData, 0, Math.max(0, ratioOfCsvDataConfidence - 16))))\\n          .attr(\\"fill\\", \\"#ffb000\\")\\n          .attr(\\"stroke\\", \\"none\\")\\n          .attr(\\"fill-opacity\\", \\"0.2\\");\\n      }\\n\\n      if (ratioOfCsvData > 329){          \\n        d3.select('.svgkansgrafiek')\\n        .append(\\"path\\")\\n        .attr('class', 'kansgraphpath2050')\\n        .datum(_.slice(middellijnData2050, 0, Math.max(0, ratioOfCsvData-330)))\\n        .attr(\\"fill\\", \\"none\\")\\n        .attr(\\"stroke\\", \\"#93003a\\")\\n        .attr(\\"stroke-width\\", 1.5)\\n        .attr(\\"d\\", d3.line()\\n          .x(function(d) { return xScale(d.Kans)})\\n          .y(function(d) { return yScale(d.Klimaat_2050)})\\n          )\\n      }\\n      \\n      if( ratioOfCsvDataConfidence > 30){    \\n        d3.select(\\".svgkansgrafiek\\")\\n          .append(\\"path\\")\\n          .attr('class', 'kansgraphpathconfidence2050')\\n          .attr(\\"d\\", area2050(_.slice(confidenceData, 0, Math.max(0, ratioOfCsvDataConfidence - 26))))\\n          .attr(\\"fill\\", \\"#93003a\\")\\n          .attr(\\"stroke\\", \\"none\\")\\n          .attr(\\"fill-opacity\\", \\"0.2\\");\\n      }\\n    }\\n  }\\n  )\\n<\/script>\\n\\n<div class='grafiek'>\\n  {#if index > 1}\\n    <div class='graphtext' style='top:{\`\${textPaddingKans*screenHeight}px\`}'>\\n      {#if currentStepName ==='scatter' || currentStepName ==='kansgrafiek'}\\n        <h1 class='scroll-text-kansgraph'>Statistische Berechnungen</h1>\\n        <p class='scroll-text-kansgraph'>\\n          Die Wahrscheinlichkeit von 40 Grad Celsius ist durch den Klimawandel stark gestiegen. Hitzestatistiken für Eindhoven zeigen, wie hoch die Wahrscheinlichkeit ist, dass eine bestimmte Temperatur in einem Jahr auftritt.    \\n        </p>   \\n        <div class= 'fade-in' style='visibility:{(ratioOfCsvData > 100 && currentStepName ==='kansgrafiek') ? 'visible' : 'hidden'}'>\\n          <p class='scroll-text-kansgraph'> Als Niels klein war, <mark style=\\"background: #648fff50 !important\\"> um 1980,</mark> war es nahezu unmöglich, dass es 40 Grad werden würde.  \\n          </p> \\n        </div>   \\n        <div class= 'fade-in' style='visibility:{(ratioOfCsvData > 250 && currentStepName ==='kansgrafiek') ? 'visible' : 'hidden'}'>\\n          <p class='scroll-text-kansgraph'> Mittlerweile, <mark style=\\"background: #ffb00050 !important\\">im Jahr 2023</mark>, liegt die Wahrscheinlichkeit für 40 Grad bei etwa 2%.\\n          </p> \\n        </div>   \\n        <div class= 'fade-in' style='visibility:{(ratioOfCsvData > 360 && currentStepName ==='kansgrafiek') ? 'visible' : 'hidden'}'>\\n          <p class='scroll-text-kansgraph'> <mark style=\\"background: #93003a50 !important\\">Im Jahr 2050</mark>, wenn Sem erwachsen ist, wird die Wahrscheinlichkeit für 40 Grad auf etwa 8% gestiegen sein.\\n          </p> \\n        </div>   \\n      {/if}      \\n    </div>\\n  {/if}\\n  \\n    <div class='sticky-div' >\\n      <svg>\\n        <g class='svgkansgrafiek' transform=\\"translate({screenWidth * grafiekPositionX},{screenHeight * grafiekPositionY})\\" >\\n          <XAxis {xScale} height={screenHeight * yAxisScaleKans}/> \\n          <YAxis {yScale} height={screenHeight * yAxisScaleKans}/>\\n          <text class = 'legendtext' x={screenWidth * legendPositionX1} y={yScale(31.8)}>Statistik für:</text> \\n          <text class = 'legendtext' x={(screenWidth * legendPositionX2) + (screenWidth * 0.005)} y={yScale(31)}>1980</text>  \\n          <line x1={screenWidth * legendPositionX1}  y1={yScale(31)} x2={screenWidth * legendPositionX2} y2={yScale(31)} stroke=\\"#648fff\\" stroke-width=\\"0.3vh\\"/>\\n          <text x={xScale(1.5)} class='axistitle' y={yScale(26)+2}>Wahrscheinlichkeit (%)</text>  \\n          <text class='axistitle' transform=\\"translate({(xAxisWidthRatio * screenWidth * -0.07)-5},{yAxisScaleKans * screenHeight * 0.5} ) rotate(-90)\\" text-anchor = 'middle'>Temperatur (°C)</text>  \\n          <line x1={xScale(100)}  y1={yScale(40)} x2={xScale(0.01)} y2={yScale(40)} stroke=\\"grey\\" stroke-dasharray=\\"5,5\\"/> \\n          <text class = 'graphtitle' x={xScale(1)} y={yScale(48)}>Die Wahrscheinlichkeit von Hitze pro Generation</text>\\n          {#if ratioOfCsvData > 170 && currentStepName === 'kansgrafiek'} \\n            <line x1={xScale(0.008)}  y1={yScale(37.0855)} x2={xScale(0.008)} y2={yScale(44.0244)} stroke=\\"grey\\"/>\\n            <line x1={xScale(0.0075)}  y1={yScale(37.0855)} x2={xScale(0.0085)} y2={yScale(37.0855)} stroke=\\"grey\\"/>\\n            <line x1={xScale(0.0075)}  y1={yScale(44.0244)} x2={xScale(0.0085)} y2={yScale(44.0244)} stroke=\\"grey\\"/>\\n            <text x={xScale(0.0075)} y={yScale(40.5)} font-size = \\"1.3vh\\" marker-end=\\"url(#triangle)\\">Bandbreite</text>\\n          {/if}\\n          {#if ratioOfCsvData > 270}\\n            <line x1={xScale(1.65)}  y1={yScale(28)} x2={xScale(1.7)} y2={yScale(40)} stroke=\\"grey\\" stroke-dasharray=\\"5,5\\"/>   \\n            <text class = 'legendtext' x={(screenWidth * legendPositionX2) + (screenWidth * 0.005)} y={yScale(31)+(screenHeight * 0.02)}>2023</text>  \\n            <line x1={screenWidth * legendPositionX1}  y1={yScale(31)+(screenHeight * 0.02)} x2={screenWidth * legendPositionX2} y2={yScale(31)+(screenHeight * 0.02)} stroke=\\"#ffb000\\" stroke-width=\\"0.3vh\\"/>    \\n            <text  x={xScale(1.65)+(screenWidth * 0.003)} y={yScale(28)-(screenHeight * 0.005)} fill= \\"#ffb000\\" font-size= '2vh'>2%</text> \\n          {/if}\\n          {#if ratioOfCsvData > 360}\\n            <line x1={xScale(7.8)}  y1={yScale(28)} x2={xScale(7.8)} y2={yScale(40)} stroke=\\"grey\\" stroke-dasharray=\\"5,5\\"/>  \\n            <text class = 'legendtext' x={(screenWidth * legendPositionX2) + (screenWidth * 0.005)} y={yScale(31)+(screenHeight * 0.04)}>2050</text>  \\n            <line x1={screenWidth * legendPositionX1}  y1={yScale(31)+(screenHeight * 0.04)} x2={screenWidth * legendPositionX2} y2={yScale(31)+(screenHeight * 0.04)} stroke=\\"#93003a\\" stroke-width=\\"0.3vh\\"/>     \\n            <text  x={xScale(7.8)+ (screenWidth * 0.003)} y={yScale(28)-(screenHeight * 0.005)} fill=\\"#93003a\\" font-size= '2vh'>8%</text> \\n           {/if}\\n        </g>\\n      </svg>\\n      <p class='graph-description'>Hitzestatistiken für Eindhoven für das Klima von 1980, 2023 und 2050. Diese wurden auf Basis von Messungen der KNMI-Station Eindhoven und dem KNMI'14 Hoch-&#40;WH&#41;-Szenario für 2050 berechnet. Verwendete Tools:  \\n        <a href=\\"https://climexp.knmi.nl\\">KNMI Climate Explorer</a> und das <a href=\\"https://www.knmi.nl/nederland-nu/KNMI14_klimaatscenarios/transformatieprogramma\\">KNMI'14 Transformationsprogramm</a>.  \\n      </p>\\n    </div>\\n  </div>\\n\\n\\n<style>\\n  svg{\\n    width:100%;\\n    height: 90%;\\n    float:right;\\n  }\\n\\n  .kansgraphpathconfidence{\\n    opacity:0.15;\\n  }\\n\\n  .legendtext{\\n    font-size: 2vh;\\n     dominant-baseline: middle;\\n  }\\n\\n  .graph-description{\\n    color:#4e4e4e;\\n    font-size:1.5vh;\\n    text-align: left;\\n    bottom: 8%;\\n    position: absolute;\\n    left: 50%;\\n  }\\n</style>"],"names":[],"mappings":"AAuOE,iBAAG,CACD,MAAM,IAAI,CACV,MAAM,CAAE,GAAG,CACX,MAAM,KACR,CAMA,yBAAW,CACT,SAAS,CAAE,GAAG,CACb,iBAAiB,CAAE,MACtB,CAEA,gCAAkB,CAChB,MAAM,OAAO,CACb,UAAU,KAAK,CACf,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,EAAE,CACV,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,GACR"}`
};
const Kansgrafiek = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ratioOfCsvData;
  let xScale;
  let yScale;
  let { index } = $$props;
  let { middellijnData } = $$props;
  let { middellijnData2050 } = $$props;
  let { offset } = $$props;
  let { confidenceData } = $$props;
  let { currentStepName } = $$props;
  let { stepName } = $$props;
  let screenHeight;
  let screenWidth;
  let xAxisWidthRatio;
  let yAxisScaleKans;
  let textPaddingKans;
  let grafiekPositionY;
  let grafiekPositionX;
  let legendPositionX1;
  let legendPositionX2;
  d3.area().x((d) => xScale(d.Kans)).y0((d) => yScale(d.Lower_zonder)).y1((d) => yScale(d.Upper_zonder));
  d3.area().x((d) => xScale(d.Kans)).y0((d) => yScale(d.Lower_met)).y1((d) => yScale(d.Upper_met));
  d3.area().x((d) => xScale(d.Kans)).y0((d) => yScale(d.Lower_2050)).y1((d) => yScale(d.Upper_2050));
  if ($$props.index === void 0 && $$bindings.index && index !== void 0) $$bindings.index(index);
  if ($$props.middellijnData === void 0 && $$bindings.middellijnData && middellijnData !== void 0) $$bindings.middellijnData(middellijnData);
  if ($$props.middellijnData2050 === void 0 && $$bindings.middellijnData2050 && middellijnData2050 !== void 0) $$bindings.middellijnData2050(middellijnData2050);
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0) $$bindings.offset(offset);
  if ($$props.confidenceData === void 0 && $$bindings.confidenceData && confidenceData !== void 0) $$bindings.confidenceData(confidenceData);
  if ($$props.currentStepName === void 0 && $$bindings.currentStepName && currentStepName !== void 0) $$bindings.currentStepName(currentStepName);
  if ($$props.stepName === void 0 && $$bindings.stepName && stepName !== void 0) $$bindings.stepName(stepName);
  $$result.css.add(css$6);
  ratioOfCsvData = Math.round(offset * 6 * middellijnData.length);
  Math.round(offset * 6 * confidenceData.length);
  {
    {
      xAxisWidthRatio = 0.38;
      yAxisScaleKans = 0.7;
      textPaddingKans = 0.25;
      grafiekPositionY = 0;
      grafiekPositionX = 0.45;
      legendPositionX1 = 0.33;
      legendPositionX2 = 0.35;
    }
  }
  xScale = d3.scaleLog().domain([100, 0.01]).range([0, screenWidth * xAxisWidthRatio]);
  yScale = d3.scaleLinear().domain([28, 49]).range([screenHeight * yAxisScaleKans, 0]);
  return `<div class="grafiek">${index > 1 ? `<div class="graphtext" style="${"top:" + escape(`${textPaddingKans * screenHeight}px`, true)}">${currentStepName === "scatter" || currentStepName === "kansgrafiek" ? `<h1 class="scroll-text-kansgraph" data-svelte-h="svelte-1bjtoec">Statistische Berechnungen</h1> <p class="scroll-text-kansgraph" data-svelte-h="svelte-14e8odf">Die Wahrscheinlichkeit von 40 Grad Celsius ist durch den Klimawandel stark gestiegen. Hitzestatistiken für Eindhoven zeigen, wie hoch die Wahrscheinlichkeit ist, dass eine bestimmte Temperatur in einem Jahr auftritt.</p> <div class="fade-in" style="${"visibility:" + escape(
    ratioOfCsvData > 100 && currentStepName === "kansgrafiek" ? "visible" : "hidden",
    true
  )}"><p class="scroll-text-kansgraph" data-svelte-h="svelte-1obxj4">Als Niels klein war, <mark style="background: #648fff50 !important">um 1980,</mark> war es nahezu unmöglich, dass es 40 Grad werden würde.</p></div> <div class="fade-in" style="${"visibility:" + escape(
    ratioOfCsvData > 250 && currentStepName === "kansgrafiek" ? "visible" : "hidden",
    true
  )}"><p class="scroll-text-kansgraph" data-svelte-h="svelte-1i27ac1">Mittlerweile, <mark style="background: #ffb00050 !important">im Jahr 2023</mark>, liegt die Wahrscheinlichkeit für 40 Grad bei etwa 2%.</p></div> <div class="fade-in" style="${"visibility:" + escape(
    ratioOfCsvData > 360 && currentStepName === "kansgrafiek" ? "visible" : "hidden",
    true
  )}"><p class="scroll-text-kansgraph" data-svelte-h="svelte-11pucxe"><mark style="background: #93003a50 !important">Im Jahr 2050</mark>, wenn Sem erwachsen ist, wird die Wahrscheinlichkeit für 40 Grad auf etwa 8% gestiegen sein.</p></div>` : ``}</div>` : ``} <div class="sticky-div"><svg class="svelte-dlszzn"><g class="svgkansgrafiek" transform="${"translate(" + escape(screenWidth * grafiekPositionX, true) + "," + escape(screenHeight * grafiekPositionY, true) + ")"}">${validate_component(XAxis, "XAxis").$$render(
    $$result,
    {
      xScale,
      height: screenHeight * yAxisScaleKans
    },
    {},
    {}
  )}${validate_component(YAxis, "YAxis").$$render(
    $$result,
    {
      yScale,
      height: screenHeight * yAxisScaleKans
    },
    {},
    {}
  )}<text class="legendtext svelte-dlszzn"${add_attribute("x", screenWidth * legendPositionX1, 0)}${add_attribute("y", yScale(31.8), 0)}>Statistik für:</text><text class="legendtext svelte-dlszzn"${add_attribute("x", screenWidth * legendPositionX2 + screenWidth * 5e-3, 0)}${add_attribute("y", yScale(31), 0)}>1980</text><line${add_attribute("x1", screenWidth * legendPositionX1, 0)}${add_attribute("y1", yScale(31), 0)}${add_attribute("x2", screenWidth * legendPositionX2, 0)}${add_attribute("y2", yScale(31), 0)} stroke="#648fff" stroke-width="0.3vh"></line><text${add_attribute("x", xScale(1.5), 0)} class="axistitle"${add_attribute("y", yScale(26) + 2, 0)}>Wahrscheinlichkeit (%)</text><text class="axistitle" transform="${"translate(" + escape(xAxisWidthRatio * screenWidth * -0.07 - 5, true) + "," + escape(yAxisScaleKans * screenHeight * 0.5, true) + " ) rotate(-90)"}" text-anchor="middle">Temperatur (°C)</text><line${add_attribute("x1", xScale(100), 0)}${add_attribute("y1", yScale(40), 0)}${add_attribute("x2", xScale(0.01), 0)}${add_attribute("y2", yScale(40), 0)} stroke="grey" stroke-dasharray="5,5"></line><text class="graphtitle"${add_attribute("x", xScale(1), 0)}${add_attribute("y", yScale(48), 0)}>Die Wahrscheinlichkeit von Hitze pro Generation</text>${ratioOfCsvData > 170 && currentStepName === "kansgrafiek" ? `<line${add_attribute("x1", xScale(8e-3), 0)}${add_attribute("y1", yScale(37.0855), 0)}${add_attribute("x2", xScale(8e-3), 0)}${add_attribute("y2", yScale(44.0244), 0)} stroke="grey"></line> <line${add_attribute("x1", xScale(75e-4), 0)}${add_attribute("y1", yScale(37.0855), 0)}${add_attribute("x2", xScale(85e-4), 0)}${add_attribute("y2", yScale(37.0855), 0)} stroke="grey"></line> <line${add_attribute("x1", xScale(75e-4), 0)}${add_attribute("y1", yScale(44.0244), 0)}${add_attribute("x2", xScale(85e-4), 0)}${add_attribute("y2", yScale(44.0244), 0)} stroke="grey"></line> <text${add_attribute("x", xScale(75e-4), 0)}${add_attribute("y", yScale(40.5), 0)} font-size="1.3vh" marker-end="url(#triangle)">Bandbreite</text>` : ``}${ratioOfCsvData > 270 ? `<line${add_attribute("x1", xScale(1.65), 0)}${add_attribute("y1", yScale(28), 0)}${add_attribute("x2", xScale(1.7), 0)}${add_attribute("y2", yScale(40), 0)} stroke="grey" stroke-dasharray="5,5"></line> <text class="legendtext svelte-dlszzn"${add_attribute("x", screenWidth * legendPositionX2 + screenWidth * 5e-3, 0)}${add_attribute("y", yScale(31) + screenHeight * 0.02, 0)}>2023</text> <line${add_attribute("x1", screenWidth * legendPositionX1, 0)}${add_attribute("y1", yScale(31) + screenHeight * 0.02, 0)}${add_attribute("x2", screenWidth * legendPositionX2, 0)}${add_attribute("y2", yScale(31) + screenHeight * 0.02, 0)} stroke="#ffb000" stroke-width="0.3vh"></line> <text${add_attribute("x", xScale(1.65) + screenWidth * 3e-3, 0)}${add_attribute("y", yScale(28) - screenHeight * 5e-3, 0)} fill="#ffb000" font-size="2vh">2%</text>` : ``}${ratioOfCsvData > 360 ? `<line${add_attribute("x1", xScale(7.8), 0)}${add_attribute("y1", yScale(28), 0)}${add_attribute("x2", xScale(7.8), 0)}${add_attribute("y2", yScale(40), 0)} stroke="grey" stroke-dasharray="5,5"></line> <text class="legendtext svelte-dlszzn"${add_attribute("x", screenWidth * legendPositionX2 + screenWidth * 5e-3, 0)}${add_attribute("y", yScale(31) + screenHeight * 0.04, 0)}>2050</text> <line${add_attribute("x1", screenWidth * legendPositionX1, 0)}${add_attribute("y1", yScale(31) + screenHeight * 0.04, 0)}${add_attribute("x2", screenWidth * legendPositionX2, 0)}${add_attribute("y2", yScale(31) + screenHeight * 0.04, 0)} stroke="#93003a" stroke-width="0.3vh"></line> <text${add_attribute("x", xScale(7.8) + screenWidth * 3e-3, 0)}${add_attribute("y", yScale(28) - screenHeight * 5e-3, 0)} fill="#93003a" font-size="2vh">8%</text>` : ``}</g></svg> <p class="graph-description svelte-dlszzn" data-svelte-h="svelte-yov0q4">Hitzestatistiken für Eindhoven für das Klima von 1980, 2023 und 2050. Diese wurden auf Basis von Messungen der KNMI-Station Eindhoven und dem KNMI&#39;14 Hoch-(WH)-Szenario für 2050 berechnet. Verwendete Tools:  
        <a href="https://climexp.knmi.nl">KNMI Climate Explorer</a> und das <a href="https://www.knmi.nl/nederland-nu/KNMI14_klimaatscenarios/transformatieprogramma">KNMI&#39;14 Transformationsprogramm</a>.</p></div> </div>`;
});
const css$5 = {
  code: ".stepdiv.svelte-1mh7yz3{height:100%}.telefoon.svelte-1mh7yz3{position:absolute;width:60%;left:20%;border:none;box-shadow:0 0 5px 10px rgba(0, 0, 0, 0.7);border-radius:8px}.telefoonimg.svelte-1mh7yz3{width:100%}",
  map: `{"version":3,"file":"Krantenkoppen.svelte","sources":["Krantenkoppen.svelte"],"sourcesContent":["<script>\\n  import { showImages } from \\"$lib/noncomponents/fadeOutIn\\";\\n  import { afterUpdate, onMount } from \\"svelte\\";\\n  import TextAndImagesScenes from \\"./TextAndImagesScenes.svelte\\";\\n  import { getStepSize } from \\"$lib/noncomponents/helperFunctions\\";\\n\\timport { sound } from \\"$lib/stores.js\\";\\n\\n  export let offset;\\n  export let index;\\n  export let stepName;\\n  export let currentStepName;\\n\\n  let stepSize;\\n  onMount(() => {\\n    stepSize = getStepSize(stepName);\\n  })\\n\\n<\/script>\\n\\n<div class='stepdiv'>  \\n  <div class='telefoon' style='top:{\`\${0.12*stepSize}px\`}'>\\n    <img class='telefoonimg' style='width:100%;' src={'/images/holdingphone.png'} />\\n  </div>\\n\\n</div>\\n\\n{#if $sound && stepName === currentStepName}\\n  <audio src=\\"sounds/night.mp3\\" autoplay loop /> \\n{/if}\\n\\n<style>\\n\\n  .stepdiv{\\n    height:100%;\\n  }\\n\\n  .item .image:after {\\n  width: calc(100% + 150px);\\n  height: 100px;\\n  content: '';\\n  position: absolute;\\n  bottom: -125px;\\n  left: 50%;\\n  transform: translateX(-50%);\\n  border-radius: 50%;\\n  background-color: rgba(0,0,0,0.2);\\n  filter: blur(20px);\\n}\\n\\n.telefoon{\\n  position:absolute;\\n  width:60%;\\n  left:20%;\\n  border: none;\\n  box-shadow: 0 0 5px 10px rgba(0, 0, 0, 0.7);\\n  border-radius: 8px;\\n}\\n\\n.telefoonimg{\\n  width:100%;\\n}\\n\\n</style>\\n\\n\\n"],"names":[],"mappings":"AAgCE,uBAAQ,CACN,OAAO,IACT,CAeF,wBAAS,CACP,SAAS,QAAQ,CACjB,MAAM,GAAG,CACT,KAAK,GAAG,CACR,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAC3C,aAAa,CAAE,GACjB,CAEA,2BAAY,CACV,MAAM,IACR"}`
};
const Krantenkoppen = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $sound, $$unsubscribe_sound;
  $$unsubscribe_sound = subscribe(sound, (value) => $sound = value);
  let { offset } = $$props;
  let { index } = $$props;
  let { stepName } = $$props;
  let { currentStepName } = $$props;
  let stepSize;
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0) $$bindings.offset(offset);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0) $$bindings.index(index);
  if ($$props.stepName === void 0 && $$bindings.stepName && stepName !== void 0) $$bindings.stepName(stepName);
  if ($$props.currentStepName === void 0 && $$bindings.currentStepName && currentStepName !== void 0) $$bindings.currentStepName(currentStepName);
  $$result.css.add(css$5);
  $$unsubscribe_sound();
  return `<div class="stepdiv svelte-1mh7yz3"><div class="telefoon svelte-1mh7yz3" style="${"top:" + escape(`${0.12 * stepSize}px`, true)}"><img class="telefoonimg svelte-1mh7yz3" style="width:100%;"${add_attribute("src", "/images/holdingphone.png", 0)}></div></div> ${$sound && stepName === currentStepName ? `<audio src="sounds/night.mp3" autoplay loop></audio>` : ``}`;
});
const css$4 = {
  code: ".stepdiv.svelte-oy5wh0{height:100%}",
  map: `{"version":3,"file":"AutoRitje.svelte","sources":["AutoRitje.svelte"],"sourcesContent":["<script>\\n  import { showImages } from \\"$lib/noncomponents/fadeOutIn\\";\\n  import { getStepSize } from \\"$lib/noncomponents/helperFunctions\\";\\n  import { afterUpdate, onMount } from \\"svelte\\";\\n  import TextAndImagesScenes from \\"./TextAndImagesScenes.svelte\\";\\n\\timport { sound } from \\"$lib/stores.js\\";\\n\\n  export let offset;\\n  export let index;\\n  export let stepName;\\n  export let currentStepName;\\n\\n  let stepSize;\\n  onMount(() => {\\n    stepSize = getStepSize(stepName);\\n  })\\n\\n  let trafficjam = 0.3\\n\\n\\n  const scenes = [\\n    {\\n      name:'weeralarm',\\n      image:'jpg',\\n      time:0.09,\\n      text:'Am nächsten Tag ist es wieder extrem heiß. Der Rat lautet seit Tagen, drinnen zu bleiben, aber Niels hat eine Idee. Er beschließt, mit Sem ins Schwimmbad zu gehen.',\\n      class: 'scroll-text'\\n    },\\n    {\\n      name:'zwembad',\\n      image:'png',\\n      time:0.18,\\n      text:\\"Sie nehmen das Auto. Kurz etwas Kühlung von der Klimaanlage genießen. Sie freuen sich beide so aufs Schwimmen! Aber das Schwimmbad ist geschlossen. Es ist für das Badpersonal nicht vertretbar, bei diesen Temperaturen zu arbeiten.\\",\\n      class: 'scroll-text'\\n    },\\n    {\\n      name:'nielstel',\\n      image:'png',\\n      time:0.27,\\n      text:'Dann erhält Niels eine Nachricht von Leonie: Die ganze Stadt ist ohne Strom. Das Krankenhaus läuft auf Notstromaggregat. \\"Kannst du bitte bei meiner Mutter vorbeischauen, um zu sehen, wie es ihr geht?\\"',\\n      class: 'scroll-text'\\n    },\\n    {\\n      name:'file',\\n      image:'png',\\n      time:0.36,\\n      text:'Niels und Sem steigen wieder ins Auto. Auf den Straßen ist sehr viel los. Viele Menschen versuchen, wegen des Stromausfalls aus der Stadt zu kommen. Niels macht sich Sorgen. Wie lange wird dieser Blackout dauern?',\\n      class: 'scroll-text'\\n    },\\n    {\\n      name:'kerk',\\n      image:'png',\\n      time:0.45,\\n      text:'Kirchen, Sporthallen, Supermärkte und Gemeindezentren werden spontan als kühle Zufluchtsorte eingerichtet.',\\n      class: 'scroll-text'\\n    },\\n    {\\n      name:'pomp',\\n      image:'png',\\n      time:0.63,\\n      text:\\"Vor den Tankstellen stehen riesige Autoschlangen. Genug Benzin vorhanden, aber niemand kann tanken, weil die Kartenlesegeräte nicht mehr funktionieren.\\",\\n      class: 'scroll-text'\\n    },\\n    {\\n      name:'manonwel',\\n      image:'png',\\n      time:0.72,\\n      text:\\"Als Niels einen erschöpften Mann am Boden sitzen sieht, zögert er keinen Moment. Er steigt aus dem Auto und geht zu ihm. Der Mann scheint an Dehydrierung zu leiden. Schnell gibt Niels ihm etwas Wasser und hilft ihm auf den Rücksitz des Autos. Zusammen fahren sie zum Krankenhaus. Dort sehen sie bald Leonie.\\",\\n      class: 'scroll-text'\\n    },\\n    {\\n      name:'leonieradeloos',\\n      image:'png',\\n      time:0.81,\\n      text:'Niels erklärt, dass sie noch nicht bei ihrer Mutter waren. \\"Aber wir schauen jetzt nach ihr!\\" Niels und Leonie geben sich einen hastigen Kuss. \\"Komm Sem, wir fahren zu Oma.\\"<br/><br/> Leonie schaut sich um. All diese Menschen, die Hilfe brauchen. Sie wischt sich den Schweiß von der Stirn. Wie soll das weitergehen?',\\n      class: 'scroll-text'\\n    }\\n  ]\\n\\n  let currentScene;\\n  afterUpdate(() => {\\n    currentScene = showImages(stepName, currentStepName, scenes, currentScene, offset);\\n  })\\n\\n<\/script>\\n\\n<div class='stepdiv'>\\n\\n  <TextAndImagesScenes {scenes} {stepSize} imageOffset={0.03}/>\\n\\n  {#if $sound && stepName === currentStepName && offset < 0.6 && offset < 0.27}\\n    <audio src=\\"sounds/carstart.mp3\\" autoplay  /> \\n  {/if}\\n\\n  {#if $sound && stepName === currentStepName && ((offset > 0.05 && offset < 0.27) || offset > 0.36) && offset < 0.84}\\n    <audio src=\\"sounds/cardriving.mp3\\" autoplay loop /> \\n  {/if}\\n\\n  {#if $sound && stepName === currentStepName && (offset > 0.27 || offset > 0.72)}\\n    <audio src=\\"sounds/gettingoutcar.mp4\\" autoplay /> \\n  {/if}\\n\\n  {#if $sound && stepName === currentStepName && offset > 0.36 && offset < 0.74}\\n    <audio src=\\"sounds/trafficjam.mp3\\" autoplay bind:volume={trafficjam}/> \\n  {/if}\\n\\n  {#if $sound && stepName === currentStepName && offset > 0.84}\\n    <audio src=\\"sounds/ziekenhuis.mp3\\" autoplay /> \\n  {/if}\\n\\n</div>\\n\\n<style>\\n\\n  .stepdiv{\\n    height:100%;\\n  }\\n  \\n</style>\\n\\n\\n"],"names":[],"mappings":"AAkHE,sBAAQ,CACN,OAAO,IACT"}`
};
const AutoRitje = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $sound, $$unsubscribe_sound;
  $$unsubscribe_sound = subscribe(sound, (value) => $sound = value);
  let { offset } = $$props;
  let { index } = $$props;
  let { stepName } = $$props;
  let { currentStepName } = $$props;
  let stepSize;
  let trafficjam = 0.3;
  const scenes = [
    {
      name: "weeralarm",
      image: "jpg",
      time: 0.09,
      text: "Am nächsten Tag ist es wieder extrem heiß. Der Rat lautet seit Tagen, drinnen zu bleiben, aber Niels hat eine Idee. Er beschließt, mit Sem ins Schwimmbad zu gehen.",
      class: "scroll-text"
    },
    {
      name: "zwembad",
      image: "png",
      time: 0.18,
      text: "Sie nehmen das Auto. Kurz etwas Kühlung von der Klimaanlage genießen. Sie freuen sich beide so aufs Schwimmen! Aber das Schwimmbad ist geschlossen. Es ist für das Badpersonal nicht vertretbar, bei diesen Temperaturen zu arbeiten.",
      class: "scroll-text"
    },
    {
      name: "nielstel",
      image: "png",
      time: 0.27,
      text: 'Dann erhält Niels eine Nachricht von Leonie: Die ganze Stadt ist ohne Strom. Das Krankenhaus läuft auf Notstromaggregat. "Kannst du bitte bei meiner Mutter vorbeischauen, um zu sehen, wie es ihr geht?"',
      class: "scroll-text"
    },
    {
      name: "file",
      image: "png",
      time: 0.36,
      text: "Niels und Sem steigen wieder ins Auto. Auf den Straßen ist sehr viel los. Viele Menschen versuchen, wegen des Stromausfalls aus der Stadt zu kommen. Niels macht sich Sorgen. Wie lange wird dieser Blackout dauern?",
      class: "scroll-text"
    },
    {
      name: "kerk",
      image: "png",
      time: 0.45,
      text: "Kirchen, Sporthallen, Supermärkte und Gemeindezentren werden spontan als kühle Zufluchtsorte eingerichtet.",
      class: "scroll-text"
    },
    {
      name: "pomp",
      image: "png",
      time: 0.63,
      text: "Vor den Tankstellen stehen riesige Autoschlangen. Genug Benzin vorhanden, aber niemand kann tanken, weil die Kartenlesegeräte nicht mehr funktionieren.",
      class: "scroll-text"
    },
    {
      name: "manonwel",
      image: "png",
      time: 0.72,
      text: "Als Niels einen erschöpften Mann am Boden sitzen sieht, zögert er keinen Moment. Er steigt aus dem Auto und geht zu ihm. Der Mann scheint an Dehydrierung zu leiden. Schnell gibt Niels ihm etwas Wasser und hilft ihm auf den Rücksitz des Autos. Zusammen fahren sie zum Krankenhaus. Dort sehen sie bald Leonie.",
      class: "scroll-text"
    },
    {
      name: "leonieradeloos",
      image: "png",
      time: 0.81,
      text: 'Niels erklärt, dass sie noch nicht bei ihrer Mutter waren. "Aber wir schauen jetzt nach ihr!" Niels und Leonie geben sich einen hastigen Kuss. "Komm Sem, wir fahren zu Oma."<br/><br/> Leonie schaut sich um. All diese Menschen, die Hilfe brauchen. Sie wischt sich den Schweiß von der Stirn. Wie soll das weitergehen?',
      class: "scroll-text"
    }
  ];
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0) $$bindings.offset(offset);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0) $$bindings.index(index);
  if ($$props.stepName === void 0 && $$bindings.stepName && stepName !== void 0) $$bindings.stepName(stepName);
  if ($$props.currentStepName === void 0 && $$bindings.currentStepName && currentStepName !== void 0) $$bindings.currentStepName(currentStepName);
  $$result.css.add(css$4);
  $$unsubscribe_sound();
  return `<div class="stepdiv svelte-oy5wh0">${validate_component(TextAndImagesScenes, "TextAndImagesScenes").$$render($$result, { scenes, stepSize, imageOffset: 0.03 }, {}, {})} ${$sound && stepName === currentStepName && offset < 0.6 && offset < 0.27 ? `<audio src="sounds/carstart.mp3" autoplay></audio>` : ``} ${$sound && stepName === currentStepName && (offset > 0.05 && offset < 0.27 || offset > 0.36) && offset < 0.84 ? `<audio src="sounds/cardriving.mp3" autoplay loop></audio>` : ``} ${$sound && stepName === currentStepName && (offset > 0.27 || offset > 0.72) ? `<audio src="sounds/gettingoutcar.mp4" autoplay></audio>` : ``} ${$sound && stepName === currentStepName && offset > 0.36 && offset < 0.74 ? `<audio src="sounds/trafficjam.mp3" autoplay${add_attribute("volume", trafficjam, 0)}></audio>` : ``} ${$sound && stepName === currentStepName && offset > 0.84 ? `<audio src="sounds/ziekenhuis.mp3" autoplay></audio>` : ``} </div>`;
});
const css$3 = {
  code: ".aftitelingdiv.svelte-1vm7201{height:100%}.leeslijstcat.svelte-1vm7201{text-align:left;font-size:2.3vh}.copyright.svelte-1vm7201{font-size:2.3vh !important;bottom:10px;position:absolute;left:20%;width:60%;padding:20px;color:white !important}.leeslijst.svelte-1vm7201{font-size:2.3vh !important;bottom:100px;position:absolute;left:20%;width:60%;padding:20px;background-color:rgba(81, 71, 71, 0);color:white !important}.imgaftiteling.svelte-1vm7201{position:sticky;position:-webkit-sticky;top:0px;max-width:100%;max-height:100%}ul.myUL.svelte-1vm7201{text-align:left}a.svelte-1vm7201:link{color:#ffffff;text-decoration:none;border-bottom:1px solid}a.svelte-1vm7201:visited{color:white}a.svelte-1vm7201:hover{color:#ffffff;border-bottom:none}a.svelte-1vm7201:active{color:#ffffff}@media only screen and (max-width: 600px) and (orientation:portrait){.imgaftiteling.svelte-1vm7201{height:100%;object-fit:cover;visibility:visible}.leeslijst.svelte-1vm7201{width:90%;left:2%;padding:0}}",
  map: `{"version":3,"file":"Aftiteling.svelte","sources":["Aftiteling.svelte"],"sourcesContent":["<script>\\n  import { showImages } from \\"$lib/noncomponents/fadeOutIn\\";\\n  import { afterUpdate, onMount } from \\"svelte\\";\\n\\n  export let offset;\\n  export let index;\\n  export let stepName;\\n  export let currentStepName;\\n\\n  let stepSize;\\n  onMount(() => {\\n    let stepRect = document.getElementsByClassName('step_aftiteling')[0].getBoundingClientRect()\\n    stepSize = stepRect.bottom - stepRect.top;\\n  })\\n\\n  const scenes = [\\n    {\\n      name:'',\\n      image:'',\\n      time:0.1,\\n      text:'In den letzten Jahren gab es weltweit extreme Hitzeausreißer, die selbst Klimawissenschaftler überrascht haben. Auch in den Niederlanden könnte es einmal extrem heiß werden.'\\n    },\\n    {\\n      name:'',\\n      image:'',\\n      time:0.25,\\n      text:'Deshalb haben wir mit der <a style= \\"color:white\\" href=\\"https://www.climateadaptationservices.com\\" target=\\"_blank\\">Stiftung CAS</a> diese Klimageschichte erstellt. Wir wollen erzählen und veranschaulichen, was passieren kann, wenn wir mit einer beispiellosen Hitzekrise konfrontiert werden. Damit sich jeder der Gefahren bewusst wird und wir uns rechtzeitig vorbereiten können. Durch den Dialog miteinander können wir auch beginnen, über Handlungsmöglichkeiten nachzudenken.'\\n    },\\n    {\\n      name:'',\\n      image:'',\\n      time:0.4,\\n      text:'Diese Geschichte basiert auf den neuesten wissenschaftlichen Erkenntnissen über außergewöhnliche Wetterereignisse in den Niederlanden und auf zahlreichen Gesprächen mit Experten auf dem Gebiet der Klimaanpassung, Hitze und Krisenmanagement. Die Bilder wurden mit KI erstellt.'\\n    },\\n    {\\n      name:'',\\n      image:'',\\n      time:0.55,\\n      text:'Unser Dank gilt Marije Bakker (NIPV), Annelies Balkema (Waterschap De Dommel), Janette Bessembinder (KNMI), Lana Garrels (Veiligheidsregio Amsterdam Amstelland), Madeleen Helmer (Klimaatverbond Nederland), Frank van Lamoen (Provinz Noord-Brabant), Renee Linck (NIPV), Karla Niggebrugge (Provinz Brabant) und Karin van der Wiel (KNMI). Selbstverständlich ist nur CAS für das Endergebnis verantwortlich.'\\n    }\\n  ]\\n\\n<\/script>\\n\\n<div class = 'aftitelingdiv'>\\n  <img class='imgaftiteling' src='/images/heatwave1.png' width='100%'/>\\n  \\n  {#each scenes as scene,i}\\n    <div class='scroll-text-block outro' style='top:{\`\${(scene['time']+0.05)*stepSize}px\`}'>\\n      <p class='scroll-text outro-text'>{@html scene['text']}</p>\\n    </div>\\n  {/each}\\n\\n  \\n  <div class = 'leeslijst'>\\n    <h1>Weiterlesen?</h1>\\n    <h3 class = 'leeslijstcat '>Wissenschaftliche Publikationen</h3>\\n    <ul class=\\"myUL\\">\\n      <li><a href=\\"https://www.nature.com/articles/s41558-021-01092-9\\" target=\\"_blank\\">Artikel in Nature:</a> 'Zunehmende Wahrscheinlichkeit von rekordbrechenden Klimaextremen'\\n      </li>\\n      <li><a href=\\"https://mcusercontent.com/854a9a3e09405d4ab19a4a9d5/files/95512c98-67bc-9849-c006-5fe389b776ed/WWA_scientific_report_Northern_Hemisphere_heat.pdf\\" target=\\"_blank\\">Wissenschaftliche Studie:</a> 'Extreme Hitze in Nordamerika, Europa und China im Juli 2023 durch Klimawandel viel wahrscheinlicher' \\n      </li>\\n      <li><a href=\\"/PosterEGU.pdf\\" target=\\"_blank\\">Poster über die Folgen extremer Hitze</a>  \\n      </li>\\n    </ul>\\n    \\n    <h3 class = 'leeslijstcat'>KNMI-Meldungen</h3>\\n    <ul class=\\"myUL\\">  \\n      <li><a href=\\"https://www.knmi.nl/over-het-knmi/nieuws/ieder-jaar-een-verpletterend-hitterecord \\" target=\\"_blank\\">Jedes Jahr ein vernichtender Hitzerekord?</a></li>\\n      <li><a href=\\"https://www.knmi.nl/over-het-knmi/nieuws/absolute-temperatuurrecords-door-saharahitte \\" target=\\"_blank\\">Absolute Temperaturrekorde durch Sahara-Hitze</a></li>\\n      <li><a href=\\"https://www.knmi.nl/over-het-knmi/nieuws/toename-hittegolven-in-europa-gelinkt-aan-veranderende-straalstroom\\" target=\\"_blank\\">Zunahme von Hitzewellen in Europa mit verändertem Jetstream verbunden</a></li>\\n      <li><a href=\\"https://www.knmi.nl/over-het-knmi/nieuws/extreme-hitte-in-april-in-middellandse-zeegebied-waarschijnlijker-door-klimaatverandering\\" target=\\"_blank\\">Extreme Hitze im April im Mittelmeerraum durch Klimawandel wahrscheinlicher</a></li>\\n    </ul>\\n    \\n    <h3 class = 'leeslijstcat'>Videos und Webinare</h3>\\n    <ul class=\\"myUL\\">\\n      <li><a href=\\"https://www.youtube.com/watch?v=lhHbjdhAqxs\\" target=\\"_blank\\">Mini-Vorlesung der Universität der Niederlande: Werden die Niederlande immer häufiger mit Hitzewellen konfrontiert?</a></li>\\n      <li><a href=\\"https://www.youtube.com/watch?v=2NZYAkmqPr8\\" target=\\"_blank\\">KNMI-Video: Temperatur zum ersten Mal über 40 Grad</a></li>\\n      <li><a href=\\"https://klimaatverbond.nl/actueel/terugblik-op-het-webinar-de-hittelessen-van-portland-en-het-code-rood-scenario-in-nederland/\\" target=\\"_blank\\">Webinar des Klimaatverbond Nederland über die (Hitze-)Lektionen von Portland und das Code-Rot-Szenario in den Niederlanden</a></li>\\n    </ul>  \\n    \\n    <h3 class = 'leeslijstcat'>Fiktion</h3>\\n    <ul class=\\"myUL\\">\\n      <li><a href=\\"https://www.npo3.nl/hitte/POMS_S_EO_16238783\\" target=\\"_blank\\">Katastrophenserie Hitze</a></li>\\n    </ul> \\n  </div>\\n\\n  <div class = 'copyright'>\\n    <p >© 2023 <a href=\\"http://www.climateadaptationservices.com\\" target=\\"_blank\\">Climate Adaptation Services (CAS)</a></p>\\n  </div>\\n</div>\\n\\n<style>\\n\\n  .aftitelingdiv{\\n    height:100%;\\n  }\\n\\n  .leeslijstcat{\\n    text-align: left;\\n    font-size: 2.3vh;\\n  }\\n\\n  .copyright{\\n    font-size: 2.3vh !important;\\n    bottom:10px; \\n    position:absolute;\\n    left:20%;\\n    width:60%;\\n    padding:20px;\\n    color: white !important;\\n  }\\n\\n  .leeslijst{\\n    font-size: 2.3vh !important;\\n    bottom:100px; \\n    position:absolute;\\n    left:20%;\\n    width:60%;\\n    padding:20px;\\n    background-color: rgba(81, 71, 71, 0);\\n    color: white !important;\\n  }\\n\\n  .imgaftiteling{\\n    position: sticky;\\n    position: -webkit-sticky; /* Safari */\\n    top: 0px;\\n    max-width: 100%;\\n    max-height: 100%;\\n  }\\n  \\n  ul.myUL {\\n    text-align: left;\\n  }\\n\\n  a:link {    /* unvisited link */\\n    color: #ffffff;\\n    text-decoration: none;\\n    border-bottom: 1px solid;\\n  }\\n  a:visited {    /* visited link */\\n      color: white;\\n  }\\n  a:hover {    /* mouse over link */\\n      color: #ffffff;\\n      border-bottom: none;\\n  }\\n  a:active {    /* active link */\\n      color: #ffffff;\\n  }\\n\\n  @media only screen and (max-width: 600px) and (orientation:portrait){\\n\\n  .imgaftiteling{\\n    height:100%;\\n    object-fit: cover;\\n    visibility:visible;\\n  }\\n\\n  .leeslijst{\\n    width:90%;\\n    left:2%;\\n    padding:0;\\n    \\n  }\\n\\n\\n}\\n\\n    \\n</style>\\n\\n\\n"],"names":[],"mappings":"AA8FE,6BAAc,CACZ,OAAO,IACT,CAEA,4BAAa,CACX,UAAU,CAAE,IAAI,CAChB,SAAS,CAAE,KACb,CAEA,yBAAU,CACR,SAAS,CAAE,KAAK,CAAC,UAAU,CAC3B,OAAO,IAAI,CACX,SAAS,QAAQ,CACjB,KAAK,GAAG,CACR,MAAM,GAAG,CACT,QAAQ,IAAI,CACZ,KAAK,CAAE,KAAK,CAAC,UACf,CAEA,yBAAU,CACR,SAAS,CAAE,KAAK,CAAC,UAAU,CAC3B,OAAO,KAAK,CACZ,SAAS,QAAQ,CACjB,KAAK,GAAG,CACR,MAAM,GAAG,CACT,QAAQ,IAAI,CACZ,gBAAgB,CAAE,KAAK,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,CAAC,CAAC,CACrC,KAAK,CAAE,KAAK,CAAC,UACf,CAEA,6BAAc,CACZ,QAAQ,CAAE,MAAM,CAChB,QAAQ,CAAE,cAAc,CACxB,GAAG,CAAE,GAAG,CACR,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,IACd,CAEA,EAAE,oBAAM,CACN,UAAU,CAAE,IACd,CAEA,gBAAC,KAAM,CACL,KAAK,CAAE,OAAO,CACd,eAAe,CAAE,IAAI,CACrB,aAAa,CAAE,GAAG,CAAC,KACrB,CACA,gBAAC,QAAS,CACN,KAAK,CAAE,KACX,CACA,gBAAC,MAAO,CACJ,KAAK,CAAE,OAAO,CACd,aAAa,CAAE,IACnB,CACA,gBAAC,OAAQ,CACL,KAAK,CAAE,OACX,CAEA,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,CAAC,GAAG,CAAC,aAAa,QAAQ,CAAC,CAEpE,6BAAc,CACZ,OAAO,IAAI,CACX,UAAU,CAAE,KAAK,CACjB,WAAW,OACb,CAEA,yBAAU,CACR,MAAM,GAAG,CACT,KAAK,EAAE,CACP,QAAQ,CAEV,CAGF"}`
};
const Aftiteling = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { offset } = $$props;
  let { index } = $$props;
  let { stepName } = $$props;
  let { currentStepName } = $$props;
  let stepSize;
  const scenes = [
    {
      name: "",
      image: "",
      time: 0.1,
      text: "In den letzten Jahren gab es weltweit extreme Hitzeausreißer, die selbst Klimawissenschaftler überrascht haben. Auch in den Niederlanden könnte es einmal extrem heiß werden."
    },
    {
      name: "",
      image: "",
      time: 0.25,
      text: 'Deshalb haben wir mit der <a style= "color:white" href="https://www.climateadaptationservices.com" target="_blank">Stiftung CAS</a> diese Klimageschichte erstellt. Wir wollen erzählen und veranschaulichen, was passieren kann, wenn wir mit einer beispiellosen Hitzekrise konfrontiert werden. Damit sich jeder der Gefahren bewusst wird und wir uns rechtzeitig vorbereiten können. Durch den Dialog miteinander können wir auch beginnen, über Handlungsmöglichkeiten nachzudenken.'
    },
    {
      name: "",
      image: "",
      time: 0.4,
      text: "Diese Geschichte basiert auf den neuesten wissenschaftlichen Erkenntnissen über außergewöhnliche Wetterereignisse in den Niederlanden und auf zahlreichen Gesprächen mit Experten auf dem Gebiet der Klimaanpassung, Hitze und Krisenmanagement. Die Bilder wurden mit KI erstellt."
    },
    {
      name: "",
      image: "",
      time: 0.55,
      text: "Unser Dank gilt Marije Bakker (NIPV), Annelies Balkema (Waterschap De Dommel), Janette Bessembinder (KNMI), Lana Garrels (Veiligheidsregio Amsterdam Amstelland), Madeleen Helmer (Klimaatverbond Nederland), Frank van Lamoen (Provinz Noord-Brabant), Renee Linck (NIPV), Karla Niggebrugge (Provinz Brabant) und Karin van der Wiel (KNMI). Selbstverständlich ist nur CAS für das Endergebnis verantwortlich."
    }
  ];
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0) $$bindings.offset(offset);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0) $$bindings.index(index);
  if ($$props.stepName === void 0 && $$bindings.stepName && stepName !== void 0) $$bindings.stepName(stepName);
  if ($$props.currentStepName === void 0 && $$bindings.currentStepName && currentStepName !== void 0) $$bindings.currentStepName(currentStepName);
  $$result.css.add(css$3);
  return `<div class="aftitelingdiv svelte-1vm7201"><img class="imgaftiteling svelte-1vm7201" src="/images/heatwave1.png" width="100%"> ${each(scenes, (scene, i) => {
    return `<div class="scroll-text-block outro" style="${"top:" + escape(`${(scene["time"] + 0.05) * stepSize}px`, true)}"><p class="scroll-text outro-text"><!-- HTML_TAG_START -->${scene["text"]}<!-- HTML_TAG_END --></p> </div>`;
  })} <div class="leeslijst svelte-1vm7201" data-svelte-h="svelte-k4yz9v"><h1>Weiterlesen?</h1> <h3 class="leeslijstcat  svelte-1vm7201">Wissenschaftliche Publikationen</h3> <ul class="myUL svelte-1vm7201"><li><a href="https://www.nature.com/articles/s41558-021-01092-9" target="_blank" class="svelte-1vm7201">Artikel in Nature:</a> &#39;Zunehmende Wahrscheinlichkeit von rekordbrechenden Klimaextremen&#39;</li> <li><a href="https://mcusercontent.com/854a9a3e09405d4ab19a4a9d5/files/95512c98-67bc-9849-c006-5fe389b776ed/WWA_scientific_report_Northern_Hemisphere_heat.pdf" target="_blank" class="svelte-1vm7201">Wissenschaftliche Studie:</a> &#39;Extreme Hitze in Nordamerika, Europa und China im Juli 2023 durch Klimawandel viel wahrscheinlicher&#39;</li> <li><a href="/PosterEGU.pdf" target="_blank" class="svelte-1vm7201">Poster über die Folgen extremer Hitze</a></li></ul> <h3 class="leeslijstcat svelte-1vm7201">KNMI-Meldungen</h3> <ul class="myUL svelte-1vm7201"><li><a href="https://www.knmi.nl/over-het-knmi/nieuws/ieder-jaar-een-verpletterend-hitterecord " target="_blank" class="svelte-1vm7201">Jedes Jahr ein vernichtender Hitzerekord?</a></li> <li><a href="https://www.knmi.nl/over-het-knmi/nieuws/absolute-temperatuurrecords-door-saharahitte " target="_blank" class="svelte-1vm7201">Absolute Temperaturrekorde durch Sahara-Hitze</a></li> <li><a href="https://www.knmi.nl/over-het-knmi/nieuws/toename-hittegolven-in-europa-gelinkt-aan-veranderende-straalstroom" target="_blank" class="svelte-1vm7201">Zunahme von Hitzewellen in Europa mit verändertem Jetstream verbunden</a></li> <li><a href="https://www.knmi.nl/over-het-knmi/nieuws/extreme-hitte-in-april-in-middellandse-zeegebied-waarschijnlijker-door-klimaatverandering" target="_blank" class="svelte-1vm7201">Extreme Hitze im April im Mittelmeerraum durch Klimawandel wahrscheinlicher</a></li></ul> <h3 class="leeslijstcat svelte-1vm7201">Videos und Webinare</h3> <ul class="myUL svelte-1vm7201"><li><a href="https://www.youtube.com/watch?v=lhHbjdhAqxs" target="_blank" class="svelte-1vm7201">Mini-Vorlesung der Universität der Niederlande: Werden die Niederlande immer häufiger mit Hitzewellen konfrontiert?</a></li> <li><a href="https://www.youtube.com/watch?v=2NZYAkmqPr8" target="_blank" class="svelte-1vm7201">KNMI-Video: Temperatur zum ersten Mal über 40 Grad</a></li> <li><a href="https://klimaatverbond.nl/actueel/terugblik-op-het-webinar-de-hittelessen-van-portland-en-het-code-rood-scenario-in-nederland/" target="_blank" class="svelte-1vm7201">Webinar des Klimaatverbond Nederland über die (Hitze-)Lektionen von Portland und das Code-Rot-Szenario in den Niederlanden</a></li></ul> <h3 class="leeslijstcat svelte-1vm7201">Fiktion</h3> <ul class="myUL svelte-1vm7201"><li><a href="https://www.npo3.nl/hitte/POMS_S_EO_16238783" target="_blank" class="svelte-1vm7201">Katastrophenserie Hitze</a></li></ul></div> <div class="copyright svelte-1vm7201" data-svelte-h="svelte-3ju2s9"><p>© 2023 <a href="http://www.climateadaptationservices.com" target="_blank" class="svelte-1vm7201">Climate Adaptation Services (CAS)</a></p></div> </div>`;
});
const css$2 = {
  code: ".navigation-svg.svelte-11sam4r.svelte-11sam4r{width:100%;height:100%}.navigation-svg.svelte-11sam4r:hover .chapter-text-active.svelte-11sam4r{opacity:1\n  }.chapter-circle.svelte-11sam4r.svelte-11sam4r{fill:white;fill-opacity:0.01;stroke:#FDB813;stroke-width:10px;transition:all 0.5s;opacity:0.7;cursor:pointer}.chapter-text.svelte-11sam4r.svelte-11sam4r{text-anchor:end;font-size:16px}.chapterg.svelte-11sam4r:hover .chapter-text.svelte-11sam4r{opacity:0.5}.chapterg.svelte-11sam4r:hover .chapter-circle.svelte-11sam4r{r:8;stroke-width:7px}.chapterg.svelte-11sam4r.svelte-11sam4r{cursor:pointer}",
  map: `{"version":3,"file":"NavigationPanel.svelte","sources":["NavigationPanel.svelte"],"sourcesContent":["<script>\\n\\n  export let stepNames;\\n  export let currentStepName;\\n  export let height;\\n  export let offset;\\n\\n  const yOffset = 40\\n  $: innerHeight = height - 2*yOffset;\\n\\n  function click(stepNameClicked){\\n    document.getElementsByClassName('step_' + stepNameClicked)[0].scrollIntoView({ behavior: \\"smooth\\", block: \\"start\\", inline: \\"nearest\\" })\\n  }\\n\\n<\/script>\\n\\n{#if offset > 0.1 || currentStepName !== 'thuis'}\\n  <svg class='navigation-svg'>\\n    {#each stepNames as stepName,i}\\n      <g class='chapterg' transform='translate(170,{yOffset + (innerHeight/stepNames.length)*i})'>\\n        <text class='chapter-text {(currentStepName === stepName) ? 'chapter-text-active' : ''}' fill={(['wandeling', 'krantenkoppen', 'aftiteling'].includes(currentStepName)) ? 'white' : 'rgb(130, 130, 130)'} dy='0.26em' dx='-25' opacity='0'>{stepName.charAt(0).toUpperCase() + stepName.slice(1)}</text>\\n        <circle class='chapter-circle' r={(stepName === currentStepName) ? '8' : '1'} stroke-width={(stepName === currentStepName) ? '7px' : '10px'} opacity='1' fill='cyan' />\\n        <rect width='130' height={innerHeight/stepNames.length} opacity='0' x='-110' y={-(innerHeight/stepNames.length)/2} on:click={() => click(stepName)} pointer-events={(currentStepName === stepName) ? 'none' : 'default'}/>\\n      </g>\\n\\n    {/each}\\n  </svg>\\n{/if}\\n\\n\\n<style>\\n\\n  .navigation-svg{\\n\\t\\twidth:100%;\\n\\t\\theight:100%;\\n    /* color:rgb(88, 88, 88); */\\n\\t}\\n\\n  .navigation-svg:hover .chapter-text-active{\\n    opacity:1\\n  }\\n\\n  .chapter-circle{\\n    fill:white;\\n    fill-opacity: 0.01;\\n    stroke:#FDB813;\\n    stroke-width: 10px;\\n    transition: all 0.5s;\\n    opacity:0.7;\\n    cursor:pointer;\\n  }\\n\\n  .chapter-text{\\n    text-anchor: end;\\n    font-size: 16px;\\n  }\\n\\n  .chapterg:hover .chapter-text{\\n    opacity:0.5;\\n  }\\n\\n  .chapterg:hover .chapter-circle{\\n    r:8;\\n    stroke-width: 7px;\\n  }\\n\\n  .chapterg{\\n    cursor: pointer;\\n  }\\n\\n</style>"],"names":[],"mappings":"AAgCE,6CAAe,CACf,MAAM,IAAI,CACV,OAAO,IAER,CAEC,8BAAe,MAAM,CAAC,mCAAoB,CACxC,QAAQ;AACZ,EAAE,CAEA,6CAAe,CACb,KAAK,KAAK,CACV,YAAY,CAAE,IAAI,CAClB,OAAO,OAAO,CACd,YAAY,CAAE,IAAI,CAClB,UAAU,CAAE,GAAG,CAAC,IAAI,CACpB,QAAQ,GAAG,CACX,OAAO,OACT,CAEA,2CAAa,CACX,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IACb,CAEA,wBAAS,MAAM,CAAC,4BAAa,CAC3B,QAAQ,GACV,CAEA,wBAAS,MAAM,CAAC,8BAAe,CAC7B,EAAE,CAAC,CACH,YAAY,CAAE,GAChB,CAEA,uCAAS,CACP,MAAM,CAAE,OACV"}`
};
const yOffset = 40;
const NavigationPanel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let innerHeight2;
  let { stepNames } = $$props;
  let { currentStepName } = $$props;
  let { height } = $$props;
  let { offset } = $$props;
  if ($$props.stepNames === void 0 && $$bindings.stepNames && stepNames !== void 0) $$bindings.stepNames(stepNames);
  if ($$props.currentStepName === void 0 && $$bindings.currentStepName && currentStepName !== void 0) $$bindings.currentStepName(currentStepName);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0) $$bindings.height(height);
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0) $$bindings.offset(offset);
  $$result.css.add(css$2);
  innerHeight2 = height - 2 * yOffset;
  return `${offset > 0.1 || currentStepName !== "thuis" ? `<svg class="navigation-svg svelte-11sam4r">${each(stepNames, (stepName, i) => {
    return `<g class="chapterg svelte-11sam4r" transform="${"translate(170," + escape(yOffset + innerHeight2 / stepNames.length * i, true) + ")"}"><text class="${"chapter-text " + escape(
      currentStepName === stepName ? "chapter-text-active" : "",
      true
    ) + " svelte-11sam4r"}"${add_attribute(
      "fill",
      ["wandeling", "krantenkoppen", "aftiteling"].includes(currentStepName) ? "white" : "rgb(130, 130, 130)",
      0
    )} dy="0.26em" dx="-25" opacity="0">${escape(stepName.charAt(0).toUpperCase() + stepName.slice(1))}</text><circle class="chapter-circle svelte-11sam4r"${add_attribute("r", stepName === currentStepName ? "8" : "1", 0)}${add_attribute("stroke-width", stepName === currentStepName ? "7px" : "10px", 0)} opacity="1" fill="cyan"></circle><rect width="130"${add_attribute("height", innerHeight2 / stepNames.length, 0)} opacity="0" x="-110"${add_attribute("y", -(innerHeight2 / stepNames.length) / 2, 0)}${add_attribute("pointer-events", currentStepName === stepName ? "none" : "default", 0)}></rect></g>`;
  })}</svg>` : ``}`;
});
const css$1 = {
  code: "svelte-scroller-outer.svelte-xdbafy{display:block;position:relative}svelte-scroller-background.svelte-xdbafy{display:block;position:relative;width:100%}svelte-scroller-foreground.svelte-xdbafy{display:block;position:relative;z-index:2}svelte-scroller-foreground.svelte-xdbafy::after{content:' ';display:block;clear:both}svelte-scroller-background-container.svelte-xdbafy{display:block;position:absolute;width:100%;max-width:100%;pointer-events:none;will-change:transform}",
  map: `{"version":3,"file":"Scroller.svelte","sources":["Scroller.svelte"],"sourcesContent":["<script context=\\"module\\">\\n\\tconst handlers = [];\\n\\tlet manager;\\n\\n\\tif (typeof window !== 'undefined') {\\n\\t\\tconst run_all = () => handlers.forEach(fn => fn());\\n\\n\\t\\twindow.addEventListener('scroll', run_all);\\n\\t\\twindow.addEventListener('resize', run_all);\\n\\t}\\n\\n\\tif (typeof IntersectionObserver !== 'undefined') {\\n\\t\\tconst map = new Map();\\n\\n\\t\\tconst observer = new IntersectionObserver((entries, observer) => {\\n\\t\\t\\tentries.forEach(entry => {\\n\\t\\t\\t\\tconst update = map.get(entry.target);\\n\\t\\t\\t\\tconst index = handlers.indexOf(update);\\n\\n\\t\\t\\t\\tif (entry.isIntersecting) {\\n\\t\\t\\t\\t\\tif (index === -1) handlers.push(update);\\n\\t\\t\\t\\t} else {\\n\\t\\t\\t\\t\\tupdate();\\n\\t\\t\\t\\t\\tif (index !== -1) handlers.splice(index, 1);\\n\\t\\t\\t\\t}\\n\\t\\t\\t});\\n\\t\\t}, {\\n\\t\\t\\trootMargin: '400px 0px' // TODO why 400?\\n\\t\\t});\\n\\n\\t\\tmanager = {\\n\\t\\t\\tadd: ({ outer, update }) => {\\n\\t\\t\\t\\tconst { top, bottom } = outer.getBoundingClientRect();\\n\\n\\t\\t\\t\\tif (top < window.innerHeight && bottom > 0) handlers.push(update);\\n\\n\\t\\t\\t\\tmap.set(outer, update);\\n\\t\\t\\t\\tobserver.observe(outer);\\n\\t\\t\\t},\\n\\n\\t\\t\\tremove: ({ outer, update }) => {\\n\\t\\t\\t\\tconst index = handlers.indexOf(update);\\n\\t\\t\\t\\tif (index !== -1) handlers.splice(index, 1);\\n\\n\\t\\t\\t\\tmap.delete(outer);\\n\\t\\t\\t\\tobserver.unobserve(outer);\\n\\t\\t\\t}\\n\\t\\t};\\n\\t} else {\\n\\t\\tmanager = {\\n\\t\\t\\tadd: ({ update }) => {\\n\\t\\t\\t\\thandlers.push(update);\\n\\t\\t\\t},\\n\\n\\t\\t\\tremove: ({ update }) => {\\n\\t\\t\\t\\tconst index = handlers.indexOf(update);\\n\\t\\t\\t\\tif (index !== -1) handlers.splice(index, 1);\\n\\t\\t\\t}\\n\\t\\t};\\n\\t}\\n<\/script>\\n\\n<script>\\n\\timport { onMount } from 'svelte';\\n\\n\\t// config\\n\\texport let top = 0;\\n\\texport let bottom = 1;\\n\\texport let threshold = 0.5;\\n\\texport let query = 'section';\\n\\texport let parallax = false;\\n\\n\\t// bindings\\n\\texport let index = 0;\\n\\texport let count = 0;\\n\\texport let offset = 0;\\n\\texport let progress = 0;\\n\\texport let visible = false;\\n\\n\\tlet outer;\\n\\tlet foreground;\\n\\tlet background;\\n\\tlet left;\\n\\tlet sections;\\n\\tlet wh = 0;\\n\\tlet fixed;\\n\\tlet offset_top = 0;\\n\\tlet width = 1;\\n\\tlet height;\\n\\tlet inverted;\\n\\n\\t$: top_px = Math.round(top * wh);\\n\\t$: bottom_px = Math.round(bottom * wh);\\n\\t$: threshold_px = Math.round(threshold * wh);\\n\\n\\t$: (top, bottom, threshold, parallax, update());\\n\\n\\t$: style = \`\\n\\t\\tposition: \${fixed ? 'fixed' : 'absolute'};\\n\\t\\ttop: 0;\\n\\t\\ttransform: translate(0, \${offset_top}px);\\n\\t\\tz-index: \${inverted ? 3 : 1};\\n\\t\`;\\n\\n\\t$: widthStyle = fixed ? \`width:\${width}px;\` : '';\\n\\n\\tonMount(() => {\\n\\t\\tsections = foreground.querySelectorAll(query);\\n\\t\\tcount = sections.length;\\n\\n\\t\\tupdate();\\n\\n\\t\\tconst scroller = { outer, update };\\n\\n\\t\\tmanager.add(scroller);\\n\\t\\treturn () => manager.remove(scroller);\\n\\t});\\n\\n\\tfunction update() {\\n\\t\\tif (!foreground) return;\\n\\n\\t\\t// re-measure outer container\\n\\t\\tconst bcr = outer.getBoundingClientRect();\\n\\t\\tleft = bcr.left;\\n\\t\\twidth = bcr.right - left;\\n\\n\\t\\t// determine fix state\\n\\t\\tconst fg = foreground.getBoundingClientRect();\\n\\t\\tconst bg = background.getBoundingClientRect();\\n\\n\\t\\tvisible = fg.top < wh && fg.bottom > 0;\\n\\n\\t\\tconst foreground_height = fg.bottom - fg.top;\\n\\t\\tconst background_height = bg.bottom - bg.top;\\n\\n\\t\\tconst available_space = bottom_px - top_px;\\n\\t\\tprogress = (top_px - fg.top) / (foreground_height - available_space);\\n\\n\\t\\tif (progress <= 0) {\\n\\t\\t\\toffset_top = 0;\\n\\t\\t\\tfixed = false;\\n\\t\\t} else if (progress >= 1) {\\n\\t\\t\\toffset_top = parallax\\n\\t\\t\\t\\t? (foreground_height - background_height)\\n\\t\\t\\t\\t: (foreground_height - available_space);\\n\\t\\t\\tfixed = false;\\n\\t\\t} else {\\n\\t\\t\\toffset_top = parallax ?\\n\\t\\t\\t\\tMath.round(top_px - progress * (background_height - available_space)) :\\n\\t\\t\\t\\ttop_px;\\n\\t\\t\\tfixed = true;\\n\\t\\t}\\n\\n\\t\\tfor (let i = 0; i < sections.length; i++) {\\n\\t\\t\\tconst section = sections[i];\\n\\t\\t\\tconst { top } = section.getBoundingClientRect();\\n\\n\\t\\t\\tconst next = sections[i + 1];\\n\\t\\t\\tconst bottom = next ? next.getBoundingClientRect().top : fg.bottom;\\n\\n\\t\\t\\toffset = (threshold_px - top) / (bottom - top);\\n\\t\\t\\tif (bottom >= threshold_px) {\\n\\t\\t\\t\\tindex = i;\\n\\t\\t\\t\\tbreak;\\n\\t\\t\\t}\\n\\t\\t}\\n\\t}\\n<\/script>\\n\\n<svelte:window bind:innerHeight={wh}/>\\n\\n<svelte-scroller-outer bind:this={outer}>\\n\\t<svelte-scroller-background-container class='background-container' style=\\"{style}{widthStyle}\\">\\n\\t\\t<svelte-scroller-background bind:this={background}>\\n\\t\\t\\t<slot name=\\"background\\"></slot>\\n\\t\\t</svelte-scroller-background>\\n\\t</svelte-scroller-background-container>\\n\\n\\t<svelte-scroller-foreground bind:this={foreground}>\\n\\t\\t<slot name=\\"foreground\\"></slot>\\n\\t</svelte-scroller-foreground>\\n</svelte-scroller-outer>\\n\\n<style>\\n\\tsvelte-scroller-outer {\\n\\t\\tdisplay: block;\\n\\t\\tposition: relative;\\n\\t}\\n\\n\\tsvelte-scroller-background {\\n\\t\\tdisplay: block;\\n\\t\\tposition: relative;\\n\\t\\twidth: 100%;\\n\\t}\\n\\n\\tsvelte-scroller-foreground {\\n\\t\\tdisplay: block;\\n\\t\\tposition: relative;\\n\\t\\tz-index: 2;\\n\\t}\\n\\n\\tsvelte-scroller-foreground::after {\\n\\t\\tcontent: ' ';\\n\\t\\tdisplay: block;\\n\\t\\tclear: both;\\n\\t}\\n\\n\\tsvelte-scroller-background-container {\\n\\t\\tdisplay: block;\\n\\t\\tposition: absolute;\\n\\t\\twidth: 100%;\\n\\t\\tmax-width: 100%;\\n\\t\\tpointer-events: none;\\n\\t\\t/* height: 100%; */\\n\\n\\t\\t/* in theory this helps prevent jumping */\\n\\t\\twill-change: transform;\\n\\t\\t/* -webkit-transform: translate3d(0, 0, 0);\\n\\t\\t-moz-transform: translate3d(0, 0, 0);\\n\\t\\ttransform: translate3d(0, 0, 0); */\\n\\t}\\n</style>\\n"],"names":[],"mappings":"AAwLC,mCAAsB,CACrB,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,QACX,CAEA,wCAA2B,CAC1B,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IACR,CAEA,wCAA2B,CAC1B,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,CACV,CAEA,wCAA0B,OAAQ,CACjC,OAAO,CAAE,GAAG,CACZ,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,IACR,CAEA,kDAAqC,CACpC,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,SAAS,CAAE,IAAI,CACf,cAAc,CAAE,IAAI,CAIpB,WAAW,CAAE,SAId"}`
};
const handlers = [];
if (typeof window !== "undefined") {
  const run_all = () => handlers.forEach((fn) => fn());
  window.addEventListener("scroll", run_all);
  window.addEventListener("resize", run_all);
}
if (typeof IntersectionObserver !== "undefined") {
  const map = /* @__PURE__ */ new Map();
  new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        const update = map.get(entry.target);
        const index = handlers.indexOf(update);
        if (entry.isIntersecting) {
          if (index === -1) handlers.push(update);
        } else {
          update();
          if (index !== -1) handlers.splice(index, 1);
        }
      });
    },
    {
      rootMargin: "400px 0px"
      // TODO why 400?
    }
  );
}
const Scroller = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let style;
  let widthStyle;
  let { top = 0 } = $$props;
  let { bottom = 1 } = $$props;
  let { threshold = 0.5 } = $$props;
  let { query = "section" } = $$props;
  let { parallax = false } = $$props;
  let { index = 0 } = $$props;
  let { count = 0 } = $$props;
  let { offset = 0 } = $$props;
  let { progress = 0 } = $$props;
  let { visible = false } = $$props;
  let outer;
  let foreground;
  let background;
  let offset_top = 0;
  if ($$props.top === void 0 && $$bindings.top && top !== void 0) $$bindings.top(top);
  if ($$props.bottom === void 0 && $$bindings.bottom && bottom !== void 0) $$bindings.bottom(bottom);
  if ($$props.threshold === void 0 && $$bindings.threshold && threshold !== void 0) $$bindings.threshold(threshold);
  if ($$props.query === void 0 && $$bindings.query && query !== void 0) $$bindings.query(query);
  if ($$props.parallax === void 0 && $$bindings.parallax && parallax !== void 0) $$bindings.parallax(parallax);
  if ($$props.index === void 0 && $$bindings.index && index !== void 0) $$bindings.index(index);
  if ($$props.count === void 0 && $$bindings.count && count !== void 0) $$bindings.count(count);
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0) $$bindings.offset(offset);
  if ($$props.progress === void 0 && $$bindings.progress && progress !== void 0) $$bindings.progress(progress);
  if ($$props.visible === void 0 && $$bindings.visible && visible !== void 0) $$bindings.visible(visible);
  $$result.css.add(css$1);
  style = `
		position: ${"absolute"};
		top: 0;
		transform: translate(0, ${offset_top}px);
		z-index: ${1};
	`;
  widthStyle = "";
  return ` <svelte-scroller-outer class="svelte-xdbafy"${add_attribute("this", outer, 0)}><svelte-scroller-background-container class="background-container svelte-xdbafy" style="${escape(style, true) + escape(widthStyle, true)}"><svelte-scroller-background class="svelte-xdbafy"${add_attribute("this", background, 0)}>${slots.background ? slots.background({}) : ``}</svelte-scroller-background></svelte-scroller-background-container> <svelte-scroller-foreground class="svelte-xdbafy"${add_attribute("this", foreground, 0)}>${slots.foreground ? slots.foreground({}) : ``}</svelte-scroller-foreground> </svelte-scroller-outer>`;
});
const css = {
  code: '.cloud.svelte-17u91hx{position:fixed;z-index:1000;top:300px;filter:contrast(0) sepia(100%) hue-rotate(116deg) brightness(1.3) saturate(0.28) grayscale(100%) opacity(60%)}.info.svelte-17u91hx{padding:0.5em;position:fixed;top:0;left:0;color:black !important;z-index:1000}.sound.svelte-17u91hx{position:fixed;bottom:20px;left:20px;z-index:2000}.navigation-panel.svelte-17u91hx{position:fixed;z-index:20000;right:0px;width:200px;height:60%;top:20%}[slot="background"].svelte-17u91hx{color:white;position:fixed;left:0px;top:0px;height:100vh;width:100vw}section.svelte-17u91hx{margin:0 auto;position:relative}.step.svelte-17u91hx,.widestep.svelte-17u91hx{height:3000px;margin-top:1em;text-align:center;transition:background 100ms;position:relative;width:90%}.step.svelte-17u91hx{width:90%}.step_gesprek.svelte-17u91hx{height:1000px !important}.step_autoritje.svelte-17u91hx{height:7000px !important}.step_aftiteling.svelte-17u91hx{height:4000px !important}.widestep.svelte-17u91hx{width:100%}.outrostep.svelte-17u91hx{width:100%}',
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n\\timport BackgroundMap from \\"$lib/components/BackgroundMap.svelte\\";\\n\\timport 'leaflet/dist/leaflet.css';\\n\\n\\timport Titlepage from \\"$lib/components/Titlepage.svelte\\";\\n\\timport Introductie from \\"$lib/components/Introductie.svelte\\";\\n\\timport Ziekenhuis from \\"$lib/components/Ziekenhuis.svelte\\";\\n\\timport Gesprek from \\"$lib/components/Gesprek.svelte\\";\\n\\timport Wandeling from \\"$lib/components/Wandeling.svelte\\";\\n\\timport Scatter from \\"$lib/components/Scatter.svelte\\";\\n\\timport Kansgrafiek from \\"$lib/components/Kansgrafiek.svelte\\";\\n\\timport Krantenkoppen from \\"$lib/components/Krantenkoppen.svelte\\";\\n\\timport AutoRitje from \\"$lib/components/AutoRitje.svelte\\";\\n\\timport Aftiteling from \\"$lib/components/Aftiteling.svelte\\";\\n\\timport NavigationPanel from \\"$lib/components/NavigationPanel.svelte\\";\\n\\n\\t// import { timeParse } from 'd3'\\n\\n\\timport Scroller from \\"@sveltejs/svelte-scroller\\";\\n\\timport { started, sound } from \\"$lib/stores.js\\";\\n\\n\\t// for preloading images\\n\\tlet imageModules = import.meta.glob(\\"/static/images/*\\");\\n\\n\\texport let data;\\n\\n\\tconsole.log(data)\\n\\n\\tlet maxTempData\\n\\tlet middellijnData\\n\\tlet middellijnData2050\\n\\tlet confidenceData\\n\\n\\t// datatest, datamiddellijn, dataconfidence, datamiddellijn2050\\n\\tPromise.all(data.data).then(values => {\\n\\t\\tmaxTempData = values[0]\\n\\t\\tmiddellijnData = values[1]\\n\\t\\tconfidenceData = values[2]\\n\\t\\tmiddellijnData2050 = values[3]\\n\\t})\\n\\n\\tlet leafletMap;\\n\\n\\tconst stepNames = [\\n\\t\\t\\"thuis\\",\\n\\t\\t\\"ziekenhuis\\",\\n\\t\\t\\"gesprek\\",\\n\\t\\t\\"temperatuurstijging\\",\\n\\t\\t\\"kansgrafiek\\",\\n\\t\\t\\"wandeling\\",\\n\\t\\t\\"krantenkoppen\\",\\n\\t\\t\\"autoritje\\",\\n\\t\\t\\"aftiteling\\",\\n\\t];\\n\\n\\tlet index = 0;\\n\\tlet offset;\\n\\tlet progress;\\n\\n\\tlet navigationPanelHeight;\\n\\n\\t$: currentStepName = stepNames[index];\\n\\n\\tfunction soundToggle(){\\n\\t\\tif($sound){\\n\\t\\t\\tdocument.querySelectorAll(\\"audio\\").forEach((elem) => {\\n\\t\\t\\t\\telem.muted = true;\\n    \\t\\telem.pause();\\n\\t\\t\\t});\\n\\t\\t\\tsound.set(false)\\n\\t\\t}else{\\n\\t\\t\\tdocument.querySelectorAll(\\"audio\\").forEach((elem) => {\\n\\t\\t\\t\\telem.muted = false;\\n\\t\\t\\t\\telem.play();\\n\\t\\t\\t});\\n\\t\\t\\tsound.set(true);\\n\\t\\t}\\n\\t}\\n\\n<\/script>\\n\\n<!-- preload images -->\\n<svelte:head>\\n\\t{#each Object.keys(imageModules) as imageUrl}\\n    <link rel=\\"preload\\" as=\\"image\\" href={imageUrl.slice(7)} />\\n\\t{/each}\\n</svelte:head>\\n\\n{#if maxTempData && middellijnData && middellijnData2050 && confidenceData}\\n\\t<div>\\n\\t\\t<Titlepage {currentStepName} {offset}/>\\n\\t\\t<a href=\\"https://climateadaptationservices.com\\" target=\\"_blank\\">\\n\\t\\t\\t<img class='logo' src='/images/logokleur.png' width='10%'/>\\n\\t\\t</a>\\t\\n\\t\\t{#if $started}\\n\\t\\t\\t<Scroller bind:index bind:offset bind:progress>\\n\\t\\t\\t\\t\\n\\t\\t\\t\\t<div slot='background' top='0' bottom='0'>\\n\\t\\t\\t\\t\\t{#if data}\\n\\t\\t\\t\\t\\t\\t<BackgroundMap {leafletMap} {offset} {index} {currentStepName}/>\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t</div>\\n\\n\\t\\t\\t\\t<div slot='foreground'>\\n\\t\\t\\t\\t\\t<img class='sound' src='/images/{(($sound) ? 'volume' : 'mute')}.png' width='30px' on:click={() => soundToggle()}\\n\\t\\t\\t\\t\\t\\tstyle={(['wandeling', 'krantenkoppen'].includes(currentStepName)) ? 'filter:invert(1)' : ''}/>\\n\\t\\t\\t\\t\\t<!-- <div class=\\"info\\">\\n\\t\\t\\t\\t\\t\\t<p>Step: {index}</p>\\n\\t\\t\\t\\t\\t\\t<p>Step progress: {offset>0 ? Math.round(offset*100) : 0}%</p>\\n\\t\\t\\t\\t\\t\\t<p>Total progress: {progress>0 ? Math.round(progress*100) : 0}%</p>\\n\\t\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t</div> -->\\n\\t\\t\\t\\t\\t\\n\\t\\t\\t\\t\\t<div class='navigation-panel' bind:clientHeight={navigationPanelHeight}>\\n\\t\\t\\t\\t\\t\\t<NavigationPanel {stepNames} {currentStepName} height={navigationPanelHeight} {offset}/>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t<img class='fixed-image' src='' style='opacity:0'/>\\n\\n\\t\\t\\t\\t\\t{#each stepNames as stepName, i}\\n\\t\\t\\t\\t\\t\\t{#if ['temperatuurstijging', 'kansgrafiek', 'unseen', 'aftiteling', 'leeslijst'].includes(stepName)}\\n\\t\\t\\t\\t\\t\\t\\t<section class='widestep step_{stepName}'>\\n\\t\\t\\t\\t\\t\\t\\t\\t{#if stepName === 'temperatuurstijging'}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<Scatter {maxTempData} {offset} {index} {stepName} {currentStepName}/>\\n\\t\\t\\t\\t\\t\\t\\t\\t{:else if stepName === 'kansgrafiek'}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<Kansgrafiek {middellijnData} {middellijnData2050} {offset} {index} {stepName} {confidenceData} {currentStepName}/>\\n\\t\\t\\t\\t\\t\\t\\t\\t{:else if stepName === 'aftiteling'}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<Aftiteling {offset} {index} {stepName} {currentStepName} />\\n\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t\\t</section>\\n\\t\\t\\t\\t\\t\\t{:else}\\n\\t\\t\\t\\t\\t\\t\\t<section class='step step_{stepName}'>\\n\\t\\t\\t\\t\\t\\t\\t\\t{#if stepName === 'thuis'}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<Introductie {offset} {index} {currentStepName} {stepName} />\\n\\t\\t\\t\\t\\t\\t\\t\\t{:else if stepName === 'gesprek'}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<Gesprek {offset} {index} {currentStepName} {stepName} />\\n\\t\\t\\t\\t\\t\\t\\t\\t{:else if stepName === 'ziekenhuis'}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<Ziekenhuis {offset} {index} {currentStepName} {stepName} />\\n\\t\\t\\t\\t\\t\\t\\t\\t{:else if stepName === 'wandeling'}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<Wandeling {offset} {index} {currentStepName} {stepName} />\\n\\t\\t\\t\\t\\t\\t\\t\\t{:else if stepName === 'krantenkoppen'}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<Krantenkoppen {offset} {index} {currentStepName} {stepName} />\\n\\t\\t\\t\\t\\t\\t\\t\\t{:else if stepName === 'autoritje'}\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t<AutoRitje {offset} {index} {stepName} {currentStepName} />\\n\\t\\t\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t\\t\\t</section>\\n\\t\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</Scroller>\\n\\t\\t{/if}\\t\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t.cloud{\\n\\t\\tposition: fixed;\\n\\t\\tz-index: 1000;\\n\\t\\ttop:300px;\\n\\t\\tfilter: contrast(0) sepia(100%) hue-rotate(116deg) brightness(1.3) saturate(0.28) grayscale(100%) opacity(60%);\\n\\t}\\n\\n\\t.info {\\n\\t\\tpadding: 0.5em;\\n\\t\\tposition: fixed;\\n\\t\\ttop: 0;\\n\\t\\tleft: 0;\\n\\t\\tcolor: black !important;\\n\\t\\tz-index: 1000;\\n\\t}\\n\\n\\t.sound{\\n\\t\\tposition: fixed;\\n\\t\\tbottom: 20px;\\n\\t\\tleft: 20px;\\n\\t\\tz-index: 2000;\\n\\t}\\n\\n\\t.navigation-panel{\\n\\t\\tposition: fixed;\\n\\t\\tz-index: 20000;\\n\\t\\tright:0px;\\n\\t\\twidth:200px;\\n\\t\\theight:60%;\\n\\t\\ttop:20%;\\n\\t}\\n\\n\\t[slot=\\"foreground\\"] {\\n\\t}\\n\\n\\t[slot=\\"background\\"] {\\n\\t\\tcolor: white;\\n\\t\\tposition: fixed;\\n\\t\\tleft:0px;\\n\\t\\ttop:0px;\\n\\t\\theight:100vh;\\n\\t\\twidth:100vw;\\n\\t}\\n\\n\\tsection {\\n\\t\\tmargin: 0 auto;\\n\\t\\tposition:relative;\\n\\t}\\n\\n  .step, .widestep {\\n    height: 3000px;\\n    /* background: #aaaaaa2b; */\\n    margin-top: 1em;\\n    text-align: center;\\n    transition: background 100ms;\\n\\t\\tposition: relative;\\n\\t\\twidth:90%;\\n  }\\n\\n  .step {\\n\\t\\twidth:90%;\\n  }\\n\\n\\t.step_gesprek{\\n    height:1000px !important;\\n  }\\n\\n  .step_autoritje{\\n\\theight:7000px !important;\\n  }\\n\\n  .step_aftiteling{\\n\\theight:4000px !important;\\n  }\\n\\n  .widestep {\\n\\t\\twidth:100%;\\n  }\\n\\n\\t.outrostep{\\n\\t\\twidth:100%;\\n\\t}\\n\\n\\t#graph{\\n\\t\\theight: 200vh;\\n\\t\\tdisplay: flex;\\n\\t}\\n\\n  .step p {\\n    font-size: 4em;\\n  }\\n\\n</style>\\n"],"names":[],"mappings":"AA2JC,qBAAM,CACL,QAAQ,CAAE,KAAK,CACf,OAAO,CAAE,IAAI,CACb,IAAI,KAAK,CACT,MAAM,CAAE,SAAS,CAAC,CAAC,CAAC,MAAM,IAAI,CAAC,CAAC,WAAW,MAAM,CAAC,CAAC,WAAW,GAAG,CAAC,CAAC,SAAS,IAAI,CAAC,CAAC,UAAU,IAAI,CAAC,CAAC,QAAQ,GAAG,CAC9G,CAEA,oBAAM,CACL,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,KAAK,CACf,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,KAAK,CAAC,UAAU,CACvB,OAAO,CAAE,IACV,CAEA,qBAAM,CACL,QAAQ,CAAE,KAAK,CACf,MAAM,CAAE,IAAI,CACZ,IAAI,CAAE,IAAI,CACV,OAAO,CAAE,IACV,CAEA,gCAAiB,CAChB,QAAQ,CAAE,KAAK,CACf,OAAO,CAAE,KAAK,CACd,MAAM,GAAG,CACT,MAAM,KAAK,CACX,OAAO,GAAG,CACV,IAAI,GACL,CAKA,CAAC,IAAI,CAAC,YAAY,gBAAE,CACnB,KAAK,CAAE,KAAK,CACZ,QAAQ,CAAE,KAAK,CACf,KAAK,GAAG,CACR,IAAI,GAAG,CACP,OAAO,KAAK,CACZ,MAAM,KACP,CAEA,sBAAQ,CACP,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,SAAS,QACV,CAEC,oBAAK,CAAE,wBAAU,CACf,MAAM,CAAE,MAAM,CAEd,UAAU,CAAE,GAAG,CACf,UAAU,CAAE,MAAM,CAClB,UAAU,CAAE,UAAU,CAAC,KAAK,CAC9B,QAAQ,CAAE,QAAQ,CAClB,MAAM,GACN,CAEA,oBAAM,CACN,MAAM,GACN,CAED,4BAAa,CACV,OAAO,MAAM,CAAC,UAChB,CAEA,8BAAe,CAChB,OAAO,MAAM,CAAC,UACb,CAEA,+BAAgB,CACjB,OAAO,MAAM,CAAC,UACb,CAEA,wBAAU,CACV,MAAM,IACN,CAED,yBAAU,CACT,MAAM,IACP"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentStepName;
  let $sound, $$unsubscribe_sound;
  let $started, $$unsubscribe_started;
  $$unsubscribe_sound = subscribe(sound, (value) => $sound = value);
  $$unsubscribe_started = subscribe(started, (value) => $started = value);
  let imageModules = /* @__PURE__ */ Object.assign({ "/static/images/arrowdown.png": () => import("../../chunks/arrowdown.js"), "/static/images/bank1.png": () => import("../../chunks/bank1.js"), "/static/images/boer.png": () => import("../../chunks/boer.js"), "/static/images/boer1.png": () => import("../../chunks/boer1.js"), "/static/images/cloud.png": () => import("../../chunks/cloud.js"), "/static/images/dommelplantsoen.png": () => import("../../chunks/dommelplantsoen.js"), "/static/images/dwerg.png": () => import("../../chunks/dwerg.js"), "/static/images/festival.jpg": () => import("../../chunks/festival.js"), "/static/images/file.png": () => import("../../chunks/file.js"), "/static/images/gasten.png": () => import("../../chunks/gasten.js"), "/static/images/gesprek.png": () => import("../../chunks/gesprek.js"), "/static/images/hardloper1.png": () => import("../../chunks/hardloper1.js"), "/static/images/headphones.png": () => import("../../chunks/headphones.js"), "/static/images/heatwave.jpg": () => import("../../chunks/heatwave.js"), "/static/images/heatwave1.png": () => import("../../chunks/heatwave1.js"), "/static/images/holdingphone.png": () => import("../../chunks/holdingphone.js"), "/static/images/kerk.png": () => import("../../chunks/kerk.js"), "/static/images/leonieradeloos.png": () => import("../../chunks/leonieradeloos.js"), "/static/images/logokleur.png": () => import("../../chunks/logokleur.js"), "/static/images/manonwel.png": () => import("../../chunks/manonwel.js"), "/static/images/mute.png": () => import("../../chunks/mute.js"), "/static/images/nielsboom.png": () => import("../../chunks/nielsboom.js"), "/static/images/nielsgaatwandelen.png": () => import("../../chunks/nielsgaatwandelen.js"), "/static/images/nielstel.png": () => import("../../chunks/nielstel.js"), "/static/images/oudevrouwziekenhuis.png": () => import("../../chunks/oudevrouwziekenhuis.js"), "/static/images/politie.png": () => import("../../chunks/politie.js"), "/static/images/pomp.png": () => import("../../chunks/pomp.js"), "/static/images/seminbed1.png": () => import("../../chunks/seminbed1.js"), "/static/images/tempmeter.png": () => import("../../chunks/tempmeter.js"), "/static/images/volume.png": () => import("../../chunks/volume.js"), "/static/images/weeralarm.jpg": () => import("../../chunks/weeralarm.js"), "/static/images/ziekenhuischaos2.png": () => import("../../chunks/ziekenhuischaos2.js"), "/static/images/zwembad.png": () => import("../../chunks/zwembad.js") });
  let { data } = $$props;
  console.log(data);
  let maxTempData;
  let middellijnData;
  let middellijnData2050;
  let confidenceData;
  Promise.all(data.data).then((values) => {
    maxTempData = values[0];
    middellijnData = values[1];
    confidenceData = values[2];
    middellijnData2050 = values[3];
  });
  let leafletMap;
  const stepNames = [
    "thuis",
    "ziekenhuis",
    "gesprek",
    "temperatuurstijging",
    "kansgrafiek",
    "wandeling",
    "krantenkoppen",
    "autoritje",
    "aftiteling"
  ];
  let index = 0;
  let offset;
  let progress;
  let navigationPanelHeight;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  $$result.css.add(css);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    currentStepName = stepNames[index];
    $$rendered = ` ${$$result.head += `<!-- HEAD_svelte-1d54kwo_START -->${each(Object.keys(imageModules), (imageUrl) => {
      return `<link rel="preload" as="image"${add_attribute("href", imageUrl.slice(7), 0)}>`;
    })}<!-- HEAD_svelte-1d54kwo_END -->`, ""} ${maxTempData && middellijnData && middellijnData2050 && confidenceData ? `<div>${validate_component(Titlepage, "Titlepage").$$render($$result, { currentStepName, offset }, {}, {})} <a href="https://climateadaptationservices.com" target="_blank" data-svelte-h="svelte-zqlp0j"><img class="logo" src="/images/logokleur.png" width="10%"></a> ${$started ? `${validate_component(Scroller, "Scroller").$$render(
      $$result,
      { index, offset, progress },
      {
        index: ($$value) => {
          index = $$value;
          $$settled = false;
        },
        offset: ($$value) => {
          offset = $$value;
          $$settled = false;
        },
        progress: ($$value) => {
          progress = $$value;
          $$settled = false;
        }
      },
      {
        foreground: () => {
          return `<div slot="foreground" class="svelte-17u91hx"><img class="sound svelte-17u91hx" src="${"/images/" + escape($sound ? "volume" : "mute", true) + ".png"}" width="30px"${add_attribute(
            "style",
            ["wandeling", "krantenkoppen"].includes(currentStepName) ? "filter:invert(1)" : "",
            0
          )}>  <div class="navigation-panel svelte-17u91hx">${validate_component(NavigationPanel, "NavigationPanel").$$render(
            $$result,
            {
              stepNames,
              currentStepName,
              height: navigationPanelHeight,
              offset
            },
            {},
            {}
          )}</div> <img class="fixed-image" src="" style="opacity:0"> ${each(stepNames, (stepName, i) => {
            return `${[
              "temperatuurstijging",
              "kansgrafiek",
              "unseen",
              "aftiteling",
              "leeslijst"
            ].includes(stepName) ? `<section class="${"widestep step_" + escape(stepName, true) + " svelte-17u91hx"}">${stepName === "temperatuurstijging" ? `${validate_component(Scatter, "Scatter").$$render(
              $$result,
              {
                maxTempData,
                offset,
                index,
                stepName,
                currentStepName
              },
              {},
              {}
            )}` : `${stepName === "kansgrafiek" ? `${validate_component(Kansgrafiek, "Kansgrafiek").$$render(
              $$result,
              {
                middellijnData,
                middellijnData2050,
                offset,
                index,
                stepName,
                confidenceData,
                currentStepName
              },
              {},
              {}
            )}` : `${stepName === "aftiteling" ? `${validate_component(Aftiteling, "Aftiteling").$$render($$result, { offset, index, stepName, currentStepName }, {}, {})}` : ``}`}`} </section>` : `<section class="${"step step_" + escape(stepName, true) + " svelte-17u91hx"}">${stepName === "thuis" ? `${validate_component(Introductie, "Introductie").$$render($$result, { offset, index, currentStepName, stepName }, {}, {})}` : `${stepName === "gesprek" ? `${validate_component(Gesprek, "Gesprek").$$render($$result, { offset, index, currentStepName, stepName }, {}, {})}` : `${stepName === "ziekenhuis" ? `${validate_component(Ziekenhuis, "Ziekenhuis").$$render($$result, { offset, index, currentStepName, stepName }, {}, {})}` : `${stepName === "wandeling" ? `${validate_component(Wandeling, "Wandeling").$$render($$result, { offset, index, currentStepName, stepName }, {}, {})}` : `${stepName === "krantenkoppen" ? `${validate_component(Krantenkoppen, "Krantenkoppen").$$render($$result, { offset, index, currentStepName, stepName }, {}, {})}` : `${stepName === "autoritje" ? `${validate_component(AutoRitje, "AutoRitje").$$render($$result, { offset, index, stepName, currentStepName }, {}, {})}` : ``}`}`}`}`}`} </section>`}`;
          })}</div>`;
        },
        background: () => {
          return `<div slot="background" top="0" bottom="0" class="svelte-17u91hx">${data ? `${validate_component(BackgroundMap, "BackgroundMap").$$render(
            $$result,
            {
              leafletMap,
              offset,
              index,
              currentStepName
            },
            {},
            {}
          )}` : ``}</div>`;
        }
      }
    )}` : ``}</div>` : ``}`;
  } while (!$$settled);
  $$unsubscribe_sound();
  $$unsubscribe_started();
  return $$rendered;
});
export {
  Page as default
};
