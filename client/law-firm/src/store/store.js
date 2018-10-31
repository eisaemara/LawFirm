import Vue from 'vue'
import Vuex from 'vuex'
import Lookups from './modules/Lookups.js';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        Lookups
    }
});