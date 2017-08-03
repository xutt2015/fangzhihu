import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import login from '@/components/login/login'
import home from '@/components/home/home'
import homeContent from '@/components/home/homeContent'
import AskQuestionModel from '@/components/home/AskQuestionModel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },{
      path: '/',
      name: 'login',
      redirect:'/signin',
      component: login
    },{
      path: '/index',
      name: 'index',
      component: Hello
    },{
      path: '/signin',
      name: 'login',
      component: login
    },{
      path: '/signup',
      name: 'login',
      component: login
    },{
      path: '/home',
      name: 'home',
      component: home,
      children:[{
          path: '',
          name: 'homeContent',
          component: homeContent,
          children:[{
            path: '',
            name: 'AskQuestionModel',
            component: AskQuestionModel
          }]
      }]
    }
  ]
})
