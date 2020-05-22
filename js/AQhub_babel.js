"use strict";

// Create and initialize variables
var hvidata = {};
var neighborhoodData = {};
var selectedNeighborhood = ['']; //document.querySelector("#ntaField")
var selectedName = '';

// NTACODE,NTANAME,POV_PCT,PCT_BLACK_POP,GREENSPACE,SURFACETEMP,PCT_HOUSEHOLDS_AC,HVI_RANK,CD,HRI_HOSP_RATE

var nCD = ""
var nGREENSPACE = ""
var nHRI_HOSP_RATE = ""
var nHVI_RANK = ""
var nNTACODE = ""
var nNTANAME = ""
var nPCT_BLACK_POP = ""
var nPCT_HOUSEHOLDS_AC = ""
var nPOV_PCT = ""
var nSURFACETEMP = ""

var HVImapSpec = "js/HVIMapSpec.vg.json"  //"map/mapnta.vl.json"
var HospBarVGSpec = "js/HVIBarSpec.vg.json";

var embed_opt = {"renderer":"svg",
  actions:false
};
var mapSearch = document.querySelector("#map-search"); // creates a constant to hold the map search component selector

mapSearch.addEventListener('keyup', console.log('hi from mapSearch!')); //Neighborhood Selector Button

var outBtn = document.querySelector("#outputButton"); //creates a constant to hold the submit button query selector

outBtn.addEventListener("click", dataChange); // listens for button clicks to change neighborhood, changes data
// Locator Map

var map = new nyc.ol.FrameworkMap({
  mapTarget: '#mapLocator',
  searchTarget: '#map-search',
  startAt: '125 Worth Street',
  geoclientUrl: 'https://maps.nyc.gov/geoclient/v2/search.json?app_key=74DF5DB1D7320A9A2&app_id=nyc-lib-example' // Developer portal app_key and id don't work, though the nycLib example works
  //geoclientUrl: 'https://maps.nyc.gov/geoclient/v1/search.json?app_key=cfed478bf47829a2951bc5a3bbc26422&app_id=2d2a1b38'

}); //the d3 code below loads the NTA map data

//var nta_topojson = d3.json("https://grantpezeshki.github.io/NYC-topojson/NTA.json"); //the d3 code below loads the data from a CSV file and dumps it into global javascript object variable.

d3.csv("./data/HVI_DATA.csv").then(function (data) {
  //console.log(data); // [{"Hello": "world"}, …]
  hvidata = data;
  neighborhoodData = hvidata.filter(function (sf) {
    return sf.NTACODE === selectedNeighborhood;
  });
  console.log(hvidata);
  console.log(selectedNeighborhood);
  console.log(neighborhoodData);
}); // dataChange function updates selected neighborhood, then filter nyccas data and get new neighborhood data, then adds to DOM

function dataChange() {
  console.log('hi from dataChange function');
  selectedNeighborhood = map.location.data.nta; //document.querySelector("#ntaField").value;

  neighborhoodData = hvidata.filter(function (sf) {
    return sf.NTACODE === selectedNeighborhood;
  });
  selectedName = map.location.data.ntaName; //neighborhoodData[0].NTAName;
/*
  dPM = neighborhoodData[0].Avg_annavg_PM25;
  dPM = numRound(dPM);
  dNO2 = neighborhoodData[0].Avg_annavg_NO2;
  dNO2 = numRound(dNO2);
  dBuildingEmissions = neighborhoodData[0].tertile_buildingemissions;
  dBuildingDensity = neighborhoodData[0].tertile_buildingdensity;
  dTrafficDensity = neighborhoodData[0].tertile_trafficdensity;
  dIndustrial = neighborhoodData[0].tertile_industrial;
*/
  console.log(neighborhoodData[0]);
  nCD = neighborhoodData[0].CD;
  nGREENSPACE = neighborhoodData[0].GREENSPACE;  //green  *
  nHRI_HOSP_RATE = neighborhoodData[0].HRI_HOSP_RATE;  //hosp  **
  nHVI_RANK = neighborhoodData[0].HVI_RANK; //hvi  **
  nNTACODE = neighborhoodData[0].NTACODE; 
  nNTANAME = neighborhoodData[0].NTANAME; //nta1,2,3 etc
  nPCT_BLACK_POP = neighborhoodData[0].PCT_BLACK_POP;  //bpop  *
  nPCT_HOUSEHOLDS_AC = neighborhoodData[0].PCT_HOUSEHOLDS_AC; //ac  *
  nPOV_PCT = neighborhoodData[0].POV_PCT;  //pov  *
  nSURFACETEMP = neighborhoodData[0].SURFACETEMP;  //temp  *

  document.querySelector("#NTA").innerHTML = '<h4><span style="font-weight:bold;color:#15607a">' + selectedName + '</span></h4>';
  //document.querySelector("#NTA2").innerHTML = selectedName;
  //document.querySelector("#NTA3").innerHTML = selectedName;
  document.querySelector("#tempVal").innerHTML = nSURFACETEMP + ' deg';
  document.querySelector("#greenVal").innerHTML = nGREENSPACE + '%';
  document.querySelector("#hospVal").innerHTML = nHRI_HOSP_RATE + ' per 100,000';
  document.querySelector("#hviVal").innerHTML = nHVI_RANK + ' out of 5';
  document.querySelector("#bpopVal").innerHTML = nPCT_BLACK_POP + '%';
  document.querySelector("#acVal").innerHTML = nPCT_HOUSEHOLDS_AC + '%';
  document.querySelector("#povVal").innerHTML = nPOV_PCT + '%';
  //document.querySelector("#NO2").innerHTML = dNO2 + ' ppb';
  //document.querySelector("#BuildingEmissions").innerHTML = 'Building emissions<br><h5>' + tertileTranslate(dBuildingEmissions) + '</h5>';
  //document.querySelector("#BuildingDensity").innerHTML = 'Building density<br><h5>' + tertileTranslate(dBuildingDensity) + '</h5>';
  //document.querySelector("#TrafficDensity").innerHTML = 'Traffic density<br><h5>' + tertileTranslate(dTrafficDensity) + '</h5>';
  //document.querySelector("#Industrial").innerHTML = 'Industrial area<br><h5>' + tertileTranslate(dIndustrial) + '</h5>';
  //loadMap(tabShown);
  loadMap();
  loadHospBar();
  console.log('changed');
  console.log(selectedNeighborhood);
} // rounding function lets us round all numbers the same


function numRound(x) {
  return Number.parseFloat(x).toFixed(1);
} // jquery commands track tab changes


$(document).ready(function () {
  $(document).alert('hi from jquery');
  $(".nav-pills a").click(function () {
    $(this).tab('show');
  });
  $('.nav-pills a').on('shown.bs.tab', function (event) {
    tabShown = $(event.target).attr('aria-controls'); // active tab
    // var y = $(event.relatedTarget).text();  // previous tab

    $(".act span").text(tabShown);
    $(".prev span").text("did it again");
    loadMap(tabShown);
    loadHospBar();
    loadNO2Bar();
  });
}); //Returns block-level badges for the tabs

function tertileTranslate(tertileVal) {
  if (tertileVal === "3") {
    return '<span class="badge badge-worse btn-block">high</span>';
  } else if (tertileVal === "2") {
    return '<span class="badge badge-medium btn-block">medium</span>';
  } else {
    return '<span class="badge badge-better btn-block">low</span>';
  }

  ;
} //Returns in-line badges for text


function tertileTranslate2(tertileVal) {
  if (tertileVal === "3") {
    return '<span class="badge badge-worse">high</span>';
  } else if (tertileVal === "2") {
    return '<span class="badge badge-medium">medium</span>';
  } else {
    return '<span class="badge badge-better">low</span>';
  }

  ;
} //Returns map insert/update div IDs


function mapUpdateID(tabShown) {
  if (tabShown === "tab-01-a") {
    return '#BEmap';
  } else if (tabShown === "tab-01-d") {
    return '#BDmap';
  } else if (tabShown === "tab-01-b") {
    return '#Industrialmap';
  } else if (tabShown === "tab-01-c") {
    return '#Trafficmap';
  } else {
    console.log('Error: not sure which map to update');
  }

  ;
} //Returns map specs for proper tab context


function mapUpdateSpec(tabShown) {
  if (tabShown === "tab-01-a") {
    return "./js/BEmapSpec.vg.json";
  } else if (tabShown === "tab-01-d") {
    return "./js/BDmapSpec.vg.json";
  } else if (tabShown === "tab-01-b") {
    return "./js/IndustrialmapSpec.vg.json";
  } else if (tabShown === "tab-01-c") {
    return "./js/TrafficmapSpec.vg.json";
  } else {
    console.log('Error: not sure which map to update');
  }

  ;
} //create a function to load the Building Density map. Invoked when user clicks the tab or when neighborhood changes.


function loadMap() {
  //console.log(mapUpdateID(tabShown));
  vegaEmbed('#mapvis', HVImapSpec, embed_opt).then(function (result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
    //result.view.insert('selectedNabe',selectedNeighborhood).run()
    result.view.signal("selectNTA", selectedNeighborhood).runAsync();
  }).catch(console.error);
} // load the maps initially


loadMap(); 

// load the PM Bar Chart
var el = document.getElementById('PMbar');
var pmBarView = vegaEmbed("#PMbar", HospBarVGSpec, embed_opt)
//.catch(function (error) {
//  return showError(el, error);
//})
.then(function (res) {
  return res.view.signal("selectNTA", selectedNeighborhood).runAsync();
}).catch(console.error);

function loadHospBar() {
  pmBarView = vegaEmbed("#PMbar", HospBarVGSpec, embed_opt)
 // .catch(function (error) {
 //   return showError(el, error);
 // })
  .then(function (res) {
    return res.view.signal("selectNTA", selectedNeighborhood).runAsync();
  }).catch(console.error);
} 

// load the NO2 Bar Chart


var ele = document.getElementById('NO2bar');
var NO2BarView = vegaEmbed("#NO2bar", NO2BarVGSpec, embed_opt)
//.catch(function (error) {
//  return showError(ele, error);
//})
.then(function (res) {
  return res.view.insert("nyccasData", nyccasData).signal("selectNTA", selectedNeighborhood).runAsync();
}).catch(console.error);

function loadNO2Bar() {
  NO2BarView = vegaEmbed("#NO2bar", NO2BarVGSpec, embed_opt)
//  .catch(function (error) {
//    return showError(ele, error);
 // })
  .then(function (res) {
    return res.view.insert("nyccasData", nyccasData).signal("selectNTA", selectedNeighborhood).runAsync();
  }).catch(console.error);
}
/*   //These scripts load the maps initially but once a neighborhood is selected this is not needed
 //var spec = "https://raw.githubusercontent.com/vega/vega/master/docs/examples/bar-chart.vg.json";
var PMmapSpec = "./js/PMmapSpec.vl.json"
vegaEmbed('#PMmap', PMmapSpec).then(function(result) {
  // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
  //result.view.insert('selectedNabe',selectedNeighborhood).run()
}).catch(console.error);
  // these load the maps initially. 
 vegaEmbed('#BEmap', BEmapSpec).then(function(result) {
  // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
  //result.view.insert('selectedNabe',selectedNeighborhood).run()
}).catch(console.error);
 vegaEmbed('#BDmap', BDmapSpec).then(function(result) {
  // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
  //result.view.insert('selectedNabe',selectedNeighborhood).run()
}).catch(console.error);
 vegaEmbed('#Industrialmap', industrialMapSpec).then(function(result) {
  // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
  //result.view.insert('selectedNabe',selectedNeighborhood).run()
}).catch(console.error);
 vegaEmbed('#Trafficmap', trafficMapSpec).then(function(result) {
  // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
  //result.view.insert('selectedNabe',selectedNeighborhood).run()
}).catch(console.error);
*/

// Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/append()/append().md
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('append')) {
      return;
    }
    Object.defineProperty(item, 'append', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function append() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();
        
        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });
        
        this.appendChild(docFrag);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);