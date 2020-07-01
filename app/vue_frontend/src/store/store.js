import Vuex from 'vuex'
import Vue from 'vue'

import AdvisoryLimits from '../utilities/limits' // eslint-disable-line no-unused-vars
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        advisory_limits: new AdvisoryLimits(),
        site_name: '',
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
        updateSiteName(state, site_name) {
            console.debug("Updating site_name from: " + state.site_name + " to: " + site_name);
            state.site_name = site_name;
        }
        /*
        updateSites(state, sites) {

        }*/
    },

    actions: {
    }
});
