// Automatic Slideshow - change image every 3 seconds
// var myIndex = 0;
// carousel();

// function carousel() {
//   var i;
//   var x = document.getElementsByClassName("mySlides");
//   for (i = 0; i < x.length; i++) {
//     x[i].style.display = "none";
//   }
//   myIndex++;
//   if (myIndex > x.length) {myIndex = 1}
//   x[myIndex-1].style.display = "block";
//   setTimeout(carousel, 3000);
// }


 // Performing an AJAX request with the queryURL

 var queryURL = "https://community-open-weather-map.p.rapidapi.com/weather?q=Dubai%2Cuae&lat=0&lon=0&id=2172797&lang=null&units=%22metric%22%20or%20%22imperial%22&mode=xml%2C%20html";
 
 
 $.ajax({
    url: queryURL,
    method: "GET",
    headers: { 'x-rapidapi-key': '26902fcb435c84ffeff23ca59e4cae95', 'x-rapidapi-host':'community-open-weather-map.p.rapidapi.com' }
  })

  
    // After data comes back from the request
    .then(function(response) {
      console.log(queryURL);

      console.log(response);
      // storing the data from the AJAX request in the results variable
    //   var results = response.data;
   console.log("main" + response.coord);
   $("#temperature").text(JSON.stringify(response.coord));
    });

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


    