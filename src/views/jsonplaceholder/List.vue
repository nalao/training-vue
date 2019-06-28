<template>
  <b-table striped hover :items="users"></b-table>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  beforeMount() {
    this.loadPost();
  },
  computed: {
    ...mapState("jsonPlaceholder", ["users"])
  },
  methods: {
    ...mapActions("jsonPlaceholder", ["loadPost"])
  }
};
</script>
