const express = require('express');
const { Kafka } = require('kafkajs');

const app = express();
const port = 3001;

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

const consumer = kafka.consumer({ groupId: 'mygroup' })
 

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
        },
      })
}

app.listen(port, () => {
  console.log(`Consumer microservice listening at http://localhost:${port}`)
});

run().catch(console.error)