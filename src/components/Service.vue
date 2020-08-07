<template>
  <b-card no-body class="border-0 rounded-0  vh-100 overflow-auto">
  <b-card-header  header-bg-variant="info"
     header-text-variant="white"
    class="border-left rounded-0">
    Service Name: <span class="font-weight-bold">{{svcName}}</span>
  </b-card-header>
  <!--<b-card-body class="border-left m-0 p-0">-->
    <b-card no-body  class="rounded-0 border-0 border-left">
    <b-tabs card active-nav-item-class="font-weight-bold text-info">
      <b-tab title="Policies" active>
        <b-row>
          <b-col cols="10">
            <b-button @click="newPolicyVisible = !newPolicyVisible"
            pill class="mt-3 mb-3" variant="outline-info" size="sm">
              <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
            </b-button>
          </b-col>
          <b-col cols ="2">
            <b-button @click="refreshPolicies"
             pill class="mt-3 mb-3" variant="outline-info" size="sm">
              <b-icon icon="arrow-repeat" aria-hidden="true"></b-icon>
            </b-button>
          </b-col>
        </b-row>
        <b-collapse id="newPolicy" v-model="newPolicyVisible">
          <NewPolicy :policy="newPolicy" :andPrincipal="newPolicyAndPrincipal"
          :permission="newPolicyPermission" @addPolicy="addPolicy"/>
        </b-collapse>
        <b-card>
          <PolicyTable :policies="policies" @removePolicy="removePolicy"/>
        </b-card>
      </b-tab>
      <b-tab title="Role Policies">
        <b-row>
          <b-col cols="10">
            <b-button @click="newRolePolicyVisible = !newRolePolicyVisible"
            pill class="mt-3 mb-3" variant="outline-info" size="sm">
              <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
            </b-button>
          </b-col>
          <b-col cols ="2">
            <b-button @click="refreshRolePolicies"
             pill class="mt-3 mb-3" variant="outline-info" size="sm">
              <b-icon icon="arrow-repeat" aria-hidden="true"></b-icon>
            </b-button>
          </b-col>
        </b-row>
        <b-collapse id="newRolePolicy" v-model="newRolePolicyVisible">
              <NewRolePolicy :rolePolicy="newRolePolicy" :principal="newRolePolicyPrincipal"
                :role="newRolePolicyRole" :resource="newRolePolicyResource"
                @addRolePolicy="addRolePolicy"/>
        </b-collapse>
        <b-card>
          <RolePolicyTable :rolePolicies="rolePolicies" @removeRolePolicy="removeRolePolicy"/>
        </b-card>
      </b-tab>
    </b-tabs>
    </b-card>
    <!--</b-card-body>-->
  </b-card>
</template>

<script>
import NewPolicy from './NewPolicy.vue';
import PolicyTable from './PolicyTable.vue';
import NewRolePolicy from './NewRolePolicy.vue';
import RolePolicyTable from './RolePolicyTable.vue';

// let nextID = 3;
export default {
  name: 'Service',
  components: {
    NewPolicy, PolicyTable, NewRolePolicy, RolePolicyTable,
  },
  data() {
    return {
      policies: [],
      rolePolicies: [],
      newPolicy: {
        effect: '',
        principals: [],
        permissions: [],
        condition: '',
      },
      newPolicyAndPrincipal: [{
        id: 0,
        type: '',
        name: '',
      }],
      newPolicyPermission: {
        action: '',
        resource: '',
      },
      newPolicyVisible: false,

      newRolePolicy: {
        effect: '',
        principals: [],
        roles: [],
        resources: [],
        condition: '',
      },
      newRolePolicyVisible: false,
      newRolePolicyPrincipal: {
        type: '',
        name: '',
      },
      newRolePolicyRole: '',
      newRolePolicyResource: '',
    };
  },
  computed: {
    svcName() {
      return this.$store.state.svcName;
    },
    pmsEndpoint() {
      return this.$store.state.pmsEndpoint;
    },
  },
  watch: {
    svcName(newVal) {
      if (newVal !== '') {
        this.resetNewPolicyData();
        this.axios.get(`${this.pmsEndpoint}/service/${newVal}/policy`).then((response) => {
          console.log(response.data);
          this.policies = response.data;
        }).catch((err) => {
          console.log(err);
          console.log(err.response.data);
          console.log(err.response.status);
          this.policies = [];
          this.$bvToast.toast('Fail to get policies', {
            title: `${err.response.status}`,
            variant: 'danger',
            solid: true,
          });
        });
        this.axios.get(`${this.pmsEndpoint}/service/${newVal}/role-policy`).then((response) => {
          console.log(response.data);
          this.rolePolicies = response.data;
        }).catch((err) => {
          console.log(err);
          console.log(err.response.data);
          console.log(err.response.status);
          this.rolePolicies = [];
          this.$bvToast.toast('Fail to get role policies', {
            title: `${err.response.status}`,
            variant: 'danger',
            solid: true,
          });
        });
      } else {
        this.policies = [];
        this.rolePolicies = [];
      }
    },
  },
  methods: {
    resetNewPolicyData() {
      this.newPolicy = {
        effect: '',
        principals: [],
        permissions: [],
        condition: '',
      };
      this.newPolicyPrincipal = [{
        id: 0,
        type: '',
        name: '',
      }];
      this.newPolicyPermission = { action: '', resource: '', isResExp: false };
      this.newPolicyVisible = false;

      this.newRolePolicy = {
        effect: '',
        principals: [],
        roles: [],
        resources: [],
        condition: '',
      };
      this.newRolePolicyVisible = false;
      this.newRolePolicyPrincipal = {
        type: '',
        name: '',
      };
      this.newRolePolicyRole = '';
      this.newRolePolicyResource = '';
    },
    refreshPolicies() {
      this.axios.get(`${this.pmsEndpoint}/service/${this.svcName}/policy`).then((resp) => {
        console.log(resp.data);
        this.policies = resp.data;
      }).catch((err) => {
        console.log(err);
        this.policies = [];
        this.$bvToast.toast(`${err.message}`, {
          title: 'Fail to get policies',
          variant: 'danger',
          solid: true,
        });
      });
    },
    refreshRolePolicies() {
      this.axios.get(`${this.pmsEndpoint}/service/${this.svcName}/role-policy`).then((resp) => {
        console.log(resp.data);
        this.rolePolicies = resp.data;
      }).catch((err) => {
        console.log(err);
        this.rolePolicies = [];
        this.$bvToast.toast(`${err.message}`, {
          title: 'Fail to get role policies',
          variant: 'danger',
          solid: true,
        });
      });
    },
    addPolicy(policy) {
      console.log('addPolicy');
      const principals = [];
      const orIt = policy.principals.values();
      let orCur = orIt.next();
      while (!orCur.done) {
        console.log(orCur.value.andPrincipal);
        const andIt = orCur.value.andPrincipal.values();
        let andCur = andIt.next();
        const andP = [];
        while (!andCur.done) {
          andP.push(`${andCur.value.type}:${andCur.value.name}`);
          andCur = andIt.next();
        }
        principals.push(andP);
        orCur = orIt.next();
      }
      console.log(principals);
      const perms = [];
      const it = policy.permissions.values();
      let cur = it.next();
      while (!cur.done) {
        if (cur.value.isResExp) {
          perms.push({ actions: cur.value.actions, resourceExpression: cur.value.resource });
        } else {
          perms.push({ actions: cur.value.actions, resource: cur.value.resource });
        }
        cur = it.next();
      }

      this.axios.post(`${this.pmsEndpoint}/service/${this.svcName}/policy`,
        {
          name: 'policy desc',
          effect: policy.effect,
          principals,
          permissions: perms,
          condition: policy.condition,
        }).then((response) => {
        console.log(response);
        this.refreshPolicies();
      }).catch((err) => {
        console.log(err);
        this.$bvToast.toast(`${err.message}`, {
          title: 'Fail to create policy',
          variant: 'danger',
          solid: true,
        });
      });
    },
    removePolicy(idToRemove) {
      // this.policies = this.policies.filter((policy) => policy.id !== idToRemove);
      this.axios.delete(`${this.pmsEndpoint}/service/${this.svcName}/policy/${idToRemove}`)
        .then((response) => {
          console.log(response);
          this.refreshPolicies();
        }).catch((err) => {
          console.log(err);
          this.$bvToast.toast(`${err.message}`, {
            title: 'Fail to delete policy',
            variant: 'danger',
            solid: true,
          });
        });
    },
    addRolePolicy(rolePolicy) {
      console.log('addRolePolicy');
      this.axios.post(`${this.pmsEndpoint}/service/${this.svcName}/role-policy`,
        {
          name: 'role policy desc',
          effect: rolePolicy.effect,
          principals: rolePolicy.principals,
          roles: rolePolicy.roles,
          resources: rolePolicy.resources,
          condition: rolePolicy.condition,
        }).then((response) => {
        console.log(response);
        this.refreshRolePolicies();
      }).catch((err) => {
        console.log(err);
        this.$bvToast.toast(`${err.message}`, {
          title: 'Fail to create role policy',
          variant: 'danger',
          solid: true,
        });
      });
    },
    removeRolePolicy(idToRemove) {
      // this.policies = this.policies.filter((policy) => policy.id !== idToRemove);
      this.axios.delete(`${this.pmsEndpoint}/service/${this.svcName}/role-policy/${idToRemove}`)
        .then((response) => {
          console.log(response);
          this.refreshRolePolicies();
        }).catch((err) => {
          console.log(err);
          this.$bvToast.toast(`${err.message}`, {
            title: 'Fail to delete role policy',
            variant: 'danger',
            solid: true,
          });
        });
    },
  },
  mounted() {
    // const sName = this.$store.state.svcName;
    if (this.svcName !== '') {
      this.refreshPolicies();
      this.refreshRolePolicies();
    }
  },
};
</script>
