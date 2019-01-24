const { to } = require('await-to-js');
const store = require('../helpers/bestbuy/store.js');
const BotError = require('../helpers/errors/error');
const errors = require('../helpers/errors/error-messages');
const User = require('../helpers/db/models/User');
const Goods = require('../helpers/db/models/Good');

module.exports = async (bot, message, upc) => {
  const senderPsid = message.sender.id;

  const [dberr, good] = await to(Goods.findOne({ upc }));
  if (dberr) throw new BotError(errors.findGoodsError);

  const currentItem = {
    name: good[0].name,
    img: good[0].image,
    description: good[0].description,
  };

  const [_, error] = await User.findOneAndUpdate({ psid: senderPsid }, { currentItem });
  if (error) throw new BotError(errors.findUserError);

  const attachment = {
    type: 'template',
    payload: {
      template_type: 'generic',
      elements: [
        {
          title: good[0].name,
          image_url: good[0].image,
          subtitle: good[0].description,
          buttons: [
            {
              type: 'postback',
              title: 'Buy',
              payload: 'Get phone and add to list',
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
