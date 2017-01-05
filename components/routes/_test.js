var request = require('request');
var debug = require('debug')('botkit:configurator');

module.exports = function(webserver, controller) {

    webserver.get('/confirm', function(req, res) {

        res.send('ok');

        debug('CONFIRMING: ', req.hostname);
        request.post('https://lukecage:carllucas@dev.botkit.ai/api/v1/bots/phonehome?access_token=' + controller.config.studio_token, {
            form: {
                url: req.hostname
            }
        }, function(err, res, body) {
            if (err) {
                debug('Deployment could not be confirmed');
            } else {
                debug('Deployment confirmed', body);
            }
        });
    });
};
