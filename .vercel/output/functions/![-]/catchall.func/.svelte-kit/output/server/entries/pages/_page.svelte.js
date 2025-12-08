import { U as bind_props, V as attr_class, W as stringify, X as store_get, Y as attr_style, Z as unsubscribe_stores, _ as ensure_array_like, $ as clsx, a0 as attr, a1 as slot, a2 as head } from "../../chunks/index2.js";
import { w as writable } from "../../chunks/index.js";
import { B as BROWSER } from "../../chunks/false.js";
import * as d3 from "d3";
import { select } from "d3";
import { f as fallback, e as escape_html } from "../../chunks/context.js";
import * as _ from "lodash";
function html(value) {
  var html2 = String(value ?? "");
  var open = "<!---->";
  return open + html2 + "<!---->";
}
const browser = BROWSER;
const wandelRoute = [["51.4263847", "5.4707285"], ["51.42639", "5.47102"], ["51.42639", "5.47108"], ["51.4264", "5.47113"], ["51.42646", "5.4712"], ["51.4264551", "5.4711994"], ["51.42639", "5.47138"], ["51.42633", "5.47153"], ["51.42629", "5.47165"], ["51.42626", "5.47176"], ["51.42623", "5.47182"], ["51.4262", "5.47188"], ["51.4262033", "5.471881"], ["51.4262033", "5.471881"], ["51.42623", "5.47192"], ["51.42626", "5.47195"], ["51.4262615", "5.4719548"], ["51.42623", "5.47201"], ["51.42622", "5.47206"], ["51.42622", "5.47233"], ["51.4262206", "5.4723349"], ["51.42634", "5.47249"], ["51.42639", "5.47256"], ["51.42658", "5.47289"], ["51.4268", "5.47364"], ["51.42706", "5.47436"], ["51.42712", "5.47459"], ["51.42719", "5.47481"], ["51.4271895", "5.4748098"], ["51.4271895", "5.4748098"], ["51.42714", "5.47484"], ["51.42709", "5.47487"], ["51.42705", "5.4749"], ["51.427", "5.47494"], ["51.4269", "5.47493"], ["51.4268995", "5.4749307"], ["51.42676", "5.47535"], ["51.4267584", "5.4753456"], ["51.42673", "5.47536"], ["51.42654", "5.47545"], ["51.426542", "5.4754484"], ["51.42657", "5.47559"], ["51.42659", "5.47568"], ["51.4266", "5.47579"], ["51.4266039", "5.4757891"], ["51.42642", "5.47585"], ["51.4263", "5.47589"], ["51.42615", "5.47593"], ["51.42612", "5.47595"], ["51.42608", "5.47598"], ["51.42597", "5.4761"], ["51.42594", "5.47615"], ["51.42581", "5.47635"], ["51.4257", "5.47647"], ["51.42565", "5.47651"], ["51.42555", "5.47659"], ["51.42547", "5.47666"], ["51.42543", "5.47671"], ["51.42541", "5.47676"], ["51.42538", "5.47683"], ["51.42521", "5.47759"], ["51.4252054", "5.4775852"]];
const autoRoute2 = [["51.4501649", "5.5007588"], ["51.45023", "5.5011"], ["51.45024", "5.50115"], ["51.45026", "5.50128"], ["51.45049", "5.50252"], ["51.45054", "5.50285"], ["51.45054", "5.50287"], ["51.45059", "5.50319"], ["51.45069", "5.50366"], ["51.45079", "5.50413"], ["51.45081", "5.5043"], ["51.45084", "5.50447"], ["51.45092", "5.50485"], ["51.45099", "5.50522"], ["51.45119", "5.50636"], ["51.45123", "5.50661"], ["51.45138", "5.50745"], ["51.45157", "5.5085"], ["51.45167", "5.50904"], ["51.45173", "5.50935"], ["51.4518", "5.50966"], ["51.4517961", "5.5096579"], ["51.45234", "5.509"], ["51.45238", "5.50897"], ["51.45304", "5.50809"], ["51.45309", "5.50804"], ["51.45314", "5.50798"], ["51.45345", "5.50761"], ["51.45383", "5.50731"], ["51.45412", "5.50709"], ["51.4544", "5.50686"], ["51.45476", "5.5066"], ["51.45495", "5.50645"], ["51.45505", "5.50638"], ["51.45514", "5.50634"], ["51.45521", "5.50629"], ["51.45525", "5.50627"], ["51.4555", "5.50622"], ["51.45574", "5.50617"], ["51.4557449", "5.5061731"], ["51.45573", "5.5054"], ["51.45574", "5.50463"], ["51.45573", "5.50445"], ["51.4557323", "5.5044495"], ["51.45595", "5.50451"], ["51.45616", "5.50459"], ["51.4561627", "5.5045881"]];
function BackgroundMap($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let flyToCoordsHuis, flyToCoordsZiekenhuis;
    let leafletMap = $$props["leafletMap"];
    let offset = $$props["offset"];
    let index = $$props["index"];
    let currentStepName = $$props["currentStepName"];
    let ziekenhuis;
    let huis;
    let zwembad;
    const coordsHuis = [parseFloat(wandelRoute[0][0]), parseFloat(wandelRoute[0][1])];
    const coordsZiekenhuis = [51.466143, 5.472363];
    if (leafletMap) {
      leafletMap = leafletMap.getMap();
      huis = L.tooltip(wandelRoute[0], { direction: "top", offset: [0, -40] });
      huis.setContent("Haus von Niels und Leonie").addTo(leafletMap);
      ziekenhuis = L.tooltip([51.466143, 5.472363], { direction: "top", offset: [0, -40] });
      zwembad = L.tooltip(autoRoute2[0], { direction: "top", offset: [0, -40] });
    }
    flyToCoordsHuis = coordsHuis;
    flyToCoordsZiekenhuis = coordsZiekenhuis;
    if (leafletMap && !["ziekenhuis"].includes(currentStepName)) {
      const zoom = currentStepName === "autoritje" || currentStepName === "wandeling" && window.innerWidth < 600 ? 13 : 16;
      let centerCoords = flyToCoordsHuis;
      if (currentStepName === "autoritje") {
        centerCoords = [
          parseFloat(flyToCoordsHuis[0]) + 0.02,
          parseFloat(flyToCoordsHuis[1]) + 0.02
        ];
      } else if (currentStepName === "wandeling") {
        centerCoords = [
          parseFloat(flyToCoordsHuis[0]),
          parseFloat(flyToCoordsHuis[1]) - 2e-3
        ];
      }
      leafletMap.flyTo(centerCoords, zoom, { duration: 3 });
    }
    if (leafletMap && "ziekenhuis" === currentStepName) {
      leafletMap.flyTo(flyToCoordsZiekenhuis, 16, { duration: 3 });
      ziekenhuis.setContent("Catharina Krankenhaus").addTo(leafletMap);
    }
    if (leafletMap && "autoritje" === currentStepName) {
      zwembad.setContent("Schwimmbad").addTo(leafletMap);
    }
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { leafletMap, offset, index, currentStepName });
  });
}
const started = writable(false);
const sound = writable(true);
function Titlepage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let currentStepName = $$props["currentStepName"];
    let offset = $$props["offset"];
    $$renderer2.push(`<div${attr_class(`title ${stringify(store_get($$store_subs ??= {}, "$started", started) ? "started" : "")}`, "svelte-jmdzy5")}>`);
    if (currentStepName === "thuis" && browser && window.innerWidth > 600) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<audio src="sounds/heat.mp3" loop id="heat" class="svelte-jmdzy5"></audio>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (store_get($$store_subs ??= {}, "$started", started)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="scrolldown svelte-jmdzy5"><h4 class="svelte-jmdzy5">Nach unten scrollen</h4> <img width="7%" src="/images/arrowdown.png" class="svelte-jmdzy5"/></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div${attr_style(!store_get($$store_subs ??= {}, "$started", started) ? "cursor:pointer" : "pointer-events:none")} class="svelte-jmdzy5"><h1 class="title-huge svelte-jmdzy5">Ungekannt heiß</h1> <h1 class="sub-start svelte-jmdzy5">Eine Geschichte über mögliche extreme Hitze in den Niederlanden auf Basis wissenschaftlicher Erkenntnisse</h1></div></div> <div class="svelte-jmdzy5">`);
    if (!store_get($$store_subs ??= {}, "$started", started)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="subtitle svelte-jmdzy5" style="cursor:pointer"><em class="svelte-jmdzy5"><h3 class="klik-start svelte-jmdzy5">KLICKEN ZUM STARTEN</h3> <h3 class="geluid-info svelte-jmdzy5">Diese Bildgeschichte enthält Ton. Die Geschichte wirkt am besten mit Kopfhörern.</h3></em> <img class="headphones svelte-jmdzy5" src="/images/headphones.png" width="60px"/></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { currentStepName, offset });
  });
}
function fadeOut() {
  select(".fixed-image").transition("out").duration(500).style("opacity", 0);
}
function TextAndImagesScenes($$renderer, $$props) {
  let scenes = $$props["scenes"];
  let stepSize = $$props["stepSize"];
  let imageOffset = fallback($$props["imageOffset"], 0.1);
  $$renderer.push(`<!--[-->`);
  const each_array = ensure_array_like(scenes);
  for (let i = 0, $$length = each_array.length; i < $$length; i++) {
    let scene = each_array[i];
    $$renderer.push(`<div class="scroll-text-block"${attr_style(`top:${stringify(`${(scene["time"] + imageOffset) * stepSize}px`)}`)}><p${attr_class(clsx(scene["class"]))}>${html(scene["text"])}</p></div>`);
  }
  $$renderer.push(`<!--]-->`);
  bind_props($$props, { scenes, stepSize, imageOffset });
}
function Introductie($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let offset = $$props["offset"];
    let index = $$props["index"];
    let stepName = $$props["stepName"];
    let currentStepName = $$props["currentStepName"];
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
    $$renderer2.push(`<div class="stepdiv svelte-97zu58">`);
    TextAndImagesScenes($$renderer2, { scenes, stepSize });
    $$renderer2.push(`<!----> `);
    if (stepName === currentStepName && window.innerWidth > 600) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<audio id="fansound" autoplay loop src="sounds/fan.mp3"></audio>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (offset > 0.3 && offset < 0.5 && currentStepName === stepName) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="temp-text">${escape_html(Math.max(25, Math.min(30.5, Math.round(offset * 670) / 10)))}</p> <img class="tempmeter" src="/images/tempmeter.png"/>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    bind_props($$props, { offset, index, stepName, currentStepName });
  });
}
function Ziekenhuis($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let offset = $$props["offset"];
    let index = $$props["index"];
    let currentStepName = $$props["currentStepName"];
    let stepName = $$props["stepName"];
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
    $$renderer2.push(`<div class="stepdiv">`);
    TextAndImagesScenes($$renderer2, { scenes, stepSize });
    $$renderer2.push(`<!----> `);
    if (stepName === currentStepName && store_get($$store_subs ??= {}, "$sound", sound)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<audio src="sounds/ziekenhuis.mp3" autoplay loop></audio>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { offset, index, currentStepName, stepName });
  });
}
function Gesprek($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let offset = $$props["offset"];
    let index = $$props["index"];
    let currentStepName = $$props["currentStepName"];
    let stepName = $$props["stepName"];
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
    $$renderer2.push(`<div class="stepdiv">`);
    if (stepName === currentStepName) {
      $$renderer2.push("<!--[-->");
      TextAndImagesScenes($$renderer2, { scenes, stepSize });
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (stepName === currentStepName && store_get($$store_subs ??= {}, "$sound", sound)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<audio src="sounds/fan.mp3" autoplay loop></audio>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { offset, index, currentStepName, stepName });
  });
}
function Wandeling($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let offset = $$props["offset"];
    let index = $$props["index"];
    let currentStepName = $$props["currentStepName"];
    let stepName = $$props["stepName"];
    let stepSize;
    console.log(stepSize);
    if (currentStepName === stepName) {
      fadeOut();
    }
    if (stepName === currentStepName && store_get($$store_subs ??= {}, "$sound", sound)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<audio src="sounds/night.mp3" autoplay loop></audio>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="stepdiv"><div class="scroll-text-block night"${attr_style(`top:${stringify(`${0.125 * stepSize}px`)}`)}><img class="nielsgaatwandelen night-image" src="/images/nielsgaatwandelen.png"/> <p class="scroll-text nighttext">Als Sem endlich schläft, beschließt Niels, einen Spaziergang zu machen. Draußen ist es immer noch sehr heiß. Er bemerkt, dass die Steine auf der Straße viel Wärme abstrahlen.</p></div> `);
    if (stepName === currentStepName && offset > 0.1 && offset < 0.6 && store_get($$store_subs ??= {}, "$sound", sound)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<audio src="sounds/voetstappen.mp3" autoplay loop></audio>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (stepName === currentStepName && offset > 0.3 && offset < 0.5 && store_get($$store_subs ??= {}, "$sound", sound)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<audio src="sounds/crowd.mp3" autoplay loop></audio>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="scroll-text-block night"${attr_style(`top:${stringify(`${0.36 * stepSize}px`)}`)}><img class="festival night-image" src="/images/gasten.png"/> <p class="scroll-text nighttext">Glücklicherweise fühlt sich der Dommelplantsoen etwas kühler an. Das Festival, das hier geplant war, wurde abgesagt, aber trotzdem ist es sehr voll im Park. Es wird viel Lärm gemacht und getrunken. Trotz des Lärms schlafen manche Menschen draußen.</p></div> `);
    if (stepName === currentStepName && offset > 0.4 && offset < 0.85 && store_get($$store_subs ??= {}, "$sound", sound)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<audio src="sounds/drunk.mp3" autoplay loop></audio>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="scroll-text-block night"${attr_style(`top:${stringify(`${0.63 * stepSize}px`)}`)}><img class="politie night-image" src="/images/politie.png"/> <p class="scroll-text nighttext">In der Nähe ist Polizei, um die Situation im Auge zu behalten. Die Stimmung wird unangenehm. Niels geht schnell weiter.</p></div> `);
    if (stepName === currentStepName && offset > 0.65 && offset < 0.85 && store_get($$store_subs ??= {}, "$sound", sound)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<audio src="sounds/politie.mp3" autoplay loop></audio>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="scroll-text-block night"${attr_style(`right:100; top:${stringify(`${0.87 * stepSize}px`)}`)}><img class="rustigplekje night-image" src="/images/nielsboom.png"/> <p class="scroll-text nighttext">Weiter vorne findet Niels einen ruhigen Platz bei einem Baum. Er muss an das Gespräch mit Sem über die Hitze denken und überprüft die neuesten Nachrichten auf seinem Handy.</p></div></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { offset, index, currentStepName, stepName });
  });
}
function XAxis($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let xScale = $$props["xScale"];
    let height = $$props["height"];
    $$renderer2.push(`<g class="xAxis"${attr("transform", `translate(${stringify(0)},${stringify(height)})`)}></g>`);
    bind_props($$props, { xScale, height });
  });
}
function YAxis($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let yScale = $$props["yScale"];
    let height = $$props["height"];
    $$renderer2.push(`<g class="yAxis"></g>`);
    bind_props($$props, { yScale, height });
  });
}
function Scatter($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let ratioOfCsvData, xScale, yScale;
    let index = $$props["index"];
    let maxTempData = $$props["maxTempData"];
    let offset = $$props["offset"];
    let currentStepName = $$props["currentStepName"];
    let stepName = $$props["stepName"];
    let screenHeight;
    let screenWidth;
    let xAxisScale;
    let yAxisScale;
    let textPadding;
    let title;
    let colorScale = d3.scaleLinear().domain([28, 42]).range(["orange", "darkred"]);
    ratioOfCsvData = Math.round(offset * 1.6 * maxTempData.length);
    {
      xAxisScale = 0.4;
      yAxisScale = 0.7;
      textPadding = 0.15;
      title = "Jährlich gemessene Höchsttemperatur an der KNMI-Station Eindhoven";
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
    $$renderer2.push(`<div class="grafiek"><div class="graphtext"${attr_style(`top:${stringify(`${textPadding * screenHeight}px`)}`)}>`);
    if (currentStepName === "temperatuurstijging" || currentStepName === "gesprek") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<h1 class="scroll-text">Temperaturmessungen</h1> <p class="scroll-text">Messungen zeigen, dass die jährliche Höchsttemperatur in Eindhoven bereits erheblich gestiegen ist. Bis 2019 wurde eine Temperatur über 37 Grad noch nie gemessen.</p> <div class="fade-in"${attr_style(`visibility:${stringify(ratioOfCsvData > 60 && currentStepName === "temperatuurstijging" ? "visible" : "hidden")}`)}><p class="scroll-text">Aber am 24. Juli 2019 wurden in Eindhoven 40,4 Grad erreicht. Der Hitzerekord von 2018 wurde um 3,7 Grad pulverisiert!</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <div class="sticky-div"><svg class="svelte-ow2kaq"><g class="graphsvg"${attr("transform", `translate(${stringify(screenWidth * 0.45)},${stringify(screenHeight * 0)})`)}>`);
    XAxis($$renderer2, { xScale, height: screenHeight * yAxisScale });
    $$renderer2.push(`<!---->`);
    YAxis($$renderer2, { yScale, height: screenHeight * yAxisScale });
    $$renderer2.push(`<!----><text class="axistitle"${attr("x", xScale(1988))}${attr("y", yScale(26) + 2)}>Jahr</text><text class="graphtitle"${attr("x", xScale(1985))}${attr("y", yScale(41))}>${escape_html(title)}</text><text class="axistitle"${attr("transform", `translate(${stringify(xAxisScale * screenWidth * -0.07 - 5)},${stringify(yAxisScale * screenHeight * 0.5)} ) rotate(-90)`)} text-anchor="middle">Höchsttemperatur (°C)</text>`);
    if (ratioOfCsvData > 80 && currentStepName === "temperatuurstijging") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<g${attr("transform", `translate(${stringify(xScale(2017))},${stringify(yScale(40))})`)}><text${attr("x", -90)}${attr("y", 32)} class="recordyear" font-size="2vh">Das erste Mal</text><text${attr("x", -90)}${attr("y", 32 + 0.02 * innerHeight)} class="recordyear" font-size="2vh">40+ °C in 2019</text><path fill="none" stroke="darkred" d="M0 0 L-15 15 L0 0 L-10 0 L0 0 L0 10" stroke-width="2"></path></g>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    if (currentStepName === "temperatuurstijging") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<!--[-->`);
      const each_array = ensure_array_like(_.slice(maxTempData, 0, ratioOfCsvData));
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let d = each_array[$$index];
        $$renderer2.push(`<circle${attr("cx", xScale(+d.year))}${attr("cy", yScale(+d.T))}${attr("r", 3e-3 * screenHeight)}${attr("fill", colorScale(+d.T))}></circle>`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    if (currentStepName === "temperatuurstijging") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<!--[-->`);
      const each_array_1 = ensure_array_like(_.slice(maxTempData, 0, ratioOfCsvData));
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let d = each_array_1[$$index_1];
        $$renderer2.push(`<circle class="fade-in dot"${attr("cx", xScale(+d.year))}${attr("cy", yScale(+d.T))}${attr("r", 7e-3 * screenHeight)}${attr("fill", colorScale(+d.T))}></circle>`);
      }
      $$renderer2.push(`<!--]-->`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></g></svg></div></div>`);
    bind_props($$props, { index, maxTempData, offset, currentStepName, stepName });
  });
}
function Kansgrafiek($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let ratioOfCsvData, xScale, yScale;
    let index = $$props["index"];
    let middellijnData = $$props["middellijnData"];
    let middellijnData2050 = $$props["middellijnData2050"];
    let offset = $$props["offset"];
    let confidenceData = $$props["confidenceData"];
    let currentStepName = $$props["currentStepName"];
    let stepName = $$props["stepName"];
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
    ratioOfCsvData = Math.round(offset * 6 * middellijnData.length);
    Math.round(offset * 6 * confidenceData.length);
    {
      xAxisWidthRatio = 0.38;
      yAxisScaleKans = 0.7;
      textPaddingKans = 0.25;
      grafiekPositionY = 0;
      grafiekPositionX = 0.45;
      legendPositionX1 = 0.33;
      legendPositionX2 = 0.35;
    }
    xScale = d3.scaleLog().domain([100, 0.01]).range([0, screenWidth * xAxisWidthRatio]);
    yScale = d3.scaleLinear().domain([28, 49]).range([screenHeight * yAxisScaleKans, 0]);
    $$renderer2.push(`<div class="grafiek">`);
    if (index > 1) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="graphtext"${attr_style(`top:${stringify(`${textPaddingKans * screenHeight}px`)}`)}>`);
      if (currentStepName === "scatter" || currentStepName === "kansgrafiek") {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<h1 class="scroll-text-kansgraph">Statistische Berechnungen</h1> <p class="scroll-text-kansgraph">Die Wahrscheinlichkeit von 40 Grad Celsius ist durch den Klimawandel stark gestiegen. Hitzestatistiken für Eindhoven zeigen, wie hoch die Wahrscheinlichkeit ist, dass eine bestimmte Temperatur in einem Jahr auftritt.</p> <div class="fade-in"${attr_style(`visibility:${stringify(ratioOfCsvData > 100 && currentStepName === "kansgrafiek" ? "visible" : "hidden")}`)}><p class="scroll-text-kansgraph">Als Niels klein war, <mark style="background: #648fff50 !important">um 1980,</mark> war es nahezu unmöglich, dass es 40 Grad werden würde.</p></div> <div class="fade-in"${attr_style(`visibility:${stringify(ratioOfCsvData > 250 && currentStepName === "kansgrafiek" ? "visible" : "hidden")}`)}><p class="scroll-text-kansgraph">Mittlerweile, <mark style="background: #ffb00050 !important">im Jahr 2023</mark>, liegt die Wahrscheinlichkeit für 40 Grad bei etwa 2%.</p></div> <div class="fade-in"${attr_style(`visibility:${stringify(ratioOfCsvData > 360 && currentStepName === "kansgrafiek" ? "visible" : "hidden")}`)}><p class="scroll-text-kansgraph"><mark style="background: #93003a50 !important">Im Jahr 2050</mark>, wenn Sem erwachsen ist, wird die Wahrscheinlichkeit für 40 Grad auf etwa 8% gestiegen sein.</p></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="sticky-div"><svg class="svelte-1gmt9ro"><g class="svgkansgrafiek"${attr("transform", `translate(${stringify(screenWidth * grafiekPositionX)},${stringify(screenHeight * grafiekPositionY)})`)}>`);
    XAxis($$renderer2, { xScale, height: screenHeight * yAxisScaleKans });
    $$renderer2.push(`<!---->`);
    YAxis($$renderer2, { yScale, height: screenHeight * yAxisScaleKans });
    $$renderer2.push(`<!----><text class="legendtext svelte-1gmt9ro"${attr("x", screenWidth * legendPositionX1)}${attr("y", yScale(31.8))}>Statistik für:</text><text class="legendtext svelte-1gmt9ro"${attr("x", screenWidth * legendPositionX2 + screenWidth * 5e-3)}${attr("y", yScale(31))}>1980</text><line${attr("x1", screenWidth * legendPositionX1)}${attr("y1", yScale(31))}${attr("x2", screenWidth * legendPositionX2)}${attr("y2", yScale(31))} stroke="#648fff" stroke-width="0.3vh"></line><text${attr("x", xScale(1.5))} class="axistitle"${attr("y", yScale(26) + 2)}>Wahrscheinlichkeit (%)</text><text class="axistitle"${attr("transform", `translate(${stringify(xAxisWidthRatio * screenWidth * -0.07 - 5)},${stringify(yAxisScaleKans * screenHeight * 0.5)} ) rotate(-90)`)} text-anchor="middle">Temperatur (°C)</text><line${attr("x1", xScale(100))}${attr("y1", yScale(40))}${attr("x2", xScale(0.01))}${attr("y2", yScale(40))} stroke="grey" stroke-dasharray="5,5"></line><text class="graphtitle"${attr("x", xScale(1))}${attr("y", yScale(48))}>Die Wahrscheinlichkeit von Hitze pro Generation</text>`);
    if (ratioOfCsvData > 170 && currentStepName === "kansgrafiek") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<line${attr("x1", xScale(8e-3))}${attr("y1", yScale(37.0855))}${attr("x2", xScale(8e-3))}${attr("y2", yScale(44.0244))} stroke="grey"></line><line${attr("x1", xScale(75e-4))}${attr("y1", yScale(37.0855))}${attr("x2", xScale(85e-4))}${attr("y2", yScale(37.0855))} stroke="grey"></line><line${attr("x1", xScale(75e-4))}${attr("y1", yScale(44.0244))}${attr("x2", xScale(85e-4))}${attr("y2", yScale(44.0244))} stroke="grey"></line><text${attr("x", xScale(75e-4))}${attr("y", yScale(40.5))} font-size="1.3vh" marker-end="url(#triangle)">Bandbreite</text>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    if (ratioOfCsvData > 270) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<line${attr("x1", xScale(1.65))}${attr("y1", yScale(28))}${attr("x2", xScale(1.7))}${attr("y2", yScale(40))} stroke="grey" stroke-dasharray="5,5"></line><text class="legendtext svelte-1gmt9ro"${attr("x", screenWidth * legendPositionX2 + screenWidth * 5e-3)}${attr("y", yScale(31) + screenHeight * 0.02)}>2023</text><line${attr("x1", screenWidth * legendPositionX1)}${attr("y1", yScale(31) + screenHeight * 0.02)}${attr("x2", screenWidth * legendPositionX2)}${attr("y2", yScale(31) + screenHeight * 0.02)} stroke="#ffb000" stroke-width="0.3vh"></line><text${attr("x", xScale(1.65) + screenWidth * 3e-3)}${attr("y", yScale(28) - screenHeight * 5e-3)} fill="#ffb000" font-size="2vh">2%</text>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    if (ratioOfCsvData > 360) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<line${attr("x1", xScale(7.8))}${attr("y1", yScale(28))}${attr("x2", xScale(7.8))}${attr("y2", yScale(40))} stroke="grey" stroke-dasharray="5,5"></line><text class="legendtext svelte-1gmt9ro"${attr("x", screenWidth * legendPositionX2 + screenWidth * 5e-3)}${attr("y", yScale(31) + screenHeight * 0.04)}>2050</text><line${attr("x1", screenWidth * legendPositionX1)}${attr("y1", yScale(31) + screenHeight * 0.04)}${attr("x2", screenWidth * legendPositionX2)}${attr("y2", yScale(31) + screenHeight * 0.04)} stroke="#93003a" stroke-width="0.3vh"></line><text${attr("x", xScale(7.8) + screenWidth * 3e-3)}${attr("y", yScale(28) - screenHeight * 5e-3)} fill="#93003a" font-size="2vh">8%</text>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></g></svg> <p class="graph-description svelte-1gmt9ro">Hitzestatistiken für Eindhoven für das Klima von 1980, 2023 und 2050. Diese wurden auf Basis von Messungen der KNMI-Station Eindhoven und dem KNMI'14 Hoch-(WH)-Szenario für 2050 berechnet. Verwendete Tools: <a href="https://climexp.knmi.nl">KNMI Climate Explorer</a> und das <a href="https://www.knmi.nl/nederland-nu/KNMI14_klimaatscenarios/transformatieprogramma">KNMI'14 Transformationsprogramm</a>.</p></div></div>`);
    bind_props($$props, {
      index,
      middellijnData,
      middellijnData2050,
      offset,
      confidenceData,
      currentStepName,
      stepName
    });
  });
}
function Krantenkoppen($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let offset = $$props["offset"];
    let index = $$props["index"];
    let stepName = $$props["stepName"];
    let currentStepName = $$props["currentStepName"];
    let stepSize;
    $$renderer2.push(`<div class="stepdiv svelte-ldzguo"><div class="telefoon svelte-ldzguo"${attr_style(`top:${stringify(`${0.12 * stepSize}px`)}`)}><img class="telefoonimg svelte-ldzguo" style="width:100%;" src="/images/holdingphone.png"/></div></div> `);
    if (store_get($$store_subs ??= {}, "$sound", sound) && stepName === currentStepName) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<audio src="sounds/night.mp3" autoplay loop></audio>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { offset, index, stepName, currentStepName });
  });
}
function AutoRitje($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let offset = $$props["offset"];
    let index = $$props["index"];
    let stepName = $$props["stepName"];
    let currentStepName = $$props["currentStepName"];
    let stepSize;
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
    $$renderer2.push(`<div class="stepdiv svelte-7moyhr">`);
    TextAndImagesScenes($$renderer2, { scenes, stepSize, imageOffset: 0.03 });
    $$renderer2.push(`<!----> `);
    if (store_get($$store_subs ??= {}, "$sound", sound) && stepName === currentStepName && offset < 0.6 && offset < 0.27) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<audio src="sounds/carstart.mp3" autoplay></audio>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (store_get($$store_subs ??= {}, "$sound", sound) && stepName === currentStepName && (offset > 0.05 && offset < 0.27 || offset > 0.36) && offset < 0.84) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<audio src="sounds/cardriving.mp3" autoplay loop></audio>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (store_get($$store_subs ??= {}, "$sound", sound) && stepName === currentStepName && (offset > 0.27 || offset > 0.72)) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<audio src="sounds/gettingoutcar.mp4" autoplay></audio>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (store_get($$store_subs ??= {}, "$sound", sound) && stepName === currentStepName && offset > 0.36 && offset < 0.74) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<audio src="sounds/trafficjam.mp3" autoplay></audio>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (store_get($$store_subs ??= {}, "$sound", sound) && stepName === currentStepName && offset > 0.84) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<audio src="sounds/ziekenhuis.mp3" autoplay></audio>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { offset, index, stepName, currentStepName });
  });
}
function Aftiteling($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let offset = $$props["offset"];
    let index = $$props["index"];
    let stepName = $$props["stepName"];
    let currentStepName = $$props["currentStepName"];
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
    $$renderer2.push(`<div class="aftitelingdiv svelte-1n8q51h"><img class="imgaftiteling svelte-1n8q51h" src="/images/heatwave1.png" width="100%"/> <!--[-->`);
    const each_array = ensure_array_like(scenes);
    for (let i = 0, $$length = each_array.length; i < $$length; i++) {
      let scene = each_array[i];
      $$renderer2.push(`<div class="scroll-text-block outro"${attr_style(`top:${stringify(`${(scene["time"] + 0.05) * stepSize}px`)}`)}><p class="scroll-text outro-text">${html(scene["text"])}</p></div>`);
    }
    $$renderer2.push(`<!--]--> <div class="leeslijst svelte-1n8q51h"><h1>Weiterlesen?</h1> <h3 class="leeslijstcat svelte-1n8q51h">Wissenschaftliche Publikationen</h3> <ul class="myUL svelte-1n8q51h"><li><a href="https://www.nature.com/articles/s41558-021-01092-9" target="_blank" class="svelte-1n8q51h">Artikel in Nature:</a> 'Zunehmende Wahrscheinlichkeit von rekordbrechenden Klimaextremen'</li> <li><a href="https://mcusercontent.com/854a9a3e09405d4ab19a4a9d5/files/95512c98-67bc-9849-c006-5fe389b776ed/WWA_scientific_report_Northern_Hemisphere_heat.pdf" target="_blank" class="svelte-1n8q51h">Wissenschaftliche Studie:</a> 'Extreme Hitze in Nordamerika, Europa und China im Juli 2023 durch Klimawandel viel wahrscheinlicher'</li> <li><a href="/PosterEGU.pdf" target="_blank" class="svelte-1n8q51h">Poster über die Folgen extremer Hitze</a></li></ul> <h3 class="leeslijstcat svelte-1n8q51h">KNMI-Meldungen</h3> <ul class="myUL svelte-1n8q51h"><li><a href="https://www.knmi.nl/over-het-knmi/nieuws/ieder-jaar-een-verpletterend-hitterecord " target="_blank" class="svelte-1n8q51h">Jedes Jahr ein vernichtender Hitzerekord?</a></li> <li><a href="https://www.knmi.nl/over-het-knmi/nieuws/absolute-temperatuurrecords-door-saharahitte " target="_blank" class="svelte-1n8q51h">Absolute Temperaturrekorde durch Sahara-Hitze</a></li> <li><a href="https://www.knmi.nl/over-het-knmi/nieuws/toename-hittegolven-in-europa-gelinkt-aan-veranderende-straalstroom" target="_blank" class="svelte-1n8q51h">Zunahme von Hitzewellen in Europa mit verändertem Jetstream verbunden</a></li> <li><a href="https://www.knmi.nl/over-het-knmi/nieuws/extreme-hitte-in-april-in-middellandse-zeegebied-waarschijnlijker-door-klimaatverandering" target="_blank" class="svelte-1n8q51h">Extreme Hitze im April im Mittelmeerraum durch Klimawandel wahrscheinlicher</a></li></ul> <h3 class="leeslijstcat svelte-1n8q51h">Videos und Webinare</h3> <ul class="myUL svelte-1n8q51h"><li><a href="https://www.youtube.com/watch?v=lhHbjdhAqxs" target="_blank" class="svelte-1n8q51h">Mini-Vorlesung der Universität der Niederlande: Werden die Niederlande immer häufiger mit Hitzewellen konfrontiert?</a></li> <li><a href="https://www.youtube.com/watch?v=2NZYAkmqPr8" target="_blank" class="svelte-1n8q51h">KNMI-Video: Temperatur zum ersten Mal über 40 Grad</a></li> <li><a href="https://klimaatverbond.nl/actueel/terugblik-op-het-webinar-de-hittelessen-van-portland-en-het-code-rood-scenario-in-nederland/" target="_blank" class="svelte-1n8q51h">Webinar des Klimaatverbond Nederland über die (Hitze-)Lektionen von Portland und das Code-Rot-Szenario in den Niederlanden</a></li></ul> <h3 class="leeslijstcat svelte-1n8q51h">Fiktion</h3> <ul class="myUL svelte-1n8q51h"><li><a href="https://www.npo3.nl/hitte/POMS_S_EO_16238783" target="_blank" class="svelte-1n8q51h">Katastrophenserie Hitze</a></li></ul></div> <div class="copyright svelte-1n8q51h"><p>© 2023 <a href="http://www.climateadaptationservices.com" target="_blank" class="svelte-1n8q51h">Climate Adaptation Services (CAS)</a></p></div></div>`);
    bind_props($$props, { offset, index, stepName, currentStepName });
  });
}
function NavigationPanel($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let innerHeight2;
    let stepNames = $$props["stepNames"];
    let currentStepName = $$props["currentStepName"];
    let height = $$props["height"];
    let offset = $$props["offset"];
    const yOffset = 40;
    innerHeight2 = height - 2 * yOffset;
    if (offset > 0.1 || currentStepName !== "thuis") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<svg class="navigation-svg svelte-12wk00g"><!--[-->`);
      const each_array = ensure_array_like(stepNames);
      for (let i = 0, $$length = each_array.length; i < $$length; i++) {
        let stepName = each_array[i];
        $$renderer2.push(`<g class="chapterg svelte-12wk00g"${attr("transform", `translate(170,${stringify(yOffset + innerHeight2 / stepNames.length * i)})`)}><text${attr_class(`chapter-text ${stringify(currentStepName === stepName ? "chapter-text-active" : "")}`, "svelte-12wk00g")}${attr("fill", ["wandeling", "krantenkoppen", "aftiteling"].includes(currentStepName) ? "white" : "rgb(130, 130, 130)")} dy="0.26em" dx="-25" opacity="0">${escape_html(stepName.charAt(0).toUpperCase() + stepName.slice(1))}</text><circle class="chapter-circle svelte-12wk00g"${attr("r", stepName === currentStepName ? "8" : "1")}${attr("stroke-width", stepName === currentStepName ? "7px" : "10px")} opacity="1" fill="cyan"></circle><rect width="130"${attr("height", innerHeight2 / stepNames.length)} opacity="0" x="-110"${attr("y", -(innerHeight2 / stepNames.length) / 2)}${attr("pointer-events", currentStepName === stepName ? "none" : "default")}></rect></g>`);
      }
      $$renderer2.push(`<!--]--></svg>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { stepNames, currentStepName, height, offset });
  });
}
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
function Scroller($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let style, widthStyle;
    let top = fallback($$props["top"], 0);
    let bottom = fallback($$props["bottom"], 1);
    let threshold = fallback($$props["threshold"], 0.5);
    let query = fallback($$props["query"], "section");
    let parallax = fallback($$props["parallax"], false);
    let index = fallback($$props["index"], 0);
    let count = fallback($$props["count"], 0);
    let offset = fallback($$props["offset"], 0);
    let progress = fallback($$props["progress"], 0);
    let visible = fallback($$props["visible"], false);
    let offset_top = 0;
    style = `
		position: ${"absolute"};
		top: 0;
		transform: translate(0, ${offset_top}px);
		z-index: ${1};
	`;
    widthStyle = "";
    $$renderer2.push(`<svelte-scroller-outer class="svelte-1x1lhrb"><svelte-scroller-background-container class="background-container svelte-1x1lhrb"${attr_style(`${stringify(style)}${stringify(widthStyle)}`)}><svelte-scroller-background class="svelte-1x1lhrb"><!--[-->`);
    slot($$renderer2, $$props, "background", {});
    $$renderer2.push(`<!--]--></svelte-scroller-background></svelte-scroller-background-container> <svelte-scroller-foreground class="svelte-1x1lhrb"><!--[-->`);
    slot($$renderer2, $$props, "foreground", {});
    $$renderer2.push(`<!--]--></svelte-scroller-foreground></svelte-scroller-outer>`);
    bind_props($$props, {
      top,
      bottom,
      threshold,
      query,
      parallax,
      index,
      count,
      offset,
      progress,
      visible
    });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let currentStepName;
    let imageModules = /* @__PURE__ */ Object.assign({ "/static/images/arrowdown.png": () => import("../../chunks/arrowdown.js"), "/static/images/bank1.png": () => import("../../chunks/bank1.js"), "/static/images/boer.png": () => import("../../chunks/boer.js"), "/static/images/boer1.png": () => import("../../chunks/boer1.js"), "/static/images/cloud.png": () => import("../../chunks/cloud.js"), "/static/images/dommelplantsoen.png": () => import("../../chunks/dommelplantsoen.js"), "/static/images/dwerg.png": () => import("../../chunks/dwerg.js"), "/static/images/festival.jpg": () => import("../../chunks/festival.js"), "/static/images/file.png": () => import("../../chunks/file.js"), "/static/images/gasten.png": () => import("../../chunks/gasten.js"), "/static/images/gesprek.png": () => import("../../chunks/gesprek.js"), "/static/images/hardloper1.png": () => import("../../chunks/hardloper1.js"), "/static/images/headphones.png": () => import("../../chunks/headphones.js"), "/static/images/heatwave.jpg": () => import("../../chunks/heatwave.js"), "/static/images/heatwave1.png": () => import("../../chunks/heatwave1.js"), "/static/images/holdingphone.png": () => import("../../chunks/holdingphone.js"), "/static/images/kerk.png": () => import("../../chunks/kerk.js"), "/static/images/leonieradeloos.png": () => import("../../chunks/leonieradeloos.js"), "/static/images/logokleur.png": () => import("../../chunks/logokleur.js"), "/static/images/manonwel.png": () => import("../../chunks/manonwel.js"), "/static/images/mute.png": () => import("../../chunks/mute.js"), "/static/images/nielsboom.png": () => import("../../chunks/nielsboom.js"), "/static/images/nielsgaatwandelen.png": () => import("../../chunks/nielsgaatwandelen.js"), "/static/images/nielstel.png": () => import("../../chunks/nielstel.js"), "/static/images/oudevrouwziekenhuis.png": () => import("../../chunks/oudevrouwziekenhuis.js"), "/static/images/politie.png": () => import("../../chunks/politie.js"), "/static/images/pomp.png": () => import("../../chunks/pomp.js"), "/static/images/seminbed1.png": () => import("../../chunks/seminbed1.js"), "/static/images/tempmeter.png": () => import("../../chunks/tempmeter.js"), "/static/images/volume.png": () => import("../../chunks/volume.js"), "/static/images/weeralarm.jpg": () => import("../../chunks/weeralarm.js"), "/static/images/ziekenhuischaos2.png": () => import("../../chunks/ziekenhuischaos2.js"), "/static/images/zwembad.png": () => import("../../chunks/zwembad.js") });
    let data = $$props["data"];
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
    currentStepName = stepNames[index];
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("1uha8ag", $$renderer3, ($$renderer4) => {
        $$renderer4.push(`<!--[-->`);
        const each_array = ensure_array_like(Object.keys(imageModules));
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let imageUrl = each_array[$$index];
          $$renderer4.push(`<link rel="preload" as="image"${attr("href", imageUrl.slice(7))}/>`);
        }
        $$renderer4.push(`<!--]-->`);
      });
      if (maxTempData && middellijnData && middellijnData2050 && confidenceData) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div>`);
        Titlepage($$renderer3, { currentStepName, offset });
        $$renderer3.push(`<!----> <a href="https://climateadaptationservices.com" target="_blank"><img class="logo" src="/images/logokleur.png" width="10%"/></a> `);
        if (store_get($$store_subs ??= {}, "$started", started)) {
          $$renderer3.push("<!--[-->");
          Scroller($$renderer3, {
            get index() {
              return index;
            },
            set index($$value) {
              index = $$value;
              $$settled = false;
            },
            get offset() {
              return offset;
            },
            set offset($$value) {
              offset = $$value;
              $$settled = false;
            },
            get progress() {
              return progress;
            },
            set progress($$value) {
              progress = $$value;
              $$settled = false;
            },
            $$slots: {
              background: ($$renderer4) => {
                $$renderer4.push(`<div slot="background" top="0" bottom="0" class="svelte-1uha8ag">`);
                if (data) {
                  $$renderer4.push("<!--[-->");
                  BackgroundMap($$renderer4, { leafletMap, offset, index, currentStepName });
                } else {
                  $$renderer4.push("<!--[!-->");
                }
                $$renderer4.push(`<!--]--></div>`);
              },
              foreground: ($$renderer4) => {
                $$renderer4.push(`<div slot="foreground" class="svelte-1uha8ag"><img class="sound svelte-1uha8ag"${attr("src", `/images/${stringify(store_get($$store_subs ??= {}, "$sound", sound) ? "volume" : "mute")}.png`)} width="30px"${attr_style(["wandeling", "krantenkoppen"].includes(currentStepName) ? "filter:invert(1)" : "")}/> <div class="navigation-panel svelte-1uha8ag">`);
                NavigationPanel($$renderer4, {
                  stepNames,
                  currentStepName,
                  height: navigationPanelHeight,
                  offset
                });
                $$renderer4.push(`<!----></div> <img class="fixed-image" src="" style="opacity:0"/> <!--[-->`);
                const each_array_1 = ensure_array_like(stepNames);
                for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
                  let stepName = each_array_1[i];
                  if ([
                    "temperatuurstijging",
                    "kansgrafiek",
                    "unseen",
                    "aftiteling",
                    "leeslijst"
                  ].includes(stepName)) {
                    $$renderer4.push("<!--[-->");
                    $$renderer4.push(`<section${attr_class(`widestep step_${stringify(stepName)}`, "svelte-1uha8ag")}>`);
                    if (stepName === "temperatuurstijging") {
                      $$renderer4.push("<!--[-->");
                      Scatter($$renderer4, { maxTempData, offset, index, stepName, currentStepName });
                    } else {
                      $$renderer4.push("<!--[!-->");
                      if (stepName === "kansgrafiek") {
                        $$renderer4.push("<!--[-->");
                        Kansgrafiek($$renderer4, {
                          middellijnData,
                          middellijnData2050,
                          offset,
                          index,
                          stepName,
                          confidenceData,
                          currentStepName
                        });
                      } else {
                        $$renderer4.push("<!--[!-->");
                        if (stepName === "aftiteling") {
                          $$renderer4.push("<!--[-->");
                          Aftiteling($$renderer4, { offset, index, stepName, currentStepName });
                        } else {
                          $$renderer4.push("<!--[!-->");
                        }
                        $$renderer4.push(`<!--]-->`);
                      }
                      $$renderer4.push(`<!--]-->`);
                    }
                    $$renderer4.push(`<!--]--></section>`);
                  } else {
                    $$renderer4.push("<!--[!-->");
                    $$renderer4.push(`<section${attr_class(`step step_${stringify(stepName)}`, "svelte-1uha8ag")}>`);
                    if (stepName === "thuis") {
                      $$renderer4.push("<!--[-->");
                      Introductie($$renderer4, { offset, index, currentStepName, stepName });
                    } else {
                      $$renderer4.push("<!--[!-->");
                      if (stepName === "gesprek") {
                        $$renderer4.push("<!--[-->");
                        Gesprek($$renderer4, { offset, index, currentStepName, stepName });
                      } else {
                        $$renderer4.push("<!--[!-->");
                        if (stepName === "ziekenhuis") {
                          $$renderer4.push("<!--[-->");
                          Ziekenhuis($$renderer4, { offset, index, currentStepName, stepName });
                        } else {
                          $$renderer4.push("<!--[!-->");
                          if (stepName === "wandeling") {
                            $$renderer4.push("<!--[-->");
                            Wandeling($$renderer4, { offset, index, currentStepName, stepName });
                          } else {
                            $$renderer4.push("<!--[!-->");
                            if (stepName === "krantenkoppen") {
                              $$renderer4.push("<!--[-->");
                              Krantenkoppen($$renderer4, { offset, index, currentStepName, stepName });
                            } else {
                              $$renderer4.push("<!--[!-->");
                              if (stepName === "autoritje") {
                                $$renderer4.push("<!--[-->");
                                AutoRitje($$renderer4, { offset, index, stepName, currentStepName });
                              } else {
                                $$renderer4.push("<!--[!-->");
                              }
                              $$renderer4.push(`<!--]-->`);
                            }
                            $$renderer4.push(`<!--]-->`);
                          }
                          $$renderer4.push(`<!--]-->`);
                        }
                        $$renderer4.push(`<!--]-->`);
                      }
                      $$renderer4.push(`<!--]-->`);
                    }
                    $$renderer4.push(`<!--]--></section>`);
                  }
                  $$renderer4.push(`<!--]-->`);
                }
                $$renderer4.push(`<!--]--></div>`);
              }
            }
          });
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--></div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]-->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
    if ($$store_subs) unsubscribe_stores($$store_subs);
    bind_props($$props, { data });
  });
}
export {
  _page as default
};
