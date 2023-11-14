var weatherForecastURL;
var APIkey = 'e60fc08a2453ae74640f703fe37c9c29';
var getSearchButton = document.getElementById("search-button-id");
var getsearchBarInput = document.getElementById("search-bar-input");
var getFiveDayforecastContentContainer = document.getElementById("five-day-forecast-content-container");
var getFiveDayforecastContentulElement = document.getElementById("five-day-forecast-ul-element");
var getTodaysDateEl = document.getElementById("todays-date");
var getTodaysWeatherUlelement = document.getElementById("todays-weather-ul-element-id");
var getTodaysWeatherContainer =document.getElementById("todays-weather-content-container");
var getTodaysWeatherIcon = document.getElementById("todays-weather-icon-id")
// sample url = https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}
// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

//geocode convert api : http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
var LosAngeles = "https://api.openweathermap.org/data/2.5/weather?q=los angeles&appid=" + APIkey;

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
            DisplayTodaysWeather(data);
            //  console.log(data.coord);
        }
        )
        .catch(function (error) {
            alert("error message:" + error);
            console.log("error message: " + error);
        });
}

getSearchButton.addEventListener("click", function (event) {
    event.preventDefault();
    if (getsearchBarInput === null) { return alert("please enter a city name!");
    } else  {
        var getCityNameFromInput = getsearchBarInput.value;
        getsearchBarInput.textContent = "";
        getTodaysWeatherUlelement.innerHTML ="";
        getFiveDayforecastContentulElement.innerHTML="";
        if (getTodaysWeatherContainer.children[2] !== null) {getTodaysWeatherContainer.removeChild(getTodaysWeatherContainer.children[2])} else {return;}

        assembleApiRequsetURL(getCityNameFromInput);
    }
}
)

var assembleApiRequsetURL = function (cityName) {
    var assembledURLforTodaysWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey
    var assembledURLforFiveDayForecastGeocode = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + APIkey
    RequestWeatherForecastByCityName(assembledURLforTodaysWeather);
    RequestCityNameThruGeocode(assembledURLforFiveDayForecastGeocode);
    console.log("assembled URL to request for geo code of the input city name: " + assembledURLforFiveDayForecastGeocode);
    console.log("assembled URL for todays weather: " + assembledURLforTodaysWeather)
}

var DisplayTodaysWeather = function (ObjectDataFromRequestWeatherForecastByCityName) {
    
    var list1 = document.createElement("li");
    var list2 = document.createElement("li");
    var list3 = document.createElement("li");
    var list4 = document.createElement("li")
    var weatherIcon = document.createElement("img")
    var IconCode1 = ObjectDataFromRequestWeatherForecastByCityName.weather[0].icon;
    var IconURL1 = "https://openweathermap.org/img/wn/" + IconCode1 + "@2x.png"

    list1.textContent = "Max temperature: " + ((+ObjectDataFromRequestWeatherForecastByCityName.main.temp_max - 273.15) * 1.8 + 32).toFixed(2) + " F";
    list2.textContent = "Min temperature: " + ((+ObjectDataFromRequestWeatherForecastByCityName.main.temp_min - 273.15) * 1.8 + 32).toFixed(2) + " F";
    list3.textContent = "Wind Speed: " + ObjectDataFromRequestWeatherForecastByCityName.wind.speed + " MPH";
    list4.textContent = "Humidity: " + ObjectDataFromRequestWeatherForecastByCityName.main.humidity + "%"
    weatherIcon.setAttribute("src", IconURL1);
    weatherIcon.setAttribute("id","todays-weather-icon-id")
   
    getTodaysWeatherUlelement.append(list1);
    getTodaysWeatherUlelement.append(list2);
    getTodaysWeatherUlelement.append(list3);
    getTodaysWeatherUlelement.append(list4);
    getTodaysWeatherContainer.append(weatherIcon);
    console.log(list3);
    console.log(ObjectDataFromRequestWeatherForecastByCityName.wind.speed);
}

var RequestCityNameThruGeocode = function (GeoCodeData) {
    fetch(GeoCodeData)
        .then(function (response) {
            if (response.ok === true) {
                // console.log(response);
                return response.json();
            } else {
                alert("Error:" + response.statusText);
            }
        })
        .then(function (data) {
            // console.log(data);
            // console.log("latitude of this city: " + data[0].lat)
            // console.log("longitude of this city: " + data[0].lon)
            var CityLatitude = data[0].lat
            var CityLongtitude = data[0].lon
            getFiveDayforecastData(CityLatitude, CityLongtitude)
        }
        )
        .catch(function (error) {
            alert("error message:" + error);
            console.log("error message: " + error);
        });
}

var getFiveDayforecastData = function (Latitude, longitude) {
    var assembleUrlwithGeocode = "https://api.openweathermap.org/data/2.5/forecast?lat=" + Latitude + "&lon=" + longitude + "&appid=" + APIkey

    fetch(assembleUrlwithGeocode)
        .then(function (response) {
            if (response.ok === true) {
                // console.log(response);
                return response.json();
            } else {
                alert("Error:" + response.statusText);
            }
        })
        .then(function (data) {
             console.log(data);  //this data logs an object, the name:list in the object contain an array of 40 items  (each item increment hour by 3)
            DisplayFiveDayForecast(data);
        }
        )
        .catch(function (error) {
            alert("error message:" + error);
            console.log("error message: " + error);
        });
}

var DisplayFiveDayForecast = function (objectofFiveDayForecastData) {
    var ArrayofForecast = objectofFiveDayForecastData.list;
    // console.log(ArrayofForecast[0].main.temp_max); // return the data in the first object in the array, returns the max temperatre of the day
    for (i = 4; i < 40; i = (i + 8)) {
        //  console.log(i)
        var dateData = ArrayofForecast[i].dt_txt;
        var formattedDate = new Date(dateData);
        //  console.log(formattedDate); // logs UTC standard date format
        //  console.log (new Intl.DateTimeFormat('en-US').format(formattedDate)) //logs us standard date
        var USstandardDate = new Intl.DateTimeFormat('en-US').format(formattedDate);
        //  console.log(USstandardDate);  //logs us standard date
        var maxFahrenheit = ((+ArrayofForecast[i].main.temp_max - 273.15) * 1.8 + 32).toFixed(2);
    //    var minFahrenheit = ((+ArrayofForecast[i].main.temp_min - 273.15) * 1.8 + 32).toFixed(2);
        // console.log("maxFahrenheit: " + maxFahrenheit);  //logs max temperturn in F degree with two decimal figures
        // console.log("minFahrenheit: " + minFahrenheit);  //logs max temperturn in F degree with two decimal figures
        // below for reference:   
        // var dateData = ArrayofForecast[i].dt_txt.split(" ")[0]
        // var formattedDate = dateData.replace("2023-","") + "-2023"
        var windSpeed = ArrayofForecast[i].wind.speed + " MPH";
        //   console.log(windSpeed); //logs wind speed with MPH unit
        var iconcode = ArrayofForecast[i].weather[0].icon;
        // console.log(iconcode); //logs the icon code of the day
        // example: https://openweathermap.org/img/wn/10d@2x.png
        var iconurl = "https://openweathermap.org/img/wn/" + iconcode + "@2x.png"
        // console.log(iconurl);  //logs the picture respresents the iconcode
        // create element for appendding
        var fiveDayForecastListEl = document.createElement("li");
        var fiveDayForecastspanEl = document.createElement("span");
        var fiveDayForecastIconEl = document.createElement("img");
        // give attribute to container
        fiveDayForecastListEl.classList.add("five-day-forecast-listcontainer")
        // set attribute to the span
        fiveDayForecastspanEl.textContent = "Date: " + USstandardDate
            +  "\nMax temperture: " + maxFahrenheit + " F "
            +  "\nWind speed: " + windSpeed;
        fiveDayForecastspanEl.classList.add("five-day-forecast-span");
        // set attribute to the icon
        fiveDayForecastIconEl.classList.add("five-day-forecast-icon");
        fiveDayForecastIconEl.setAttribute("src", iconurl);
        //append to the container
        getFiveDayforecastContentulElement.append(fiveDayForecastListEl);
        fiveDayForecastListEl.append(fiveDayForecastspanEl);
        fiveDayForecastListEl.append(fiveDayForecastIconEl);
    }
}

//display today's date
var CurrentDate = new Date()
// console.log(CurrentDate)  //logs date + time + timezone
var CurrentUSstandardDate = new Intl.DateTimeFormat('en-US').format(CurrentDate)
// console.log(CurrentUSstandardDate)  //logs only us standard time 
var DisplayCurrentDate = function () {
    getTodaysDateEl.textContent = "Today's Date: " + CurrentUSstandardDate;
}
DisplayCurrentDate()
setInterval(DisplayCurrentDate, 60000)


// add conditions if data return an array === null, alert("please enter a correct City name!")



//test calls for geo code
//var testlocation = "Los Angeles";
//assembleApiRequsetURL(testlocation);

/*
var testlocation2 = "san diego"
assembleApiRequsetURL(testlocation2)

var testlocation3 = "dallas"
assembleApiRequsetURL(testlocation3)
*/
