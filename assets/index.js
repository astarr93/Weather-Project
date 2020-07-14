var mymap = L.map('mapid').setView([38.89, -77.03], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYXN0YXJyOTMiLCJhIjoiY2tjam9md3FuMW5rbzJycWt1cWJsbWw5bSJ9.uq8v6j0Bgiv_8mxBBvvpmA'
}).addTo(mymap);


// When DOM is Loaded, begin:
$(document).ready(function () {
    addClickListener();
})

// Add Click Event Handler for Geo Location Button:
function addClickListener() {
    $('#searchGeoButton').on("click", function () {
        console.log("success");
    })
}



// L.tilelayer('http://maps.openweathermap.org/maps/2.0/weather/PAR0/13/{x}/{y}')
// // OpenWeather API Key: bf9f438089a6bdeedce9b06784b29a58
// MapBox Access Token: pk.eyJ1IjoiYXN0YXJyOTMiLCJhIjoiY2tjam9md3FuMW5rbzJycWt1cWJsbWw5bSJ9.uq8v6j0Bgiv_8mxBBvvpmA


// Using simplemaps.com database for location lookup and longlat conversaion for OpenWeather
// Need to create a modal that attriution for https://simplemaps.com/data/us-cities
