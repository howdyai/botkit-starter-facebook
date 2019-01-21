/* eslint-disable linebreak-style */
module.exports = class BotError extends Error {
  constructor({ message, code, title }) {
    super(message);
    this.code = code;
    this.title = title;
  }
};
