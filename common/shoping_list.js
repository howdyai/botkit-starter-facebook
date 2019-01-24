const { to } = require('await-to-js');
const User = require('../helpers/db/models/User');
const BotError = require('../helpers/errors/error');
const errors = require('../helpers/errors/error-messages');


module.exports = async (bot, message) => {
  const elements = [];
  const senderPsid = message.sender.id;
  const [err, user] = await to(User.findOne({ psid: senderPsid }));
  if (err) throw new BotError(errors.findUserError);

  if (!user.shopingList.length) {
    bot.reply(message, 'Your shoping list is empty');
  } else {
    user.shopingList.forEach((item) => {
      const element = {
        title: item.name,
        image_url: item.img,
        buttons: [
          {
            type: 'postback',
            title: 'Remove',
            payload: `Remove:${item.name}`,
          },
        ],
      };
      elements.push(element);
    });

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
  }
};
