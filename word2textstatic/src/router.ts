import Vue from 'vue'
import Router from 'vue-router'
import APP from "./App.vue"
import Home from './views/Home.vue'
import List from './views/List.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: "",
      component:APP,
      redirect: {
        name: "home"
      }
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/list',
      name: 'list',
      component: List
    }

  ]
})
