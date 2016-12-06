/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           ______     ______     ______   __  __     __     ______
          /\  == \   /\  __ \   /\__  _\ /\ \/ /    /\ \   /\__  _\
          \ \  __<   \ \ \/\ \  \/_/\ \/ \ \  _"-.  \ \ \  \/_/\ \/
           \ \_____\  \ \_____\    \ \_\  \ \_\ \_\  \ \_\    \ \_\
            \/_____/   \/_____/     \/_/   \/_/\/_/   \/_/     \/_/


This is a sample Facebook bot built with Botkit.

# RUN THE BOT:
  Follow the instructions here to set up your Facebook app and page:
    -> https://developers.facebook.com/docs/messenger-platform/implementation
  Run your bot from the command line:
    page_token=<MY PAGE TOKEN> verify_token=<MY_VERIFY_TOKEN> node bot.js



~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
var Botkit = require('botkit');

if (!process.env.page_token) {
    console.log('Error: Specify a Facebook page_token in environment.');
    usage_tip();
    process.exit(1);
}

if (!process.env.verify_token) {
    console.log('Error: Specify a Facebook verify_token in environment.');
    usage_tip();
    process.exit(1);
}

// if (!process.env.studio_token) {
//     console.log('Error: Specify a Botkit studio_token in environment.');
//     usage_tip();
//     process.exit(1);
// }

// Create the Botkit controller, which controls all instances of the bot.
var controller = Botkit.facebookbot({
    debug: false,
    retry: 10,
    verify_token: process.env.verify_token,
    access_token: process.env.page_token,
    studio_token: process.env.studio_token
});

// Dashbot is a turnkey analytics platform for bots.
// Sign up for a free key here: https://www.dashbot.io/ to see your bot analytics in real time.
if (process.env.DASHBOT_API_KEY) {
  var dashbot = require('dashbot')(process.env.DASHBOT_API_KEY).slack;
  controller.middleware.receive.use(dashbot.receive);
  controller.middleware.send.use(dashbot.send);
  controller.log.info('Thanks for using Dashbot. Visit https://www.dashbot.io/ to see your bot analytics in real time.');
} else {
  controller.log.info('No DASHBOT_API_KEY specified. For free turnkey analytics for your bot, go to https://www.dashbot.io/ to get your key.');
}

var bot = controller.spawn({
});

controller.setupWebserver(process.env.port || 3000, function(err, webserver) {
    controller.createWebhookEndpoints(webserver, bot, function() {
        console.log('ONLINE!');
    });
});


var normalizedPath = require("path").join(__dirname, "skills");
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  require("./skills/" + file)(controller);
});


// This captures and evaluates any message sent to the bot as a DM
// or sent to the bot in the form "@bot message" and passes it to
// Botkit Studio to evaluate for trigger words and patterns.
// If a trigger is matched, the conversation will automatically fire!
// You can tie into the execution of the script using the functions
// controller.studio.before, controller.studio.after and controller.studio.validate
if (process.env.studio_token) {
    controller.on('message_received', function(bot, message) {
        controller.studio.runTrigger(bot, message.text, message.user, message.channel).catch(function(err) {
            bot.reply(message, 'I experienced an error with a request to Botkit Studio: ' + err);
        });
    });
} else {
    console.log('~~~~~~~~~~');
    console.log('NOTE: Botkit Studio functionality has not been enabled');
    console.log('To enable, pass in a studio_token parameter with a token from https://studio.botkit.ai/');
}

function usage_tip() {
    console.log('~~~~~~~~~~');
    console.log('Botkit Studio Starter Kit');
    console.log('Execute your bot application like this:');
    console.log('page_token=<MY PAGE TOKEN> verify_token=<MY VERIFY TOKEN> studio_token=<MY BOTKIT STUDIO TOKEN> node bot.js');
    console.log('Get Facebook token here: https://developers.facebook.com/docs/messenger-platform/implementation')
    console.log('Get a Botkit Studio token here: https://studio.botkit.ai/')
    console.log('~~~~~~~~~~');
}
