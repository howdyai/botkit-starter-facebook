module.exports = (bot, message, text) => {
  bot.reply(message, {
    text,
    quick_replies: [
      {
        content_type: 'text',
        title: text,
        payload: text,
      },
    ],
  });
};
