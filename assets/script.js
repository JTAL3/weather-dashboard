//api.openweathermap.org/data/2.5/weather?q=
//"dbe3f54bcf4ff827d8f1b5a0376e4d05" - my API key


// var apiKey = "dbe3f54bcf4ff827d8f1b5a0376e4d05";
// const url=""
//const currentCity=
// const previousCity
var apiKey = "dbe3f54bcf4ff827d8f1b5a0376e4d05";
var userForm = document.querySelector("#select-city");
//var languageButtonsEl = document.querySelector("#language-buttons");
var cityInput = document.querySelector("#client-search");
var todayWeather = document.querySelector("#current-weather");
var cityForecast = document.querySelector("#five-day-forecast");
var searchBtn = document.querySelector("search-btn");
var resultsEl = document.getElementById("search-result");

// var citySearchTerm = document.querySelector("#repo-search-term");
// var citySearch = document.querySelector("#weather-results");


// var getWeather = function() {
//     console.log("function was called");
// };

// getWeather();



function getCityInfo(cityName) {

    let weatherApi = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=33d05024949e3f3d2fc78856ad6d0554";
    
    
    // console.log("City Searched")

    // fetch(weatherApi)
    // .then(function (response) {
    //     todayWeather.classList.remove("d-none")
    //     // request was successful
    //   if (response.ok) {
    //     console.log(response);
    //     response.json().then(function(data) {
    //       console.log(data);
    //       displayRepos(data, user);
    //     });
    //   } else {
    //     alert('Error: City Not Found');
    //   }
    // })
    // .catch(function(error) {
    //   alert("Unable to connect");
    // });
    // };
}
  getCityInfo();