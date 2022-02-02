import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Intro from '@/pages/Intro'
import Output from '@/pages/TestOutput'

Vue.use(Router)

export default new Router({
  mode: 'history', // 히스토리 모드로 설정 <-> hash
  routes: [
    {
      path: '/',
      name: 'Intro',
      component: Intro
    },
    {
      path: '/output',
      name: 'output',
      component: Output
    }
  ]
})
