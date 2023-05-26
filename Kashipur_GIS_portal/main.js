var serverPort = 'localhost:8080';
var geoserverWorkspace = 'bhoomatics';
var stateLayerName = 'ind_Dist';
var ksp_hospital_lyr = 'ksp_hospital'
var ksp_hotel_lyr = 'ksp_hotel'
var ksp_school_lyr = 'ksp_school'
var ksp_lvl_cross_lyr = 'ksp_levelcrossing'
var ksp_highway_lyr = 'ksp_highway';
var ksp_rail_lyr = 'ksp_rail'
var ksp_boundary_lyr = 'kashipur_boundar';
var identifyLayers = [];
var projectionName = 'EPSG:4326';
var layerList = [];

var geojson;
var queryGeoJSON;

var highlightStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(64,244,208,0.4)',
    }),
    stroke: new ol.style.Stroke({
        color: '#40E0D0',
        width: 3,
    }),
    image: new ol.style.Circle({
        radius: 10,
        fill: new ol.style.Fill({
            color: '#40E0D0'
        })
    })
});
var featureOverlay = new ol.layer.Vector({
    source: new ol.source.Vector(),
    map: map,
    style: highlightStyle
});

var querySelectedFeatureStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(64,244,208,0.4)',
    }),
    stroke: new ol.style.Stroke({
        color: '#40E0D0',
        width: 3,
    }),
    image: new ol.style.Circle({
        radius: 10,
        fill: new ol.style.Fill({
            color: '#40E0D0'
        })
    })
});
var querySelectedFeatureOverlay = new ol.layer.Vector({
    source: new ol.source.Vector(),
    map: map,
    style: querySelectedFeatureStyle
});

var clickSelectedFeatureStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(255,255,0,0.4)',
    }),
    stroke: new ol.style.Stroke({
        color: '#FFFF00',
        width: 3,
    }),
    image: new ol.style.Circle({
        radius: 10,
        fill: new ol.style.Fill({
            color: '#FFFF00'
        })
    })
});
var clickSelectedFeatureOverlay = new ol.layer.Vector({
    source: new ol.source.Vector(),
    map: map,
    style: clickSelectedFeatureStyle
});
var interactionStyle = new ol.style.Style({
    fill: new ol.style.Fill({
        color: 'rgba(200, 200, 200, 0.6)',
    }),
    stroke: new ol.style.Stroke({
        color: 'rgba(0, 0, 0, 0.5)',
        lineDash: [10, 10],
        width: 2,
    }),
    image: new ol.style.Circle({
        radius: 5,
        stroke: new ol.style.Stroke({
            color: 'rgba(0, 0, 0, 0.7)',
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)',
        }),
    })
});

var mapView = new ol.View({
    center: ol.proj.fromLonLat([78.95554920151083, 29.209970623694414]),
    // center: [8772708.89416, 3400266.97836],
    zoom: 12
    // zoom: 20
});

var map = new ol.Map({
    target: 'map',
    view: mapView,
    controls: []
});

var osmTile = new ol.layer.Tile({
    title: 'Open Street Map',
    type: 'base',
    visible: false,
    attributions: '',
    source: new ol.source.OSM()
});

var noneTile = new ol.layer.Tile({
    title: 'None',
    type: 'base',
    visible: true
});

// map.addLayer(osmTile);

// // start : adding landbase layers
// var gaTile = new ol.layer.Image({
//     title: 'GA Boundary',
//     source: new ol.source.ImageWMS({
//         url: 'http://"+serverPort+"/geoserver/'+geoserverWorkspace+'/wms',
//         params: { 'LAYERS': 'Torrent:ga_boundary', 'TILED': true },
//         serverType: 'geoserver',
//         transition: 0,
//     }),
// });

// var bldTile = new ol.layer.Tile({
//     title: 'Building',
//     // minZoom: 17,
//     source: new ol.source.TileWMS({
//         url: 'http://"+serverPort+"/geoserver/'+geoserverWorkspace+'/wms',
//         params: { 'LAYERS': 'Torrent:building', 'TILED': true },
//         serverType: 'geoserver',
//         visible: false,
//         transition: 0,
//     }),
// });

// var greenTile = new ol.layer.Tile({
//     title: 'Green Area',
//     // minZoom: 17,
//     source: new ol.source.TileWMS({
//         url: 'http://"+serverPort+"/geoserver/'+geoserverWorkspace+'/wms',
//         params: { 'LAYERS': 'Torrent:green_area', 'TILED': true },
//         serverType: 'geoserver',
//         visible: false,
//         transition: 0,
//     }),
// });

// var lmTile = new ol.layer.Tile({
//     title: 'Landmark',
//     // minZoom: 17,
//     source: new ol.source.TileWMS({
//         url: 'http://"+serverPort+"/geoserver/'+geoserverWorkspace+'/wms',
//         params: { 'LAYERS': 'Torrent:landmark', 'TILED': true },
//         serverType: 'geoserver',
//         visible: false,
//         transition: 0,
//     }),
// });

// var rlTile = new ol.layer.Tile({
//     title: 'Railway Line',
//     // minZoom: 17,
//     source: new ol.source.TileWMS({
//         url: 'http://"+serverPort+"/geoserver/'+geoserverWorkspace+'/wms',
//         params: { 'LAYERS': 'Torrent:railway_line', 'TILED': true },
//         serverType: 'geoserver',
//         visible: false,
//         // projection: 'EPSG:3857',
//         transition: 0
//     }),
// });

// var rcTile = new ol.layer.Tile({
//     title: 'Road Centerline',
//     // minZoom: 17,
//     source: new ol.source.TileWMS({
//         url: 'http://"+serverPort+"/geoserver/'+geoserverWorkspace+'/wms',
//         params: { 'LAYERS': 'Torrent:road_centerline', 'TILED': true },
//         serverType: 'geoserver',
//         visible: false,
//         transition: 0,
//     }),
// });

// var reTile = new ol.layer.Tile({
//     title: 'Road Edge',
//     // minZoom: 17,
//     source: new ol.source.TileWMS({
//         url: 'http://"+serverPort+"/geoserver/'+geoserverWorkspace+'/wms',
//         params: { 'LAYERS': 'Torrent:road_edge', 'TILED': true },
//         serverType: 'geoserver',
//         visible: false,
//         transition: 0,
//     }),
// });

// var wbTile = new ol.layer.Tile({
//     title: 'Waterbody',
//     // minZoom: 17,
//     source: new ol.source.TileWMS({
//         url: 'http://"+serverPort+"/geoserver/'+geoserverWorkspace+'/wms',
//         params: { 'LAYERS': 'Torrent:waterbody', 'TILED': true },
//         serverType: 'geoserver',
//         visible: false,
//         transition: 0,
//     }),
// });

// var lbLayer = new ol.layer.Group({
//     title: 'Landbase',
//     fold: 'open',
//     layers: [wbTile, reTile, rcTile, rlTile, lmTile, greenTile, bldTile, gaTile]
// });
// // end : adding landbase layers


var baseGroup = new ol.layer.Group({
    title: 'Base Maps',
    fold: true,
    layers: [osmTile, noneTile]
});

var ksp_boundary = new ol.layer.Image({
    title: "Kashipur Boundary",
    source: new ol.source.ImageWMS({
        url: 'http://' + serverPort + '/geoserver/' + geoserverWorkspace + '/wms',
        params: { 'LAYERS': geoserverWorkspace + ':' + ksp_boundary_lyr, 'TILED': true },
        serverType: 'geoserver',
        visible: true
    })
});

var ksp_highway = new ol.layer.Image({
    title: "Kashipur Highways",
    source: new ol.source.ImageWMS({
        url: 'http://' + serverPort + '/geoserver/' + geoserverWorkspace + '/wms',
        params: { 'LAYERS': geoserverWorkspace + ':' + ksp_highway_lyr, 'TILED': true },
        serverType: 'geoserver',
        visible: true
    })
});

var ksp_hospitals = new ol.layer.Image({
    title: "Kashipur Hospitals",
    source: new ol.source.ImageWMS({
        url: 'http://' + serverPort + '/geoserver/' + geoserverWorkspace + '/wms',
        params: { 'LAYERS': geoserverWorkspace + ':' + ksp_hospital_lyr, 'TILED': true },
        serverType: 'geoserver',
        visible: true
    })
});

var ksp_hotel = new ol.layer.Image({
    title: "Kashipur Hotels",
    source: new ol.source.ImageWMS({
        url: 'http://' + serverPort + '/geoserver/' + geoserverWorkspace + '/wms',
        params: { 'LAYERS': geoserverWorkspace + ':' + ksp_hotel_lyr, 'TILED': true },
        serverType: 'geoserver',
        visible: true
    })
});

var ksp_school  = new ol.layer.Image({
    title: "Kashipur Schools",
    source: new ol.source.ImageWMS({
        url: 'http://' + serverPort + '/geoserver/' + geoserverWorkspace + '/wms',
        params: { 'LAYERS': geoserverWorkspace + ':' + ksp_school_lyr, 'TILED': true },
        serverType: 'geoserver',
        visible: true
    })
});

var ksp_level_crossing  = new ol.layer.Image({
    title: "Kashipur Level Crossing",
    source: new ol.source.ImageWMS({
        url: 'http://' + serverPort + '/geoserver/' + geoserverWorkspace + '/wms',
        params: { 'LAYERS': geoserverWorkspace + ':' + ksp_lvl_cross_lyr, 'TILED': true },
        serverType: 'geoserver',
        visible: true
    })
});

var ksp_rail  = new ol.layer.Image({
    title: "Kashipur Rail",
    source: new ol.source.ImageWMS({
        url: 'http://' + serverPort + '/geoserver/' + geoserverWorkspace + '/wms',
        params: { 'LAYERS': geoserverWorkspace + ':' + ksp_rail_lyr, 'TILED': true },
        serverType: 'geoserver',
        visible: true
    })
});

// map.addLayer(IndiaDsTile);

var indiaTileSouce = new ol.source.ImageWMS({
    url: 'http://' + serverPort + '/geoserver/' + geoserverWorkspace + '/wms',
    params: { 'LAYERS': geoserverWorkspace + ':' + stateLayerName, 'TILED': true },
    serverType: 'geoserver',
    visible: true
});

var indiaStTile = new ol.layer.Image({
    title: "India States",
    source: indiaTileSouce
});

// map.addLayer(IndiaStTile);

var overlayGroup = new ol.layer.Group({
    title: 'Kashipur',
    fold: true,
    layers: [ksp_hospitals, ksp_hotel, ksp_school, ksp_level_crossing, ksp_rail, ksp_highway, ksp_boundary ].reverse()//indiaCtTile, indiaDsTile, indiaStTile]
})

map.addLayer(baseGroup);
map.addLayer(overlayGroup);
// map.addLayer(lbLayer);

for (y = 0; y < map.getLayers().getLength(); y++) {
    var lyr1 = map.getLayers().item(y)
    if (lyr1.get('title') == 'Base Maps') { } else {
        if (lyr1.getLayers().getLength() > 0) {
            for (z = 0; z < lyr1.getLayers().getLength(); z++) {
                var lyr2 = lyr1.getLayers().item(z);
                layerList.push(lyr2.getSource().getParams().LAYERS);
            }
        } else {
            layerList.push(lyr1.getSource().getParams().LAYERS);
        }
    }

}

// start : mouse position
var mousePosition = new ol.control.MousePosition({
    className: 'mousePosition',
    projection: 'EPSG:4326',
    coordinateFormat: function (coordinate) { return ol.coordinate.format(coordinate, '{y} , {x}', 6); }
});
map.addControl(mousePosition);
// end : mouse position

// start : scale control
var scaleControl = new ol.control.ScaleLine({
    bar: true,
    text: true,
});
map.addControl(scaleControl);
// end : scale control

var toolbarDivElement = document.createElement('div');
toolbarDivElement.className = 'toolbarDiv';

// start : home Control
var homeButton = document.createElement('button');
homeButton.innerHTML = '<img src="resources/images/home.svg" alt="" class="myImg"></img> '; //<span class="tooltiptext">Home</span>
homeButton.className = 'myButton';
homeButton.title = 'Home';

var homeElement = document.createElement('div');
homeElement.className = 'homeButtonDiv';
homeElement.appendChild(homeButton);
toolbarDivElement.appendChild(homeElement);

homeButton.addEventListener("click", () => {
    location.href = "index.html";
})

// map.addControl(homeControl);
// end : home Control

// start : full screen Control
var fsButton = document.createElement('button');
fsButton.innerHTML = '<img src="resources/images/fullscreen.svg" alt="" class="myImg"></img>'; //<span class="tooltiptext">Full Screen</span>
fsButton.className = 'myButton';
fsButton.title = 'Full Screen';

var fsElement = document.createElement('div');
fsElement.className = 'myButtonDiv';
fsElement.appendChild(fsButton);
toolbarDivElement.appendChild(fsElement);

fsButton.addEventListener("click", () => {
    var mapEle = document.getElementById("map");
    if (mapEle.requestFullscreen) {
        mapEle.requestFullscreen();
    } else if (mapEle.msRequestFullscreen) {
        mapEle.msRequestFullscreen();
    } else if (mapEle.mozRequestFullscreen) {
        mapEle.mozRequestFullscreen();
    } else if (mapEle.webkitRequestFullscreen) {
        mapEle.webkitRequestFullscreen();
    }
})

// map.addControl(fsControl);
// end : full screen Control

// start : Layers Control
var lyrsButton = document.createElement('button');
lyrsButton.innerHTML = '<img src="resources/images/layers.svg" alt="" class="myImg"></img>'; //<span class="tooltiptext">Layers</span>
lyrsButton.className = 'myButton';
lyrsButton.title = 'Layers';

var lyrElement = document.createElement('div');
lyrElement.className = 'myButtonDiv';
lyrElement.appendChild(lyrsButton);
toolbarDivElement.appendChild(lyrElement);

var layersFlag = false;
lyrsButton.addEventListener("click", () => {
    lyrsButton.classList.toggle('clicked');
    document.getElementById("map").style.cursor = "default";
    layersFlag = !layersFlag;

    if (layersFlag) {
        document.getElementById("layersDiv").style.display = "block";
    } else {
        document.getElementById("layersDiv").style.display = "none";
    }
})
// end : Layers Control

// start : pan Control
var panButton = document.createElement('button');
panButton.innerHTML = '<img src="resources/images/pan.svg" alt="" class="myImg"></img>'; //<span class="tooltiptext">Pan</span>
panButton.className = 'myButton';
panButton.id = 'panButton';
panButton.title = 'Pan';

var panElement = document.createElement('div');
panElement.className = 'myButtonDiv';
panElement.appendChild(panButton);
toolbarDivElement.appendChild(panElement);

var panFlag = false;
var drgPanInteraction = new ol.interaction.DragPan();
panButton.addEventListener("click", () => {
    panButton.classList.toggle('clicked');
    panFlag = !panFlag;
    if (panFlag) {
        document.getElementById("map").style.cursor = "grab";
        map.addInteraction(drgPanInteraction);
    } else {
        document.getElementById("map").style.cursor = "default";
        map.removeInteraction(drgPanInteraction);
    }
})
// end : pan Control

// start : zoomIn Control

var zoomInInteraction = new ol.interaction.DragBox();

zoomInInteraction.on('boxend', function () {
    var zoomInExtent = zoomInInteraction.getGeometry().getExtent();
    map.getView().fit(zoomInExtent);
});

var ziButton = document.createElement('button');
ziButton.innerHTML = '<img src="resources/images/zoomIn.svg" alt="" class="myImg"></img>'; //<span class="tooltiptext">Zoom In</span>
ziButton.className = 'myButton';
ziButton.id = 'ziButton';
ziButton.title = 'Zoom In';


var ziElement = document.createElement('div');
ziElement.className = 'myButtonDiv';
ziElement.appendChild(ziButton);
toolbarDivElement.appendChild(ziElement);

var zoomInFlag = false;
ziButton.addEventListener("click", () => {
    ziButton.classList.toggle('clicked');
    zoomInFlag = !zoomInFlag;
    if (zoomInFlag) {
        document.getElementById("map").style.cursor = "zoom-in";
        map.addInteraction(zoomInInteraction);
    } else {
        map.removeInteraction(zoomInInteraction);
        document.getElementById("map").style.cursor = "default";
    }
})

// end : zoomIn Control

// start : zoomOut Control
var zoomOutInteraction = new ol.interaction.DragBox();

zoomOutInteraction.on('boxend', function () {
    var zoomOutExtent = zoomOutInteraction.getGeometry().getExtent();
    map.getView().setCenter(ol.extent.getCenter(zoomOutExtent));

    mapView.setZoom(mapView.getZoom() - 1)
});

var zoButton = document.createElement('button');
zoButton.innerHTML = '<img src="resources/images/zoomOut.png" alt="" class="myImg"></img>'; //<span class="tooltiptext">Zoom Out</span>
zoButton.className = 'myButton';
zoButton.id = 'zoButton';
zoButton.title = 'Zoom Out';

var zoElement = document.createElement('div');
zoElement.className = 'myButtonDiv';
zoElement.appendChild(zoButton);
toolbarDivElement.appendChild(zoElement);

var zoomOutFlag = false;
zoButton.addEventListener("click", () => {
    zoButton.classList.toggle('clicked');
    zoomOutFlag = !zoomOutFlag;
    if (zoomOutFlag) {
        document.getElementById("map").style.cursor = "zoom-out";
        map.addInteraction(zoomOutInteraction);
    } else {
        map.removeInteraction(zoomOutInteraction);
        document.getElementById("map").style.cursor = "default";
    }
})
// end : zoomOut Control



// start : FeatureInfo Control
var featureInfoButton = document.createElement('button');
featureInfoButton.innerHTML = '<img src="resources/images/identify.svg" alt="" class="myImg"></img>'; //<span class="tooltiptext">Feature Info</span>
featureInfoButton.className = 'myButton';
featureInfoButton.id = 'featureInfoButton';
featureInfoButton.title = 'Feature Info';

var featureInfoElement = document.createElement('div');
featureInfoElement.className = 'myButtonDiv';
featureInfoElement.appendChild(featureInfoButton);
toolbarDivElement.appendChild(featureInfoElement);

var featureInfoFlag = false;
featureInfoButton.addEventListener("click", () => {
    featureInfoButton.classList.toggle('clicked');
    featureInfoFlag = !featureInfoFlag;
})

const container = document.getElementById('popup');
const content = document.getElementById('popup-content');
const closer = document.getElementById('popup-closer');

const popup = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250,
    },
});


closer.onclick = function () {
    popup.setPosition(undefined);
    container.style.display = "none";
    closer.blur();
    return false;
};

map.addOverlay(popup);

map.on('singleclick', function (evt) {
    if (featureInfoFlag) {
        content.innerHTML = '';
        var resolution = mapView.getResolution();
        attr = [ksp_hospitals, ksp_hotel, ksp_school, ksp_level_crossing, ksp_rail, ksp_highway];//, ksp_boundary]
        var dict = {
            ksp_hospitals: "Hospital",
            ksp_hotel: "Hotel"
        }
        
        content.innerHTML = "<h6> Kashipur's: </h6> <br>"
        for (var i=0; i<attr.length; i++){
            var url = attr[i].getSource().getFeatureInfoUrl(evt.coordinate, resolution,
                'EPSG:3857', { 'INFO_FORMAT': 'application/json' });
            $.getJSON(url, function (data) {
                var feature = data.features;
                if (feature.length > 0) {
                    var props = feature[0].properties;
                    content.innerHTML += "<p>" 
                    content.innerHTML += props.full_id.toUpperCase() 
                    content.innerHTML += "</p>"
                }
            })
        }
        // content.innerHTML = "<h6> Kashipur's: </h6> <br> <p>" + window.attr_info +"</p>"//+ "</p><br><h3> District : </h3> <p>" + props.dist_name.toUpperCase() + "</p>";
        popup.setPosition(evt.coordinate);
        container.style.display = "block";
        
            

        // if (url) {
        //     $.getJSON(url, function (data) {
        //         var feature = data.features;
        //         var props = feature[0].properties;
        //         content.innerHTML = "<h5>" props.full_id.toUpperCase() ": </h5> <p>" + props.full_id.toUpperCase(); //+ "</p><br><h3> District : </h3> <p>" + props.dist_name.toUpperCase() + "</p>";
        //         popup.setPosition(evt.coordinate);
        //         container.style.display = "block";
        //     })
        // } else {
        //     // maybe you hide the popup here
        //     popup.setPosition(undefined);
        //     container.style.display = "block";
        // }
    }
});
// start : FeatureInfo Control



// start : Length and Area Measurement Control
var lengthButton = document.createElement('button');
lengthButton.innerHTML = '<img src="resources/images/measure-length.png" alt="" class="myImg"></img>'; //<span class="tooltiptext">Measure Length</span>
lengthButton.className = 'myButton';
lengthButton.id = 'lengthButton';
lengthButton.title = 'Measure Length';

var lengthElement = document.createElement('div');
lengthElement.className = 'myButtonDiv';
lengthElement.appendChild(lengthButton);
toolbarDivElement.appendChild(lengthElement);

var lengthFlag = false;
lengthButton.addEventListener("click", () => {
    // disableOtherInteraction('lengthButton');
    lengthButton.classList.toggle('clicked');
    lengthFlag = !lengthFlag;
    document.getElementById("map").style.cursor = "default";
    if (lengthFlag) {
        map.removeInteraction(draw);
        addInteraction('LineString');
    } else {
        map.removeInteraction(draw);
        source.clear();
        const elements = document.getElementsByClassName("ol-tooltip ol-tooltip-static");
        while (elements.length > 0) elements[0].remove();
    }

})

var areaButton = document.createElement('button');
areaButton.innerHTML = '<img src="resources/images/measure-area.png" alt="" class="myImg"></img>'; //<span class="tooltiptext">Measure Area</span>
areaButton.className = 'myButton';
areaButton.id = 'areaButton';
areaButton.title = 'Measure Area';

var areaElement = document.createElement('div');
areaElement.className = 'myButtonDiv';
areaElement.appendChild(areaButton);
toolbarDivElement.appendChild(areaElement);

var areaFlag = false;
areaButton.addEventListener("click", () => {
    // disableOtherInteraction('areaButton');
    areaButton.classList.toggle('clicked');
    areaFlag = !areaFlag;
    document.getElementById("map").style.cursor = "default";
    if (areaFlag) {
        map.removeInteraction(draw);
        addInteraction('Polygon');
    } else {
        map.removeInteraction(draw);
        source.clear();
        const elements = document.getElementsByClassName("ol-tooltip ol-tooltip-static");
        while (elements.length > 0) elements[0].remove();
    }
})

/**
 * Message to show when the user is drawing a polygon.
 * @type {string}
 */
var continuePolygonMsg = 'Click to continue polygon, Double click to complete';

/**
 * Message to show when the user is drawing a line.
 * @type {string}
 */
var continueLineMsg = 'Click to continue line, Double click to complete';

var draw; // global so we can remove it later

var source = new ol.source.Vector();
var vector = new ol.layer.Vector({
    source: source,
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new ol.style.Stroke({
            color: '#ffcc33',
            width: 2,
        }),
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: '#ffcc33',
            }),
        }),
    }),
});

map.addLayer(vector);

function addInteraction(intType) {

    draw = new ol.interaction.Draw({
        source: source,
        type: intType,
        style: interactionStyle
    });
    map.addInteraction(draw);

    createMeasureTooltip();
    createHelpTooltip();

    /**
     * Currently drawn feature.
     * @type {import("../src/ol/Feature.js").default}
     */
    var sketch;

    /**
     * Handle pointer move.
     * @param {import("../src/ol/MapBrowserEvent").default} evt The event.
     */
    var pointerMoveHandler = function (evt) {
        if (evt.dragging) {
            return;
        }
        /** @type {string} */
        var helpMsg = 'Click to start drawing';

        if (sketch) {
            var geom = sketch.getGeometry();
            // if (geom instanceof ol.geom.Polygon) {
            //   helpMsg = continuePolygonMsg;
            // } else if (geom instanceof ol.geom.LineString) {
            //   helpMsg = continueLineMsg;
            // }
        }

        //helpTooltipElement.innerHTML = helpMsg;
        //helpTooltip.setPosition(evt.coordinate);

        //helpTooltipElement.classList.remove('hidden');
    };

    map.on('pointermove', pointerMoveHandler);

    // var listener;
    draw.on('drawstart', function (evt) {
        // set sketch
        sketch = evt.feature;

        /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
        var tooltipCoord = evt.coordinate;

        //listener = sketch.getGeometry().on('change', function (evt) {
        sketch.getGeometry().on('change', function (evt) {
            var geom = evt.target;
            var output;
            if (geom instanceof ol.geom.Polygon) {
                output = formatArea(geom);
                tooltipCoord = geom.getInteriorPoint().getCoordinates();
            } else if (geom instanceof ol.geom.LineString) {
                output = formatLength(geom);
                tooltipCoord = geom.getLastCoordinate();
            }
            measureTooltipElement.innerHTML = output;
            measureTooltip.setPosition(tooltipCoord);
        });
    });

    draw.on('drawend', function () {
        measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
        measureTooltip.setOffset([0, -7]);
        // unset sketch
        sketch = null;
        // unset tooltip so that a new one can be created
        measureTooltipElement = null;
        createMeasureTooltip();
        //ol.Observable.unByKey(listener);
    });
}


/**
 * The help tooltip element.
 * @type {HTMLElement}
 */
var helpTooltipElement;

/**
 * Overlay to show the help messages.
 * @type {Overlay}
 */
var helpTooltip;

/**
 * Creates a new help tooltip
 */
function createHelpTooltip() {
    if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
    }
    helpTooltipElement = document.createElement('div');
    helpTooltipElement.className = 'ol-tooltip hidden';
    helpTooltip = new ol.Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left',
    });
    map.addOverlay(helpTooltip);
}

//  map.getViewport().addEventListener('mouseout', function () {
//    helpTooltipElement.classList.add('hidden');
//  });

/**
* The measure tooltip element.
* @type {HTMLElement}
*/
var measureTooltipElement;


/**
* Overlay to show the measurement.
* @type {Overlay}
*/
var measureTooltip;

/**
 * Creates a new measure tooltip
 */

function createMeasureTooltip() {
    if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
    }
    measureTooltipElement = document.createElement('div');
    measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
    measureTooltip = new ol.Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center',
    });
    map.addOverlay(measureTooltip);
}

/**
 * Format length output.
 * @param {LineString} line The line.
 * @return {string} The formatted length.
 */
var formatLength = function (line) {
    var length = ol.sphere.getLength(line);
    var output;
    if (length > 100) {
        output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
    } else {
        output = Math.round(length * 100) / 100 + ' ' + 'm';
    }
    return output;
};

/**
 * Format area output.
 * @param {Polygon} polygon The polygon.
 * @return {string} Formatted area.
 */
var formatArea = function (polygon) {
    var area = ol.sphere.getArea(polygon);
    var output;
    if (area > 10000) {
        output = Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
    } else {
        output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
    }
    return output;
};
// end : Length and Area Measurement Control



// start : attribute query
var qryButton = document.createElement('button');
qryButton.innerHTML = '<img src="resources/images/query.svg" alt="" class="myImg"></img>'; //<span class="tooltiptext">Attribute Query</span>
qryButton.className = 'myButton';
qryButton.id = 'qryButton';
qryButton.title = 'Attribute Query';

var qryElement = document.createElement('div');
qryElement.className = 'myButtonDiv';
qryElement.appendChild(qryButton);
toolbarDivElement.appendChild(qryElement);

var qryFlag = false;
qryButton.addEventListener("click", () => {
    // disableOtherInteraction('lengthButton');
    qryButton.classList.toggle('clicked');
    qryFlag = !qryFlag;
    document.getElementById("map").style.cursor = "default";
    if (qryFlag) {
        if (queryGeoJSON) {
            queryGeoJSON.getSource().clear();
            map.removeLayer(queryGeoJSON);
        }

        if (clickSelectedFeatureOverlay) {
            clickSelectedFeatureOverlay.getSource().clear();
            map.removeLayer(clickSelectedFeatureOverlay);
        }
        document.getElementById("map").style.cursor = "default";
        document.getElementById("attQueryDiv").style.display = "block";

        bolIdentify = false;

        addMapLayerList('selectLayer');
    } else {
        document.getElementById("map").style.cursor = "default";
        document.getElementById("attQueryDiv").style.display = "none";

        document.getElementById("attListDiv").style.display = "none";

        if (queryGeoJSON) {
            queryGeoJSON.getSource().clear();
            map.removeLayer(queryGeoJSON);
        }

        if (clickSelectedFeatureOverlay) {
            clickSelectedFeatureOverlay.getSource().clear();
            map.removeLayer(clickSelectedFeatureOverlay);
        }
    }

})

var markerFeature;
function addInteractionForSpatialQuery(intType) {
    draw = new ol.interaction.Draw({
        source: clickSelectedFeatureOverlay.getSource(),
        type: intType,
        style: interactionStyle
    });
    map.addInteraction(draw);

    draw.on('drawend', function (e) {
        markerFeature = e.feature;
        markerFeature.set('geometry', markerFeature.getGeometry());
        map.removeInteraction(draw);
        document.getElementById('spUserInput').classList.toggle('clicked');
        map.addLayer(clickSelectedFeatureOverlay);
    })
}


function selectFeature(evt) {
    if (featureOverlay) {
        featureOverlay.getSource().clear();
        map.removeLayer(featureOverlay);
    }
    var selectedFeature = map.forEachFeatureAtPixel(evt.pixel,
        function (feature, layer) {
            return feature;
        });

    if (selectedFeature) {
        featureOverlay.getSource().addFeature(selectedFeature);
    }
}

function addMapLayerList(selectElementName) {
    var select = document.getElementById("selectLayer");
    while (select.options.length > 0) {
        select.remove(0);
    }
    $(document).ready(function () {
        $.ajax({
            type: "GET",
            url: "http://" + serverPort + "/geoserver/wfs?request=getCapabilities",
            dataType: "xml",
            success: function (xml) {
                var select = $('#' + selectElementName);
                select.append("<option class='ddindent' value=''></option>");
                $(xml).find('FeatureType').each(function () {
                    $(this).find('Name').each(function () {
                        var value = $(this).text();
                        if (layerList.includes(value)) {
                            select.append("<option class='ddindent' value='" + value + "'>" + value + "</option>");
                        }
                    });
                });
            }
        });
    });

};


function newpopulateQueryTable(url) {
    if (typeof attributePanel !== 'undefined') {
        if (attributePanel.parentElement !== null) {
            attributePanel.close();
        }
    }
    $.getJSON(url, function (data) {
        var col = [];
        col.push('id');
        for (var i = 0; i < data.features.length; i++) {

            for (var key in data.features[i].properties) {

                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        var table = document.createElement("table");

        table.setAttribute("class", "table table-bordered table-hover table-condensed");
        table.setAttribute("id", "attQryTable");
        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < data.features.length; i++) {
            tr = table.insertRow(-1);
            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                if (j == 0) { tabCell.innerHTML = data.features[i]['id']; }
                else {
                    tabCell.innerHTML = data.features[i].properties[col[j]];
                }
            }
        }

        // var tabDiv = document.createElement("div");
        var tabDiv = document.getElementById('attListDiv');

        var delTab = document.getElementById('attQryTable');
        if (delTab) {
            tabDiv.removeChild(delTab);
        }

        tabDiv.appendChild(table);

        document.getElementById("attListDiv").style.display = "block";


    });
};

function newaddGeoJsonToMap(url) {

    if (queryGeoJSON) {
        queryGeoJSON.getSource().clear();
        map.removeLayer(queryGeoJSON);
    }

    queryGeoJSON = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: url,
            format: new ol.format.GeoJSON()
        }),
        style: querySelectedFeatureStyle,

    });

    queryGeoJSON.getSource().on('addfeature', function () {
        map.getView().fit(
            queryGeoJSON.getSource().getExtent(),
            { duration: 1590, size: map.getSize(), maxZoom: 21 }
        );
    });
    map.addLayer(queryGeoJSON);
};

function newaddRowHandlers() {
    var attTable = document.getElementById("attQryTable");
    // var rows = document.getElementById("attQryTable").rows;
    var rows = attTable.rows;
    var heads = attTable.getElementsByTagName('th');
    var col_no;
    for (var i = 0; i < heads.length; i++) {
        // Take each cell
        var head = heads[i];
        if (head.innerHTML == 'id') {
            col_no = i + 1;
        }

    }
    for (i = 0; i < rows.length; i++) {
        rows[i].onclick = function () {
            return function () {
                clickSelectedFeatureOverlay.getSource().clear();

                $(function () {
                    $("#attQryTable td").each(function () {
                        $(this).parent("tr").css("background-color", "white");
                    });
                });
                var cell = this.cells[col_no - 1];
                var id = cell.innerHTML;
                $(document).ready(function () {
                    $("#attQryTable td:nth-child(" + col_no + ")").each(function () {
                        if ($(this).text() == id) {
                            $(this).parent("tr").css("background-color", "#d1d8e2");
                        }
                    });
                });

                var features = queryGeoJSON.getSource().getFeatures();

                for (i = 0; i < features.length; i++) {
                    if (features[i].getId() == id) {
                        clickSelectedFeatureOverlay.getSource().addFeature(features[i]);

                        clickSelectedFeatureOverlay.getSource().on('addfeature', function () {
                            map.getView().fit(
                                clickSelectedFeatureOverlay.getSource().getExtent(),
                                { duration: 1500, size: map.getSize(), maxZoom: 24 }
                            );
                        });

                    }
                }
            };
        }(rows[i]);
    }
}
// end : attribute query


// start : spatial query
var bufferButton = document.createElement('button');
bufferButton.innerHTML = '<img src="resources/images/mapSearch.png" alt="" class="myImg"></img>';
bufferButton.className = 'myButton';
bufferButton.id = 'bufferButton';
bufferButton.title = 'Spatial Query';

var bufferElement = document.createElement('div');
bufferElement.className = 'myButtonDiv';
bufferElement.appendChild(bufferButton);
toolbarDivElement.appendChild(bufferElement);

var bufferFlag = false;
bufferButton.addEventListener("click", () => {
    bufferButton.classList.toggle('clicked');
    bufferFlag = !bufferFlag;
    document.getElementById("map").style.cursor = "default";
    if (bufferFlag) {
        if (geojson) {
            geojson.getSource().clear();
            map.removeLayer(geojson);
        }

        if (featureOverlay) {
            featureOverlay.getSource().clear();
            map.removeLayer(featureOverlay);
        }
        document.getElementById("spQueryDiv").style.display = "block";

        addMapLayerList_spQry();
    } else {
        document.getElementById("map").style.cursor = "default";
        document.getElementById("spQueryDiv").style.display = "none";
        document.getElementById("attListDiv").style.display = "none";

        if (geojson) {
            geojson.getSource().clear();
            map.removeLayer(geojson);
        }

        if (featureOverlay) {
            featureOverlay.getSource().clear();
            map.removeLayer(featureOverlay);
        }
        map.removeInteraction(draw);
        if (document.getElementById('spUserInput').classList.contains('clicked')) { document.getElementById('spUserInput').classList.toggle('clicked'); }
    }

})

function addMapLayerList_spQry() {
    var select = $('#buffSelectLayer');
    select.empty();
    select.append("<option class='ddindent' value=''></option>");
    for (i = 0; i < layerList.length; i++) {
        var value = layerList[i];
        select.append("<option class='ddindent' value='" + value + "'>" + value + "</option>");
    }
};
// end : spatial query


// finally add all main control to map
var allControl = new ol.control.Control({
    element: toolbarDivElement
})
map.addControl(allControl);

// start : onload functions
$(function () {

    // render layerswitcher control
    var toc = document.getElementById('layerSwitcherContent');
    layerSwitcherControl = new ol.control.LayerSwitcher.renderPanel(map, toc, { reverse: true });

    document.getElementById("selectLayer").onchange = function () {
        var select = document.getElementById("selectAttribute");
        while (select.options.length > 0) {
            select.remove(0);
        }
        var value_layer = $(this).val();
        $(document).ready(function () {
            $.ajax({
                type: "GET",
                url: "http://" + serverPort + "/geoserver/wfs?service=WFS&request=DescribeFeatureType&version=1.1.0&typeName=" + value_layer,
                dataType: "xml",
                success: function (xml) {

                    var select = $('#selectAttribute');
                    //var title = $(xml).find('xsd\\:complexType').attr('name');
                    //	alert(title);
                    select.append("<option class='ddindent' value=''></option>");
                    $(xml).find('xsd\\:sequence').each(function () {

                        $(this).find('xsd\\:element').each(function () {
                            var value = $(this).attr('name');
                            //alert(value);
                            var type = $(this).attr('type');
                            //alert(type);
                            if (value != 'geom' && value != 'the_geom') {
                                select.append("<option class='ddindent' value='" + type + "'>" + value + "</option>");
                            }
                        });

                    });
                }
            });
        });
    }
    document.getElementById("selectAttribute").onchange = function () {
        var operator = document.getElementById("selectOperator");
        while (operator.options.length > 0) {
            operator.remove(0);
        }

        var value_type = $(this).val();
        // alert(value_type);
        var value_attribute = $('#selectAttribute option:selected').text();
        operator.options[0] = new Option('Select operator', "");

        if (value_type == 'xsd:short' || value_type == 'xsd:int' || value_type == 'xsd:double') {
            var operator1 = document.getElementById("selectOperator");
            operator1.options[1] = new Option('Greater than', '>');
            operator1.options[2] = new Option('Less than', '<');
            operator1.options[3] = new Option('Equal to', '=');
        }
        else if (value_type == 'xsd:string') {
            var operator1 = document.getElementById("selectOperator");
            operator1.options[1] = new Option('Like', 'Like');
            operator1.options[2] = new Option('Equal to', '=');
        }
    }

    document.getElementById('attQryRun').onclick = function () {
        map.set("isLoading", 'YES');

        if (featureOverlay) {
            featureOverlay.getSource().clear();
            map.removeLayer(featureOverlay);
        }

        var layer = document.getElementById("selectLayer");
        var attribute = document.getElementById("selectAttribute");
        var operator = document.getElementById("selectOperator");
        var txt = document.getElementById("enterValue");

        if (layer.options.selectedIndex == 0) {
            alert("Select Layer");
        } else if (attribute.options.selectedIndex == -1) {
            alert("Select Attribute");
        } else if (operator.options.selectedIndex <= 0) {
            alert("Select Operator");
        } else if (txt.value.length <= 0) {
            alert("Enter Value");
        } else {
            var value_layer = layer.options[layer.selectedIndex].value;
            var value_attribute = attribute.options[attribute.selectedIndex].text;
            var value_operator = operator.options[operator.selectedIndex].value;
            var value_txt = txt.value;
            if (value_operator == 'Like') {
                value_txt = "%25" + value_txt + "%25";
            }
            else {
                value_txt = value_txt;
            }
            var url = "http://" + serverPort + "/geoserver/" + geoserverWorkspace + "/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=" + value_layer + "&CQL_FILTER=" + value_attribute + "+" + value_operator + "+'" + value_txt + "'&outputFormat=application/json"
            newaddGeoJsonToMap(url);
            newpopulateQueryTable(url);
            setTimeout(function () { newaddRowHandlers(url); }, 1000);
            map.addLayer(clickSelectedFeatureOverlay);
            map.set("isLoading", 'NO');
        }
    }

    document.getElementById('attQryClear').onclick = function () {
        if (queryGeoJSON) {
            queryGeoJSON.getSource().clear();
            map.removeLayer(queryGeoJSON);
        }

        if (clickSelectedFeatureOverlay) {
            clickSelectedFeatureOverlay.getSource().clear();
            map.removeLayer(clickSelectedFeatureOverlay);
        }
        coordList = '';
        markerFeature = undefined;
        document.getElementById("attListDiv").style.display = "none";
    }

    document.getElementById("qryType").onchange = function () {
        var value_attribute = $('#qryType option:selected').text();
        var buffDivElement = document.getElementById("bufferDiv");

        if (value_attribute == 'Within Distance of') {
            buffDivElement.style.display = "block";
        } else {
            buffDivElement.style.display = "none";
        }
    }

    document.getElementById("srcCriteria").onchange = function () {
        if (queryGeoJSON) {
            queryGeoJSON.getSource().clear();
            map.removeLayer(queryGeoJSON);
        }

        if (clickSelectedFeatureOverlay) {
            clickSelectedFeatureOverlay.getSource().clear();
            map.removeLayer(clickSelectedFeatureOverlay);
        }
        if (document.getElementById('spUserInput').classList.contains('clicked')) { document.getElementById('spUserInput').classList.toggle('clicked'); }
    }

    document.getElementById('spUserInput').onclick = function () {
        document.getElementById('spUserInput').classList.toggle('clicked');
        if (document.getElementById('spUserInput').classList.contains('clicked')) {
            if (queryGeoJSON) {
                queryGeoJSON.getSource().clear();
                map.removeLayer(queryGeoJSON);
            }

            if (clickSelectedFeatureOverlay) {
                clickSelectedFeatureOverlay.getSource().clear();
                map.removeLayer(clickSelectedFeatureOverlay);
            }
            var srcCriteriaValue = document.getElementById('srcCriteria').value;
            if (srcCriteriaValue == 'pointMarker') {
                addInteractionForSpatialQuery('Point');

            }
            if (srcCriteriaValue == 'lineMarker') {
                addInteractionForSpatialQuery('LineString');
            }
            if (srcCriteriaValue == 'polygonMarker') {
                addInteractionForSpatialQuery('Polygon');
            }
        } else {
            coordList = '';
            markerFeature = undefined;
            map.removeInteraction(draw);
        }
    }

    document.getElementById('spQryRun').onclick = function () {

        var layer = document.getElementById("buffSelectLayer");
        var value_layer = layer.options[layer.selectedIndex].value;

        var srcCriteria = document.getElementById("srcCriteria");
        var value_src = srcCriteria.options[srcCriteria.selectedIndex].value;
        var coordList = '';
        var url;
        var markerType = '';
        if (markerFeature) {
            if (value_src == 'pointMarker') {
                coordList = markerFeature.getGeometry().getCoordinates()[0] + " " + markerFeature.getGeometry().getCoordinates()[1];
                markerType = 'Point';
            }
            if (value_src == 'lineMarker') {
                var coordArray = markerFeature.getGeometry().getCoordinates();

                for (i = 0; i < coordArray.length; i++) {
                    if (i == 0) {
                        coordList = coordArray[i][0] + " " + coordArray[i][1];
                    } else {
                        coordList = coordList + ", " + coordArray[i][0] + " " + coordArray[i][1];
                    }
                }
                markerType = 'LineString';
            }
            if (value_src == 'polygonMarker') {
                var coordArray = markerFeature.getGeometry().getCoordinates()[0];
                for (i = 0; i < coordArray.length; i++) {
                    if (i == 0) {
                        coordList = coordArray[i][0] + " " + coordArray[i][1];
                    } else {
                        coordList = coordList + ", " + coordArray[i][0] + " " + coordArray[i][1];
                    }
                }
                coordList = "(" + coordList + ")";
                markerType = 'Polygon';
            }

            var value_attribute = $('#qryType option:selected').text();
            if (value_attribute == 'Within Distance of') {

                var dist = document.getElementById("bufferDistance");
                var value_dist = Number(dist.value);
                // value_dist = value_dist / 111.325;

                var distanceUnit = document.getElementById("distanceUnits");
                var value_distanceUnit = distanceUnit.options[distanceUnit.selectedIndex].value;
                url = "http://" + serverPort + "/geoserver/" + geoserverWorkspace + "/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=" + value_layer + "&CQL_FILTER=DWITHIN(geom," + markerType + "(" + coordList + ")," + value_dist + "," + value_distanceUnit + ")&outputFormat=application/json";
                

            } else if (value_attribute == 'Intersecting') {
                url = "http://" + serverPort + "/geoserver/" + geoserverWorkspace + "/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=" + value_layer + "&CQL_FILTER=INTERSECTS(geom," + markerType + "(" + coordList + "))&outputFormat=application/json";
            } else if (value_attribute == 'Completely Within') {
                url = "http://" + serverPort + "/geoserver/" + geoserverWorkspace + "/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=" + value_layer + "&CQL_FILTER=WITHIN(geom," + markerType + "(" + coordList + "))&outputFormat=application/json";
            }
            console.log(url)
            newaddGeoJsonToMap(url);
            coordList = '';
            markerFeature = undefined;
        }
    }

    document.getElementById('spQryClear').onclick = function () {
        if (queryGeoJSON) {
            queryGeoJSON.getSource().clear();
            map.removeLayer(queryGeoJSON);
        }

        if (clickSelectedFeatureOverlay) {
            clickSelectedFeatureOverlay.getSource().clear();
            map.removeLayer(clickSelectedFeatureOverlay);
        }
        coordList = '';
        markerFeature = undefined;
    }

    var mapInteractions = map.getInteractions();
    for (var x = 0; x < mapInteractions.getLength(); x++) {
        var mapInteraction = mapInteractions.item(x);
        if (mapInteraction instanceof ol.interaction.DoubleClickZoom) {
            map.removeInteraction(mapInteraction);
            break;
        }
    }

    for (var x = 0; x < mapInteractions.getLength(); x++) {
        var mapInteraction = mapInteractions.item(x);
        if (mapInteraction instanceof ol.interaction.DragPan) {
            map.removeInteraction(mapInteraction);
            break;
        }
    }

});
// end : onload functions