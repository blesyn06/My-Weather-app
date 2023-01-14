let currentDate = document.querySelector("#date");
let now = new Date();
let date = now.getDate();
let year = now.getFullYear();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];
let todayDate = `${day}, ${month} ${date}, ${year}`;
currentDate.innerHTML = `${todayDate}`;
let iconElement = "#icon";
 iconElement = document.querySelector("#icon");


 function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]

  return days[day];
 }

 function showForecast(response){
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

//let days = ["Sun", "Mon", "Tue", "Wed", "Thur"];

let forecastHTML =  `<div class = "row">`;

forecast.forEach(function (forecastDay, index){
  if (index < 6) {

forecastHTML = forecastHTML +

          `    
          <div class="col-2">
                    
            <div class="weather-forecast-date"> ${formatDay(forecastDay.time)}</div>
             <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" alt="" width="36" />
            
            <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temperature.maximum)}°</span>
                <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temperature.minimum)}°</span>
            </div>
            
                </div>
        

        `;
  }
 });
 forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
      
 }


 function getforecast(coordinates){
  console.log(coordinates);
  let apiKey = "2t0f397a5b65af57a1a4d84e1o98e202";
  let apiUrl =`https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showForecast);
 }


function showWeather(response){
  
document.querySelector("#city").innerHTML = response.data.city;
document.querySelector("#temperature").innerHTML = `${Math.round(response.data.temperature.current)}`;
document.querySelector("#humidity1").innerHTML = response.data.temperature.humidity;
document.querySelector("#wind1").innerHTML = Math.round(response.data.wind.speed);
document.querySelector("#description").innerHTML = response.data.condition.description;

iconElement.setAttribute(
    "src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);

   iconElement.setAttribute("alt", response.data.condition.description);
   celsiusTemperature = response.data.temperature.current;
   console.log(response.data);
   //console.log(response.data.coordinates);

   getforecast(response.data.coordinates);
};




function search(city){
let apiKey = "2t0f397a5b65af57a1a4d84e1o98e202";
let unit = "metric";
apiEndpoint= "https://api.shecodes.io/weather/v1/current";
let apiUrl = `${apiEndpoint}?query=${city}&key=${apiKey}&units=${unit}`;
axios.get(apiUrl).then(showWeather);

}


function handleSubmit(event) {
  event.preventDefault();
let city = document.querySelector("#city-input").value;
search(city);
}




let searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", handleSubmit);

let currentlocationbutton = document.querySelector("#current-location-button")
currentlocationbutton.addEventListener("click", getCurrentLocation )



function searchLocation(position){
let apiKey = "2t0f397a5b65af57a1a4d84e1o98e202";

let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${position.coords.latitude}&lon=${position.
coords.longitude}&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(showWeather);

}



function getCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}




function showTemperature(response){
    
    let theCity = response.data.city;
  
    let temperature = Math.round(response.data.temperature.current);

    let heading = document.querySelector("#temperature");
    heading.innerHTML = `${temperature}`;
    
    let h2 = document.querySelector("#city");
    h2.innerHTML = (theCity);

    
}



function showfahrenheitTemperature(event){
event.preventDefault();
let temperatureElement = document.querySelector("#temperature");
celsiuslink.classList.remove("active");
fahrenheitlink.classList.add("active");
let fahrenheitTemperature = (celsiusTemperature  * 9 / 5) + 32;
temperatureElement.innerHTML = Math.round(fahrenheitTemperature);

}


function showcelsiusTemperature(event){
event.preventDefault();
let temperatureElement = document.querySelector("#temperature");
celsiuslink.classList.add("active");
fahrenheitlink.classList.remove("active");
temperatureElement.innerHTML = Math.round(celsiusTemperature);
}


let celsiusTemperature = null;


let fahrenheitlink = document.querySelector("#fahrenheit-link");

fahrenheitlink.addEventListener("click", showfahrenheitTemperature);

let celsiuslink = document.querySelector("#celsius-link");

celsiuslink.addEventListener("click", showcelsiusTemperature);

search("Lagos");
