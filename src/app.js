let apiKey = `b8aa8c39c4012f71e59cf320be595b6b`;

//Current Weather Data  
//api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key}
// api.openweathermap.org/data/2.5/weather?lat=35&lon=139

// icon  https://openweathermap.org/weather-conditions
// http://openweathermap.org/img/wn/10d@2x.png 

navigator.geolocation.getCurrentPosition(success, error);

function success(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
}

function error() {
  status.textContent = 'Unable to retrieve your location';
}

