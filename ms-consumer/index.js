const express = require('express');
const cors = require('cors');
const { Kafka } = require('kafkajs');
const websocket = require('ws');
const http = require('http');

var apm = require('elastic-apm-node').start({
  serviceName: 'ms-consumer',
  serverUrl: process.env.AMP_SERVER
});

const app = express();
app.use(cors());
const port = process.env.PORT;


//WebSocket
const server = http.createServer(app);
const wss = new websocket.Server({ server: server, path: '/api/consumer' });
let wsService;

const kafka = new Kafka({
    clientId: 'ms-consumer',
    brokers: [ process.env.KAFKA_BROKER ],
    requestTimeout: 30000,
    retry: {
        initialRetryTime: 5000,
        maxRetryTime: 10000,
        retries: 20,
    },
    connectionTimeout: 2000,
    authenticationTimeout: 2000,
});

//Consumidor WebSocket
wss.on('connection', ws => {
  console.log('nova conexao de websocket ', ws)
  wsService = ws;
});

//Cosumidor kafka
const consumer = kafka.consumer({ groupId: 'mygroup', allowAutoTopicCreation: true })

const run = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic: 'mytopic', fromBeginning: true })

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          partition,
          offset: message.offset,
          value: message.value.toString(),
        })

        if(wsService != null) {
          wsService.send(message.value.toString());
        }
      },
    })
}

server.listen(port, () => {
  console.log(`Server started on port ${server.address().port}`);
});

run().catch(console.error)