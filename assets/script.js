

// weather code starts
var date = $("#currentDay");
var search = document.getElementById("search");


var city;
var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
var today = moment().format("(" + 'L' + ")");

cityHistory(searchHistory);
getForcast(searchHistory[searchHistory.length - 1]);
getCurrentWeather(searchHistory[searchHistory.length - 1]);

if(searchHistory.length===0){
    weather.style.display = "none";
}else{
     weather.style.display = "block";
}

$("#submit").on("click", function (event) {
    event.preventDefault();
    city = search.value.trim();
    console.log(city);
    weather.style.display = "block";
    getForcast(city);
    checkHistory(city);
    getCurrentWeather(city);

});

$("body").on("click", ".list-group-item", function (event) {
    event.preventDefault();
    city = $(this).text();
    console.log(city);
    weather.style.display = "block";
    getCurrentWeather(city);
    getForcast(city);
    checkHistory(city);
});

function getCurrentWeather(city) {
    var key = "ee832b09a8728a9c7e626c00b6d86173";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + key;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) {
            console.log(queryURL);
            console.log(response);

            var temperature = JSON.stringify(response.main.temp);
            $("#temp").text("Temperature: " + temperature + " " + String.fromCharCode(176) + "F");
            var humidity = JSON.stringify(response.main.humidity);
            $("#humid").text("Humidity: " + humidity + "%");
            var wind = JSON.stringify(response.wind.speed);
            $("#wind").text("Wind Speed: " + wind + " MPH");

            var icon = response.weather[0].icon;
            console.log(icon);

            var iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            console.log(iconURL);

            $("#currentDay").text(city + " " + today)
            $("#icon").attr("src", iconURL);

            var lon = response.coord.lon;
            var lat = response.coord.lat;
            console.log(lon + " " + lat);

            var uvUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + key;
            $.ajax({
                url: uvUrl,
                method: "GET"
            })
                // After data comes back from the request
                .then(function (response) {
                    var uv = response.value;
                    console.log(uv);
                    $("#uv").text(uv);

                    if (uv >= 0 && uv < 3) {
                        $("span").css("background", "green");
                    } else if (uv >= 3 && uv < 6) {
                        $("span").css("background", "yellow");
                    } else if (uv >= 6 && uv <= 8) {
                        $("span").css("background", "orange");
                    } else if (uv >= 8 && uv < 11) {
                        $("span").css("background", "orange");
                    } else if (uv >= 11) {
                        $("span").css("background", "violet");
                    }

                });

        });

}

function getForcast(city) {
    var key = "ee832b09a8728a9c7e626c00b6d86173";
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + key;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // After data comes back from the request
        .then(function (response) {
            console.log(queryURL);
            console.log(response);

            var temperature = JSON.stringify(response.list[0].main.temp);
            $("#temp1").text("Temp: " + temperature + " " + String.fromCharCode(176) + "F");
            var humidity = JSON.stringify(response.list[0].main.humidity);
            $("#humid1").text("Humidity: " + humidity + "%");
            var icon = response.list[0].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            $("#icon1").attr("src", iconURL);

            var temperature = JSON.stringify(response.list[8].main.temp);
            $("#temp2").text("Temp: " + temperature + " " + String.fromCharCode(176) + "F");
            var humidity = JSON.stringify(response.list[8].main.humidity);
            $("#humid2").text("Humidity: " + humidity + "%");
            var icon = response.list[8].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            $("#icon2").attr("src", iconURL);

            var temperature = JSON.stringify(response.list[16].main.temp);
            $("#temp3").text("Temp: " + temperature + " " + String.fromCharCode(176) + "F");
            var humidity = JSON.stringify(response.list[16].main.humidity);
            $("#humid3").text("Humidity: " + humidity + "%");
            var icon = response.list[16].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            $("#icon3").attr("src", iconURL);

            var temperature = JSON.stringify(response.list[24].main.temp);
            $("#temp4").text("Temp: " + temperature + " " + String.fromCharCode(176) + "F");
            var humidity = JSON.stringify(response.list[24].main.humidity);
            $("#humid4").text("Humidity: " + humidity + "%");
            var icon = response.list[16].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            $("#icon4").attr("src", iconURL);

            var temperature = JSON.stringify(response.list[32].main.temp);
            $("#temp5").text("Temp: " + temperature + " " + String.fromCharCode(176) + "F");
            var humidity = JSON.stringify(response.list[32].main.humidity);
            $("#humid5").text("Humidity: " + humidity + "%");
            var icon = response.list[16].weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            $("#icon5").attr("src", iconURL);

            for (var i = 1; i < 6; i++) {
                var day = moment().add(i, 'days').format('L');
                $("#day" + i).text(day);
                console.log(day);
            }

        });

}

// storage
function cityHistory(searchHistory) {
    $("#history").empty();
    console.log(searchHistory);
    for (var i = 0; i < searchHistory.length; i++) {
        var item = $("<li>");
        item.addClass("list-group-item");
        item.text(searchHistory[i]);
        $("#history").append(item);
    }

}

function checkHistory(city) {
    if (city) {
        for (var i = 0; i < searchHistory.length; i++) {
            if (searchHistory[i].toLowerCase() === city.toLowerCase()) {
                searchHistory.splice(i, 1);
            }
        }

        searchHistory.push(city);
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
        cityHistory(searchHistory);
    }
}
// weather code ends
 
// exchange code starts

    $.getJSON(
      // NB: using Open Exchange Rates here, but you can use any source!
      'https://openexchangerates.org/api/latest.json?app_id=29fce18dda7b49a287bd5d6fb74a7e30',
      function(data) {
          // Check money.js has finished loading:
          if ( typeof fx !== "undefined" && fx.rates ) {
              fx.rates = data.rates;
              fx.base = data.base;
          } else {
              // If not, apply to fxSetup global:
              var fxSetup = {
                  rates : data.rates,
                  base : data.base
              }
          }
      }
  );

 
  // echange code ends


 // Performing an AJAX request with the queryURL

//  var queryURL = "https://community-open-weather-map.p.rapidapi.com/weather?q=Dubai%2Cuae&lat=0&lon=0&id=2172797&lang=null&units=%22metric%22%20or%20%22imperial%22&mode=xml%2C%20html";
 
 
//  $.ajax({
//     url: queryURL,
//     method: "GET",
//     headers: { 'x-rapidapi-key': '26902fcb435c84ffeff23ca59e4cae95', 'x-rapidapi-host':'community-open-weather-map.p.rapidapi.com' }
//   })

  
//     // After data comes back from the request
//     .then(function(response) {
//       console.log(queryURL);

//       console.log(response);
//       // storing the data from the AJAX request in the results variable
//     //   var results = response.data;
//    console.log("main" + response.coord);
//    $("#temperature").text(JSON.stringify(response.coord));
//     });


    //new code
    // window.weatherWidgetConfig =  window.weatherWidgetConfig || [];
    // window.weatherWidgetConfig.push({
    //     selector:".weatherWidget",
    //     apiKey:"f3b91ecaf5msh8a2cb171637c53ap1e6540jsn46fb9786ca95", //Sign up for your personal key
    //     location:"Dubai, AE", //Enter an address
    //     unitGroup:"metric", //"us" or "metric"
    //     forecastDays:5, //how many days forecast to show
    //     title:"Dubai, AE", //optional title to show in the 
    //     showTitle:true, 
    //     showConditions:true
    // });
    
    // (function() {
    // var d = document, s = d.createElement('script');
    // s.src = 'https://www.visualcrossing.com/widgets/forecast-simple/weather-forecast-widget-simple.js';
    // s.setAttribute('data-timestamp', +new Date());
    // (d.head || d.body).appendChild(s);
    // })();

 // Initialize and add the map
 function initMap() {
    // The location of dubai
    const dubai = { lat: 25.276987, lng: 55.296249 };
    // The map, centered at dubai
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 7,
      center: dubai,
    });
    // The marker, positioned at dubai
    const marker = new google.maps.Marker({
      position: dubai,
      map: map,
    });
  }