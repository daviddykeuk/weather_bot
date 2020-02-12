const request = require("../request");

class OpenWeatherMap {
  constructor(preferences) {
    this.preferences = preferences;
  }

  getForecasts() {
    return new Promise((resolve, reject) => {
      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.preferences.OPENWEATHERMAP.LAT}&lon=${this.preferences.OPENWEATHERMAP.LONG}&appid=${this.preferences.OPENWEATHERMAP.API_KEY}&units=metric`;
      request
        .get(url)
        .catch(reject)
        .then(data => {
          let forecasts = {
            today: [],
            tomorrow: []
          };
          data.list.forEach(f => {
            let date = new Date(f.dt * 1000);
            let forecast = {
              date: new Date(f.dt * 1000),
              description: f.weather[0].main,
              temp: f.main.temp,
              feels_like: f.main.feels_like,
              wind: f.wind ? f.wind.speed : 0,
              rain: f.rain ? f.rain["3h"] : 0,
              snow: f.snow ? f.snow["1h"] : 0,
              clouds: f.clouds.all
            };
            if (isToday(date)) {
              forecasts.today.push(forecast);
            }
            if (isTomorrow(date)) {
              forecasts.tomorrow.push(forecast);
            }
          });
          resolve(forecasts);
        });
    });
  }
}

module.exports = OpenWeatherMap;

function isToday(date) {
  let today = new Date();
  date.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  return today.getTime() === date.getTime();
}

function isTomorrow(date) {
  let today = new Date(),
    tomorrow = new Date();
  date.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(today.getDate() + 1);
  return date.getTime() === tomorrow.getTime();
}
