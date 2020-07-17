
// Global Variables
const geo = navigator.geolocation
const bounds = [[20, -130.212], [50, -65]];
const mymap = L.map('mapid').setView([35.77, -78.62], 13).setMaxBounds(bounds); // Builds Map and starting view 
let userLat = 0;
let userLong = 0;
const findMe = $('#findMe');
const zipSubmit = $('#zipSubmit');


// Map powered using Leaflet, OpenStreetMap, MapBox

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    minZoom: 7,
    maxZoom: 20,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYXN0YXJyOTMiLCJhIjoiY2tjam9md3FuMW5rbzJycWt1cWJsbWw5bSJ9.uq8v6j0Bgiv_8mxBBvvpmA'
}).addTo(mymap);


// Start on DOM ready
$(document).ready(function () {
    findMe.on("click", searchCoords);
    zipSubmit.on("click", searchZip);

})

// SEARCH FUNCTIONS:
// Using Geolocation
function searchCoords() {
    event.preventDefault();
    // Check if geolocation is supported
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser. Please search by zip');
    } else {
        // Update map view with user's long lat
        navigator.geolocation.getCurrentPosition(function (position) {
            userLat = position.coords.latitude;
            userLong = position.coords.longitude;
            mymap.setView([userLat, userLong], 13);
        });
    }
};

// Using Zip Code Submission
function searchZip() {
    event.preventDefault()
    userSubmit = document.getElementById('userZip').value;
    // Validate User Submission
    if (isNaN(userSubmit)) {
        console.log("Error: " + userSubmit + " is not a number. Please try again.")
        return;
    }
    else if (userSubmit.length != 5) {
        console.log("Error: Please make sure you're using a 5 digit zip code")
        return;
    }

    console.log("guess it works");
}


// L.tilelayer('http://maps.openweathermap.org/maps/2.0/weather/PAR0/13/{x}/{y}')
// // OpenWeather API Key: bf9f438089a6bdeedce9b06784b29a58
// MapBox Access Token: pk.eyJ1IjoiYXN0YXJyOTMiLCJhIjoiY2tjam9md3FuMW5rbzJycWt1cWJsbWw5bSJ9.uq8v6j0Bgiv_8mxBBvvpmA


// Using simplemaps.com database for location lookup and longlat conversaion for OpenWeather
// Need to create a modal that attriution for https://simplemaps.com/data/us-cities