<template>
  <b-card  no-body class="border-0 rounded-0  vh-100 overflow-auto">
  <b-card-header header-bg-variant="light"  class="border-left rounded-0">
      Functions
  </b-card-header>
  <b-card-body>
    <b-row>
      <b-col cols="8">
        <b-button @click="newFunctionVisible = !newFunctionVisible"
        pill class="mt-3 mb-3" variant="outline-success" size="sm">
          <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
        </b-button>
      </b-col>
      <b-col cols ="2">
        <b-button @click="refreshFunctions"
          pill class="mt-3 mb-3" variant="outline-success" size="sm">
          <b-icon icon="arrow-repeat" aria-hidden="true"></b-icon>
        </b-button>
      </b-col>
      <b-col cols ="2">
        <b-form-input class="mt-3 mb-3" size="sm" type="text"
        v-model="functionSearch" placeholder="*"/>
      </b-col>
    </b-row>
    <b-collapse id="newFunction" v-model="newFunctionVisible">
      <NewFunction :newFunc="newFunction"
       @addFunction="addFunction"/>
    </b-collapse>
    <b-card>
      <FunctionTable :functions="filteredFunctions" @removeFunction="removeFunction"/>
    </b-card>
  </b-card-body>
  </b-card>
</template>

<script>
import NewFunction from './NewFunction.vue';
import FunctionTable from './FunctionTable.vue';

export default {
  name: 'Functions',
  components: {
    NewFunction, FunctionTable,
  },
  data() {
    return {
      functions: [],
      newFunction: {
        name: '',
        description: '',
        funcURL: '',
        ca: '',
        resultCachable: false,
        resultTTL: 0,
      },
      newFunctionVisible: false,
      functionSearch: '',
    };
  },
  computed: {
    svcName() {
      return this.$store.state.svcName;
    },
    pmsEndpoint() {
      return this.$store.state.pmsEndpoint;
    },
    filteredFunctions() {
      return this.functions.filter(
        (f) => f.name.toLowerCase().includes(this.functionSearch.toLowerCase()),
      );
    },
  },
  watch: {
    pmsEndpoint(newVal) {
      if (newVal !== '') {
        this.refreshFunctions();
      }
    },
  },

  methods: {
    resetNewFunction() {
      this.newFunction = {
        name: '',
        description: '',
        funcURL: '',
        ca: '',
        resultCachable: false,
        resultTTL: 0,
      };
    },
    refreshFunctions() {
      this.axios.get(`${this.pmsEndpoint}/function`).then((resp) => {
        console.log(resp.data);
        this.functions = resp.data;
      }).catch((err) => {
        console.log(err);
        this.policies = [];
        this.$bvToast.toast(`${err.message}`, {
          title: 'Fail to get functions',
          variant: 'danger',
          solid: true,
        });
      });
    },
    addFunction(f) {
      console.log('addFunction');
      console.log(f.resultTTL);
      this.axios.post(`${this.pmsEndpoint}/function`,
        {
          name: f.name,
          description: f.description,
          funcURL: f.funcURL,
          ca: f.ca,
          resultCachable: f.resultCachable,
          resultTTL: parseInt(f.resultTTL, 10),
        }).then((response) => {
        console.log(response);
        this.resetNewFunction();
        this.refreshFunctions();
      }).catch((err) => {
        console.log(err);
        this.$bvToast.toast(`${err.message}`, {
          title: 'Fail to create function',
          variant: 'danger',
          solid: true,
        });
      });
    },
    removeFunction(name) {
      // this.policies = this.policies.filter((policy) => policy.id !== idToRemove);
      this.axios.delete(`${this.pmsEndpoint}/function/${name}`)
        .then((response) => {
          console.log(response);
          this.refreshFunctions();
        }).catch((err) => {
          console.log(err);
          this.$bvToast.toast(`${err.message}`, {
            title: 'Fail to delete function',
            variant: 'danger',
            solid: true,
          });
        });
    },
  },
  mounted() {
    this.refreshFunctions();
  },
};
</script>
