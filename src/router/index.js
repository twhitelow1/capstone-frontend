import Vue from "vue";
import VueRouter from "vue-router";
import Signup from "../views/Signup.vue";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import Leaderboard from "../views/Leaderboard.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    props: route => {
      {
        route.query.visibility;
      }
    },
  },
  { path: "/signup", name: "signup", component: Signup },
  { path: "/login", name: "login", component: Login },
  { path: "/logout", name: "logout", component: Logout },
  { path: "/leaderboard", name: "leaderboard", component: Leaderboard },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
