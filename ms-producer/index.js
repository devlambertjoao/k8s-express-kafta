const apm = require('elastic-apm-node').start({
    serviceName: 'Producer',
    serverUrl: `http://${process.env.APM_SERVER || '192.168.49.2:31000'}`,
    logLevel: 'debug'
});

const express = require('express');
const { Kafka } = require('kafkajs');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
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
    const trans = apm.startTransaction(`${req.method}: ${req.url}`);
    const span = apm.startSpan(`${req.method}: ${req.url}`);
    try {
        if(req.body.msg == null)
            throw new Error('Message cannot be null');

        await sendToTopic(req.body.msg);
        trans.result = 'sucess';
        res.status(204).send();
    } catch (err) {
        apm.captureError(err);
        trans.result = 'error';
        res.status(500).send({ error: 'Error on create message to send: ' + err.message })
    } finally {
        trans.end();
        span.end();
    }
});

const sendToTopic = async (obj) => {
    try {
        await producer.send({
            topic: 'mytopic',
            messages: [
                { value : obj }
            ]
        });
    } catch (err) {
        console.error(err);
    }
}

app.listen(port, () => {
  console.log(`Producer microservice listening at ${port}`);
});

run().catch(console.error);
