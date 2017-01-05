var debug = require('debug')('botkit:onboarding');

module.exports = function(controller) {

    controller.on('facebook_optin', function(bot, message) {

        debug('Starting an onboarding experience!');

        if (controller.config.studio_token) {
            controller.studio.run(bot, 'onboarding', message.user, message.channel).catch(function(err) {
                debug('Error: encountered an error loading onboarding script from Botkit Studio:', err);
            });
        } else {
            bot.startConversation(message,function(err,convo) {
              if (err) {
                console.log(err);
              } else {
                  convo.say('Hello there! I am your new bot!')
              }
            });
        }
    });

}
