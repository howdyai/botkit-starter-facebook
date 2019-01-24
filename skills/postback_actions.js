/* eslint-disable no-param-reassign */
const mainMenu = require('../common/main_menu');
const info = require('../common/info');
const getPhoneAndAdd = require('../common/get_phone_add');
const shopingList = require('../common/shoping_list');
const quickReply = require('../common/singe_quick_reply');
const User = require('../helpers/db/models/User');

module.exports = (controller) => {
  controller.on('facebook_postback', async (bot, message) => {
    let upc;
    let messagePayload = message.payload;
    const senderPsid = message.sender.id;
    const user = await User.findOne({ psid: senderPsid });
    if (messagePayload.match('getSingleInfo:\d{12}')) {
      [messagePayload, upc] = messagePayload.split(':');
    }

    switch (messagePayload) {
      case 'Get Started':
      case 'Main menu':
        mainMenu(bot, message);
        break;
      case 'getSingleInfo':
        info(bot, message, upc);
        break;
      case 'Get phone and add to list':
        getPhoneAndAdd(bot, message);
        break;
      case 'List of goods':
        shopingList(bot, message);
        if (user.shopingList.length) {
          setTimeout(() => {
            quickReply(bot, message, 'Buy all');
          }, 1000);
        } else {
          setTimeout(() => {
            quickReply(bot, message, 'Go to shop');
          }, 1000);
        }
        break;
      default:
        bot.reply(message, 'Unknown commnand');
        break;
    }
  });
};
