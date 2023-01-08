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
let iconElement = document.querySelector("#icon");


function showWeather(response){
  console.log(response);
    

document.querySelector("#city").innerHTML = response.data.city;
document.querySelector("#temperature").innerHTML = `${Math.round(response.data.temperature.current)}°C`;
document.querySelector("#humidity1").innerHTML = response.data.temperature.humidity;
document.querySelector("#wind1").innerHTML = Math.round(response.data.wind.speed);
document.querySelector("#description").innerHTML = response.data.condition.description;

iconElement.setAttribute(
    "src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condtion.icon}.png`);

   iconElement.setAttribute("alt", response.data.condition.description);

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
search("Lagos");


function searchLocation(position){
let apiKey = "c8a77112b2faf6684bb4b21a0aa778ae";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(showWeather);
}


function getCurrentLocation(event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}


function showTemperature(response){
    
    let theCity = response.data.name;
  
    let temperature = Math.round(response.data.main.temp);

    let heading = document.querySelector("#temperature");
    heading.innerHTML = `${temperature}℃`;
    let h2 = document.querySelector("#city");
    h2.innerHTML = (theCity);

}

