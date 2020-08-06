<template>
  <b-card>
    <b-form-group
      class="mb-0"
    >
      <b-form-group
        label-cols-sm="2"
        label="Name:"
        label-align-sm="right"
        label-for="function-name"
        :invalid-feedback="invalidNameFeedback"
        :state="nameState"
      >
        <b-form-input id="function-name" v-model="newFunc.name"></b-form-input>
      </b-form-group>
      <b-form-group
        label-cols-sm="2"
        label="Description:"
        label-align-sm="right"
        label-for="function-desc"
      >
        <b-form-input id="function-desc" v-model="newFunc.description"></b-form-input>
      </b-form-group>
      <b-form-group
        label-cols-sm="2"
        label="URL:"
        label-align-sm="right"
        label-for="function-url"
      >
        <b-form-input id="function-url" v-model="newFunc.funcURL"></b-form-input>
      </b-form-group>
      <b-form-group
        label-cols-sm="2"
        label="CA:"
        label-align-sm="right"
        label-for="function-ca"
      >
        <b-form-input id="function-ca" v-model="newFunc.ca"></b-form-input>
      </b-form-group>
      <b-form-group
        label-cols-sm="2"
        label="Result Cacheable:"
        label-align-sm="right"
        label-for="function-rc"
      >
        <b-form-checkbox id="function-rc" v-model="newFunc.resultCachable"></b-form-checkbox>
      </b-form-group>
      <b-form-group
        v-if="newFunc.resultCachable"
        label-cols-sm="2"
        label="Result TTL:"
        label-align-sm="right"
        label-for="function-ttl"
      >
        <b-form-input
         id="function-ttl" type="number" v-model="newFunc.resultTTL"></b-form-input>
      </b-form-group>
    </b-form-group>
    <b-button variant="outline-success" @click="$emit('addFunction', newFunc)">
      Create
    </b-button>
  </b-card>
</template>

<script>

export default {
  name: 'NewFunction',
  components: {
  },
  props: {
    newFunc: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
    };
  },
  methods: {
  },
};
</script>

<style>
</style>
