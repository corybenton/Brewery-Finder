const searchButtonIP = document.getElementById('search-button-ip');
const searchButtonZip = document.getElementById('search-button-zip');
const dropdownZipEl = document.getElementById('dropdown-zip');
const dropdownIPEl = document.getElementById('dropdown-ip');
const inputEl = document.getElementById('input-search');
const faveBrewEl = document.getElementById('fave-brew')
const seeFaveBrewEl = document.getElementById('see-fave-brews')
let brewArray = localStorage.getItem("BrewArray")

const geoAPIKey = '1488c32472f1e3a9cd08ffc586e794751254f842';

searchButtonZip.addEventListener("click", function () {
    const inputVal = inputEl.value;
    const dropdownZipVal = dropdownZipEl.value;
    console.log(inputVal);
    getBreweryZip(dropdownZipVal, inputVal);
    console.log(dropdownZipVal);
})

searchButtonIP.addEventListener("click", function () {
    const APIRequestIP = 'https://api.getgeoapi.com/v2/ip/check?api_key=' + geoAPIKey;
    const dropdownIPVal = dropdownIPEl.value;
    fetchGeo(APIRequestIP, dropdownIPVal);
    console.log(dropdownIPVal);
})

function fetchGeo(API, dropdownIPVal) {
    fetch(API)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            const lat = data.location.latitude;
            console.log(lat);
            const lon = data.location.longitude;
            console.log(lon);
            getBreweryIp(dropdownIPVal, lat, lon);
        })
};

function getBreweryIp (breweryType, lat, lon) {
    const fetchUrl = "https://api.openbrewerydb.org/v1/breweries?by_dist=" + lat + "," + lon + "&per_page=5&by_type=" + breweryType;

    fetch(fetchUrl)
    .then  (function(response) {
        if (response.ok) {
            return response.json();
        }
    })
    .then (function(data) {
        console.log (data);
    })
}

function getBreweryZip (breweryType, zip) {
    const fetchUrl = "https://api.openbrewerydb.org/v1/breweries?by_postal=" + zip + "&per_page=5&by_type=" + breweryType;

    fetch(fetchUrl)
    .then  (function(response) {
        if (response.ok) {
            return response.json();
        }
    })
    .then (function(data) {
        console.log (data);
    })  
}

favoriteBox.addEventListener("click", function(event) {
    const element = event.target;
    if (element.matches(".favebox")) {
        //parse string associated with favorite box
        // const newEntry = {
        //     name: data.name,
        //     address: data.address1,
        //     url: data.url
        // }
        if (brewArray == "null") {
            brewArray = [newEntry];
        } else {
            brewArray.push(newEntry);
        }
        localStorage.setItem("BrewArray", JSON.stringify(brewArray));
    }
});

seeFaveBrewEl.addEventListener("click", function (event) {
    const element = event.target;

    if (element.matches == "see-fave-brews") {
        if (brewArray != "null") {
            brewArray = JSON.parse(localStorage.getItem("BrewArray"));
            for (let i = 0; i, brewArray.length; i++) {
                const brewery = document.createElement("p");
                const brewText = "Name: " + brewArray[i].name + "\xa0 - \xa0 Address: " +
                    brewArray[i].address + "\xa0 - \xa0 Website: " + brewArray[i].url;
                brewery.appendChild(brewText);
                document.getElementById("fave-brew").appendChild(brewery);
            }
        }
    }
});
