// Global Variables
const geo = navigator.geolocation
const bounds = [[20, -130.212], [50, -65]];
const mymap = L.map('mapid').setView([35.77, -78.62], 13).setMaxBounds(bounds); // Map starting view 
const findMe = $('#findMe');
const zipSubmit = $('#zipSubmit');
let userZip = ""
let userLat = 0;
let userLong = 0;
let data = "";




// Create Map - Powered using Leaflet, OpenStreetMap, MapBox
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    minZoom: 6.75,
    maxZoom: 23,
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
// Using current geographical coordinates
function searchCoords() {
    event.preventDefault();
    // Check if geolocation is supported by browserd
    if (!geo) {
        alert('Geolocation is not supported by your browser. Please search by zip');
    } else {
        // Center map view with user's long lat
        geo.getCurrentPosition(function (position) {
            userLat = position.coords.latitude;
            userLong = position.coords.longitude;
            mymap.setView([userLat, userLong], 16);
            L.marker([userLat, userLong]).addTo(mymap);
            weatherLookup();
        });
    }
};

function weatherLookup() {
    const accesstoken = "bf9f438089a6bdeedce9b06784b29a58";
    const queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${userLat}&lon=${userLong}&appid=${accesstoken}`;
    console.log(queryURL);
    $.ajax({ url: queryURL, method: "GET" }).then(function (response) {
        data = JSON.stringify(response);
        console.log(data);
    })
}


// Using Zip Code Submission
function searchZip() {
    event.preventDefault()
    userZip = document.getElementById('userZip').value;
    // Validate User Submission
    if (isNaN(userZip)) {
        console.log("Error: " + userZip + " is not a number. Please try again.")
        return;
    }
    else if (userZip.length != 5) {
        console.log("Error: Please make sure you're using a 5 digit zip code")
        return;
    };
    zipLookup(userZip);
}

function zipLookup() {
    const accesstoken = "bf9f438089a6bdeedce9b06784b29a58";
    const queryURL = `api.openweathermap.org/data/2.5/weather?zip=${userZip},us&APPID=${accesstoken}`;
    console.log(queryURL);
    $.ajax({ url: queryURL, method: "GET" }).then(function (response) {
        console.log(response);
    });
}

// Additional Code Blocks

// L.tilelayer('http://maps.openweathermap.org/maps/2.0/weather/PAR0/13/{x}/{y}')
// // OpenWeather API Key: bf9f438089a6bdeedce9b06784b29a58
// MapBox Access Token: pk.eyJ1IjoiYXN0YXJyOTMiLCJhIjoiY2tjam9md3FuMW5rbzJycWt1cWJsbWw5bSJ9.uq8v6j0Bgiv_8mxBBvvpmA


// Using simplemaps.com database for location lookup and longlat conversaion for OpenWeather
// Need to create a modal that attriution for https://simplemaps.com/data/us-cities