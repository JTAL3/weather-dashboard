//global vs local - could go second route/plan b
//my apiKey = dbe3f54bcf4ff827d8f1b5a0376e4d05
//check email for other details/links to api docs


var todaysWind = document.getElementById("wind");
var todaysUv = document.getElementById("uv-index");
var past = document.getElementById("past-results");
var todaysWeather = document.getElementById("todays-weather");
var fiveForecast = document.getElementById("5-day");
var userSearch = document.getElementById("city-search");
var searchButton = document.getElementById("search-btn");
var enteredCity = document.getElementById("city-name");
var currentSymbol = document.getElementById("symbol");
var todaysTemp = document.getElementById("temp");
var todaysHumidity = document.getElementById("humidity");

   

//begin function to pull data from api

    function getCityInfo(cityResult) {

        let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityResult + "&appid=dbe3f54bcf4ff827d8f1b5a0376e4d05";

        axios.get(apiUrl)
            .then(function (response) {
             todaysWeather.classList.remove("d-none");
                //setting the respone/call, but need to determine formatting,etc.
            var currentDate = new Date(response.data.dt * 1000);
            var day = currentDate.getDate();
             var year = currentDate.getFullYear();
             var month = currentDate.getMonth() + 1;
                

             enteredCity.innerHTML = response.data.name + " (" + day + "/" + month + "/" + year + ") ";
             let weatherIcon = response.data.weather[0].icon;

            currentSymbol.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@4x.png");
             currentSymbol.setAttribute("alt", response.data.weather[0].description);

             todaysTemp.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";

             todaysUv.innerHTML = "UV Index: " + response.data.uvi;

             todaysHumidity.innerHTML = "Humidity: " + response.data.main.humidity + "%";
             todaysWind.innerHTML = "Wind: " + response.data.wind.speed + " MPH";
                
                //trying to establish the index via past examples. Not currently working
                //continue working
                //
                //
                // let lat = response.data.coord.lat;
                // let lon = response.data.coord.lon;
                // let myApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily&appid=33d05024949e3f3d2fc78856ad6d0554";
                // fetch()
                //get(u)
                //     .then(function (response) {
                //         let uvIndex = document.
                //createElement("");        
                //         //for uv index, favorable is green, moderate is yellow, severe is re
                //         }
                //         else if (response.data[0].value < 8) {
                //         }
                //         else {
                //             uvIndex.setAttribute("class", "badge badge-danger");
                //         }
                //         console.log(response.data[18].value);
                //         todaysUV.append(uvIndex);
                //     });
                
                //5 day forecast
                //pulls city id and publishes data to models
             let cityID = response.data.id;
             let forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=33d05024949e3f3d2fc78856ad6d0554";

            axios.get(forecastApiUrl)
                 .then(function (response) {
                        
                    fiveForecast.classList.remove("d-none");
                        
                //parses the response for 5 day forecast
                var forecastEls = document.querySelectorAll(".forecast");
                 for (i = 0; i < forecastEls.length; i++) {
                         forecastEls[i].innerHTML = "";
                        var fiveDaySpread = i * 8 + 4; 
                        var forecastDate = new Date(response.data.list[fiveDaySpread].dt * 1000);
                         var forecastDay = forecastDate.getDate();
                         var forecastMonth = forecastDate.getMonth() + 1;
                         var forecastYear = forecastDate.getFullYear();
                         var forecastDateEl = document.createElement("p");

                            forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date fw-bold fs-5");
                            forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                            forecastEls[i].append(forecastDateEl);

                         //
                         //five day forecast info/details
                        var forecastWeatherEl = document.createElement("img");
                         forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[fiveDaySpread].weather[0].icon + "@2x.png");
                        forecastWeatherEl.setAttribute("alt", response.data.list[fiveDaySpread].weather[0].description);
                        forecastWeatherEl.setAttribute("class", "forecast-icon");
                        forecastEls[i].append(forecastWeatherEl);
                         var forecastTempEl = document.createElement("p");
                         forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[fiveDaySpread].main.temp) + " &#176F";
                         forecastEls[i].append(forecastTempEl);
                         var forecastWindEl = document.createElement("p");
                         forecastWindEl.innerHTML = "Wind: " + response.data.list[fiveDaySpread].wind.speed + " MPH";
                         forecastEls[i].append(forecastWindEl);
                         var forecastHumidityEl = document.createElement("p");
                         forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[fiveDaySpread].main.humidity + "%";
                          forecastEls[i].append(forecastHumidityEl);
                        }
                    })
            });
    }

    //getting past results to save in localStorage
    let pastSearch = JSON.parse(localStorage.getItem("search")) || [];
    
    // search results and history
    //seems to be a bug currently. Double check to determine
    searchButton.addEventListener("click", function () {
        var searchTerm = userSearch.value;
        getCityInfo(searchTerm);
        pastSearch.push(searchTerm);
        localStorage.setItem("search", JSON.stringify(pastSearch));
        showPastResults();
    })



    //history is currently docked to left side of screen
    //option to remove?
    //clear or match past searches?
    //displays the search history list 
    function showPastResults() {
        past.innerHTML = "";

        for (let i = 0; i < pastSearch.length; i++) {           
            
            var historyItem = document.createElement("input");
            historyItem.setAttribute("type", "text");
            historyItem.setAttribute("readonly", true);
            historyItem.setAttribute("class", "form-control d-block");
            historyItem.setAttribute("value", pastSearch[i]);
            historyItem.addEventListener("click", function () {
                getCityInfo(historyItem.value);
            })
            past.append(historyItem);
            
        }
    }

       //converts temp to fahrenheit
    //check api docs for issues
    
    function k2f(K) {
        return Math.floor((K - 273.15) * 1.8 + 32);
    }

    showPastResults();


    //trying to get history to automatically pop up
    // // if (searchHistory.length > 0) {
    //     getWeather(searchHistory[searchHistory.length - 1]);
    // }
    // then() - ex - ex - trying to determine the best route to go with this
    //revert back to previous examples
    // if (searchHistory.length > 0) {
    //     getWeather(searchHistory[searchHistory.length - 1]);
    // }
    


