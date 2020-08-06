<template>
<div>
  <b-table hover small responsive head-variant="light"
   :fields="fields" :items="functions">
    <template v-slot:cell(operation)="data">
      <b-button pill variant="outline-danger" size="sm"
        @click="$emit('removeFunction',data.item.name)">
      <b-icon icon="trash" aria-hidden="true"></b-icon>
      </b-button>
    </template>
    <template v-slot:cell(ca)="data">
      <b-button pill variant="outline-success" size="sm"
        @click="viewCA(data.item.ca)">
      <b-icon icon="eye-fill" aria-hidden="true"></b-icon>
      </b-button>
    </template>
    <template v-slot:cell(description)="data">
      <b-button pill variant="outline-success" size="sm"
        @click="viewDescription(data.item.description)">
      <b-icon icon="eye-fill" aria-hidden="true"></b-icon>
      </b-button>
    </template>
  </b-table>
</div>
</template>

<script>

export default {
  name: 'FunctionTable',
  props: {
    functions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      fields: [
        {
          key: 'name',
          label: 'Name',
        },
        {
          key: 'description',
          label: 'Description',
        },
        {
          key: 'funcURL',
          label: 'URL',
        },
        {
          key: 'ca',
          label: 'CA',
        },
        {
          key: 'resultCachable',
          label: 'Result Cachable',
        },
        {
          key: 'resultTTL',
          label: 'Result TTL',
        },
        {
          key: 'operation',
          label: 'Operation',
        },
      ],
    };
  },
  methods: {
    viewCA(ca) {
      this.$bvToast.toast(`${ca}`, {
        title: 'CA',
        autoHideDelay: 5000,
      });
    },
    viewDescription(desc) {
      this.$bvToast.toast(`${desc}`, {
        title: 'Description',
        autoHideDelay: 5000,
      });
    },
  },
};
</script>
