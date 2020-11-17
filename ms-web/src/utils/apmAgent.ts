import { init as initApm } from '@elastic/apm-rum'

const apmAgent = initApm({
    serviceName: 'Web',
    // serverUrl: `http://192.168.49.2:31000`,
    serverUrl: `http://${process.env.VUE_APP_URL}/apmserver`,
    serviceVersion: '1.1.13',
    environment: 'development'
});

export default apmAgent;