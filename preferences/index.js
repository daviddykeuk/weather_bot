module.exports.getPreferences = () => {
  return {
    TELEGRAM: {
      BOT_KEY: process.env.TELEGRAM_BOT_KEY,
      CHAT_ID: process.env.TELEGRAM_CHAT_ID
    },
    OPENWEATHERMAP: {
      LAT: process.env.LAT,
      LONG: process.env.LONG,
      API_KEY: process.env.OPENWEATHERMAP_API_KEY
    },
    WEATHER_CHANGE_THRESHOLDS: {
      RAIN: process.env.WEATHER_CHANGE_THRESHOLD_RAIN,
      WIND: process.env.WEATHER_CHANGE_THRESHOLD_WIND,
      TEMPURATURE: process.env.WEATHER_CHANGE_THRESHOLD_TEMP
    }
  };
};
