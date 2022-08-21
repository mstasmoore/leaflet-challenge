const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"


// Map w/ center at USGS headquarters 
const createMap =((Data) => {
    const centerCoordinates = [38.947230,-77.367460];
    const mapZoom = 5;
    const myMap = L.map("map", {
        center: centerCoordinates,
        zoom: mapZoom
 });

//  base layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

// map level
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng){
            return L.circleMarker(latlng, {
                radius: getSize(feature.properties.mag),
                fillColor: getColor(feature.properties.mag),
                Color: "grey",
                weight: 0.6,
                opacity: 0.8,
                fillopacity:1
             });
        },
        onEachFeature: onEachPopUp
    }).addTo(myMap)

    function onEachPopUp(feature, layer) {
        const format = d3.timeFormat("%d-%b-%Y at %i:%M");
        layer.bindPopup(`<strong>Place: </strong> ${feature.properties.place}<br><strong>Date and Time: </strong>${format(new Date(feature.properties.time))}<br><strong>Magnitude: </strong>${feature.properties.mag}`);
    };

//  legend layer
    let legend = L.control({ position: "bottomleft" });
    legend.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend");
        let magnitudes = [0, 1, 2, 3, 4, 5];
        let labels = [];
        let legendInfo = "<h5>Magnitude</h5>";
        div.innerHTML = legendInfo;
        for (var i = 0; i < magnitudes.length; i++) {
            labels.push('<li style="background-color:' + getColor(magnitudes[i] + 1) + '"> <span>' + magnitudes[i] + (magnitudes[i + 1] ? '&ndash;' + magnitudes[i + 1] + '' : '+') + '</span></li>');
        }
        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
    };

    legend.addTo(myMap);
});


// parameters for magnitude size
const getSize = ((magnitude) => {
    return magnitude * 5;
});

// magnitude colors
const getColor = ((magnitude)=> {
    switch(true) {
        case(magnitude >5):
            return "#9d442a";
        case(magnitude >4):
            return "#0c4f4e";
        case(magnitude >3):
            return "#bc804d";
        case(magnitude >2):
            return "#9eb5a3";
        case(magnitude >1):
            return "#d7c2b0";
        default:
            return "#464f55";
    }
});

d3.json(url).then(function(response) {
    createMap(response.features);

});



// Attributions: Open street map "https://www.openstreetmap.org/copyright"
// Coordinations "Google Maps for USGS headquarters"
