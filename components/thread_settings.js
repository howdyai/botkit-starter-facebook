var debug = require('debug')('botkit:thread_settings');



module.exports = function(controller) {

    debug('Configuring Facebook thread settings...');
    controller.api.messenger_profile.greeting('Look to Up and enjoy. More');
    controller.api.messenger_profile.get_started('show_main_menu');
    controller.api.messenger_profile.menu([
        {
            "locale": "default",
            "composer_input_disabled": false,
            "call_to_actions": [    
                {
                    "type":"postback",
                    "title":"Main menu",
                    "payload":"show_main_menu"
                },
                {
                    "type":"postback",
                    "title":"Catalog",
                    "payload":"shop_payload"
                },
                // {
                //   "type":"nested",
                //   "title":"Botkit Docs",
                //   "call_to_actions": [
                //       {
                //         type: "web_url",
                //         "title": "Facebook Docs",
                //         "url":"https://github.com/howdyai/botkit/blob/master/docs/readme-facebook.md",
                //         "webview_height_ratio":"full",
                //       },
                //       {
                //         type: "web_url",
                //         "title": "Main Readme",
                //         "url":"https://github.com/howdyai/botkit/blob/master/readme.md",
                //         "webview_height_ratio":"full",
                //       }                    

                //   ]
                // }
            ]
        }]);
}
