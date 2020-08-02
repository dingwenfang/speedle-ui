<template>
<div>
  <b-table hover small responsive head-variant="light"
   :fields="fields" :items="policies">
    <template v-slot:cell(operation)="data">
      <b-button pill variant="outline-danger" size="sm"
        @click="$emit('removePolicy',data.item.id)">
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
    <template v-slot:cell(permissions)="data">
      <ul class="list-unstyled">
        <li v-for="(permission,index) in data.value" :key="index">
          {{ permission.actions }} {{ permission.resource }}
        </li>
      </ul>
    </template>
  </b-table>
</div>
</template>

<script>

export default {
  name: 'PolicyTable',
  props: {
    policies: {
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
          formatter: 'principalsToString',
        },
        {
          key: 'permissions',
          label: 'Permissions',
          formatter: 'permissionsToString',
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
    principalsToString(value) {
      const orPs = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const orP of value) {
        let andPs = '';
        // eslint-disable-next-line no-restricted-syntax
        for (const andP of orP) {
          if (andPs.length === 0) {
            andPs = andP;
          } else {
            andPs += ` & ${andP}`;
          }
        }
        orPs.push(andPs);
      }
      return orPs;
    },
    permissionsToString(value) {
      const res = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const p of value) {
        let acts = '';
        // eslint-disable-next-line no-restricted-syntax
        for (const a of p.actions) {
          if (acts.length > 0) {
            acts += ',';
          }
          acts += a;
        }
        if (p.resourceExpression === undefined) {
          res.push({ actions: acts, resource: p.resource });
        } else {
          res.push({ actions: acts, resource: `expr:${p.resourceExpression}` });
        }
      }
      return res;
    },
  },
};
</script>
