const env = require('node-env-file');
const BotError = require('../errors/error');
const errors = require('../errors/error-messages');

env(`${__dirname}../../../.env`);

const bby = require('bestbuy')(process.env.BESTBUY_TOKEN);
const { to } = require('await-to-js');

module.exports = async () => {
  const store = [];

  const [err, data] = await to(bby.products(
    'categoryPath.id=abcat0100000',
    { show: 'name,longDescription,image' },
  ));
  if (err) throw new BotError(errors.bestBuyError);
  if (!data) throw new BotError(errors.noAviableProducts);

  Object.keys(data.products).forEach((key) => {
    const product = data.products[key];
    const item = {
      name: product.name,
      image: product.image,
      description: product.longDescription,
    };
    store.push(item);
  });

  return Promise.resolve(store);
};
