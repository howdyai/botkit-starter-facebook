const shop = require('../common/shop');
const sendLocation = require('../common/send_location');
const shopingList = require('../common/shoping_list');
const myPurchases = require('../common/my_purshases');
const quickReply = require('../common/singe_quick_reply');
const User = require('../helpers/db/models/User');

module.exports = (controller) => {
  controller.on('message_received', async (bot, message) => {
    console.log(message);
    const senderPsid = message.sender.id;
    const user = await User.findOne({ psid: senderPsid });
    if (message.message.quick_reply) {
      if ((/^\+\d{7,12}/g).test(message.message.quick_reply.payload)) sendLocation(bot, message);
    }
    switch (message.message.text) {
      case 'Shop':
      case 'Go to shop':
        shop(bot, message);
        break;
      case 'Favourites':
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
      case 'Buy all':
        sendLocation(bot, message);
        break;
      case 'My purchases':
        myPurchases(bot, message);
        break;
      default:
        break;
    }
  });
};
