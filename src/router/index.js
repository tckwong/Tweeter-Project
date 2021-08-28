import Vue from 'vue'
import VueRouter from 'vue-router'
import FeedView from '../views/FeedView.vue'
import LoginView from '../views/LoginView.vue'
import ProfileView from '../views/ProfileView.vue'
import ProfileEditView from '../views/ProfileEditView.vue'
import DiscoverView from '../views/DiscoverView.vue'
import DiscoverBody from '@/components/DiscoverBody.vue'

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
    path: '/ProfileView',
    name: 'ProfileView',
    component: ProfileView
  },
  {
    path: '/FeedView',
    name: 'FeedView',
    component: FeedView,
  },
  {
    path: '/ProfileEditView',
    name: 'ProfileEditView',
    component: ProfileEditView,
  },
  // {
  //   path: '/DiscoverView/:userId',
  //   name: 'DiscoverBody',
  //   component: DiscoverBody
  // },
  { path: '/DiscoverView/:userId', component: DiscoverBody }
  
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
