<template>
<li>
  <b-row>
    <b-col cols="9">
      {{principal}}
    </b-col>
    <b-col cols="3">
      <b-button class="mb-2" pill variant="outline-danger" size="sm"
        @click="$emit('removePrincipal', id)">
        <b-icon icon="trash" aria-hidden="true"></b-icon>
      </b-button>
    </b-col>
  </b-row>
</li>
</template>

<script>
export default {
  name: 'Principal',
  props: {
    principal: {
      type: String,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
};
</script>
