import axios from "axios";

const User = {
  namespaced: true,
  state: {
    users: []
  },
  mutations: {
    loadUserSuccess(state, payload) {
      state.users = payload;
    }
  },
  actions: {
    async loadUser(context) {
      axios.get(process.env.VUE_APP_REMOTE_API + "/user").then(res => {
        context.commit("loadUserSuccess", res.data);
      });
    },
    async loadUserById(context, payload) {
      return new Promise((resolve, reject) => {
        const headers = {
          Authorization: "jwt " + context.rootState.auth.token
        };
        axios
          .get(process.env.VUE_APP_REMOTE_API + "/user/" + payload, {
            headers
          })
          .then(res => resolve(res.data))
          .catch(reason => reject(reason));
      });
    },
    async saveUser(context, payload) {
      return new Promise((resolve, reject) => {
        const headers = {
          Authorization: "jwt " + context.rootState.auth.token
        };
        axios
          .put(process.env.VUE_APP_REMOTE_API + "/user/" + payload.id, payload.body, {
            headers
          })
          .then(res => resolve(res.data))
          .catch(reason => reject(reason));
      });
    }
  }
};

export default User;
