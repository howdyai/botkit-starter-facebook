/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
/* eslint-disable linebreak-style */
const User = require('../helpers/db/models/User');
const BotError = require('../helpers/errors/error');
const errors = require('../helpers/errors/error-messages');


module.exports = async (bot, message) => {
  let content_type;
  let text;
  const senderPsid = message.sender.id;
  const user = await User.findOne({ psid: senderPsid }, (error, usr) => {
    if (error) throw new BotError(errors.findUserError);

    const item = usr.currentItem;
    if (item) {
      usr.shopingList.push(item);
      usr.currentItem = '';
      usr.save((err) => {
        if (err) {
          if (err) throw new BotError(errors.saveDbError);
        }
      });
    }
  });

  if (user.phone) {
    content_type = 'location';
    text = 'Please share your location for delivery';
  } else {
    content_type = 'user_phone_number';
    text = 'Please share your phone';
  }

  bot.reply(message, {
    text,
    quick_replies: [
      {
        content_type,
      },
    ],
  });
};
