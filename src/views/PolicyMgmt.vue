<template>
  <b-card no-body class="rounded-0">
    <b-card-header header-bg-variant="info" header-text-variant="white" class="rounded-0" >
      <b-row>
        <b-col cols="4">
          <b-dropdown ref="settings" variant="info" no-caret>
            <template v-slot:button-content>
              <b-icon icon="gear" aria-hidden="true"></b-icon> Settings
            </template>
            <b-dropdown-form style="width:400px">
              <b-form-group label-for="ddf-pms">
               <template v-slot:label>
                 <span>PMS Endpoint</span>
                 <span style="font-size:0.8rem">({{pmsEndpointCur}})</span>
               </template>
                <b-form-input
                  id="ddf-pms"
                  v-model="pmsEndpoint"
                ></b-form-input>
              </b-form-group>

              <b-form-group label-for="ddf-ads">
                <template v-slot:label>
                 <span>ADS Endpoint</span>
                 <span style="font-size:0.8rem">({{adsEndpointCur}})</span>
               </template>
                <b-form-input
                  id="ddf-ads"
                  v-model="adsEndpoint"
                ></b-form-input>
              </b-form-group>
              <b-button variant="primary" size="sm" @click="updateSettings">OK</b-button>
            </b-dropdown-form>
          </b-dropdown>
        </b-col>
        <b-col cols="6" class="align-center">
          <h3>Policy Management Console</h3>
        </b-col>
        <b-col cols="2">
          <b-dropdown text="About" variant="info" no-caret>
            <b-dropdown-item href="https://github.com/teramoby/speedle-plus">
              source code</b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item href="https://speedle.io/">docs</b-dropdown-item>
          </b-dropdown>
        </b-col>
      </b-row>
    </b-card-header>
    <b-row no-gutters>
      <b-col class="m-0 p-0 overflow-auto" cols="4">
        <PolicyStore/>
      </b-col>
      <b-col v-if="selectedSvc.length > 0" class="m-0 p-0 overflow-auto" cols="8" >
        <Service/>
      </b-col>
      <b-col v-else-if="functionsSelected > 0" class="m-0 p-0 overflow-auto" cols="8" >
        <Functions/>
      </b-col>
      <b-col v-else class="m-0 p-0 overflow-auto" cols="8" >
        <Welcome/>
      </b-col>
    </b-row>
  </b-card>
</template>

<script >
// @ is an alias to /src
import PolicyStore from '@/components/PolicyStore.vue';
import Service from '@/components/Service.vue';
import Functions from '@/components/Functions.vue';
import Welcome from '@/components/WelPage.vue';

export default {
  name: 'PolicyMgmt',
  components: {
    PolicyStore,
    Service,
    Functions,
    Welcome,
  },
  data() {
    return {
      pmsEndpoint: '',
      adsEndpoint: '',
    };
  },
  computed: {
    pmsEndpointCur() {
      return this.$store.state.pmsEndpoint;
    },
    adsEndpointCur() {
      return this.$store.state.adsEndpoint;
    },
    selectedSvc() {
      return this.$store.state.svcName;
    },
    functionsSelected() {
      return this.$store.state.functionsSelected;
    },
  },
  methods: {
    updateSettings() {
      if (this.pmsEndpoint !== '') {
        this.$store.commit('updatePmsEndpoint', this.pmsEndpoint);
      }
      if (this.adsEndpoint !== '') {
        this.$store.commit('updateAdsEndpoint', this.adsEndpoint);
      }
      this.pmsEndpoint = '';
      this.adsEndpoint = '';
      this.$refs.settings.hide(true);
    },
  },
};
</script>

<style>
#left-card {
  max-width: 30%;
};
#right-card {
  max-width: 70%;
}
</style>
