var apiKey = "3b91a5e54ccda9fd842e775f32c6e9ad";
var city = document.getElementById('enter-city');
var searchButton = document.getElementById('search-button');
var weatherNow= document.getElementById('weatherNow');
var savedData= document.getElementById('savedData')
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

function weatherDataCurrent(cityName) {
    weatherNow.classList.remove("d-none");
   let api = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
    fetch(api)
    .then(function(response){
       return response.json()
   }).then(function(data){
        console.log("today array")
       console.log(data)
       displayToday(data);
  }).catch(function(error){
     console.log(error)
   })
};

function displayToday(data){
    var locationHandler = document.createElement("h2");
    locationHandler.textContent = "5 Dat Forecast for " + document.querySelector("#enter-city").value;
      document.querySelector(".place").appendChild(locationHandler);
          var dataHolder = document.createElement("div");
          document.querySelector(".detail").appendChild(dataHolder)
          var today = Date();
        var newDate = today.split(" ");
        console.log(newDate);

        var day = document.createElement("h3");
        day.textContent = newDate[1] + " " + newDate[2];
        dataHolder.appendChild(day);

        var temp = document.createElement("p");
        temp.textContent = ("Temperature " + data.temp + " degrees");
         dataHolder.appendChild(temp);
         var humidity = document.createElement("p");
           humidity.textContent = ("Humidity " + data.main.humidity + "%");
           dataHolder.appendChild(humidity);
           var windSpeed = document.createElement("p");
            windSpeed.textContent = ("Wind Speed " + data.wind.speed + "MPH");
           dataHolder.appendChild(windSpeed);
         var weatherImage = document.createElement("img");
             var icon = data.weather[0].icon;
           weatherImage.setAttribute("src", "https://openweathermap.org/img/wn/" + icon + "@2x.png");
        dataHolder.appendChild(weatherImage);
  };
  

function weatherDataFuture(cityName) {
    weatherNow.classList.remove("d-none");
   let apiSecond = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + apiKey;
    fetch(apiSecond)
    .then(function(response){
       return response.json()
   }).then(function(data){
    console.log("future array")
       console.log(data)
       displayData(data);
  }).catch(function(error){
     console.log(error)
   })
};

function displayData(data){
    for(var i = 0; i<32; i=i+8) {
        var theDay = data.list[i].dt_txt
        console.log(theDay);
        var dt = data.list[i].main.temp
        console.log(dt);
        var dataHolder = document.createElement("div");
        //dataHolder.setAttribute("card");
        document.querySelector(".detail").appendChild(dataHolder);

        var day = document.createElement("h3");
        theDay = theDay.split(" ");
        console.log(theDay);
        editedDay = theDay[0].split("-");
        console.log(editedDay);
        var monthInWords = ""
            if (editedDay[1] == '01') {
                monthInWords = "Jan"
            } else if (editedDay[1] == '02') {
                monthInWords = "Feb"
            } else if (editedDay[1] == '03') {
                monthInWords = "Mar"
            } else if (editedDay[1] == '04') {
                monthInWords = "Apr"
            } else if (editedDay[1] == '05') {
                monthInWords = "May"
            } else if (editedDay[1] == '06') {
                monthInWords = "Jun"
            } else if (editedDay[1] == '07') {
                monthInWords = "Jul"
            } else if (editedDay[1] == '08') {
                monthInWords = "Aug"
            } else if (editedDay[1] == '09') {
                monthInWords = "Sep"
            } else if (editedDay[1] == '10') {
                monthInWords = "Oct"
            } else if (editedDay[1] == '11') {
                monthInWords = "Nov"
            } else {
                monthInWords = "Dec"
            }
        console.log(monthInWords);
        day.textContent = monthInWords + " " + editedDay[2];
        dataHolder.appendChild(day);

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
    weatherDataCurrent(searchTerm);
    weatherDataFuture(searchTerm);
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
