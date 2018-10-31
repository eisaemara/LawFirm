import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/style.css'
import { routes } from './routes';
import i18n from './i18n'
import store from './store/store.js'
import VueResource from 'vue-resource';



Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueResource);

Vue.directive('fullwidth', {
    bind(el) {
        el.style.width = '100%';
    }
});



const router = new VueRouter({
    routes
})

new Vue({
    render: h => h(App),
    i18n,
    store,
    router
}).$mount('#app')