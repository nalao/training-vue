import axios from "axios";

const Register = {
  namespaced: true,
  state: {},
  actions: {
    async register(context, user) {
      return new Promise((resolve, reject) => {
        axios
          .post(process.env.VUE_APP_REMOTE_API + "/user", user)
          .then(resp => {
            resolve(resp.data);
          })
          .catch(error => reject(error));
      });
    }
  }
};

export default Register;
