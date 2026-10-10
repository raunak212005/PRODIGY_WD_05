const apiKey = "YOUR_API_KEY"; //OpenWeatherMap_Token
const weather = document.getElementById("weather");

async function getWeather(city){
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response=await fetch(url);
    const data=await response.json();
    displayWeather(data);
}

async function getWeatherByLocation(lat,lon){
    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    const response=await fetch(url);
    const data=await response.json();
    displayWeather(data);
}

function displayWeather(data){
    if(data.cod!=200){
        alert("City Not Found");
        return;
    }
    weather.style.display="block";
    document.getElementById("cityName").innerHTML=data.name;
    document.getElementById("temp").innerHTML=
    Math.round(data.main.temp)+"°C";
    document.getElementById("condition").innerHTML=
    data.weather[0].main;
    document.getElementById("humidity").innerHTML=
    data.main.humidity+"%";
    document.getElementById("wind").innerHTML=
    data.wind.speed+" km/h";
    document.getElementById("feels").innerHTML=
    Math.round(data.main.feels_like)+"°C";
    document.getElementById("icon").src=
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    }

document.getElementById("searchBtn").onclick=()=>{
    const city=document.getElementById("city").value;
    if(city!=""){
        getWeather(city);
    }
}

document.getElementById("locationBtn").onclick=()=>{
    navigator.geolocation.getCurrentPosition(position=>{
    getWeatherByLocation(position.coords.latitude,position.coords.longitude);
    });
}