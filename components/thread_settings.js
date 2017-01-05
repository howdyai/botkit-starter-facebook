var debug = require('debug')('botkit:thread_settings');



module.exports = function(controller) {

    debug('Configuring Facebook thread settings...');
    controller.api.thread_settings.greeting('Hello! I\'m a Botkit bot!');
    controller.api.thread_settings.get_started('sample_get_started_payload');
    controller.api.thread_settings.menu([
        {
            "type":"postback",
            "title":"Hello",
            "payload":"hello"
        },
        {
            "type":"postback",
            "title":"Help",
            "payload":"help"
        },
        {
          "type":"web_url",
          "title":"Botkit Docs",
          "url":"https://github.com/howdyai/botkit/blob/master/readme-facebook.md"
        },
    ]);

}
