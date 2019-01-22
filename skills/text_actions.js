const shop = require('../common/shop');
const sendLocation = require('../common/send_location');

module.exports = (controller) => {
  controller.on('message_received', (bot, message) => {
    if (message.message.quick_reply) {
      if ((/^\+\d{7,12}/g).test(message.message.quick_reply.payload)) sendLocation(bot, message);
    }
    switch (message.message.text) {
      case 'Shop':
        shop(bot, message);
        break;
      default:
        break;
    }
  });
};
