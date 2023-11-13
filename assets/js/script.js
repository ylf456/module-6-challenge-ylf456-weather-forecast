var weatherForecastURL;
var APIkey = 'e60fc08a2453ae74640f703fe37c9c29'

// sample url = https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}
// https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}
// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

//geocode convert api : 
var LosAngeles = "https://api.openweathermap.org/data/2.5/weather?q=Los Angeles&appid=" + APIkey

var getWeattherForecastByCityName = function (weatherForecastURL) {
    fetch(weatherForecastURL)
        .then(function (response) {
            if (response.ok === true) {
                
                console.log(response);
                return response.json()
                // call a function to render content to the page
            } else {
                alert("Error:" + response.statusText);
            }
        })
        .then(function(data){
            console.log(data);
            console.log(data.coord)
        }
        )
        .catch(function (error) {
            alert("error message:" + error);
        });


}

getWeattherForecastByCityName(LosAngeles);