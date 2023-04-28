// src/main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css';

// Check if there is a saved user in localStorage
const savedUser = localStorage.getItem("user");

if (savedUser) {
    // Parse the user JSON string and update the Vuex store
    const user = JSON.parse(savedUser);
    store.commit("setUser", user);
    store.commit("SET_LOGGED_IN", true);
}
// Vuetify
const vuetify = createVuetify({
    components,
    directives,
})

createApp(App).use(store).use(router).use(vuetify).mount('#app')

