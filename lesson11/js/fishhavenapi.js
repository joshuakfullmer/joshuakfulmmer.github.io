// weather summary 
const apiURL = 'https://api.openweathermap.org/data/2.5/weather?id=5585010&units=imperial&APPID=8d1e99c71142778033ed100013bf9069';
const fivedayapiURL = 'https://api.openweathermap.org/data/2.5/forecast?id=5585010&units=imperial&APPID=8d1e99c71142778033ed100013bf9069'

fetch(apiURL)
  .then((response) => response.json())
  .then((jsObject) => {
    document.getElementById('current').textContent = jsObject.weather[0].main;
    document.getElementById('airspan').textContent = jsObject.main.temp.toFixed(0);
    document.getElementById('humidity').textContent = jsObject.main.humidity;
    document.getElementById('windspeedspan').textContent = jsObject.wind.speed.toFixed(0);
  });
let windSpeed = document.getElementById('windspeedspan').textContent;
let air = document.getElementById('airspan').textContent;
let windChill;
if (air < 50 && windSpeed > 3) {
  windChill = 35.74 + .6215 * air - 35.75 * Math.pow(windSpeed, .16) + .4275 * air * Math.pow(windSpeed, .16);
  windChill = Math.round(windChill);
  windChill += "°F";
}
else {
  windChill = "N/A";
}
document.getElementById('windchillspan').innerHTML = windChill;

// five-day forecast 

fetch(fivedayapiURL)
    .then((response) => response.json())
    .then((jsObject) => {
        const fivedayforecast = jsObject.list.filter(x => x.dt_txt.includes('18:00:00'));
        const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let i = 0;
        fivedayforecast.forEach(forecast => {
            let day = new Date(forecast.dt_txt);
            document.getElementById(`temp${i + 1}`).textContent = forecast.main.temp;
            document.getElementById(`day${i + 1}`).textContent = weekday[day.getDay()];
            document.getElementById(`icon${i + 1}`).src = 'https://openweathermap.org/img/w/' + forecast.weather[0].icon + '.png';
            document.getElementById(`icon${i + 1}`).alt = forecast.weather[0].main + ' icon';
            i++;
        });
    });

// Event Writer

const eventURL = 'https://byui-cit230.github.io/weather/data/towndata.json';
fetch(eventURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonObject) {
      const fish = jsonObject.towns.find(town => {
        return town.name == 'Fish Haven';
      }).events;
      fish.forEach(event => {
        let li = document.createElement('li');
        li.innerHTML = event;
        document.getElementById('currentfevents').appendChild(li);
      });
    });