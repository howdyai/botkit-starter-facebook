/* eslint-disable func-names */
module.exports = function (controller) {
  // look for sticker, image and audio attachments
  // capture them, and fire special events
  controller.on('message_received', (bot, message) => {

    if (!message.text) {
      if (message.sticker_id) {
        controller.trigger('sticker_received', [bot, message]);
        return false;
      } if (message.attachments && message.attachments[0]) {
        controller.trigger(`${message.attachments[0].type}_received`, [bot, message]);
        return false;
      }
    }
  });

  controller.on('sticker_received', (bot, message) => {
    bot.reply(message, 'Cool sticker.');
  });

  controller.on('image_received', (bot, message) => {
    bot.reply(message, 'Nice picture.');
  });

  controller.on('audio_received', (bot, message) => {
    bot.reply(message, 'I heard that!!');
  });
};
