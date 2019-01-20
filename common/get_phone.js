/* eslint-disable linebreak-style */
module.exports = (bot, message) => {
  bot.reply(message, {
    text: 'Please share your phone',
    quick_replies: [
      {
        content_type: 'user_phone_number',
      },
    ],
  });
};
