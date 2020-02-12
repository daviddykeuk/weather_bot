class Engine {
  constructor(weather, telegram, data, preferences) {
    this.weather = weather;
    this.telegram = telegram;
    this.data = data;
    this.preferences = preferences;
  }

  async processForecasts(forecasts, currentComms) {
    const hour = new Date().getHours();
    var forecast;

    if (hour < 12) {
      forecast = forecasts.today.filter(f => f.date.getHours() === 18);
    } else {
      forecast = forecasts.tomorrow.filter(f => f.date.getHours() === 6);
    }

    if (forecast.length > 0) {
      let message = getWeatherEmoji(forecast[0]);
      message += hour < 12 ? " This afternoon " : " Tomorrow morning ";
      message += getForecastMessage(forecast[0]);
      try {
        console.log("Sending message:", message);
        await this.telegram.sendMessage(message);
      } catch (err) {
        console.log("Could not send message: ", err);
      }
    } else {
      console.log("No forecast available");
    }
  }

  run(sleepTime) {
    this.tick();
  }

  async tick() {
    console.log("Getting forecast...");
    try {
      const forecasts = await this.weather.getForecasts();
      const currentComms = await this.data.getDataById("weather-comms");
      console.log("Processing forecasts");
      await this.processForecasts(forecasts, currentComms);
    } catch (e) {
      console.log("There was an error running everything:\n\n`", e);
    }
  }
}

module.exports = Engine;

function getForecastMessage(forecast) {
  return `it's going to be ${getRainCondition(
    forecast.rain
  )}, ${getWindCondition(forecast.wind)} and feel ${getTempCondition(
    forecast.feels_like
  )}`;
}

function getWeatherEmoji(forecast) {
  switch (forecast.description) {
    case "Clear":
      return "☀";
    case "Clouds":
      return "☁";
    case "Snow":
      return "🌨";
    case "Drizzle":
      return "🌧";
    case "Thunderstorm":
      return "🌩";
    case "Mist":
      return "🌫";
    case "Fog":
      return "🌫";
    case "Rain":
      return "☔";
    case "Tornado":
      return "🌪";
    default:
      return "❓";
  }
}

function getTempCondition(temp) {
  if (temp < 0) {
    return "below freezing";
  } else if (temp < 2) {
    return "like it's freezing";
  } else if (temp < 5) {
    return "really fricking cold";
  } else if (temp < 10) {
    return "cold";
  } else if (temp < 15) {
    return "mild";
  } else if (temp < 20) {
    return "comfortable";
  } else if (temp < 25) {
    return "warm";
  } else if (temp < 30) {
    return "hot";
  } else if (temp < 35) {
    return "really hot";
  } else {
    return "balmy";
  }
}

function getWindCondition(windSpeed) {
  if (windSpeed === 0) {
    return "still";
  } else if (windSpeed < 5) {
    return "breezy";
  } else if (windSpeed < 10) {
    return "windy";
  } else if (windSpeed < 20) {
    return "blowing a gale";
  } else {
    return "hurricane like";
  }
}

function getRainCondition(rainLevel) {
  if (rainLevel === 0) {
    return "dry";
  } else if (rainLevel < 7) {
    return "lightly raining";
  } else if (rainLevel < 20) {
    return "raining";
  } else if (rainLevel < 30) {
    return "heavily raining";
  } else {
    return "violently raining";
  }
}
