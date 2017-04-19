# Botkit Starter Kit for Facebook

This repo contains everything you need to get started building a bot with Botkit and Botkit Studio!

[Botkit Studio](https://studio.botkit.ai/signup?code=facebookstarter) is a set tools that adds capabilities
to the open source Botkit library by offering hosted GUI interfaces for script
management and action trigger definition. Botkit Studio is built by the company
that created and maintains the open source Botkit library, [Howdy.](https://howdy.ai)

While Botkit Studio is *not required* to build a bot using Botkit, we highly recommend it as your bot will be easier to manage, customize and extend.

### Instant Start

[Remix this project on Glitch](https://glitch.com/edit/#!/import/github/howdyai/botkit-starter-facebook)

[Deploy to Heroku](https://heroku.com/deploy?template=https://github.com/howdyai/botkit-starter-facebook/master)


### Get Started

Clone this repository:

`git clone https://github.com/howdyai/botkit-starter-facebook.git`

Install dependencies, including [Botkit](https://github.com/howdyai/botkit):

```
cd botkit-starter-facebook
npm install
```

Get a Facebook `access_token` and `verify_token` [as described here](https://github.com/howdyai/botkit/blob/master/docs/readme-facebook.md#getting-started)

Get a Botkit Studio API `studio_token` [from your Botkit developer account](https://studio.botkit.ai/)

Update the `.env` file with your newly acquired tokens.

Launch your bot application by typing:

`node .`

Facebook requires your application be available at an SSL-enabled endpoint. To expose an endpoint during development, we recommend using [localtunnel.me](http://localtunnel.me) or [ngrok](http://ngrok.io), either of which can be used to temporarily expose your bot to Facebook. Once stable and published to the real internet, use nginx or another web server to provide an SSL-powered front end to your bot application.

Continue your journey to becoming a champion botmaster by [reading the Botkit Studio SDK documentation here.](https://github.com/howdyai/botkit/blob/master/docs/readme-studio.md)

### Extend This Bot

This repo is designed to provide developers a robust starting point for building a custom bot. Included in the code are a set of sample bot "skills" that illustrate various aspects of the Botkit SDK features.  Once you are familiar with how Botkit works, you may safely delete all of the files in the `skills/` subfolder.

Developers will build custom features as modules that live in the `skills/` folder. The main bot application will automatically include any files placed there.

A skill module should be in the format:

```
module.exports = function(controller) {

    // add event handlers to controller
    // such as hears handlers that match triggers defined in code
    // or controller.studio.before, validate, and after which tie into triggers
    // defined in the Botkit Studio UI.

}
```
