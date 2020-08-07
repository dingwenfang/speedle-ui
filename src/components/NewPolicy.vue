<template>
  <b-card>
    <b-form-group
      class="mb-0"
    >
      <b-form-group
        label-cols-sm="2"
        label="Effect:"
        label-align-sm="right"
        label-for="policy-effect"
      >
        <b-row >
          <b-col cols="5">
            <b-form-select id="policy-effect" v-model="policy.effect"
            :options="effectOptions"></b-form-select>
          </b-col>
         </b-row>
      </b-form-group>

      <b-form-group
        label-cols-sm="2"
        label="Principals:"
        label-align-sm="right"
      >
        <b-row>
          <b-col cols="5">
            <b-card>
            <ul v-if="policy.principals.length">
             <AndPrincipal
              v-for="p in policy.principals"
              :key="p.id"
              :principal="p"
              @removePrincipal="removePrincipal"
              />
            </ul>
            </b-card>
          </b-col>
          <b-col cols="2" align-self="center">
            <b-button class="mt-2 ml-2 mb-2" pill variant="outline-info"  @click="addPrincipal">
              <b-icon icon="chevron-double-left" aria-hidden="true"></b-icon>
            </b-button>
          </b-col>
          <b-col cols="5" align-self="center">
            <b-row v-for="p in andPrincipal" :key='p.id'>
              <b-col cols="5" class="pr-0" >
                <b-form-select v-model="p.type" :options="principalTypeOptions"/>
              </b-col>
              <b-col cols="5" >
                <b-form-input v-model="p.name" placeholder="name"></b-form-input>
              </b-col>
              <b-col v-if="andPrincipal.length == 1" cols="2" class="ml-0 pl-0 mr-0 pr-0">
                <b-button  pill variant="outline-info" size="sm" @click="addAnd" >&</b-button>
              </b-col>
              <b-col v-else cols="2" class="ml-0 pl-0 mr-0 pr-0">
                <b-button  pill variant="outline-info" size="sm" @click="addAnd">&</b-button>
                <b-button  pill variant="outline-info" size="sm"
                 @click="removeAnd(p.id)">-</b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-form-group>

      <b-form-group
        label-cols-sm="2"
        label="Permissions:"
        label-align-sm="right"
      >
      <b-row>
          <b-col cols="5">
            <b-card>
              <ul v-if="policy.permissions.length">
                <Permission
                  v-for="perm in policy.permissions"
                  :key="perm.id"
                  :permission="perm"
                  @removePermission="removePermission"
                  />
              </ul>
            </b-card>
          </b-col>
          <b-col cols="2" align-self="center">
            <b-button class="mt-2 ml-2 mb-2" pill variant="outline-info"  @click="addPermission">
              <b-icon icon="chevron-double-left" aria-hidden="true"></b-icon>
            </b-button>
          </b-col>
          <b-col cols="5" align-self="center">
            <b-row align-v="end">
              <b-col cols="5" class="pr-0" >
                <b-form-input v-model="permission.action" placeholder="action"></b-form-input>
              </b-col>
              <b-col cols="7" >
                <b-form-checkbox v-model="permission.isResExp"
                 value="true" unchecked-value="false">resource expression</b-form-checkbox>
                <b-form-input v-model="permission.resource" placeholder="resource"></b-form-input>
              </b-col>
            </b-row>
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
            <b-form-input v-model="policy.condition"></b-form-input>
          </b-col>
        </b-row>
      </b-form-group>
    </b-form-group>
    <b-button variant="outline-info" @click="$emit('addPolicy', policy)">
      Create
    </b-button>
  </b-card>
</template>

<script>
import AndPrincipal from './AndPrincipal.vue';
import Permission from './Permission.vue';

let prinID = 0;
let permID = 0;
let andPID = 1;

export default {
  name: 'NewPolicy',
  components: {
    AndPrincipal, Permission,
  },
  props: {
    policy: {
      type: Object,
      required: true,
    },
    andPrincipal: {
      type: Array,
      required: true,
    },
    permission: {
      type: Object,
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
    addAnd() {
      andPID += 1;
      this.andPrincipal.push({ id: andPID, type: '', name: '' });
    },
    removeAnd(id) {
      this.andPrincipal = this.andPrincipal.filter((p) => p.id !== id);
    },
    addPrincipal() {
      const ap = [];
      prinID += 1;
      const it = this.andPrincipal.values();
      let cur = it.next();
      while (!cur.done) {
        ap.push({ type: cur.value.type, name: cur.value.name });
        cur = it.next();
      }
      this.policy.principals.push(
        { id: prinID, andPrincipal: ap },
      );
    },
    removePrincipal(id) {
      this.policy.principals = this.policy.principals
        .filter((principal) => principal.id !== id);
    },
    addPermission() {
      permID += 1;
      const acts = this.permission.action.split(',');
      this.policy.permissions.push(
        {
          id: permID,
          actions: acts,
          resource: this.permission.resource,
          isResExp: this.permission.isResExp,
        },
      );
    },
    removePermission(id) {
      this.policy.permissions = this.policy.permissions
        .filter((perm) => perm.id !== id);
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
