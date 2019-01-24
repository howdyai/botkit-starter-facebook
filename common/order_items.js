module.exports = (event) => {
  if (event.message) {
    const message = event.message;
    const messageAttachments = message.attachments;

    if (messageAttachments) {
      let lat = null;
      let long = null;
      if (messageAttachments[0].payload.coordinates) {
        lat = messageAttachments[0].payload.coordinates.lat;
        long = messageAttachments[0].payload.coordinates.long;
      }

      const msg = `lat : ${lat} ,long : ${long}\n`;

      // console.log(msg);
    }
  } else {
    console.log('Webhook received unknown event: ');
  }
};
