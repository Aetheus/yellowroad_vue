import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import Stories from '@/pages/Stories'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/stories',
      component: Stories
    }
  ]
})
