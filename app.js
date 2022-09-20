const { App } = require('@slack/bolt');
require('dotenv').config();

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

// This command sends a message that is built with Blocks and Secondary Attachments.
app.command('/blockattachmentmessage', async ({ command, ack, client, message }) => {
    // Acknowledge command request
    await ack();
  
    const result = await client.chat.postMessage({
        "channel": message.channel,
        "blocks": [
          {
            "type": "section",
            "text": {
              "type": "mrkdwn",
              "text": "Danny Torrence left the following review for your property:"
            }
          },
          {
            "type": "section",
            "block_id": "section567",
            "text": {
              "type": "mrkdwn",
              "text": "<https://example.com|Overlook Hotel> \n :star: \n Doors had too many axe holes, guest in room 237 was far too rowdy, whole place felt stuck in the 1920s."
            },
            "accessory": {
              "type": "image",
              "image_url": "https://is5-ssl.mzstatic.com/image/thumb/Purple3/v4/d3/72/5c/d3725c8f-c642-5d69-1904-aa36e4297885/source/256x256bb.jpg",
              "alt_text": "Haunted hotel image"
            }
          },
          {
            "type": "section",
            "block_id": "section789",
            "fields": [
              {
                "type": "mrkdwn",
                "text": "*Average Rating*\n1.0"
              }
            ]
          }
        ],
          "attachments": [
              {
                  "blocks": [
                      {
                          "type": "section",
                          "text": {
                              "type": "mrkdwn",
                              "text": "*Alternative hotel options*"
                          }
                      },
                      {
                          "type": "section",
                          "text": {
                              "type": "mrkdwn",
                              "text": "<https://example.com|Bates Motel> :star::star:"
                          },
                          "accessory": {
                              "type": "button",
                              "text": {
                                  "type": "plain_text",
                                  "text": "View",
                                  "emoji": true
                              },
                              "value": "view_alternate_1"
                          }
                      },
                      {
                          "type": "section",
                          "text": {
                              "type": "mrkdwn",
                              "text": "<https://example.com|The Great Northern Hotel> :star::star::star::star:"
                          },
                          "accessory": {
                              "type": "button",
                              "text": {
                                  "type": "plain_text",
                                  "text": "View",
                                  "emoji": true
                              },
                              "value": "view_alternate_2"
                          }
                      }
                  ]
              }
          ]
      });
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();