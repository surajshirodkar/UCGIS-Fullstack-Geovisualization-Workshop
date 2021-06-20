var mymap = L.map('mapid').setView([40, -97], 5);

//var mymap = L.map('mapid').setView(map.unproject([198511.910315310698934, 451935.985398797609378]), 7);
//L.tileLayer is the function to define a tile layer for Leaflet, which is indicated by "L". Inside this function, there are two parameters:
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(mymap);

L.marker([41, -100]).addTo(mymap)
    .bindPopup("<b>Hello world!</b><br />I am an alone popup.").openPopup(); // automatically activate the popup once you open the webpage, without clicking on the object

L.circle([42, -90], 50000, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
}).addTo(mymap).bindPopup("I am an alone circle.");

L.circle([198511.910315310698934, 451935.985398797609378], 50000, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
}).addTo(mymap).bindPopup("I am an alone circle.");


L.polygon([
    [45, -90],
    [51.503, -85],
    [40, -75]
]).addTo(mymap).bindPopup("I am an alone polygon.");


$.get("https://surajshirodkar.github.io/UCGIS-Fullstack-Geovisualization-Workshop/data/Sol_Test.geojson", visualize_geojson)
//$.get("http://127.0.0.1:13579/1936_dem", visualize_geojson) 


function visualize_geojson(data) {
    //data = format_data(data);
    L.geoJSON(data, {
        pointToLayer: convert_point_to_symbol,
        onEachFeature: function(feature, layer) {
            layer.on({
                'mouseover': function (e){
                    highlight(e.target);
                },
                'mouseout': function (e) {
                    dehighlight(e.target);
                }
            });
        }
    }).addTo(mymap).bindPopup(data["features/properties"]);
}

// function visualize_geojson(data) {
//     //data = format_data(data);
//     L.geoJSON(data, {
//         pointToLayer: convert_point_to_symbol
//     }).addTo(mymap);
// }

function format_data(data) {
    var items = data._items;
    var geoJSON = {
        "type": "FeatureCollection",
        "name": "Seoul",
        "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
        "features": null
    }
    geoJSON["features"] = items;
    return geoJSON
}

function convert_point_to_symbol(feature, latlng) {
    return L.circleMarker(latlng, {
        radius: 8,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    });
}
var selected = null;

function dehighlight (layer) {
    if (selected === null || selected._leaflet_id !== layer._leaflet_id) {
        geojson.resetStyle(layer);
    }
    //geojson.resetStyle(layer);
  }

function highlight (layer) {
    layer.setStyle({
        weight: 5,
        dashArray: ''
    });
    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
}

// var highlight = 
// {
//     color: "#333333",
//     weight: 1,
//     opacity: 1,
//     fillOpacity: 0.8
// };

// function highlightLayer(layerID)
// {
//     map._layers['name'+layerID].setStyle(highlight);
// }

var popup = L.popup();

function onMapClick(event) {
    popup.setLatLng(event.latlng)
        .setContent("Suraj thinks you clicked the map at " + event.latlng.toString())
        .openOn(mymap);
}

mymap.on('click', onMapClick);
mymap.on('hover', highlightLayer);