"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}var apiKey="b8aa8c39c4012f71e59cf320be595b6b",Forecast=function(){function n(e,t){_classCallCheck(this,n),this.daysLater=e,this.icon=this._getIcon(t),this.weather=this._getWeather(t),this.highestTemp=this._getHighestTemp(t),this.lowestTemp=this._getLowestTemp(t),this.day=this._getDay()}return _createClass(n,[{key:"_getNoonWeather",value:function(e){var t=this._getOneDayWeatherArray(e),n=t.find(function(e){return 12===new Date(e.dt_txt).getHours()});return void 0===n?t[0]:n}},{key:"_getIcon",value:function(e){var t=this._getNoonWeather(e);return"http://openweathermap.org/img/wn/".concat(t.weather[0].icon,"@2x.png")}},{key:"_getWeather",value:function(e){return this._getNoonWeather(e).weather[0].description}},{key:"_getOneDayWeatherArray",value:function(e){var n=this,r=(new Date).getDay();return e.filter(function(e){var t=new Date(e.dt_txt);return r+n.daysLater<7?t.getDay()===r+n.daysLater:t.getDay()===r+n.daysLater-7})}},{key:"_getHighestTemp",value:function(e){var t=this._getOneDayWeatherArray(e);return t.sort(function(e,t){return t.main.temp_max-e.main.temp_max}),Math.round(t[0].main.temp_max)}},{key:"_getLowestTemp",value:function(e){var t=this._getOneDayWeatherArray(e);return t.sort(function(e,t){return e.main.temp_min-t.main.temp_min}),Math.round(t[0].main.temp_min)}},{key:"_getDay",value:function(){var e=(new Date).getDay(),t=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];return e+this.daysLater<7?t[e+this.daysLater]:t[e+this.daysLater-7]}}]),n}();function success(e){latitude=e.coords.latitude,longitude=e.coords.longitude,getCurrentWeatherJson(latitude,longitude).then(function(e){return renderCurrentWeather(e)}),getForecastJson(latitude,longitude).then(function(e){return renderForcast(e)})}function error(){status.textContent="Unable to retrieve your location"}function getCurrentWeatherJson(e,t){return fetch("https://api.openweathermap.org/data/2.5/weather?lat=".concat(e,"&lon=").concat(t,"&appid=").concat(apiKey,"&units=metric")).then(function(e){if(e.ok)return e.json();throw new Error("There is a problem in current weather")})}function renderCurrentWeather(e){document.querySelector(".current-conditions").innerHTML='\n     <h2>Current Conditions</h2>\n     <img src="http://openweathermap.org/img/wn/'.concat(e.weather[0].icon,'@2x.png" />\n     <div class="current">\n     <div class="temp">').concat(Math.round(e.main.temp),'℃</div>\n     <div class="condition">').concat(e.weather[0].description,"</div>\n    ")}function getForecastJson(e,t){return fetch("https://api.openweathermap.org/data/2.5/forecast?lat=".concat(e,"&lon=").concat(t,"&appid=").concat(apiKey,"&units=metric")).then(function(e){if(e.ok)return e.json();throw new Error("There is a problem in  forecast")})}function renderForcast(e){for(var t=document.querySelector(".forecast"),n="",r=1;r<=5;r++){var a=new Forecast(r,e.list);n+='\n    <div class="day">\n          <h3>'.concat(a.day,'</h3>\n          <img src="').concat(a.icon,'" />\n          <div class="description">').concat(a.weather,'</div>\n          <div class="temp">\n            <span class="high">').concat(a.highestTemp,'℃</span>/<span class="low">').concat(a.lowestTemp,"℃</span>\n          </div>\n        </div>\n    ")}t.innerHTML=n}navigator.geolocation.getCurrentPosition(success,error);