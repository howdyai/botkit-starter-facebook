const { to } = require('await-to-js');
const store = require('../helpers/bestbuy/store.js');
const BotError = require('../helpers/errors/error');
const errors = require('../helpers/errors/error-messages');

module.exports = async (bot, message, name) => {
  const [err, items] = await to(store());
  if (err) throw new BotError(errors.getItemsError);

  const item = items.filter(el => el.name === name);

  if (!item) throw new BotError(errors.itemNotFound);

  const attachment = {
    type: 'template',
    payload: {
      template_type: 'generic',
      elements: [
        {
          title: item[0].name,
          image_url: item[0].image,
          subtitle: item[0].description,
          buttons: [
            {
              type: 'postback',
              title: 'Buy',
              payload: 'Get phone',
            },
            {
              type: 'postback',
              title: 'Main menu',
              payload: 'Main menu',
            },
          ],
        },
      ],
    },
  };

  bot.reply(message, {
    attachment,
  });
};
