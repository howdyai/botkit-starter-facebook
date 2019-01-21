/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
const env = require('node-env-file');

env(`${__dirname}/.env`);


if (!process.env.page_token) {
  console.log('Error: Specify a Facebook page_token in environment.');
  console.log('No page token');
  process.exit(1);
}

if (!process.env.verify_token) {
  console.log('Error: Specify a Facebook verify_token in environment.');
  console.log('No verify token');
  process.exit(1);
}

const Botkit = require('botkit');
const debug = require('debug')('botkit:main');

// Create the Botkit controller, which controls all instances of the bot.
const controller = Botkit.facebookbot({
  // debug: true,
  verify_token: process.env.verify_token,
  access_token: process.env.page_token,
  studio_token: process.env.studio_token,
  studio_command_uri: process.env.studio_command_uri,
});

// Set up an Express-powered webserver to expose oauth and webhook endpoints
const webserver = require(`${__dirname}/components/express_webserver.js`)(controller);

// Tell Facebook to start sending events to this application
require(`${__dirname}/components/subscribe_events.js`)(controller);

// Set up Facebook "thread settings" such as get started button, persistent menu
require(`${__dirname}/components/thread_settings.js`)(controller);


// Send an onboarding message when a user activates the bot
require(`${__dirname}/components/onboarding.js`)(controller);

// Load in some helpers that make running Botkit on Glitch.com better
require(`${__dirname}/components/plugin_glitch.js`)(controller);

const normalizedPath = require('path').join(__dirname, 'skills');
require('fs').readdirSync(normalizedPath).forEach((file) => {
  require(`./skills/${file}`)(controller);
});


// This captures and evaluates any message sent to the bot as a DM
// or sent to the bot in the form "@bot message" and passes it to
// Botkit Studio to evaluate for trigger words and patterns.
// If a trigger is matched, the conversation will automatically fire!
// You can tie into the execution of the script using the functions
// controller.studio.before, controller.studio.after and controller.studio.validate
if (process.env.studio_token) {
  controller.on('message_received,facebook_postback', (bot, message) => {
    if (message.text) {
      controller.studio.runTrigger(bot, message.text, message.user, message.channel, message)
        .then((convo) => {
          if (!convo) {
          // no trigger was matched
          // If you want your bot to respond to every message,
          // define a 'fallback' script in Botkit Studio
          // and uncomment the line below.
            controller.studio.run(bot, 'fallback', message.user, message.channel, message);
          } else {
          // set variables here that are needed for EVERY script
          // use controller.studio.before('script') to set variables specific to a script
            convo.setVar('current_time', new Date());
          }
        }).catch((err) => {
          if (err) {
            bot.reply(message, `I experienced an error with a request to Botkit Studio: ${err}`);
            debug('Botkit Studio: ', err);
          }
        });
    }
  });
} else {
  console.log('~~~~~~~~~~');
  console.log('NOTE: Botkit Studio functionality has not been enabled');
}
