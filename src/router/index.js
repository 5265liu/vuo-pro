import Vue from 'vue'
import Router from 'vue-router'

import header from '../components/homePage.vue'
import invest from '../components/invest.vue'
Vue.use(Router)

export default new Router({
  routes: [
  	{
  		path: '/', 
  		redirect: 'header'
  	}, 
    {
      path: '/header',
      name: 'header',
      component: header
    },
    {
      path: '/invest',
      name: 'invest',
      component: invest
    }
  ]
})
