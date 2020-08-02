<template>
<li>
  <b-row>
    <b-col cols="9">
      {{andPrincipalString}}
    </b-col>
    <b-col cols="3">
      <b-button class="mb-2" pill variant="outline-danger" size="sm"
        @click="$emit('removePrincipal', principal.id)">
        <b-icon icon="trash" aria-hidden="true"></b-icon>
      </b-button>
    </b-col>
  </b-row>
</li>
</template>

<script>
export default {
  name: 'AndPrincipal',
  props: {
    principal: {
      type: Object,
      required: true,
    },
  },
  computed: {
    andPrincipalString() {
      const it = this.principal.andPrincipal.values();
      let cur = it.next();
      let result = `${cur.value.type}:${cur.value.name}`;
      cur = it.next();
      while (!cur.done) {
        result += ` & ${cur.value.type}:${cur.value.name}`;
        cur = it.next();
      }
      return result;
    },
  },
};
</script>
