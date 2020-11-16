import { createApp } from 'vue'
import App from './App.vue';
import router from './router';
import apm from './utils/apmAgent'

apm.setInitialPageLoadName("Dashboard")

createApp(App).use(router).mount('#app')
