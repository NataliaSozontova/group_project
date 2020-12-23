// Automatic Slideshow - change image every 3 seconds
var myIndex = 0;
var search = document.getElementById("search");
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}
  x[myIndex-1].style.display = "block";
  setTimeout(carousel, 3000);
}

var city;
$("#submit").on("click", function (event) {
  event.preventDefault();
  // Performing an AJAX request with the queryURL
 var city = search.value.trim();
 console.log(city);
var queryURL = "https://community-open-weather-map.p.rapidapi.com/weather?q=Dubai%2Cuae&lat=0&lon=0&id=2172797&lang=null&units=imperial&mode=xml%2C%20html";
 
 $.ajax({
    url: queryURL,
    method: "GET",
    headers: { 'x-rapidapi-key': 'f3b91ecaf5msh8a2cb171637c53ap1e6540jsn46fb9786ca95', 'x-rapidapi-host':'community-open-weather-map.p.rapidapi.com' }
  })
    // After data comes back from the request
    .then(function(response) {
      console.log(queryURL);
      console.log(response);
   var temperature = $("#temperature").text("Temperature: " + JSON.stringify(response.main.temp));
   console.log(temperature);
   console.log(response.main.temp);
    });
});
 

   











  
   

    