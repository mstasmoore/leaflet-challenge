const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"


// Map w/ center at USGS headquarters 
const createMap =((Data) => {
    const centerCoordinates = [38.947230,-77.367460];
 });

// street level view
L.tileLayer(''https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
).addTo(myMap);

// map level

l.geoJSON(data, {
    pointToLayer: function(feature, latlng){
        return L.circleMarker(latlng, {
            radius: getSize(feature.properties.mag),
            fillColor: getColor(feature.properties.mag),
            Color: "grey",
            weight: 0.6,
            opacity: 0.8,
            fillopacity:1
        }),
    },
    onEachFeature: onEachPopUp
}).addTo(myMap)











// Attributions: Open street map "https://www.openstreetmap.org/copyright"
// Coordinations "Google Maps for USGS headquarters"
