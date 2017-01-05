module.exports = function(controller) {

    // look for sticker, image and audio attachments
    // capture them, and fire special events
    controller.on('message_received', function(bot, message) {

        if (!message.text) {
            if (message.sticker_id) {
                controller.trigger('sticker_received', [bot, message]);
                return false;
            } else if (message.attachments && message.attachments[0]) {
                controller.trigger(message.attachments[0].type + '_received', [bot, message]);
                return false;
            }
        }

    });

    controller.on('sticker_received', function(bot, message) {
        bot.reply(message, 'Cool sticker.');
    });

    controller.on('image_received', function(bot, message) {
        bot.reply(message, 'Nice picture.');
    });

    controller.on('audio_received', function(bot, message) {
        bot.reply(message, 'I heard that!!');
    });
};
