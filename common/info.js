/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
const { to } = require('await-to-js');
const store = require('../helpers/bestbuy/store.js');

module.exports = async (bot, message, name) => {
  const [err, items] = await to(store());
  if (err) console.log('Error in info');

  const item = items.filter((el) => {
    return el.name === name;
  });

  if (!item) console.log('Error in info, no item');

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
