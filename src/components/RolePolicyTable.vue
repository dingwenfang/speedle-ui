<template>
<div>
  <b-table hover small responsive head-variant="light"
   :fields="fields" :items="rolePolicies">
    <template v-slot:cell(operation)="data">
      <b-button pill variant="outline-danger" size="sm"
        @click="$emit('removeRolePolicy',data.item.id)">
      <b-icon icon="trash" aria-hidden="true"></b-icon>
      </b-button>
    </template>
    <template v-slot:cell(principals)="data">
      <ul class="list-unstyled">
        <li v-for="(principal,index) in data.value" :key="index">
          {{ principal }}
        </li>
      </ul>
    </template>
    <template v-slot:cell(roles)="data">
      <ul class="list-unstyled">
        <li v-for="(role, index) in data.value" :key="index">
          {{ role }}
        </li>
      </ul>
    </template>
    <template v-slot:cell(resources)="data">
      <ul class="list-unstyled">
        <li v-for="(res, index) in data.value" :key="index">
          {{ res }}
        </li>
      </ul>
    </template>
  </b-table>
</div>
</template>

<script>

export default {
  name: 'RolePolicyTable',
  props: {
    rolePolicies: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      fields: [
        {
          key: 'effect',
          label: 'Effect',
          formatter: (value) => value.toUpperCase(),
        },
        {
          key: 'principals',
          label: 'Principals',
        },
        {
          key: 'roles',
          label: 'Roles',
        },
        {
          key: 'resources',
          label: 'Resources',
        },
        {
          key: 'condition',
          label: 'Condition',
        },
        {
          key: 'operation',
        },
      ],
    };
  },
  methods: {
  },
};
</script>
