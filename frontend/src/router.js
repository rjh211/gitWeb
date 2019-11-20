import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import GChart from './views/GChart.vue'
import FunctionTest from './views/FunctionTest.vue'
import Main from './views/Main.vue'

import axios from 'axios'

import VueGoogleChart from 'vue-google-charts'
import VueGoodTablePlugin from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'
import VueDragReSize from 'vue-drag-resize'

Vue.use(Router)
Vue.use(VueGoogleChart)
Vue.use(VueGoodTablePlugin)

Vue.component(VueDragReSize);

Vue.prototype.$http = axios

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Comformal',
      component: ()=>import('./views/Comformal.vue')
    },
    {
      path: '/GChart',
      name: 'GChart',
      component: GChart
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
      path: '/functiontest',
      name: 'functiontest',
      component : FunctionTest
    },
    {
      path: '/Main',
      name: 'Main',
      component : Main
    },
    {
      path: '/Signup',
      name: 'Signup',
      component:()=>import('./components/Sign_up.vue')
    },
    {
      path:'/Chartjs',
      name: 'Chartjs',
      component:()=>import('./views/Chartjs.vue')
    },
    {
      path:'/CardTest',
      name: 'CardTest',
      component:()=>import('./components/CardTest.vue')
    },
    {
      path:'/newComformal',
      name: 'newComformal',
      component:()=>import('./views/newComformal.vue')
    }
  ]
})
