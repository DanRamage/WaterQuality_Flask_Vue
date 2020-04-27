import Vuex from 'vuex'
import Vue from 'vue'

import AdvisoryLimits from '../utilities/limits' // eslint-disable-line no-unused-vars
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        advisory_limits: new AdvisoryLimits(),
        sites: undefined,
        site_message: undefined
    },

    getters: {
        // Here we will create a getter
    },

    mutations: {
        updateAdvisoryLimits(state, limits) {
            state.advisory_limits.update(limits);
        },
        /*
        updateSites(state, sites) {

        }*/
    },

    actions: {
    }
});
