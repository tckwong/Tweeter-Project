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
]

const router = new VueRouter({
  routes
})

export default router
