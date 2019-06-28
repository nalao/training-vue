<template>
  <b-container class="bv-example-row">
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

            <b-form-group id="input-group-name">
              <b-form-input
                id="name"
                v-model="$v.form.name.$model"
                :state="$v.form.name.$dirty ? !$v.form.name.$error : null"
                type="text"
                required
                placeholder="NAME"
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

            <b-button type="submit" id="btn-update" block pill variant="outline-warning">UPDATE</b-button>
            <b-row align-h="end">
              <b-button id="update" @click="onCancel" variant="link">Cancel</b-button>
            </b-row>
            <b-modal id="modal-alert" title="Warning" ok-only>
              <p class="my-4">{{ errorMessage }}</p>
            </b-modal>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { required, minLength, sameAs } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      form: {
        userId: null,
        name: null,
        password: null
      },
      errorMessage: null
    };
  },
  validations: {
    form: {
      userId: { required },
      name: { required },
      password: { required, minLength: minLength(6) }
    }
  },
  methods: {
    ...mapActions("user", ["loadUserById", "saveUser"]),
    onFormSubmit() {
      if (!this.$v.form.$invalid) {
        this.saveUser({
          id: this.$route.params.id,
          body: this.form
        })
          .then(res => {
            this.$router.push("/admin/user/list");
          })
          .catch(reason => {
            this.errorMessage = "Cannot update..";
            this.$bvModal.show("modal-alert");
          });
      } else {
        this.errorMessage = "Cannot update..";
        this.$bvModal.show("modal-alert");
      }
    },
    onCancel() {
      this.$router.push("/admin/user/list");
    }
  },
  beforeMount() {
    this.loadUserById(this.$route.params.id).then(res => {
      this.form = res;
    });
  }
};
</script>

<style>
#btn-update {
  border-color: #632a23;
  background-color: white;
  color: #632a23;
}
#btn-update:hover {
  background-color: #632a23;
  color: white;
}
#update {
  color: #632a23;
}
</style>
