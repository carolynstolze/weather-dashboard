var getCurrentWeather;

$(document).ready(function () {
  // get weather from the first element in the history list (userSearch pushed to first element on click)
  getCurrentWeather = function getCurrentWeather() {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + historyList[0] + "&units=imperial" + apiKey;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      // console.log(response);
      var lat = response.coord.lat; // need for uvQueryURL
      var lon = response.coord.lon; // need for uvQueryURL
      var currentIconURL = "http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png"; // get icon
      var currentIcon = `<img src="${currentIconURL}" alt="${response.weather[0].description}"></img>`; // create html code (didn't work if placeholder in html dkw??)
      $("#currentIcon").append().html(`&nbsp;&nbsp; ${currentIcon}`); // display icon
      $("#currentCity").append().text(response.name); // get city name and display
      $("#currentDate").append().html(`&nbsp;&nbsp; ${moment.unix(response.dt).format("l")}`); // get date and display
      $("#currentTemp").append().text("Temperature: " + response.main.temp.toFixed(1) + " °F"); // get temp and display
      $("#currentHum").append().text("Humidity: " + response.main.humidity + "%"); // get humidity and display
      $("#currentWind").append().text("Wind Speed: " + response.wind.speed.toFixed(1) + " MPH"); // get wind and display
      // GET uv index
      function getCurrentUVindex() {
        var uvQueryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + apiKey;
        $.ajax({
          url: uvQueryURL,
          method: "GET"
        }).then(function (response) {
          $("#currentUV").append().text(response.value);
          // assigns color indicator
          if (response.value >= 0 && response.value < 3) { $("#currentUV").removeClass("moderate high very-high extreme").addClass("low"); } // if low level
          if (response.value >= 3 && response.value < 6) { $("#currentUV").removeClass("low high very-high extreme").addClass("moderate"); } // if moderate level
          if (response.value >= 6 && response.value < 8) { $("#currentUV").removeClass("low moderate very-high extreme").addClass("high"); } // if high level
          if (response.value >= 8 && response.value < 11) { $("#currentUV").removeClass("low moderate high extreme").addClass("very-high"); } // if very-high level
          if (response.value >= 11) { $("#currentUV").removeClass("low moderate high very-high").addClass("extreme"); } // if extreme level
        });
      };
      getCurrentUVindex(); // run here to display last saved search on page load
    });
  };
  getCurrentWeather(); // run here to display last saved search on page load
});