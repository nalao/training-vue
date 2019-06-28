import axios from "axios";
const JsonPlaceHolder = {
  namespaced: true,
  state: {
    users: []
  },
  mutations: {
    loadPostSuccess(state, payload) {
      state.users = payload;
    }
  },
  actions: {
    async loadPost(context) {
      axios.get("https://jsonplaceholder.typicode.com/posts").then(res => {
        context.commit("loadPostSuccess", res.data);
      });
    }
  }
};

export default JsonPlaceHolder;
