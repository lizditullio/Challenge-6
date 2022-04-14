var apiKey = "3b91a5e54ccda9fd842e775f32c6e9ad";
var city = document.getElementById('enter-city');
var searchButton = document.getElementById('search-button');
var weatherNow= document.getElementById('weatherNow');
var savedData= document.getElementById('savedData')
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

function weatherData(cityName) {
    weatherNow.classList.remove("d-none");
   let api = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + apiKey;
    fetch(api)
    .then(function(response){
       return response.json()
   }).then(function(data){
       console.log(data)
       displayData(data)
  }).catch(function(error){
     console.log(error)
   })
};

function displayData(data){
    for(var i = 0; i<40; i=i+8) {
        var theDay = data.list[i].dt_txt
        console.log(theDay);
        var dt = data.list[i].main.temp
        console.log(dt);
        var dataHolder = document.createElement("div");
        //dataHolder.setAttribute("card");
        document.querySelector(".detail").appendChild(dataHolder);
      var temp = document.createElement("p");
        temp.textContent = ("Temperature " + data.list[i].main.temp + " degrees");
        dataHolder.appendChild(temp);
        var humidity = document.createElement("p");
         humidity.textContent = ("Humidity " + data.list[i].main.humidity + "%");
         dataHolder.appendChild(humidity);
         var windSpeed = document.createElement("p");
         windSpeed.textContent = ("Wind Speed " + data.list[i].wind.speed + "MPH");
         dataHolder.appendChild(windSpeed);
    var weatherImage = document.createElement("img");
     var icon = data.list[i].weather[0].icon;
      weatherImage.setAttribute("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");
      dataHolder.appendChild(weatherImage);
   }
};

searchButton.addEventListener('click', function () {
    /*trims spaces for cities with spaces to avoid breaking api url*/
    const searchTerm = city.value.trim();
    weatherData(searchTerm);
    console.log(searchTerm);
    history();
    //document.getElementById("date").innerHTML = Date();
});

/*makes enter button trigger search button click*/
document.getElementById("enter-city")
    .addEventListener("keyup", function(e) {
        if (e.keyCode === 13) {
            document.getElementById("search-button").click();
        }
    });

/*save input in local storage and display under search history*/
function history() {
    const searchTerm = city.value;
   // weatherData(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem("search", JSON.stringify(searchHistory));
    savedData.textContent = (city.value);
    console.log(savedData.textContent);
    localStorage.setItem("history", JSON.stringify(savedData.textContent));
};

/*reloads function when clicking city name in history */
savedData.addEventListener("click", function() {
    searchTerm = city.value;
    weatherData(searchTerm)
}); 
