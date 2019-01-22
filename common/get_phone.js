/* eslint-disable camelcase */
/* eslint-disable linebreak-style */
const User = require('../helpers/db/models/User');


module.exports = async (bot, message) => {
  let content_type;
  const senderPsid = message.sender.id;
  const user = await User.find({ psid: senderPsid });

  if (user[0].phone) {
    content_type = 'location';
  } else {
    content_type = 'user_phone_number';
  }

  bot.reply(message, {
    text: 'Please share your phone',
    quick_replies: [
      {
        content_type,
      },
    ],
  });
};
