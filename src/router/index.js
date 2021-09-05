import Vue from 'vue'
import VueRouter from 'vue-router'
import FeedView from '../views/FeedView.vue'
import LoginView from '../views/LoginView.vue'
import DiscoverView from '../views/DiscoverView.vue'
import OtherProfilesView from '../views/OtherProfilesView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/DiscoverView',
    name: 'DiscoverView',
    component: DiscoverView
  },
  {
    path: '/FeedView',
    name: 'FeedView',
    component: FeedView,
  },
  {
    path: '/OtherProfilesView/:user',
    name: 'OtherProfilesView',
    component: OtherProfilesView,
  },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
