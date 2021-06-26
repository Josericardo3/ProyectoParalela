'use strict';

const express = require('express');
//const {OAuth2Client} = require('google-auth-library');
const path = require('path');
const process = require('process');
const bodyParser = require('body-parser');
//const {PubSub} = require('@google-cloud/pubsub');

//const authClient = new OAuth2Client();
//const pubsub = new PubSub();

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json({ limit: '50mb' }));

const messages = [];
const claims = [];
const tokens = [];
/*const {PUBSUB_VERIFICATION_TOKEN} = process.env;
const TOPIC = "newtopic"//process.env.PUBSUB_TOPIC;
const pubSubClient = new PubSub();

const topic = pubsub.topic(TOPIC);

const listenForMessages = () => {
  const subscription = pubSubClient.subscription("sucriptorextractor");

  // Create an event handler to handle messages
  let messageCount = 0;

  const messageHandler = message => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${message.attributes}`);
    const messagebuffer = Buffer.from(message.data, 'base64').toString(
      'utf-8'
    );
    messages.push(messagebuffer)
    // "Ack" (acknowledge receipt of) the message
    message.ack();
  };

  // Listen for new message until timeout is hit
  subscription.on('message', messageHandler);

  const timeout = 600

  setTimeout(() => {
    subscription.removeListener('message', messageHandler);
    console.log(`${messages.length} message(s) received.`);
  }, timeout * 1000);
}
*/

app.get('/', (req, res) => {
  res.render('index', {messages, tokens, claims});
});
app.get('/trabajador', (req, res) => {
  res.render('trabajador', {messages, tokens, claims});
});
app.get('/detalles', (req, res) => {
  res.render('detalles', {messages, tokens, claims});
});

/*
app.post('/envio', async (req, res, next) => {
  try {
    if (!req.body.msjstring) {
      res.status(400).send('Missing message');
      return;
    }

    const data = Buffer.from(req.body.msjstring);
    
    const messageId = await topic.publish(data);
    res.status(200).send(`Message ${messageId} sent.`);
  } catch (error) {
    next(error);
  }
});

app.post('/pubsub/push', (req, res) => {
  if (req.query.token !== PUBSUB_VERIFICATION_TOKEN) {
    res.status(400).send();
    return;
  }

  const message = Buffer.from(req.body.message.data, 'base64').toString(
    'utf-8'
  );

  messages.push(message);

  res.status(200).send();
});

app.post('/pubsub/authenticated-push', async (req, res) => {
  try {
    if (req.query.token !== PUBSUB_VERIFICATION_TOKEN) {
      res.status(400).send('Invalid request');
      return;
    }

    const bearer = req.header('Authorization');
    const [, token] = bearer.match(/Bearer (.*)/);
    tokens.push(token);

    const ticket = await authClient.verifyIdToken({
      idToken: 'h7rVohARqS1Qn6SykVTTbVLp',
      audience: '754073496994-488l1lak1803m5uf7749v4hacbk7rufe.apps.googleusercontent.com',
    });

    const claim = ticket.getPayload();

    claims.push(claim);

    const message = Buffer.from(req.body.message.data, 'base64').toString(
      'utf-8'
    );

    messages.push(message);

    res.status(200).send();
  } catch (e) {
    res.status(400).send('Invalid token');
    return;
  }
});
*/
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app;
