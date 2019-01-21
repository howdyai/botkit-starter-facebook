module.exports = (bot, message) => {
  bot.reply(message, {
    text: 'Please share your location for delivery',
    quick_replies: [
      {
        content_type: 'location',
      },
    ],
  });
};
