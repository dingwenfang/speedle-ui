<template>
<b-card bg-variant="light"
 no-body class="border-0 rounded-0  vh-100 overflow-auto">
  <b-card-header header-bg-variant="info"
     header-text-variant="white" class="border-right rounded-0">
    <!--<b-row class="m-0 p-0">
      <b-col cols="auto" class="mr-auto">-->
        Policy Store
      <!--</b-col>
      <b-col cols="auto">
        <b-button @click="refreshServices" variant="outline-light" size="sm">
            <b-icon icon="arrow-repeat" aria-hidden="true" size="sm"></b-icon>
        </b-button>
      </b-col>
    </b-row>-->
  </b-card-header>
  <b-card-body class="border-right">
    <b-row class="mt-3 mb-2 ">
      <b-col cols="5">
        <b-button block v-b-toggle.service-list
        @click="serviceListVisible=!serviceListVisible" variant="info">
          Services
          <b-icon v-bind:icon="servicesIcon"
          aria-hidden="true" size="sm"></b-icon>
        </b-button>
      </b-col>
      <!--<b-col cols="auto" class="ml-auto">
        <b-button v-b-modal.createSvc pill variant="outline-info">
          <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
        </b-button>
        <b-modal id="createSvc" title="Create Service"
               ref="createSvcModal"
               @show="resetNewSvc"
               @hidden="resetNewSvc"
               @ok="handleOk">
          <form ref="createSvcform" @submit.stop.prevent="handleSubmit">
            <b-form-group label="Name:" label-align="right" label-cols="4" label-for="input-name">
              <b-form-input id="input-name" v-model="newSvc.name"
               :state="newSvcNameState" required></b-form-input>
            </b-form-group>
            <b-form-group label="Type:" label-align="right" label-cols="4" label-for="input-type">
              <b-form-input id="input-type" v-model="newSvc.type"></b-form-input>
            </b-form-group>
          </form>
        </b-modal>
      </b-col>-->
      <b-col cols="auto" class="ml-auto">
        <b-form-input  type="text" style="width: 3rem;" class="p-0 m-0" size="sm"
        v-model="serviceSearch" placeholder="*"/>
      </b-col>
    </b-row>
    <b-row  class="mb-2" align-h="end">
      <b-col cols="auto">
        <b-button v-b-modal.createSvc pill variant="outline-info" size="sm">
          <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
        </b-button>
        <b-modal id="createSvc" title="Create Service"
               ref="createSvcModal"
               @show="resetNewSvc"
               @hidden="resetNewSvc"
               @ok="handleOk">
          <form ref="createSvcform" @submit.stop.prevent="handleSubmit">
            <b-form-group label="Name:" label-align="right" label-cols="4" label-for="input-name">
              <b-form-input id="input-name" v-model="newSvc.name"
               :state="newSvcNameState" required></b-form-input>
            </b-form-group>
            <b-form-group label="Type:" label-align="right" label-cols="4" label-for="input-type">
              <b-form-input id="input-type" v-model="newSvc.type"></b-form-input>
            </b-form-group>
          </form>
        </b-modal>
      </b-col>
      <b-col cols="auto">
        <b-button @click="refreshServices" pill variant="outline-info" size="sm">
            <b-icon icon="arrow-repeat" aria-hidden="true" size="sm"></b-icon>
        </b-button>
      </b-col>

    </b-row>
    <b-collapse id="service-list" v-model="serviceListVisible">
      <b-list-group flush>
        <b-list-group-item button
          v-for="s in filteredServices" :key="s.name" @click="setSvcName(s.name)">
          <b-row>
            <b-col cols="2"/>
            <b-col cols="7">{{s.name}}</b-col>
            <b-col cols="3">
              <b-button class="h-75 mb-2" pill variant="outline-danger" size="sm"
                    v-b-modal="s.name" @click.stop>
                <b-icon icon="trash" aria-hidden="true"></b-icon>
              </b-button>
              <b-modal :id="s.name" title="Delete Service"  @ok="deleteSvc(s.name)">
                <p>Continue deleting service {{s.name}}?</p>
              </b-modal>
            </b-col>
          </b-row>
        </b-list-group-item>
      </b-list-group>
    </b-collapse>

    <b-row class="mt-3 mb-2">
      <b-col cols="5">
        <b-button block @click="functionSelected" variant="info">
          Functions
        </b-button>
      </b-col>
      <!--<b-col cols="3">
        <b-button pill variant="outline-success"
        @click="createSvc">
        <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
        </b-button>
      </b-col>
      <b-col cols="3">
        <b-form-input  type="text"
        v-model="functionSearch" placeholder="*"/>
      </b-col>-->
    </b-row>
    <!--<b-collapse id="function-list">
      <b-list-group flush>
        <b-list-group-item v-for="s in filteredFunctions" :key="s.name" href="#">
          <b-row>
            <b-col cols="2"/>
            <b-col cols="7">{{s.name }}</b-col>
            <b-col cols="3">
              <b-button cols="4" class="h-75 mb-2" pill variant="outline-danger" size="sm"
                    @click="removeService(s.name)">
                    <b-icon icon="trash" aria-hidden="true"></b-icon>
              </b-button>
            </b-col>
          </b-row>
        </b-list-group-item>
      </b-list-group>
    </b-collapse>-->
  </b-card-body>
</b-card>
</template>

<script>
export default {
  name: 'PolicyStore',
  data() {
    return {
      getServicesSucceed: false,
      serviceListVisible: false,
      serviceSearch: '',
      functionSearch: '',
      services: [],
      newSvc: {
        name: '',
        type: '',
      },
      newSvcNameState: null,
      functions: [],
    };
  },
  computed: {
    filteredServices() {
      return this.services.filter(
        (service) => service.name.toLowerCase().includes(this.serviceSearch.toLowerCase()),
      );
    },
    pmsEndpoint() {
      return this.$store.state.pmsEndpoint;
    },
    servicesIcon() {
      return this.serviceListVisible ? 'chevron-up' : 'chevron-down';
    },
  },
  watch: {
    pmsEndpoint(newVal) {
      if (newVal !== '') {
        this.setSvcName('');
        this.refreshServices();
      }
    },
  },
  methods: {
    functionSelected() {
      this.$store.commit('updateSvcName', '');
      this.$store.commit('selectFunctions');
    },
    setSvcName(svcName) {
      console.log(this.$store.state.svcName);
      if (svcName !== this.$store.state.svcName) {
        console.log(`setSvcName ${svcName}`);
        this.$store.commit('updateSvcName', svcName);
      }
    },
    refreshServices() {
      this.axios.get(`${this.pmsEndpoint}/service`).then((resp) => {
        console.log(resp.data);
        this.services = resp.data;
        this.getServicesSucceed = true;
      }).catch((err) => {
        console.log(err);
        this.services = [];
        this.$bvToast.toast(`${err.message}`, {
          title: 'Fail to get services',
          variant: 'danger',
          solid: true,
        });
        this.getServicesSucceed = false;
      });
    },
    deleteSvc(svcName) {
      console.log(`deleteSvc ${svcName}`);
      this.axios.delete(`${this.pmsEndpoint}/service/${svcName}`).then((response) => {
        console.log(response.data);
        this.refreshServices();
        if (this.$store.state.svcName === svcName) {
          this.setSvcName('');
        }
      }).catch((err) => {
        console.log(err);
        this.$bvToast.toast(`${err.message}`, {
          title: `Fail to delete service ${svcName}`,
          variant: 'danger',
          solid: true,
        });
      });
    },
    createSvc() {
      console.log('createSvc');
      console.log(this.newSvc.name);
      this.axios.post(`${this.pmsEndpoint}/service`,
        { name: this.newSvc.name, type: this.newSvc.type }).then((response) => {
        console.log(response.data);
        this.refreshServices();
      }).catch((err) => {
        console.log(err);
        this.$bvToast.toast(`${err.message}`, {
          title: 'Fail to create service',
          variant: 'danger',
          solid: true,
        });
      });
    },
    resetNewSvc() {
      this.newSvc.name = '';
      this.newSvc.type = '';
      this.newSvcNameState = null;
    },
    checkFormValidity() {
      console.log('checkFormValidity...');
      const valid = this.$refs.createSvcform.checkValidity();
      this.newSvcNameState = valid;
      return valid;
    },
    handleOk(bvModalEvt) {
      console.log('handleOk...');
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      console.log('handleSubmit...');
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      this.createSvc();
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('createSvc');
      });
    },
  },
  mounted() {
    this.refreshServices();
    this.axios.get(`${this.pmsEndpoint}/function`).then((response) => {
      console.log(response.data);
      this.functions = response.data;
    }).catch((err) => {
      console.log(err);
      this.$bvToast.toast(`${err.message}`, {
        title: 'Fail to get functions',
        variant: 'danger',
        solid: true,
      });
    });
  },
};
</script>
