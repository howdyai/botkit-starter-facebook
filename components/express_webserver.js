/* eslint-disable func-names */
const express = require('express');
const bodyParser = require('body-parser');
const debug = require('debug')('botkit:webserver');

module.exports = function (controller) {
  const webserver = express();
  webserver.use(bodyParser.json());
  webserver.use(bodyParser.urlencoded({ extended: true }));

  // import express middlewares that are present in /components/express_middleware
  var normalizedPath = require('path').join(__dirname, 'express_middleware');
  require('fs').readdirSync(normalizedPath).forEach((file) => {
    require('./express_middleware/' + file)(webserver, controller);
  });

  webserver.use(express.static('public'));


  webserver.listen(process.env.PORT || 3000, null, () => {
    debug(`Express webserver configured and listening at http://localhost:${  process.env.PORT}` || 3000);
  });

  // import all the pre-defined routes that are present in /components/routes
  var normalizedPath = require('path').join(__dirname, 'routes');
  require('fs').readdirSync(normalizedPath).forEach((file) => {
    require('./routes/' + file)(webserver, controller);
  });

  controller.webserver = webserver;

  return webserver;
};
