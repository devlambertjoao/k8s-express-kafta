import { createApp } from 'vue'
import App from './App.vue';
import router from './router';
import apmAgent from './utils/apmAgent';

apmAgent.setInitialPageLoadName('Home');

createApp(App).use(router).mount('#app')
