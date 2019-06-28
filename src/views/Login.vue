<template>
  <b-container class="bv-example-row bv-example-row-flex-cols">
    <b-row align-h="center">
      <b-col xs="12" sm="12" md="6" lg="6" class="mt-5">
        <b-card img-src="https://picsum.photos/900/250/?image=3">
          <b-form @submit.prevent="onFormSubmit()" autocomplete="off">
            <b-form-group id="input-group-userId" class="mt-5">
              <b-form-input
                id="userId"
                v-model="$v.form.userId.$model"
                :state="$v.form.userId.$dirty ? !$v.form.userId.$error : null"
                type="text"
                required
                placeholder="USER ID"
              ></b-form-input>
              <b-form-invalid-feedback>required</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id="input-group-password">
              <b-form-input
                id="password"
                v-model="$v.form.password.$model"
                :state="$v.form.password.$dirty ? !$v.form.password.$error : null"
                type="password"
                required
                placeholder="PASSWORD"
              ></b-form-input>
              <b-form-invalid-feedback>required</b-form-invalid-feedback>
            </b-form-group>
            <b-button id="btn-login" type="submit" block pill>LOGIN</b-button>
            <b-row align-h="end">
              <b-button id="register" @click="onRegister" variant="link">Click To Register!!!</b-button>
            </b-row>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import { required, minLength } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      form: {
        userId: null,
        password: null
      },
      errorMessage: ""
    };
  },
  validations: {
    form: {
      userId: { required },
      password: { required, minLength: minLength(6) }
    }
  },
  methods: {
    ...mapActions("auth", ["login"]),
    onFormSubmit() {
      if (!this.$v.form.$invalid) {
        this.login(this.form).then(resp => {
          this.$router.replace("admin/user/list");
        });
      } else {
        alert("please do something");
      }
    },
    onRegister() {
      this.$router.replace("register");
    }
  }
};
</script>

<style>
#btn-login {
  border-color: #632a23;
  background-color: white;
  color: #632a23;
}
#btn-login:hover {
  background-color: #632a23;
  color: white;
}
#register {
  color: #632a23;
}
</style>
