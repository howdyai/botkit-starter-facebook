/* eslint-disable func-names */
const axios = require('axios');
const { to } = require('await-to-js');
const User = require('../helpers/db/models/User');
const BotError = require('../helpers/errors/error');
const errors = require('../helpers/errors/error-messages');

const getData = async (url) => {
  const [err, response] = await to(axios.get(url));
  if (err) throw new BotError(errors.getUserData);
  const data = response.data;
  return `${data.first_name} ${data.last_name}`;
};

module.exports = function (controller) {
  controller.on('message_received', async (bot, message) => {
    const senderPsid = message.sender.id;

    let user = await User.find({ psid: senderPsid });

    if (!user.length) {
      const usersPublicProfile = `https://graph.facebook.com/v2.6/${senderPsid}?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=${process.env.page_token}`;
      const fullName = await getData(usersPublicProfile);

      user = new User({
        psid: senderPsid,
        name: fullName,
        phone: '',
        shopingList: [],
        myPurshases: [],
      });

      user.save((err) => {
        if (err) {
          if (err) throw new BotError(errors.saveDbError);
        }
      });
    }
  });
};
