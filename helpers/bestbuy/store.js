/* eslint-disable linebreak-style */
const env = require('node-env-file');

env(`${__dirname}../../../.env`);

const bby = require('bestbuy')(process.env.BESTBUY_TOKEN);
const { to } = require('await-to-js');

module.exports = async () => {
  const store = [];

  const [err, data] = await to(bby.recommendations('mostViewed'));
  if (err) console.error('Error in store');
  if (!data) console.log('Error in store');

  Object.keys(data.results).forEach((key) => {
    const product = data.results[key];
    const item = {
      name: product.names.title,
      image: product.images.standard,
      links: product.links,
      description: product.descriptions.short,
    };
    store.push(item);
  });

  return Promise.resolve(store);
};
