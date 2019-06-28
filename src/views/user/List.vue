<template>
  <b-table striped hover :items="users" :fields="fields">
    <template slot="edit" scope="row">
      <b-button variant="outline-warning" class="btn-edit" @click="onEdit(row.item.$loki)">EDIT</b-button>
    </template>
  </b-table>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      fields: ["userId", "name", "edit"]
    };
  },
  beforeMount() {
    this.loadUser();
  },
  computed: {
    ...mapState("auth", ["name", "token"]),
    ...mapState("user", ["users"]),
    getName() {
      return this.token;
    }
  },
  methods: {
    ...mapActions("user", ["loadUser"]),
    onEdit(id) {
      this.$router.push("/admin/user/form/" + id);
    }
  }
};
</script>

<style scoped>
.btn-edit {
  border-color: #632a23;
  background-color: white;
  color: #632a23;
}
.btn-edit:hover {
  background-color: #632a23;
  color: white;
}
</style>
