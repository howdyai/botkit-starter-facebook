const debug = require('debug')('botkit:thread_settings');


module.exports = (controller) => {
  debug('Configuring Facebook thread settings...');
  controller.api.thread_settings.greeting('Greeting Text');
  controller.api.thread_settings.get_started('Get Started');
  controller.api.thread_settings.menu([
    {
      locale: 'default',
      composer_input_disabled: false,
      call_to_actions: [
        {
          type: 'postback',
          title: 'Main menu',
          payload: 'Main menu',
        },
        {
          type: 'postback',
          title: 'List of goods',
          payload: 'List of goods',
        },
      ],
    }]);
};
