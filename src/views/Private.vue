<template>
  <div>
    <b-navbar id="nav-style" toggleable="lg" type="dark" variant="#632a23">
      <b-navbar-brand href="#">VUE.JS Training</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#">{{name}}</b-nav-item>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template slot="button-content">
              <em>Category</em>
            </template>
            <b-dropdown-item to="/admin/user/list">LIST USER</b-dropdown-item>
            <b-dropdown-item to="/admin/listplaceholder">LIST JSON PLACEHOLDER</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template slot="button-content">
              <em>Setting</em>
            </template>
            <b-dropdown-item href="#" @click="onLogout">LOGOUT</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import store from "@/store.js";

export default {
  beforeRouteEnter(to, from, next) {
    if (store.state.auth.isAuthen) {
      next();
    } else {
      next("/login");
    }
  },
  computed: {
    ...mapState("auth", ["name"])
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    onLogout() {
      this.logout().then(result => {
        if (result) {
          this.$router.replace("/login");
        }
      });
    }
  }
};
</script>

<style>
#nav-style {
  background-color: #632a23;
}
</style>
