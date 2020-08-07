<template>
  <b-card>
    <b-form-group
      class="mb-0"
    >
      <b-form-group
        label-cols-sm="2"
        label="Effect:"
        label-align-sm="right"
        label-for="rp-effect"
      >
        <b-row >
          <b-col cols="5">
            <b-form-select id="rp-effect" v-model="rolePolicy.effect"
            :options="effectOptions"></b-form-select>
          </b-col>
         </b-row>
      </b-form-group>

      <b-form-group
        label-cols-sm="2"
        label="Principals:"
        label-align-sm="right"
      >
        <b-row >
          <b-col cols="5">
            <b-card>
            <ul v-if="rolePolicy.principals.length">
              <li v-for="(p, index) in rolePolicy.principals" :key="index">
                <b-row>
                  <b-col cols="9">
                    {{p}}
                  </b-col>
                  <b-col cols="3">
                    <b-button class="mb-2" pill variant="outline-danger" size="sm"
                      @click="removePrincipal(index)">
                      <b-icon icon="trash" aria-hidden="true"></b-icon>
                    </b-button>
                  </b-col>
                </b-row>
              </li>
            </ul>
            </b-card>
          </b-col>
          <b-col cols="2" align-self="center">
            <b-button class="mt-2 ml-2 mb-2" pill variant="outline-info"  @click="addPrincipal">
              <b-icon icon="chevron-double-left" aria-hidden="true"></b-icon>
            </b-button>
          </b-col>
          <b-col cols="5" align-self="center">
            <b-row>
              <b-col cols="5" class="pr-0" >
                <b-form-select v-model="principal.type" :options="principalTypeOptions"/>
              </b-col>
              <b-col cols="7" >
                <b-form-input v-model="principal.name" placeholder="name"></b-form-input>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-form-group>

      <b-form-group
        label-cols-sm="2"
        label="Roles:"
        label-align-sm="right"
      >
        <b-row >
          <b-col cols="5">
            <b-card>
            <ul v-if="rolePolicy.roles.length">
              <li v-for="(role, index) in rolePolicy.roles" :key="index">
                <b-row>
                  <b-col cols="9">
                    {{role}}
                  </b-col>
                  <b-col cols="3">
                    <b-button class="mb-2" pill variant="outline-danger" size="sm"
                      @click="removeRole(index)">
                      <b-icon icon="trash" aria-hidden="true"></b-icon>
                    </b-button>
                  </b-col>
                </b-row>
              </li>
            </ul>
            </b-card>
          </b-col>
          <b-col cols="2" align-self="center">
            <b-button class="mt-2 ml-2 mb-2" pill variant="outline-info"  @click="addRole">
              <b-icon icon="chevron-double-left" aria-hidden="true"></b-icon>
            </b-button>
          </b-col>
          <b-col cols="5" align-self="center">
            <b-form-input v-model="role"></b-form-input>
          </b-col>
        </b-row>
      </b-form-group>
      <b-form-group
        label-cols-sm="2"
        label="Resources:"
        label-align-sm="right"
      >
        <b-row >
          <b-col cols="5">
            <b-card>
            <ul v-if="rolePolicy.resources.length">
              <li v-for="(res, index) in rolePolicy.resources" :key="index">
                <b-row>
                  <b-col cols="9">
                    {{res}}
                  </b-col>
                  <b-col cols="3">
                    <b-button class="mb-2" pill variant="outline-danger" size="sm"
                      @click="removeResource(index)">
                      <b-icon icon="trash" aria-hidden="true"></b-icon>
                    </b-button>
                  </b-col>
                </b-row>
              </li>
            </ul>
            </b-card>
          </b-col>
          <b-col cols="2" align-self="center">
            <b-button class="mt-2 ml-2 mb-2" pill variant="outline-info"  @click="addResource">
              <b-icon icon="chevron-double-left" aria-hidden="true"></b-icon>
            </b-button>
          </b-col>
          <b-col cols="5" align-self="center">
            <b-form-input v-model="resource"></b-form-input>
          </b-col>
        </b-row>
      </b-form-group>
      <b-form-group
        label-cols-sm="2"
        label="Condition:"
        label-align-sm="right"
        label-for="policy-condition"
      >
        <b-row >
          <b-col cols="5">
            <b-form-input v-model="rolePolicy.condition"></b-form-input>
          </b-col>
        </b-row>
      </b-form-group>
    </b-form-group>

    <b-button variant="outline-info" @click="$emit('addRolePolicy', rolePolicy)">
      Create
    </b-button>
  </b-card>
</template>

<script>

export default {
  name: 'NewRolePolicy',
  components: {
  },
  props: {
    rolePolicy: {
      type: Object,
      required: true,
    },
    principal: {
      type: Object,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    resource: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      effectOptions: [
        { value: 'grant', text: 'GRANT' },
        { value: 'deny', text: 'DENY' },
      ],
      principalTypeOptions: [
        { value: 'user', text: 'User' },
        { value: 'group', text: 'Group' },
        { value: 'role', text: 'Role' },
        { value: 'entity', text: 'Entity' },
      ],
    };
  },
  methods: {
    addRole() {
      this.rolePolicy.roles.push(this.role);
    },
    removeRole(index) {
      this.rolePolicy.roles.splice(index, 1);
    },
    addPrincipal() {
      this.rolePolicy.principals.push(`${this.principal.type}:${this.principal.name}`);
    },
    removePrincipal(index) {
      this.rolePolicy.principals.splice(index, 1);
    },
    addResource() {
      this.rolePolicy.resources.push(this.resource);
    },
    removeResource(index) {
      this.rolePolicy.resources.splice(index, 1);
    },
  },
};
</script>

<style>
ul {
  list-style-type: none;
  margin: 10px;
  padding: 10px;
}

/*#newPolicy {
  display: inline-flex;
}*/

input {
  width:80px;
}

</style>
