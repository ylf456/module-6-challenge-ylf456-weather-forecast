var weatherForecastURL;
var APIkey = 'e60fc08a2453ae74640f703fe37c9c29'
var getSearchButton = document.getElementById("search-button-id")
var getsearchBarInput = document.getElementById("search-bar-input");

// sample url = https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}
// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

//geocode convert api : http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
var LosAngeles = "https://api.openweathermap.org/data/2.5/weather?q=los angeles&appid=" + APIkey

var RequestWeatherForecastByCityName = function (weatherForecastURL) {
    fetch(weatherForecastURL)
        .then(function (response) {
            if (response.ok === true) {
                console.log(response);
                return response.json()
            } else {
                alert("Error:" + response.statusText);
            }
        })
        .then(function (data) {
            console.log(data);
            console.log(data.coord)
        }
        )
        .catch(function (error) {
            alert("error message:" + error);
            console.log("error message" + error);
        });
}

getSearchButton.addEventListener("click", function (event) {
    event.preventDefault();
    if (getsearchBarInput !== null) {
        var getCityNameFromInput = getsearchBarInput.textContent;
        getsearchBarInput.textContent = "";
        assembleApiRequsetURL(getCityNameFromInput);
    } else if (getsearchBarInput.textContent === null) { 
        alert("please enter a city name!");
    return; }
}
)

var assembleApiRequsetURL = function (cityName) {
   var assembledURLforTodaysWeather = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName  + "&appid=" + APIkey
   var assembledURLforFiveDayForecast = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName +"&appid=" + APIkey
   RequestCityNameThruGeocode(assembledURLforFiveDayForecast);
console.log("assembled URL for five day weather" + assembledURLforFiveDayForecast);
console.log("assembled URL for todays weather" + assembledURLforTodaysWeather)
}

var RequestCityNameThruGeocode = function (GeoCodeData) {
    fetch(GeoCodeData)
        .then(function (response) {
            if (response.ok === true) {
                console.log(response);
                return response.json()
            } else {
                alert("Error:" + response.statusText);
            }
        })
        .then(function (data) {
            console.log(data);
        }
        )
        .catch(function (error) {
            alert("error message:" + error);
            console.log("error message" + error);
        });
}

var testlocation = "LosAngeles";
assembleApiRequsetURL(testlocation);