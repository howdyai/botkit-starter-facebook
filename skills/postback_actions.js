/* eslint-disable linebreak-style */
const mainMenu = require('../common/main_menu');
const info = require('../common/info');
const getPhone = require('../common/get_phone');

module.exports = (controller) => {
  controller.on('facebook_postback', (bot, message) => {
    let name;
    if (message.payload.match('getSingleInfo:')) {
      [message.payload, name] = message.payload.split(':');
    };
    console.log(message.payload);
    switch (message.payload) {
      case 'Get Started':
        mainMenu(bot, message);
        break;
      case 'Main menu':
        mainMenu(bot, message);
        break;
      case 'getSingleInfo':
        info(bot, message, name);
        break;
      case 'Get phone':
        getPhone(bot, message);
        break;
      default:
        bot.reply(message, 'Unknown commnand');
        break;
    }
  });
};
