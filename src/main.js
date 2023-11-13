import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
import './styles/index.css'
import 'virtual:uno.css'
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'

import permission from './directives/permission'

const app = createApp(App)

app.use(store)

app.use(router)

import './permission'

app.use(permission)

app.mount('#app')
