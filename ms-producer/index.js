const express = require('express');
const { Kafka } = require('kafkajs');
const cors = require('cors');
const apm = require('elastic-apm-node');

apm.start({
    serviceName: 'Producer',
    serverUrl: `http://${process.env.APM_SERVER}`
});

const app = express();
const port = process.env.PORT;
app.use(cors());

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
        console.error(err.message)
    });
}


app.use(express.json());
app.post('/api/producer', async (req, res) => {
    console.log(`${req.method}: ${req.url}`);
    apm.setTransactionName(`${req.method}: ${req.url}`);
    try {
        if(req.body.msg == null)
            throw new Error('Message cannot be null');

        await sendToTopic(req.body.msg);
        res.status(204).send();    
        
    } catch (err) {
        apm.captureError(err);
        res.status(500).send({ error: 'Error on create message to send: ' + err.message })
    }
});

const sendToTopic = async (obj) => {
    try {
        apm.setTransactionName('Trying to send a message to topic');
        await producer.send({
            topic: 'mytopic',
            messages: [
                { value : obj }
            ]
        });
        apm.setTransactionName('sucessfully send to topic');

        console.log('sucessfully send to topic')
    } catch (err) {
        apm.captureError(err);
        console.error('Error on send to topic: ', err.message)
    }
}

app.listen(port, () => {
  console.log(`Producer microservice listening at http://localhost:${port}`)
});

run().catch(console.error)