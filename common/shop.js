const { to } = require('await-to-js');
const store = require('../helpers/bestbuy/store.js');
const BotError = require('../helpers/errors/error');
const errors = require('../helpers/errors/error-messages');

module.exports = async (bot, message) => {
  const [err, items] = await to(store());

  if (err) throw new BotError(errors.getItemsError);
  if (!items) throw new BotError(errors.noAviableProducts);

  const elements = [];
  for (let i = 0; i <= 5; i++) {
    const element = {
      title: items[i].name,
      image_url: items[i].image,
      buttons: [
        {
          type: 'postback',
          title: 'Info',
          payload: `getSingleInfo:${items[i].name}`,
        },
      ],
    };

    elements.push(element);
  }
  const attachment = {
    type: 'template',
    payload: {
      template_type: 'generic',
      elements,
    },
  };

  bot.reply(message, {
    attachment,
  });
};
