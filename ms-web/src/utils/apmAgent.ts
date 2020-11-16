import { init as initApm } from '@elastic/apm-rum'

const apmAgent = initApm({
    serviceName: 'Web',
    serverUrl: `http://${process.env.VUE_APP_URL}/apmserver`,
    serviceVersion: '1.1.13',
    environment: 'development'
});

export default apmAgent;