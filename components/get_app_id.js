var request = require('request');
var debug = require('debug')('botkit:get_app_id');

module.exports = function(controller) {

    debug('Getting Facebook App ID...');
    request.get('https://graph.facebook.com/app/?access_token=' + controller.config.access_token,
        function(err, res, body) {
            if (err) {
                debug('Could not get Facebook App ID! Check your page token.');
                throw new Error(err);
            } else {
              var json = null;
              try {
                  json = JSON.parse(body);
              } catch(err) {
                  debug('Error parsing JSON response from Facebook');
                  throw new Error(err);                
              }
              if (json.error) {
                throw new Error(json.error.message);
              } else {
                controller.config.app = json; 


                debug('Getting Facebook Page ID...');
                request.get('https://graph.facebook.com/me?access_token=' + controller.config.access_token,
                    function(err, res, body) {
                        if (err) {
                            debug('Could not get Facebook Page ID! Check your page token.');
                            throw new Error(err);
                        } else {
                          var json = null;
                          try {
                              json = JSON.parse(body);
                          } catch(err) {
                              debug('Error parsing JSON response from Facebook');
                              throw new Error(err);                
                          }
                          if (json.error) {
                            throw new Error(json.error.message);
                          } else {
                            controller.config.page = json; 
                          }
                        }
                    });
              
              
              }
            }
        });
};
