import { createApp } from 'vue'; // Import createApp from Vue 3
import App from './App.vue'; // Adjust the path if needed
import router from './router'; // Ensure this path is correct


// Create the Vue application instance
const app = createApp(App);

// Use the router
app.use(router);

// Mount the app to the DOM
app.mount('#app');
