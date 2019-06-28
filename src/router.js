import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";
import Public from "@/views/Public.vue";
import Private from "@/views/Private.vue";
import User from "@/views/user/User.vue";
import Form from "@/views/user/Form.vue";
import List from "@/views/user/List.vue";
import ListJson from "@/views/jsonplaceholder/List.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "public",
      component: Public,
      children: [
        {
          path: "",
          name: "home",
          component: Home
        },
        {
          path: "about",
          name: "about",
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
        },
        {
          path: "login",
          name: "login",
          component: () => import(/* webpackChunkName: "about" */ "./views/Login.vue")
        },
        {
          path: "register",
          name: "register",
          component: () => import(/* webpackChunkName: "about" */ "./views/Register.vue")
        }
      ]
    },
    {
      path: "/admin",
      name: "admin",
      component: Private,
      children: [
        {
          name: "user",
          path: "user",
          component: User,
          children: [
            {
              name: "form",
              path: "form/:id",
              component: Form
            },
            {
              name: "list",
              path: "list",
              component: List
            }
          ]
        },
        {
          name: "listplaceholder",
          path: "listplaceholder",
          component: ListJson
        }
      ]
    }
  ]
});
