import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { createBootstrap } from 'bootstrap-vue-next'
import ToastPlugin from 'vue-toast-notification'
import vue3GoogleLogin from 'vue3-google-login'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'vue-toast-notification/dist/theme-sugar.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(createBootstrap())
app.use(ToastPlugin, { position: 'top-right' })

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
if (googleClientId) {
  app.use(vue3GoogleLogin, { clientId: googleClientId })
}

app.mount('#app')
