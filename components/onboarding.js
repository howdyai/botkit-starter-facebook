var debug = require('debug')('botkit:onboarding');

module.exports = function(controller) {

    controller.on('facebook_optin', function(bot, message) {

        debug('Starting an onboarding experience!');

        bot.startConversation(message,function(err,convo) {
            if (err) {
            console.log(err);
            } else {
                convo.say('Hello there! I am your new bot!')
            }
        });
        
    });

}
