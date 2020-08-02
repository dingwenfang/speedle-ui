<template>
<li>
  <b-row overflow='auto'>
    <b-col cols="9" v-if="permission.isResExp">
      {{actions}} expr:{{permission.resource}}
    </b-col>
    <b-col cols="9" v-else>
      {{actions}} {{permission.resource}}
    </b-col>
    <b-col cols="3">
      <b-button class="mb-2" pill variant="outline-danger" size="sm"
        @click="$emit('removePermission', permission.id)">
        <b-icon icon="trash" aria-hidden="true"></b-icon>
      </b-button>
    </b-col>
  </b-row>
</li>
</template>

<script>
export default {
  name: 'Permission',
  props: {
    permission: {
      type: Object,
      required: true,
    },
  },
  computed: {
    actions() {
      const it = this.permission.actions.values();
      let acts = '';
      let cur = it.next();
      while (!cur.done) {
        if (acts.length === 0) {
          acts += cur.value;
        } else {
          acts += `,${cur.value}`;
        }
        cur = it.next();
      }
      return acts;
    },
  },
};
</script>
