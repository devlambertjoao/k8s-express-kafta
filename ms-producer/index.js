const express = require('express');
const { Kafka } = require('kafkajs');

const app = express();
const port = process.env.PORT;

const kafka = new Kafka({
    clientId: 'ms-producer',
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

const producer = kafka.producer();

const run = async () => {
    await producer.connect().then(() => {
        console.log('conectado ao kafka')
    }).catch(err => {
        console.err(err.message)
    });
}


app.use(express.json());
app.post('/', async (req, res) => {
    try {
        if(req.body.message == null)
            throw new Error('Field message is required');

    sendToTopic(req.body.message)

        res.send();
        
    } catch (err) {
        res.status(500).send({ error: 'Error on create message to send: ' + err.message })
    }
});

const sendToTopic = async (obj) => {
    try { 
        console.log('Trying to send a message to topic')
        await producer.send({
            topic: 'mytopic',
            messages: [
                { value : obj }
            ]
        });
        console.log('sucessfully send to topic')
    } catch (err) {
        console.error('Error on send to topic: ', err.message)
    }
}

app.listen(port, () => {
  console.log(`Producer microservice listening at http://localhost:${port}`)
});

run().catch(console.error)