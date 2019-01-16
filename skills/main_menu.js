/* eslint-disable linebreak-style */
module.exports = (controller) => {
  controller.on('facebook_postback', (bot, message) => {
    console.log(message);
    if (message.payload === 'Get Started' || message.payload === 'Main menu') {
      bot.reply(message, {
        text: 'Hey, here is main menu',
        quick_replies: [
          {
            content_type: 'text',
            title: 'My purchases',
            payload: '<POSTBACK_PAYLOAD>',
          },
          {
            content_type: 'text',
            title: 'Shop',
            payload: '<POSTBACK_PAYLOAD>',
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
    }
  });
};
