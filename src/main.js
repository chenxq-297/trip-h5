import { createApp } from 'vue'
import router from './router'
import pinia from './stores'
import App from './App.vue'


import './assets/css/index.css'


createApp(App).use(pinia).use(router).mount('#app')
