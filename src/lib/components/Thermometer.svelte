<script>
  import XAxis from "$lib/components/axes/XAxis.svelte";
  import YAxis from "$lib/components/axes/YAxis.svelte";
  import * as d3 from 'd3'
  import _ from 'lodash';
  import { browser } from "$app/environment";
  import { scaleLinear, axisBottom, select, selectAll, format } from "d3";

  export let index
  export let maxTempData
  export let offset
  export let currentStepName
  export let unseenData

  $: unseenDataYear = unseenData.filter(d => d.year === '2019');

  $: unseenDataExtreme = unseenData.filter(d => d.celcius > 40);

  $: unseenDataYear = _.sortBy(unseenDataYear, 'number');

  $: ratioOfCsvData = Math.round((offset * 2)*unseenDataYear.length)

  $: console.log(offset)

  let stepSize;
  $: if(browser){
    let stepRect = document.getElementsByClassName('step_scatter')[0].getBoundingClientRect()
    stepSize = stepRect.bottom - stepRect.top;
  }

  $:console.log(unseenDataExtreme)




</script>

<div class='divscatter grafiek'>
  <div class='graphtext' style='top:{`${0.03*stepSize}px`}'>
    <p class='scroll-text'> 40C was ongezien en verraste ons in het jaar 2019.
    </p> 
    {#if ratioOfCsvData > 63}
    <div class= 'fade-in'>
      <p class='scroll-text'>Om te onderzoeken hoe heet het zou kunnen worden gebruiken we de UNSEEN-methode. Met weer-en klimaatmodellen verkennen we allerlei verschillende weergebeurtenissen. De meeste simulaties zitten onder de 40C, maar dankzij de grote dataset zien we ook uitzonderlijke hitte boven de 40C. Zo verkennen we weersextremen die nog niet zijn voorgekomen maar wel kunnen gebeuren.
    </p> 
    </div>   
    {/if} 
    {#if ratioOfCsvData > 200}
    <div class= 'fade-in'>  
      <p class='scroll-text'> De meeste virtuele waarnermingen zijn onder de 40 °C. Maar één waarneming laat een temperatuur zien van 40.6 °C. We zien dus dat de extremen uit de weermodellen wel degelijk kunnen voorkomen.
    </p> 
    </div>   
    {/if} 
    {#if ratioOfCsvData > 230}
    <div class= 'fade-in'>  
      <p class='scroll-text'> Als we dan naar de extremen in andere jaren kijken zien we sinds 1991 vaker 40 °C in de modellen. Deze 'virtuele waarnemingen' zijn toen niet uitgekomen maar hadden zo hoog kunnen zijn als 42 graden. 
    </p> 
    </div>   
    {/if}
  </div>
 

  <div class='sticky-div'>
    <!-- svg making up the thermometer
the idea is to include a clipPath element atop the colored sections and have it translate to show the underlying content
-->
    <svg viewBox="-4 0 30 30" transform="translate(-100,0)">
      <defs>
          <clipPath id="clip">
              <!-- y = 3 to have the clip ultimately hide a small part of the graphic
              even when the translation reaches translate(0 0)
              -->
              <rect
                  transform="translate(0 {1/offset*2 - 4})"
                  x="0"
                  y="3"
                  width="15"
                  height="30">
              </rect>
          </clipPath>
      </defs>

      <!-- lines on the side of the thermometer -->
        <g
            stroke="#272A6E"
            fill="none"
            stroke-width="0.5"
            stroke-linecap="round"
            transform="translate(7.5 0)">
            <path
                d="M 0 2.5 h 7">
            </path>
            <path
                d="M 0 5.5 h 5">
            </path>
            <path
                d="M 0 8.5 h 5">
            </path>
            <path
                d="M 0 11.5 h 7">
            </path>
            <path
                d="M 0 14.5 h 5">
            </path>
            <path
                d="M 0 17.5 h 5">
            </path>
        </g>
        <!-- colored line, hidden by the clipPath element -->
        <g
            clip-path="url(#clip)"
            stroke="#FF4E2C"
            fill="none"
            stroke-width="1"
            stroke-linecap="round"
            transform="translate(7.5 0)">
            <path
                d="M 0 2.5 h 7">
            </path>
            <path
                d="M 0 5.5 h 5">
            </path>
            <path
                d="M 0 8.5 h 5">
            </path>
            <path
                d="M 0 11.5 h 7">
            </path>
            <path
                d="M 0 14.5 h 5">
            </path>
            <path
                d="M 0 17.5 h 5">
            </path>
        </g>

        <!-- thermometer -->
        <g>
            <path
                d="M 7.5 2.5 v 20"
                fill="none"
                stroke="#F5F3E8"
                stroke-width="5"
                stroke-linecap="round">
            </path>
            <circle
                cx="7.5"
                cy="25"
                r="5"
                fill="#F5F3E8">
            </circle>
        </g>

        <!-- line describing a shadow on the thermometer -->
        <path
            d="M 7.5 2.5 v 20"
            fill="none"
            stroke="#000"
            stroke-width="2"
            stroke-linecap="round"
            opacity="0.2">
        </path>
        <!-- colored portions of the thermometer -->
        <g>
            <!-- line, clipped through the defined element -->
            <g
                clip-path="url(#clip)">
                <path
                    d="M 7.5 2.5 v 20"
                    fill="none"
                    stroke="#FF4E2C"
                    stroke-width="2"
                    stroke-linecap="round">
                </path>
            </g>
            <!-- circle -->
            <circle
                cx="7.5"
                cy="25"
                r="3"
                fill="#FF4E2C">
            </circle>
        </g>
      
      
      {#if currentStepName === 'unseen'&& offset> 0.2}
        <path transform="translate(15 11) rotate(50)" fill = 'yellow' xmlns="http://www.w3.org/2000/svg" d="M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z"/>
        <path transform="translate(23 17) rotate(90)" fill = 'yellow' xmlns="http://www.w3.org/2000/svg" d="M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z"/>
        <path transform="translate(25 25) rotate(120)" fill = 'yellow' xmlns="http://www.w3.org/2000/svg" d="M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z"/>
        <path transform="translate(-10 23) rotate(310)" fill = 'yellow' xmlns="http://www.w3.org/2000/svg" d="M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z"/>
        <path transform="translate(-8 33) rotate(270)" fill = 'yellow' xmlns="http://www.w3.org/2000/svg" d="M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z"/>
        <path transform="translate(-2 39) rotate(240)" fill = 'yellow' xmlns="http://www.w3.org/2000/svg" d="M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.553.553 0 0 1-1.1 0L7.1 4.995z"/>
      {/if}
      {#if currentStepName === 'unseen'&& offset> 0.4}
      
      <g xmlns="http://www.w3.org/2000/svg" transform="translate(0,1) scale(0.00100000,-0.00100000)" fill="#FF4E2C" stroke="none">
        <path d="M3068 9340 c-153 -24 -263 -68 -383 -151 -226 -156 -404 -465 -477 -831 -32 -159 -32 -436 0 -585 65 -304 210 -564 443 -794 215 -213 460 -366 865 -542 517 -224 915 -477 1301 -828 666 -606 1152 -1503 1377 -2541 84 -387 121 -662 171 -1248 21 -244 29 -290 55 -290 19 0 66 268 90 510 38 384 51 1017 30 1425 -61 1175 -295 2252 -691 3190 -90 212 -306 639 -418 829 -265 443 -544 809 -866 1131 -378 380 -761 621 -1113 701 -120 27 -295 38 -384 24z"/>
        <path d="M10740 9304 c-228 -41 -367 -87 -565 -184 -448 -220 -908 -614 -1360 -1165 -1031 -1256 -1695 -3045 -1869 -5040 -33 -375 -40 -536 -40 -950 0 -435 15 -696 47 -818 27 -107 46 -51 97 283 87 569 141 852 230 1185 423 1582 1286 2705 2570 3346 194 97 308 145 585 248 266 100 518 221 680 328 567 374 853 887 832 1493 -7 204 -33 340 -98 530 -134 386 -377 633 -709 721 -65 17 -119 23 -230 25 -80 1 -156 0 -170 -2z"/>
        <path d="M11657 6309 c-773 -64 -1768 -719 -2549 -1679 -798 -982 -1414 -2378 -1677 -3805 -69 -374 -110 -762 -81 -780 18 -11 43 46 135 308 175 496 248 676 390 965 504 1026 1233 1746 2140 2115 347 142 685 225 1138 282 253 31 381 55 538 101 531 154 884 467 1034 917 52 156 68 267 68 457 0 573 -261 968 -718 1089 -64 16 -293 45 -315 40 -3 -1 -49 -5 -103 -10z"/>
        <path d="M2044 5900 c-343 -44 -601 -181 -751 -400 -104 -153 -154 -366 -132 -571 13 -126 33 -199 84 -304 195 -401 657 -556 1375 -461 434 57 880 46 1237 -33 649 -142 1203 -495 1641 -1044 142 -179 234 -316 404 -607 110 -187 147 -223 133 -132 -41 287 -285 896 -531 1330 -163 287 -408 629 -631 882 -615 698 -1448 1184 -2263 1320 -142 24 -449 35 -566 20z"/>
        <path d="M1378 3928 c-659 -29 -1121 -280 -1301 -708 -55 -131 -72 -223 -71 -380 3 -534 319 -1050 762 -1240 232 -100 494 -132 778 -95 207 28 311 55 684 183 402 138 707 200 1099 223 456 26 937 -48 1381 -213 654 -244 1251 -665 1851 -1306 427 -457 453 -476 344 -253 -146 297 -433 727 -760 1136 -914 1144 -2000 1967 -3135 2378 -378 136 -822 236 -1185 266 -180 15 -269 17 -447 9z"/>
        <path d="M9420 2146 c-270 -59 -493 -257 -698 -621 -166 -296 -349 -858 -387 -1190 -6 -54 -6 -58 8 -45 8 8 40 71 71 139 104 230 196 372 315 484 240 226 523 201 855 -74 112 -94 206 -191 362 -379 193 -233 321 -338 431 -356 163 -26 253 165 253 540 0 195 -11 292 -51 456 -98 399 -301 725 -562 902 -80 54 -209 114 -288 133 -94 22 -232 27 -309 11z"/>
        </g>
      
      {/if}
      </svg>
  </div>
</div>


<style>

.divscatter{
    height:100%;
    position:relative;
  }

  .sticky-div{
    position: sticky;
    position: -webkit-sticky; /* Safari */
    top:100px;
    width: 100%;
    height: 600px;
    /* align-self: flex-end; */
    margin: 0 auto;
  }

  svg{
    width:300px;
    height:500px;
    float:left;
    position: absolute;
  }

  .fade-in {
    animation: fadeIn 2s;
  }

  @keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

  @-moz-keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @-webkit-keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @-o-keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @-ms-keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

</style>