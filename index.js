const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('whatsapp-web.js');

const app = express();
app.use(bodyParser.json());

// WhatsApp bot settings
const whatsappBotSettings = {
  session: 'whatsapp-bot-session',
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  },
};

// Create a new WhatsApp client
const client = new Client(whatsappBotSettings);

// WhatsApp bot event listeners
client.on('ready', () => {
  console.log('WhatsApp bot is ready!');
});

client.on('message', (message) => {
  console.log(`Received message: ${message.body}`);
  // Send a response back to the user
  client.sendMessage(message.from, 'Hello from WhatsApp bot!');
});

client.on('error', (error) => {
  console.error('WhatsApp bot error:', error);
});

// Express.js server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// WhatsApp webhook endpoint
app.post('/whatsapp-webhook', (req, res) => {
  const message = req.body.message;
  client.sendMessage(message.from, message.body);
  res.sendStatus(200);
});
