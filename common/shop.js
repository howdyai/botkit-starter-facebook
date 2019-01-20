/* eslint-disable linebreak-style */
const { to } = require('await-to-js');
const store = require('../helpers/bestbuy/store.js');

module.exports = async (bot, message) => {
  const [err, items] = await to(store());

  console.error(err);
  if (err) console.log('Error in shop');
  if (!items) console.log('Error in shop, No items');

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i <= 5; i++) {
    const attachment = {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: [
          {
            title: items[i].name,
            image_url: items[i].image,
            buttons: [
              {
                type: 'postback',
                title: 'Info',
                payload: `getSingleInfo:${items[i].name}`,
              },
            ],
          },
        ],
      },
    };

    bot.reply(message, {
      attachment,
    });
  }
};
