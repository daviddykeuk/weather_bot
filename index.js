const engine = require("./engine");
const Weather = require("./openWeatherMap");
const Telegram = require("./telegram");
const data = require("./data");
const preferences = require("./preferences").getPreferences();

const weather = new Weather(preferences);
const telegram = new Telegram(preferences);

const Engine = new engine(weather, telegram, data, preferences);

Engine.run(1000 * 60); // run the engine with a 60 second interval
