module.exports = (bot, message) => {
  bot.reply(message, {
    text: 'Here is main menu',
    quick_replies: [
      {
        content_type: 'text',
        title: 'My purchases',
        payload: '<POSTBACK_PAYLOAD>',
      },
      {
        content_type: 'text',
        title: 'Shop',
        payload: 'Shop',
      },
      {
        content_type: 'text',
        title: 'Favourites',
        payload: '<POSTBACK_PAYLOAD>',
      },
      {
        content_type: 'text',
        title: 'To invite a friend',
        payload: '<POSTBACK_PAYLOAD>',
      },
    ],
  });
};
