import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    pmsEndpoint: 'http://localhost:6733/policy-mgmt/v1',
    adsEndpoint: 'http://localhost:6734/authz-check/v1',
    svcName: '',
    functionSelected: false,
  },
  mutations: {
    updatePmsEndpoint(state, endpoint) {
      state.pmsEndpoint = endpoint;
    },
    updateAdsEndpoint(state, endpoint) {
      state.adsEndpoint = endpoint;
    },
    updateSvcName(state, svcName) {
      console.log('updateSvcName');
      console.log(svcName);
      state.svcName = svcName;
      state.functionSelected = false;
    },
    selectFunctions(state) {
      state.functionSelected = true;
    },
  },
  actions: {
  },
  modules: {
  },
});
