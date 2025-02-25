// import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import { createWebHistory, createRouter } from 'vue-router'
import PokemonDetail from './components/PokemonDetail.vue'
import HomeView from './views/HomeView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/:name', component: PokemonDetail },
];
const router = createRouter(
    {
        history: createWebHistory(),
        routes
    }

)
createApp(App)
.use(router)    
.mount('#app') // config 1 app va mount thoi html div co id la app

