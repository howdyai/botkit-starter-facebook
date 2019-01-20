/* eslint-disable linebreak-style */
const shop = require('../common/shop');
const getLocation = require('../common/get_location')

module.exports = (controller) => {
  controller.on('message_received', (bot, message) => {
    console.log(message.raw_message.message.quick_reply);
    if ((/^\+\d{7,12}/g).test(message.message.quick_reply.payload)) getLocation(bot, message); 
    switch (message.message.text) {
      case 'Shop':
        shop(bot, message);
        break;
      default:
        break;
    }
  });
};
