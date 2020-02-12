const request = require("../request");

class Telegram {
  constructor(parameters) {
    this.bot_key = parameters.TELEGRAM.BOT_KEY;
    this.chat_id = parameters.TELEGRAM.CHAT_ID;
  }

  sendMessage(text, headline) {
    if (headline && headline !== "") {
      text = `<b>${headline}</b>%0A%0A${text}`;
    }

    return request.get(
      `https://api.telegram.org/bot${this.bot_key}/sendMessage?chat_id=${this.chat_id}&text=${text}&parse_mode=HTML`
    );
  }
}

module.exports = Telegram;
